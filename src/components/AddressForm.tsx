'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useRouter, useSearchParams } from 'next/navigation'
import QRCode from 'qrcode'
import jsPDF from 'jspdf';

interface AddressFormProps {
  className?: string;
  isHeroVariant?: boolean;
}

// Payment Links
const PAYMENT_LINKS = {
  house: "https://buy.stripe.com/6oE4iIdtrfFC7Ty288?locale=de",
  apartment4: "https://buy.stripe.com/fZeg1qgFDdxu0r6289?locale=de",
  apartment5: "https://buy.stripe.com/8wM16w753bpmb5K4gi?locale=de",
  commercial: "https://buy.stripe.com/5kA7uUexv8da8XCfZ1?locale=de"
};

// Helper function for payment links
const getPaymentLink = (buildingType: string) => {
  return PAYMENT_LINKS[buildingType as keyof typeof PAYMENT_LINKS];
};

// Admin notification function
const sendAdminNotification = async (
  action: 'email' | 'whatsapp',
  formData: {
    address: string,
    buildingType: string,
    buildingYear: string,
    email?: string,
    phone?: string,
    gclid?: string
  },
  buildingTypeText: string
) => {
  try {
    const adminTemplateParams = {
      to_email: 'info@premium-energiepass.online',
      action_type: action === 'email' ? 'E-Mail Versand' : 'WhatsApp Versand',
      address: formData.address,
      building_type: buildingTypeText,
      building_year: formData.buildingYear,
      user_email: formData.email || 'Keine E-Mail angegeben',
      user_phone: action === 'whatsapp' ? (formData.phone || 'Nicht angegeben') : 'Nicht relevant (E-Mail Versand)', 
      timestamp: new Date().toLocaleString('de-DE'),
      payment_link: getPaymentLink(formData.buildingType),
      gclid: formData.gclid || 'Keine Google Ads CID vorhanden'
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
      adminTemplateParams
    );
  } catch (error) {
    console.error('Admin notification failed:', error);
  }
};

// Formatiere den Dateinamen
const formatFileName = (address: string) => {
  // Extrahiere Straße und Stadt
  const parts = address.split(',');
  const street = parts[0].trim();
  const city = parts[1]?.trim().split(' ').pop() || '';  // Nimmt nur den Stadtnamen

  // Bereinige die Strings
  const cleanStreet = street
    .replace(/[^\w\säöüÄÖÜß-]/g, '')  // Entferne Sonderzeichen außer Umlaute
    .trim();
  const cleanCity = city
    .replace(/[^\w\säöüÄÖÜß-]/g, '')
    .trim();

  return `Ihre kostenlose Proberechnung - ${cleanStreet} in ${cleanCity} - vom Premium Energiepass Online.png`;
};

