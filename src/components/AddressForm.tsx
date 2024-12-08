'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import emailjs from '@emailjs/browser'
import QRCode from 'qrcode'
import jsPDF from 'jspdf';

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
const getPaymentLinkHelper = (buildingType: keyof typeof PAYMENT_LINKS) => {
  return PAYMENT_LINKS[buildingType];
};

// Neue Hilfsfunktion für Admin-Benachrichtigungen
const sendAdminNotification = async (
  action: 'email' | 'download',
  formData: {
    address: string,
    buildingYear: string,
    buildingType: string,
    email?: string
  }
) => {
  const buildingTypeText = formData.buildingType === 'house' ? 'Einfamilienhaus' : 
                          formData.buildingType === 'apartment4' ? 'Mehrfamilienhaus bis 4 Wohneinheiten' :
                          formData.buildingType === 'apartment5' ? 'Mehrfamilienhaus über 4 Wohneinheiten' :
                          'Nichtwohngebäude (NWG)';

  const templateParams = {
    to_email: 'info@premium-energiepass.online',
    action_type: action === 'email' ? 'E-Mail Versand' : 'Direkter Download',
    address: formData.address,
    building_type: buildingTypeText,
    building_year: formData.buildingYear,
    user_email: formData.email || 'Nicht angegeben',
    timestamp: new Date().toLocaleString('de-DE'),
    payment_link: getPaymentLinkHelper(formData.buildingType as keyof typeof PAYMENT_LINKS)
  };

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
  } catch (error) {
    console.error('Admin notification failed:', error);
  }
};

interface FormData {
  address: string;
  buildingYear: string;
  buildingType: keyof typeof PAYMENT_LINKS;
  contactMethod: string;
  email: string;
  phone: string;
}

