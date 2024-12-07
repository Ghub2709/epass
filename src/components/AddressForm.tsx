'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { createCustomizedProberechnung } from '@/lib/imageProcessor';

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

export default function AddressForm({ className = "", isHeroVariant = false }: AddressFormProps) {
  const [formStep, setFormStep] = useState<'initial' | 'loading' | 'email'>('initial')
  const [formData, setFormData] = useState({
    address: '',
    buildingYear: '',
    buildingType: 'house',
    contactMethod: '', // 'email' oder 'whatsapp'
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

  useEffect(() => {
    if (!isInteracting && formStep === 'initial') {
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
  }, [isInteracting, formStep, controls])

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

      // Canvas erstellen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Bild laden
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `/images/templates/${templateName}`;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Canvas Größe setzen
      canvas.width = img.width;
      canvas.height = img.height;

      // Bild zeichnen
      ctx.drawImage(img, 0, 0);

      // Text Style setzen
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#333333';

      // Text hinzufügen
      const buildingTypeText = formData.buildingType === 'house' ? 'Einfamilienhaus' : 
                             formData.buildingType === 'apartment4' ? 'Mehrfamilienhaus bis 4 Wohneinheiten' :
                             formData.buildingType === 'apartment5' ? 'Mehrfamilienhaus über 4 Wohneinheiten' :
                             'Nichtwohngebäude (NWG)';

      ctx.fillText(buildingTypeText, 140, 870);
      const formattedAddress = formatAddress(formData.address);
      ctx.fillText(formattedAddress, 140, 920);
      ctx.fillText(`Baujahr ${formData.buildingYear}`, 140, 970);

      // QR Code generieren und zeichnen
      const qr = await import('qrcode');
      const paymentLink = getPaymentLink(formData.buildingType);
      const params = new URLSearchParams({
        address: formData.address,
        type: formData.buildingType,
        year: formData.buildingYear
      });
      
      const qrDataUrl = await qr.toDataURL(`${paymentLink}&${params.toString()}`, {
        width: 150,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      const qrImg = new Image();
      qrImg.src = qrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = resolve;
      });
      ctx.drawImage(qrImg, canvas.width - 483, canvas.height - 317, 187, 187);

      // Download auslösen
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = formatFileName(formData.address);
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('Ihre Proberechnung wurde erfolgreich erstellt!');
    } catch (error) {
      console.error('Error generating Proberechnung:', error);
      alert('Es gab einen Fehler bei der Erstellung der Proberechnung. Bitte versuchen Sie es später erneut.');
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
                onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'whatsapp' }))}
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
                ← Andere Kontaktmethode wählen
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

  const getPaymentLink = (buildingType: string) => {
    return PAYMENT_LINKS[buildingType as keyof typeof PAYMENT_LINKS];
  };

  return (
    <div className={className}>
      <motion.div
        animate={controls}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1 }}
        onHoverStart={() => setIsInteracting(true)}
        onHoverEnd={() => setIsInteracting(false)}
        onFocus={() => setIsInteracting(true)}
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