// PDF-Generierungsfunktion für beide Routen
const generatePDF = async (dataUrl: string, fullUrl: string, formattedAddress: string) => {
  // PNG in temporäres Image laden und warten bis es geladen ist
  const tempImg = new Image();
  await new Promise((resolve, reject) => {
    tempImg.onload = resolve;
    tempImg.onerror = reject;
    tempImg.src = dataUrl;
  });
  
  // Neue Dimensionen berechnen (900px Breite)
  const targetWidth = 900;
  const aspectRatio = tempImg.height / tempImg.width;
  const targetHeight = Math.round(targetWidth * aspectRatio);

  // PDF erstellen mit den skalierten Dimensionen
  const pdf = new jsPDF({
    orientation: targetWidth > targetHeight ? 'landscape' : 'portrait',
    unit: 'px',
    format: [targetWidth, targetHeight]
  });

  // Bild in skalierter Größe einfügen
  pdf.addImage({
    imageData: dataUrl,
    format: 'PNG',
    x: 0,
    y: 0,
    width: targetWidth,
    height: targetHeight
  });

  // Link über das gesamte Dokument hinzufügen
  pdf.link(0, 0, targetWidth, targetHeight, { url: fullUrl });

  // PDF generieren
  const pdfOutput = pdf.output('datauristring');
  
  // PDF-Viewer in einem Modal auf der Seite anzeigen
  const pdfViewerModal = document.createElement('div');
  pdfViewerModal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4';
  pdfViewerModal.style.zIndex = '9999';
  
  // Container für das Bild und Schließen/Download-Buttons
  const modalContent = document.createElement('div');
  modalContent.className = 'bg-white rounded-lg shadow-xl max-w-5xl w-full flex flex-col h-[90vh] relative';
  
  // Toolbar mit Buttons
  const toolbar = document.createElement('div');
  toolbar.className = 'flex justify-between items-center p-4 border-b';
  
  // Titel
  const title = document.createElement('h3');
  title.className = 'text-lg font-semibold text-gray-800';
  title.textContent = 'Ihre Proberechnung';
  
  // Button-Container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex gap-2';
  
  // Download-Button
  const downloadButton = document.createElement('button');
  downloadButton.className = 'bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors';
  
  // Download-Icon
  downloadButton.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
  </svg><span>PDF Herunterladen</span>`;
  
  downloadButton.onclick = () => {
    const link = document.createElement('a');
    link.download = formatFileName(formattedAddress).replace('.png', '.pdf');
    link.href = pdfOutput;
    link.click();
  };
  
  // Schließen-Button
  const closeButton = document.createElement('button');
  closeButton.className = 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded flex items-center gap-2 transition-colors';
  
  // Schließen-Icon
  closeButton.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg><span>Schließen</span>`;
  
  closeButton.onclick = () => {
    document.body.removeChild(pdfViewerModal);
  };
  
  // Bildcontainer
  const imageContainer = document.createElement('div');
  imageContainer.className = 'w-full flex-grow overflow-auto flex items-start justify-center p-4';
  
  // Bild anzeigen (statt PDF im iframe)
  const imageElement = document.createElement('img');
  imageElement.src = dataUrl;
  imageElement.className = 'max-w-full h-auto shadow-lg border border-gray-200';
  imageElement.alt = 'Ihre Proberechnung';
  
  // Bild klickbar machen, um zum Zahlungslink zu navigieren
  imageElement.style.cursor = 'pointer';
  imageElement.onclick = () => {
    window.open(fullUrl, '_blank');
  };
  
  // Link-Hinweis
  const linkHint = document.createElement('div');
  linkHint.className = 'absolute bottom-4 right-4 bg-white bg-opacity-75 px-2 py-1 rounded text-sm text-gray-600';
  linkHint.innerHTML = 'Klicken Sie auf das Bild, um direkt zur Bestellung zu gelangen';
  
  // Zusammenbauen der Elemente
  buttonContainer.appendChild(downloadButton);
  buttonContainer.appendChild(closeButton);
  toolbar.appendChild(title);
  toolbar.appendChild(buttonContainer);
  modalContent.appendChild(toolbar);
  imageContainer.appendChild(imageElement);
  modalContent.appendChild(imageContainer);
  modalContent.appendChild(linkHint);
  pdfViewerModal.appendChild(modalContent);
  
  // Modal zur Seite hinzufügen
  document.body.appendChild(pdfViewerModal);
  
  // Tastendruck-Event für ESC-Taste
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      document.body.removeChild(pdfViewerModal);
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Klick außerhalb des Modals schließt es
  pdfViewerModal.addEventListener('click', (event) => {
    if (event.target === pdfViewerModal) {
      document.body.removeChild(pdfViewerModal);
      document.removeEventListener('keydown', handleKeyDown);
    }
  });
  
  return pdfOutput; // Wir geben die PDF-Daten zurück, damit sie in der handleEmailSubmit-Funktion verwendet werden können
};