export default function AddressForm({ className = "", isHeroVariant = false }: AddressFormProps) {
  const [formStep, setFormStep] = useState<'initial' | 'loading' | 'email'>('initial')
  const [formData, setFormData] = useState<FormData>({
    address: '',
    buildingYear: '',
    buildingType: 'house',
    contactMethod: '',
    email: '',
    phone: ''
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

  useEffect(() => {
    if (formStep === 'initial') {
      let currentAvatar = 4;
      const interval = setInterval(() => {
        if (currentAvatar >= 7) {
          clearInterval(interval);
          return;
        }
        
        currentAvatar++;
        setVisibleAvatars(currentAvatar);
        setOrderCount(23 + (currentAvatar - 4));
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setVisibleAvatars(7);
      setOrderCount(26);
    }
  }, [formStep]);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const handleFocus = () => {
      if (!window.google) {
        console.error('Google Maps API not loaded');
        return;
      }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAddressValidated) {
      alert('Bitte wählen Sie eine Adresse aus den Vorschlägen aus.');
      addressInputRef.current?.focus();
      return;
    }

    // Extrahiere den Straßenteil (alles vor dem ersten Komma)
    const streetPart = formData.address.split(',')[0];
    
    // Prüfe nur den Straßenteil auf Hausnummer
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

  // Adresse formatieren
  const formatAddress = (fullAddress: string) => {
    // Extrahiere den Straßenteil und die Stadt
    const parts = fullAddress.split(',');
    const street = parts[0].trim();  // z.B. "Quelkhorner Straße 37"
    const city = parts[1]?.trim().split(' ').pop() || '';  // Nimmt nur den Stadtnamen, z.B. "Bremen"
    
    return city ? `${street} in ${city}` : street;
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
    
    // Download auslösen
    const link = document.createElement('a');
    link.download = formatFileName(formattedAddress).replace('.png', '.pdf');
    link.href = pdfOutput;
    link.click();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      const paymentLink = getPaymentLinkHelper(formData.buildingType);
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

      // Klickbaren Bereich zum QR Code hinzufügen
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // QR Code Bereich definieren
        const qrLeft = canvas.width - 483;
        const qrTop = canvas.height - 317;
        const qrWidth = 187;
        const qrHeight = 187;
        
        // Prüfen ob der Klick im QR Code Bereich war
        if (x >= qrLeft && x <= qrLeft + qrWidth && 
            y >= qrTop && y <= qrTop + qrHeight) {
          window.open(fullUrl, '_blank');
        }
      });

      // Cursor ändern wenn über QR Code
      canvas.style.cursor = 'pointer';

      // PNG generieren
      const dataUrl = canvas.toDataURL('image/png');

      if (formData.contactMethod === 'email') {
        const templateParams = {
          to_email: formData.email,
          from_name: "Premium Energiepass Online",
          to_name: formData.email.split('@')[0],
          building_type: buildingTypeText,
          message: formattedAddress,
          building_year: formData.buildingYear,
          payment_link: getPaymentLinkHelper(formData.buildingType)
        };

        try {
          // EmailJS initialisieren
          emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
          
          const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            templateParams
          );

          console.log('EmailJS Response:', response);

          if (response.status === 200) {
            // PDF generieren und herunterladen
            generatePDF(dataUrl, fullUrl, formData.address);

            // Admin-Benachrichtigung
            const adminTemplateParams = {
              to_email: 'info@premium-energiepass.online',
              action_type: 'E-Mail Versand',
              address: formData.address,
              building_type: buildingTypeText,
              building_year: formData.buildingYear,
              user_email: formData.email,
              timestamp: new Date().toLocaleString('de-DE'),
              payment_link: getPaymentLinkHelper(formData.buildingType)
            };

            try {
              await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
                adminTemplateParams
              );
            } catch (error) {
              console.error('Admin notification failed:', error);
              // Fehler hier nicht werfen, damit der Hauptprozess weiterlaufen kann
            }

            // Erfolgsmeldung hinzufügen
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out';
            notification.textContent = 'Ihre Proberechnung wurde als PDF heruntergeladen und die E-Mail wurde versendet. Das PDF ist komplett klickbar!';
            document.body.appendChild(notification);

            setTimeout(() => {
              notification.style.opacity = '0';
              setTimeout(() => document.body.removeChild(notification), 500);
            }, 3000);
          }
        } catch (error) {
          console.error('EmailJS Error:', error);
          throw error;
        }
      } else {
        // PDF generieren und herunterladen
        generatePDF(dataUrl, fullUrl, formData.address);
        
        // Admin-Benachrichtigung für Download
        const adminTemplateParams = {
          to_email: 'info@premium-energiepass.online',
          action_type: 'Direkter Download',
          address: formData.address,
          building_type: buildingTypeText,
          building_year: formData.buildingYear,
          user_email: 'Direkter Download - keine E-Mail angegeben',
          timestamp: new Date().toLocaleString('de-DE'),
          payment_link: getPaymentLinkHelper(formData.buildingType)
        };

        try {
          // EmailJS initialisieren
          emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
          
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
            adminTemplateParams
          );
        } catch (error) {
          console.error('Admin notification failed:', error);
          // Fehler hier nicht werfen, damit der Hauptprozess weiterlaufen kann
        }

        // Benachrichtigung
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out';
        notification.textContent = 'Ihre Proberechnung wurde als PDF heruntergeladen. Das gesamte Dokument ist klickbar!';
        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => document.body.removeChild(notification), 500);
        }, 3000);
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
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-primary-600 text-xl font-semibold">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
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
                    const paymentLink = getPaymentLinkHelper(formData.buildingType);
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

                    // Klickbaren Bereich zum QR Code hinzufügen
                    canvas.addEventListener('click', (e) => {
                      const rect = canvas.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      // QR Code Bereich definieren
                      const qrLeft = canvas.width - 483;
                      const qrTop = canvas.height - 317;
                      const qrWidth = 187;
                      const qrHeight = 187;
                      
                      // Prüfen ob der Klick im QR Code Bereich war
                      if (x >= qrLeft && x <= qrLeft + qrWidth && 
                          y >= qrTop && y <= qrTop + qrHeight) {
                        window.open(fullUrl, '_blank');
                      }
                    });

                    // Cursor ändern wenn über QR Code
                    canvas.style.cursor = 'pointer';

                    // PNG generieren
                    const dataUrl = canvas.toDataURL('image/png');

                    // PDF generieren und herunterladen
                    generatePDF(dataUrl, fullUrl, formData.address);

                    // Admin-Benachrichtigung für Download
                    try {
                      // EmailJS initialisieren
                      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
                      
                      const adminTemplateParams = {
                        to_email: 'info@premium-energiepass.online',
                        action_type: 'Direkter Download',
                        address: formData.address,
                        building_type: buildingTypeText,
                        building_year: formData.buildingYear,
                        user_email: 'Direkter Download - keine E-Mail angegeben',
                        timestamp: new Date().toLocaleString('de-DE'),
                        payment_link: getPaymentLinkHelper(formData.buildingType)
                      };

                      await emailjs.send(
                        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                        process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!,
                        adminTemplateParams
                      );
                    } catch (error) {
                      console.error('Admin notification failed:', error);
                    }

                    // Benachrichtigung
                    const notification = document.createElement('div');
                    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out';
                    notification.textContent = 'Ihre Proberechnung wurde als PDF heruntergeladen. Das gesamte Dokument ist klickbar!';
                    document.body.appendChild(notification);

                    setTimeout(() => {
                      notification.style.opacity = '0';
                      setTimeout(() => document.body.removeChild(notification), 500);
                    }, 3000);

                  } catch (error) {
                    console.error('Error:', error);
                    const errorNotification = document.createElement('div');
                    errorNotification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
                    errorNotification.textContent = 'Es gab einen Fehler beim Herunterladen der Proberechnung.';
                    document.body.appendChild(errorNotification);
                    
                    setTimeout(() => {
                      errorNotification.style.opacity = '0';
                      setTimeout(() => document.body.removeChild(errorNotification), 500);
                    }, 3000);
                  }
                }}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="font-medium">Direkt herunterladen</span>
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
              onChange={(e) => setFormData({ 
                ...formData, 
                buildingType: e.target.value as keyof typeof PAYMENT_LINKS 
              })}
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
                <span className="font-semibold">{orderCount} Personen</span> haben heute bereits bestellt
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 