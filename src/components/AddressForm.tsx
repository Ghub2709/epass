'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import QRCode from 'qrcode'
import jsPDF from 'jspdf';
import Select from 'react-select'

interface AddressFormProps {
  className?: string;
  isHeroVariant?: boolean;
}

// Payment Links als Konstanten definieren
const PAYMENT_LINKS = {
  house: "https://buy.stripe.com/6oE4iIdtrfFC7Ty288?locale=de",
  apartment4: "https://buy.stripe.com/fZeg1qgFDdxu0r6289?locale=de",
  apartment5: "https://buy.stripe.com/8wM16w753bpmb5K4gi?locale=de",
  commercial: "https://buy.stripe.com/5kA7uUexv8da8XCfZ1?locale=de"
};

// Hilfsfunktion für Payment Links
const getPaymentLink = (buildingType: string) => {
  return PAYMENT_LINKS[buildingType as keyof typeof PAYMENT_LINKS];
};

// Admin notification function
const sendAdminNotification = async (
  action: 'email' | 'whatsapp' | 'telefon',
  formData: {
    address: string,
    buildingType: string,
    buildingYear: string,
    email?: string,
    phone?: string,
    gclid?: string
  },
  buildingTypeText: string,
  thankyouUrl?: string
) => {
  try {
    const adminTemplateParams: any = {
      to_email: 'info@premium-energiepass.online',
      action_type: action === 'email' 
        ? 'E-Mail Versand' 
        : action === 'whatsapp'
        ? 'WhatsApp Versand'
        : 'Telefonische Kontaktaufnahme',
      address: formData.address,
      building_type: buildingTypeText,
      building_year: formData.buildingYear,
      user_email: formData.email || 'Keine E-Mail angegeben',
      user_phone: action === 'email' ? 'Nicht relevant (E-Mail Versand)' : (formData.phone || 'Nicht angegeben'), 
      timestamp: new Date().toLocaleString('de-DE'),
      payment_link: getPaymentLink(formData.buildingType),
      gclid: formData.gclid || 'Keine Google Ads CID vorhanden'
    };
    
    // Add the PDF URL if provided
    if (thankyouUrl) {
      adminTemplateParams.pdf_url = thankyouUrl;
    }

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
  toolbar.className = 'flex flex-col sm:flex-row justify-between items-center p-4 border-b gap-3';
  
  // Titel
  const title = document.createElement('h3');
  title.className = 'text-lg font-semibold text-gray-800 text-center sm:text-left';
  title.textContent = 'Ihre Proberechnung';
  
  // Button-Container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex gap-2 w-full sm:w-auto justify-center sm:justify-end';
  
  // Download-Button
  const downloadButton = document.createElement('button');
  downloadButton.className = 'bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0 justify-center';
  
  // Download-Icon
  downloadButton.innerHTML = `<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  closeButton.className = 'bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0 justify-center';
  
  // Schließen-Icon
  closeButton.innerHTML = `<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  linkHint.className = 'fixed bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs sm:text-sm text-gray-600 shadow max-w-[200px] sm:max-w-none';
  linkHint.innerHTML = 'Klicken Sie auf das Bild, um zur Bestellung zu gelangen';
  
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

// EmailJS einmalig initialisieren
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

export default function AddressForm({ className = "", isHeroVariant = false }: AddressFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [formStep, setFormStep] = useState<'address' | 'loading' | 'email'>('address');
  const [formData, setFormData] = useState({
    address: '',
    buildingType: 'house',
    buildingYear: '',
    email: '',
    phone: '',
    contactMethod: '',
    gclid: searchParams.get('gclid') || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const controls = useAnimationControls();
  const formRef = useRef<HTMLFormElement>(null);
  const [isAddressValidated, setIsAddressValidated] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleAvatars, setVisibleAvatars] = useState(4);
  const [orderCount, setOrderCount] = useState(23);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Building type options for react-select
  const buildingTypeOptions = [
    { value: 'house', label: 'Einfamilienhaus' },
    { value: 'apartment4', label: 'Mehrfamilienhaus bis 4 Wohneinheiten' },
    { value: 'apartment5', label: 'Mehrfamilienhaus über 4 Wohneinheiten' },
    { value: 'commercial', label: 'Nichtwohngebäude (NWG)' }
  ];

  // Referenz für das Lade-Overlay, damit wir es später referenzieren können
  const loadingOverlayRef = useRef<HTMLDivElement | null>(null);
  
  // Cleanup-Funktion für das Overlay
  const cleanupOverlay = () => {
    if (loadingOverlayRef.current && document.body.contains(loadingOverlayRef.current)) {
      document.body.removeChild(loadingOverlayRef.current);
      loadingOverlayRef.current = null;
    }
  };
  
  // Cleanup beim Unmount der Komponente
  useEffect(() => {
    return () => {
      cleanupOverlay();
    };
  }, []);
  
  // Effect zum Beobachten von URL-Änderungen für das cleanup
  useEffect(() => {
    // Wenn sich der Pfad ändert, sollten wir das Overlay entfernen
    // Dies hilft nicht bei der initialen Navigation, aber bei nachfolgenden
    cleanupOverlay();
  }, [pathname, searchParams]);

  // Google Places Autocomplete initialization
  useEffect(() => {
    const handleFocus = () => {
      if (!window.google) {
        // Lazy-load Google Maps API only when user interacts with the field
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

      // If Google Maps API is already loaded
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

  // Animation effect
  useEffect(() => {
    if (!hasInteracted && formStep === 'address') {
      controls.start({
        y: [0, -20, 0],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }
      });
    } else {
      controls.stop();
      controls.set({ y: 0 });
    }
  }, [formStep, controls, hasInteracted]);

  // Progress bar animation for loading step
  useEffect(() => {
    if (formStep === 'loading') {
      const duration = 5000; // 5 seconds
      const interval = 50;
      const steps = duration / interval;
      const increment = 100 / steps;

      const timer = setInterval(() => {
        setProgress(prev => {
          const next = Math.min(prev + increment, 100);
          if (next >= 100) {
            clearInterval(timer);
            setFormStep('email');
          }
          return next;
        });
      }, interval);

      return () => {
        clearInterval(timer);
        setProgress(0);
      };
    }
  }, [formStep]);

  // Adresse formatieren
  const formatAddress = (fullAddress: string) => {
    const parts = fullAddress.split(',');
    const street = parts[0].trim();
    const city = parts[1]?.trim().split(' ').pop() || '';
    
    return city ? `${street} in ${city}` : street;
  };

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

    // Set loading state and show animation
    setFormStep('loading');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if a phone number is provided when WhatsApp or Telefon is selected
    if ((formData.contactMethod === 'whatsapp' || formData.contactMethod === 'telefon') && !formData.phone.trim()) {
      alert('Bitte geben Sie Ihre Telefonnummer ein.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');

      // Entferne ein bestehendes Overlay falls vorhanden (z.B. bei erneutem Klick)
      cleanupOverlay();
      
      // Show loading state immediately
      const loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]';
      loadingOverlay.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
          <div class="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-gray-700 text-lg font-medium">Ihre Anfrage wird verarbeitet...</p>
        </div>
      `;
      document.body.appendChild(loadingOverlay);
      loadingOverlayRef.current = loadingOverlay;

      // Create the thank you page URL params early so we can use it in emails
      const params = new URLSearchParams({
        address: formData.address,
        type: formData.buildingType,
        year: formData.buildingYear,
        method: formData.contactMethod
      });
      
      // Add gclid if present
      if (formData.gclid) {
        params.append('gclid', formData.gclid);
      }
      
      // Construct the full thank you page URL
      const baseUrl = window.location.origin; // Gets the base URL of the site
      const thankyouUrl = `${baseUrl}/danke?${params.toString()}`;

      // Process form and send email/whatsapp/telefon
      if (formData.contactMethod === 'email' || formData.contactMethod === 'whatsapp' || formData.contactMethod === 'telefon') {
        // Get building type text for better readability
        const buildingTypeText = formData.buildingType === 'house' ? 'Einfamilienhaus' : 
                         formData.buildingType === 'apartment4' ? 'Mehrfamilienhaus bis 4 Wohneinheiten' :
                         formData.buildingType === 'apartment5' ? 'Mehrfamilienhaus über 4 Wohneinheiten' :
                         'Nichtwohngebäude (NWG)';
        
        // Send email to customer if email contact method is selected
        if (formData.contactMethod === 'email') {
          // Format address for better readability
          const formattedAddress = formatAddress(formData.address);
          
          // EmailJS Template Parameter for customer email
          const templateParams = {
            to_email: formData.email,
            building_type: buildingTypeText,
            message: formattedAddress,
            building_year: formData.buildingYear,
            payment_link: getPaymentLink(formData.buildingType),
            pdf_url: thankyouUrl  // Add the thank you page URL
          };

          // Send email to customer
          const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );

          if (response.status !== 200) {
            throw new Error('Failed to send email to customer');
          }
        }
        
        // Send notification to admin
        await sendAdminNotification(
          formData.contactMethod as 'email' | 'whatsapp' | 'telefon', 
          formData, 
          buildingTypeText,
          thankyouUrl
        );

        // Add a small delay to show the loading animation for at least 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ersetzen Sie den Navigationskorb mit einem Window-Location-Ansatz
        // Dies wird das Overlay entfernen, wenn die Seite sich ändert
        window.location.href = thankyouUrl;
        return; // Beenden Sie die Funktion, nachdem die Umleitung begonnen hat
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Es gab einen Fehler. Bitte versuchen Sie es später erneut.');
      // Remove loading overlay if there's an error
      cleanupOverlay();
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormContent = () => {
    if (formStep === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full bg-gray-100 rounded-full h-6 mb-2">
            <div 
              className="bg-green-600 h-6 rounded-full transition-all duration-200 flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <span className="text-white text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-center text-lg">
            Wir prüfen Ihre Eingaben und erstellen Ihre Proberechnung...
          </p>
        </div>
      );
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

          {!formData.contactMethod || formData.contactMethod === '' ? (
            <div className="space-y-4">
              <button
                type="button"
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
                type="button"
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

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'telefon' }))}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium">Per Telefon</span>
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
                    placeholder={formData.contactMethod === 'whatsapp' ? "Ihre Handynummer" : "Ihre Telefonnummer"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors group"
              >
                <span>
                  {formData.contactMethod === 'email' 
                    ? 'Ja! Unterlagen per E-Mail zusenden' 
                    : formData.contactMethod === 'whatsapp'
                    ? 'Ja! Unterlagen per WhatsApp zusenden'
                    : 'Ja! Telefonisch kontaktieren'}
                </span>
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
      );
    }

    // Default view (address form)
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
            <Select
              placeholder="-- Gebäudetyp wählen --"
              options={buildingTypeOptions}
              value={buildingTypeOptions.find(option => option.value === formData.buildingType) || null}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setFormData({ ...formData, buildingType: selectedOption.value });
                }
              }}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderRadius: '0.75rem',
                  borderWidth: '2px',
                  borderColor: state.isFocused ? '#22c55e' : '#e5e7eb',
                  boxShadow: state.isFocused ? '0 0 0 1px #22c55e' : 'none',
                  '&:hover': {
                    borderColor: '#86efac',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)'
                  },
                  padding: '0.375rem',
                  transition: 'all 0.3s ease',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected ? '#22c55e' : state.isFocused ? '#dcfce7' : 'white',
                  color: state.isSelected ? 'white' : '#374151',
                  '&:hover': {
                    backgroundColor: state.isSelected ? '#16a34a' : '#dcfce7',
                  },
                  cursor: 'pointer',
                  padding: '0.75rem 1rem',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: '#9ca3af',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: '#374151',
                }),
              }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!formData.address || !formData.buildingYear || !formData.buildingType}
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
    );
  };

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
          {/* Progress Bar - Only show when not loading */}
          {formStep !== 'loading' && (
            <div className="bg-green-50 px-6 py-3">
              <div className="flex justify-between text-sm text-green-800 mb-2">
                <span>Fortschritt</span>
                <span>
                  {formStep === 'address' ? '0%' : '96%'}
                </span>
              </div>
              <div className="h-2 bg-green-100 rounded-full">
                <div 
                  className="h-2 bg-green-600 rounded-full transition-all duration-300"
                  style={{ 
                    width: formStep === 'address' ? '0%' : '96%' 
                  }}
                />
              </div>
            </div>
          )}

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
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