export default function AddressForm({ className = "", isHeroVariant = false }: AddressFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formStep, setFormStep] = useState<'initial' | 'loading' | 'email'>('initial')
  const [formData, setFormData] = useState({
    address: '',
    buildingYear: '',
    buildingType: 'house',
    contactMethod: '', // 'email' or 'whatsapp'
    email: '',
    phone: '',
    gclid: ''
  })
  const [progress, setProgress] = useState(0)
  const [visibleAvatars, setVisibleAvatars] = useState(4);
  const [orderCount, setOrderCount] = useState(23);
  const controls = useAnimationControls()
  const [isInteracting, setIsInteracting] = useState(false)
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const [isAddressValidated, setIsAddressValidated] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!hasInteracted && formStep === 'initial') {
      controls.start({
        y: [0, -20, 0],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }
      })
    } else {
      controls.stop()
      controls.set({ y: 0 })
    }
  }, [formStep, controls, hasInteracted])

  useEffect(() => {
    if (formStep === 'loading') {
      const duration = 5000
      const interval = 50
      const steps = duration / interval
      const increment = 100 / steps

      const timer = setInterval(() => {
        setProgress(prev => {
          const next = Math.min(prev + increment, 100)
          if (next >= 100) {
            clearInterval(timer)
          }
          return next
        })
      }, interval)

      return () => {
        clearInterval(timer)
        setProgress(0)
      }
    }
  }, [formStep])

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const handleFocus = () => {
      if (!window.google) {
        // Lazy-load Google Maps API nur wenn der Benutzer mit dem Feld interagiert
        const loadGoogleMapsApi = () => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            if (addressInputRef.current) {
              try {
                const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
                  types: ['address'],
                  componentRestrictions: { country: 'de' },
                  fields: ['formatted_address', 'address_components'],
                });
    
                autocomplete.addListener('place_changed', () => {
                  const place = autocomplete.getPlace();
                  const formattedAddress = place?.formatted_address || '';
                  setFormData(prev => ({ ...prev, address: formattedAddress }));
                  setIsAddressValidated(true);
                });
              } catch (error) {
                console.error('Error initializing Google Places Autocomplete:', error);
              }
            }
          };
          
          script.onerror = () => {
            console.error('Failed to load Google Maps API');
          };
          
          document.head.appendChild(script);
        };
        
        loadGoogleMapsApi();
        return;
      }

      // Falls Google Maps API bereits geladen ist
      if (addressInputRef.current) {
        try {
          const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'de' },
            fields: ['formatted_address', 'address_components'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const formattedAddress = place?.formatted_address || '';
            setFormData(prev => ({ ...prev, address: formattedAddress }));
            setIsAddressValidated(true);
          });
        } catch (error) {
          console.error('Error initializing Google Places Autocomplete:', error);
        }
      }
    };

    const inputElement = addressInputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  // Erfassen der gclid von Google Ads aus der URL
  useEffect(() => {
    const gclid = searchParams?.get('gclid');
    if (gclid) {
      setFormData(prev => ({ ...prev, gclid }));
      // Speichere gclid im sessionStorage für spätere Verwendung
      sessionStorage.setItem('gclid', gclid);
    } else {
      // Versuche, gclid aus sessionStorage zu holen, falls vorhanden
      const storedGclid = sessionStorage.getItem('gclid');
      if (storedGclid) {
        setFormData(prev => ({ ...prev, gclid: storedGclid }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAddressValidated) {
      alert('Bitte wählen Sie eine Adresse aus den Vorschlägen aus.');
      addressInputRef.current?.focus();
      return;
    }

    // Extract street part (everything before the first comma)
    const streetPart = formData.address.split(',')[0];
    
    // Check only the street part for a house number
    const hasHouseNumber = /\s+\d+(-?\d*)?[a-zA-Z]?\s*$/.test(streetPart);

    if (!hasHouseNumber) {
      alert('Bitte ergänzen Sie die Hausnummer Ihres Objektes. Danke!');
      addressInputRef.current?.focus();
      setIsAddressValidated(false);
      return;
    }

    setFormStep('loading');
    setTimeout(() => setFormStep('email'), 5000);
  }

  // Format address
  const formatAddress = (fullAddress: string) => {
    const parts = fullAddress.split(',');
    const street = parts[0].trim();
    const city = parts[1]?.trim().split(' ').pop() || '';
    
    return city ? `${street} in ${city}` : street;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if a phone number is provided when WhatsApp is selected
    if (formData.contactMethod === 'whatsapp' && !formData.phone.trim()) {
      alert('Bitte geben Sie Ihre Handynummer ein.');
      return;
    }
    
    try {
      // Template basierend auf Baujahr auswählen
      const year = parseInt(formData.buildingYear);
      let templateName = '';
      
      if (year <= 1959) {
        templateName = '1900-1959.png';
      } else if (year >= 1960 && year <= 1975) {
        templateName = '1960-1975.png';
      } else if (year >= 1976 && year <= 1990) {
        templateName = '1976-1990.png';
      } else {
        templateName = '1991-2024.png';
      }

      // Payment Link und QR Code generieren
      const paymentLink = getPaymentLink(formData.buildingType);
      const params = new URLSearchParams({
        address: formData.address,
        type: formData.buildingType,
        year: formData.buildingYear
      });
      const fullUrl = `${paymentLink}&${params.toString()}`;
      
      // QR Code generieren
      const qrCodeDataUrl = await QRCode.toDataURL(fullUrl);
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeDataUrl;
      await new Promise((resolve) => {
        qrCodeImage.onload = resolve;
      });

      // Canvas erstellen und Template laden
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Template laden
      const templateImg = new Image();
      templateImg.crossOrigin = "anonymous";
      templateImg.src = `/images/templates/${templateName}`;
      
      await new Promise((resolve, reject) => {
        templateImg.onload = resolve;
        templateImg.onerror = reject;
      });

      // Canvas Größe setzen und Template zeichnen
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;
      ctx.drawImage(templateImg, 0, 0);

      // Text Style setzen
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#333333';

      // Text hinzufügen
      const buildingTypeText = formData.buildingType === 'house' ? 'Einfamilienhaus' : 
                             formData.buildingType === 'apartment4' ? 'Mehrfamilienhaus bis 4 Wohneinheiten' :
                             formData.buildingType === 'apartment5' ? 'Mehrfamilienhaus über 4 Wohneinheiten' :
                             'Nichtwohngebäude (NWG)';

      const formattedAddress = formatAddress(formData.address);
      
      ctx.fillText(buildingTypeText, 140, 870);
      ctx.fillText(formattedAddress, 140, 920);
      ctx.fillText(`Baujahr ${formData.buildingYear}`, 140, 970);

      // QR Code zeichnen
      ctx.drawImage(qrCodeImage, canvas.width - 483, canvas.height - 317, 187, 187);

      // PNG generieren
      const dataUrl = canvas.toDataURL('image/png');

      if (formData.contactMethod === 'email') {
        // EmailJS Template Parameter
        const templateParams = {
          to_email: formData.email,
          building_type: buildingTypeText,
          message: formattedAddress,
          building_year: formData.buildingYear,
          payment_link: getPaymentLink(formData.buildingType)
        };

        // EmailJS senden
        const response = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        if (response.status === 200) {
          // PDF generieren und in neuem Tab öffnen
          await generatePDF(dataUrl, fullUrl, formData.address);
          await sendAdminNotification('email', formData, buildingTypeText);

          // Nach erfolgreicher PDF-Generierung und Email-Versand zur Danke-Seite weiterleiten
          const redirectParams = new URLSearchParams({
            address: formData.address,
            type: formData.buildingType,
            year: formData.buildingYear,
            method: formData.contactMethod
          });
          
          // Füge gclid hinzu, wenn vorhanden
          if (formData.gclid) {
            redirectParams.append('gclid', formData.gclid);
          }
          
          router.push(`/danke?${redirectParams.toString()}`);
        } else {
          throw new Error('Failed to send email');
        }
      } else if (formData.contactMethod === 'whatsapp') {
        // PDF generieren und in neuem Tab öffnen
        await generatePDF(dataUrl, fullUrl, formData.address);
        await sendAdminNotification('whatsapp', formData, buildingTypeText);

        // Nach erfolgreicher PDF-Generierung und Admin-Benachrichtigung zur Danke-Seite weiterleiten
        const redirectParams = new URLSearchParams({
          address: formData.address,
          type: formData.buildingType,
          year: formData.buildingYear,
          method: formData.contactMethod
        });
        
        // Füge gclid hinzu, wenn vorhanden
        if (formData.gclid) {
          redirectParams.append('gclid', formData.gclid);
        }
        
        router.push(`/danke?${redirectParams.toString()}`);
      }
    } catch (error) {
      alert('Es gab einen Fehler. Bitte versuchen Sie es später erneut.');
    }
  };

  const renderFormContent = () => {
    if (formStep === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-green-600 text-xl font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-center text-lg">
            Wir prüfen Ihre Eingaben und erstellen Ihre Proberechnung ...
          </p>
        </div>
      )
    }

    if (formStep === 'email') {
      return (
        <div>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ihre Proberechnung ist fertig! 🎉
            </h3>
            <p className="text-gray-600">
              Wie möchten Sie Ihre Proberechnung und Ihr verbindliches Angebot zur Ausstellung Ihres Energieausweises erhalten?
            </p>
          </div>

          {!formData.contactMethod ? (
            <div className="space-y-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'email' }))}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Per E-Mail</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'whatsapp' }))}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">Per WhatsApp</span>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative group">
                {formData.contactMethod === 'email' ? (
                  <input
                    type="email"
                    required
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="ihre@email.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <input
                    type="tel"
                    required
                    pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ihre Handynummer"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                )}
              </div>

              <button
                onClick={handleEmailSubmit}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors group"
              >
                <span>Ja! Unterlagen {formData.contactMethod === 'email' ? 'per E-Mail' : 'per WhatsApp'} zusenden</span>
                <svg 
                  className="w-5 h-5 ml-2 transform transition-all duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: '', email: '', phone: '' }))}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4"
              >
                 Andere Kontaktmethode wählen
              </button>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="relative group z-10">
            <input
              type="text"
              required
              ref={addressInputRef}
              className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all duration-300 
                hover:border-green-300 hover:shadow-lg
                group-hover:translate-y-[-2px]
                relative z-20"
              placeholder="Straße, Hausnummer, PLZ, Ort"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                setIsAddressValidated(false);
              }}
            />
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 z-10" />
            {!isAddressValidated && formData.address && (
              <div className="text-sm text-amber-600 mt-1">
                Zur Absicherung der Qualität, wählen Sie bitte einen Vorschlag aus der Adressenliste. Danke!
              </div>
            )}
          </div>

          <div className="relative group z-10">
            <input
              type="number"
              required
              min="1900"
              max={new Date().getFullYear()}
              className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all duration-300 
                hover:border-green-300 hover:shadow-lg
                group-hover:translate-y-[-2px]
                relative z-20"
              placeholder="Baujahr, z.B. 1985"
              value={formData.buildingYear}
              onChange={(e) => setFormData({ ...formData, buildingYear: e.target.value })}
            />
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 z-10" />
          </div>

          <div className="relative group z-10">
            <select
              required
              className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                focus:ring-2 focus:ring-green-500 focus:border-transparent
                transition-all duration-300 
                hover:border-green-300 hover:shadow-lg
                group-hover:translate-y-[-2px]
                appearance-none cursor-pointer
                relative z-20"
              value={formData.buildingType}
              onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
            >
              <option value="house">Einfamilienhaus</option>
              <option value="apartment4">Mehrfamilienhaus bis 4 Wohneinheiten</option>
              <option value="apartment5">Mehrfamilienhaus über 4 Wohneinheiten</option>
              <option value="commercial">Nichtwohngebäude (NWG)</option>
            </select>
            <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 z-10" />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none
              transition-transform duration-300 group-hover:translate-x-1 z-20">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-8 py-4 
            border border-transparent text-base font-medium rounded-xl 
            text-white bg-green-600 relative overflow-hidden
            transition-all duration-300 
            hover:bg-green-700 hover:shadow-xl hover:scale-[1.02]
            group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-2">
            <span className="transition-transform duration-300 group-hover:translate-x-[-4px]">
              Jetzt Gratis Proberechnung erstellen
            </span>
            <svg 
              className="w-5 h-5 transform transition-all duration-300 group-hover:translate-x-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </button>
      </div>
    )
  }

  const avatars = [
    '/images/avatars/avatar1.jpeg',
    '/images/avatars/avatar2.jpeg',
    '/images/avatars/avatar3.jpeg',
    '/images/avatars/avatar4.jpeg',
    '/images/avatars/avatar5.jpeg',
    '/images/avatars/avatar6.jpeg',
    '/images/avatars/avatar7.jpeg'
  ];

  const handleInteractionStart = () => {
    setIsInteracting(true);
    setHasInteracted(true);
  };

  return (
    <div className={className}>
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1 }}
        onHoverStart={handleInteractionStart}
        onHoverEnd={() => setIsInteracting(false)}
        onFocus={handleInteractionStart}
        onBlur={() => setIsInteracting(false)}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group relative"
      >
        {/* Background Elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-10" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-10" />

        <div className="relative z-20">
          {/* Progress Bar */}
          <div className="bg-green-50 px-6 py-3">
            <div className="flex justify-between text-sm text-green-800 mb-2">
              <span>Fortschritt</span>
              <span>
                {formStep === 'initial' ? '0%' : 
                 formStep === 'loading' ? `${Math.round(progress)}%` : 
                 '96%'}
              </span>
            </div>
            <div className="h-2 bg-green-100 rounded-full">
              <div 
                className="h-2 bg-green-600 rounded-full transition-all duration-300"
                style={{ 
                  width: formStep === 'initial' ? '0%' : 
                         formStep === 'loading' ? `${progress}%` : 
                         '96%' 
                }}
              />
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {renderFormContent()}
            </form>
          </div>

          {/* Social Proof */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col items-center space-y-3">
              <div className="flex -space-x-2">
                {avatars.slice(0, visibleAvatars).map((avatar, i) => (
                  <motion.img
                    key={i}
                    src={avatar}
                    alt={`Kunde ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.className = "w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                    }}
                  />
                ))}
              </div>
              <motion.p 
                className="text-sm text-gray-600 text-center"
                key={visibleAvatars}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-semibold">{orderCount} Interessenten</span> haben heute eine Proberechnung erstellt
              </motion.p>
              
              {/* Google Rezensionen Banner */}
              <div className="mt-3">
                <img 
                  src="/images/2000+ Google Rezensionen.svg" 
                  alt="Über 2000 Google Rezensionen" 
                  className="max-w-full h-auto"
                  width={200}
                  height={40}
                  loading="lazy" // Verzögertes Laden für bessere Performance
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
