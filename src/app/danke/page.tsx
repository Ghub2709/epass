'use client'
import { motion } from 'framer-motion'
import Footer from '@/components/sections/Footer'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import PDFModal from '@/components/PDFModal'
import QRCode from 'qrcode'
import jsPDF from 'jspdf'
import TagManager from 'react-gtm-module'

export default function DankePage() {
  const searchParams = useSearchParams()
  const address = searchParams?.get('address') || ''
  const buildingType = searchParams?.get('type') || 'house'
  const buildingYear = searchParams?.get('year') || ''
  const contactMethod = searchParams?.get('method') || 'email'
  const gclid = searchParams?.get('gclid') || ''

  // Sende benutzerdefinierte Daten an GTM
  useEffect(() => {
    // Sende Event für die Danke-Seite
    TagManager.dataLayer({
      dataLayer: {
        'event': 'pageView',
        'pagePath': '/danke',
        'pageTitle': 'Danke für Ihre Anfrage',
        'buildingType': buildingType,
        'buildingYear': buildingYear
      }
    });
  }, [buildingType, buildingYear]);

  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pdfData, setPdfData] = useState<{
    dataUrl: string;
    fullUrl: string;
    formattedAddress: string;
  } | null>(null)
  const [timeLeft, setTimeLeft] = useState(3 * 60) // 3 Minuten in Sekunden
  const [codeCopied, setCodeCopied] = useState(false)
  const rabattcodeRef = useRef<HTMLSpanElement>(null)
  
  // Payment Links
  const PAYMENT_LINKS = {
    house: "https://buy.stripe.com/6oE4iIdtrfFC7Ty288?locale=de",
    apartment4: "https://buy.stripe.com/fZeg1qgFDdxu0r6289?locale=de",
    apartment5: "https://buy.stripe.com/8wM16w753bpmb5K4gi?locale=de",
    commercial: "https://buy.stripe.com/5kA7uUexv8da8XCfZ1?locale=de"
  };

  const getPaymentLink = (type: string) => {
    return PAYMENT_LINKS[type as keyof typeof PAYMENT_LINKS] || PAYMENT_LINKS.house;
  };

  // Timer für das MwSt Angebot
  useEffect(() => {
    if (timeLeft <= 0) return

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [timeLeft])

  // Copy Rabattcode to clipboard
  const copyRabattcode = () => {
    if (rabattcodeRef.current) {
      const text = rabattcodeRef.current.innerText;
      navigator.clipboard.writeText(text);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  // Formatieren der verbleibenden Zeit
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  // Formatieren des Gebäudetyps
  const formatBuildingType = (type: string) => {
    switch(type) {
      case 'house': return 'Einfamilienhaus'
      case 'apartment4': return 'Mehrfamilienhaus bis 4 Wohneinheiten'
      case 'apartment5': return 'Mehrfamilienhaus über 4 Wohneinheiten'
      case 'commercial': return 'Nichtwohngebäude (NWG)'
      default: return type
    }
  }

  // Adresse formatieren
  const formatAddress = (fullAddress: string) => {
    const parts = fullAddress.split(',');
    const street = parts[0].trim();
    const city = parts[1]?.trim().split(' ').pop() || '';
    
    return city ? `${street} in ${city}` : street;
  };

  const getContactMethodText = (method: string) => {
    switch (method) {
      case 'email':
        return 'Ihre Proberechnung wurde an Ihre E-Mail gesendet.';
      case 'whatsapp':
        return 'Ihre Proberechnung erhalten Sie in Kürze per WhatsApp auf Ihr Smartphone.';
      case 'telefon':
        return 'Wir werden Sie in Kürze telefonisch kontaktieren, um alle Ihre Fragen rund um den Energieausweis zu besprechen.';
      default:
        return 'Ihre Proberechnung wurde gesendet.';
    }
  };

  const handleDownloadClick = async () => {
    try {
      // Template basierend auf Baujahr auswählen
      const year = parseInt(buildingYear);
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
      const paymentLink = getPaymentLink(buildingType);
      const params = new URLSearchParams({
        address: address,
        type: buildingType,
        year: buildingYear
      });
      const fullUrl = `${paymentLink}&${params.toString()}`;
      
      // QR Code generieren
      const qrCodeDataUrl = await QRCode.toDataURL(fullUrl);
      const qrCodeImage = new window.Image();
      qrCodeImage.src = qrCodeDataUrl;
      await new Promise((resolve) => {
        qrCodeImage.onload = resolve;
      });

      // Canvas erstellen und Template laden
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Template laden
      const templateImg = new window.Image();
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
      const buildingTypeText = buildingType === 'house' ? 'Einfamilienhaus' : 
                             buildingType === 'apartment4' ? 'Mehrfamilienhaus bis 4 Wohneinheiten' :
                             buildingType === 'apartment5' ? 'Mehrfamilienhaus über 4 Wohneinheiten' :
                             'Nichtwohngebäude (NWG)';

      const formattedAddress = formatAddress(address);
      
      ctx.fillText(buildingTypeText, 140, 870);
      ctx.fillText(formattedAddress, 140, 920);
      ctx.fillText(`Baujahr ${buildingYear}`, 140, 970);

      // QR Code zeichnen
      ctx.drawImage(qrCodeImage, canvas.width - 483, canvas.height - 317, 187, 187);

      // PNG generieren
      const dataUrl = canvas.toDataURL('image/png');

      // PDF-Daten setzen und Modal öffnen
      setPdfData({
        dataUrl,
        fullUrl,
        formattedAddress: address
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Es gab einen Fehler beim Generieren der Proberechnung. Bitte versuchen Sie es später erneut.');
    }
  };

  // Start animation immediately and set state after animation completes
  setTimeout(() => {
    setIsAnimationComplete(true)
  }, 1000)

  return (
    <main className="bg-white">
      <section className="relative bg-gradient-to-b from-green-50 via-white to-white py-20">
        {/* Hintergrundeffekte */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-green-50 to-blue-50 -z-10"></div>
        <div className="absolute top-20 left-0 opacity-15 -z-10">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" className="text-green-200" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern1)" />
          </svg>
        </div>
        <div className="absolute top-20 right-0 opacity-15 -z-10">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" className="text-blue-200" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern2)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              {/* Success Animation */}
              <div className="flex justify-center mb-10">
                <div className="relative w-28 h-28">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-green-100 rounded-full"
                  />
                  <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg className="w-16 h-16 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-8"
              >
                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block mb-3">Herzlichen Glückwunsch!</span>
                  <span className="block relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 animate-gradient-x">
                      Sie haben eine hervorragende Wahl getroffen
                    </span>
                  </span>
                </h1>

                {/* Description - Betonung der Einzigartigkeit als Anbieter */}
                <p className="text-lg text-gray-700 leading-relaxed mt-6 max-w-3xl mx-auto">
                  Als einziger Anbieter kombinieren wir die <span className="font-semibold text-green-600">Effizienz digitaler Prozesse</span> mit der <span className="font-semibold text-green-600">Qualität eines lokalen Dienstleisters</span> aus Bremen. Sie profitieren von schnellen Online-Abläufen und gleichzeitig von unserem persönlichen Service vor Ort.
                </p>
                
                <p className="text-lg text-gray-700">
                  {getContactMethodText(contactMethod)}
                </p>

                {/* Download Button */}
                <div className="mt-8">
                  <button
                    onClick={handleDownloadClick}
                    className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Jetzt Proberechnung Herunterladen
                  </button>
                </div>

                {/* Eingegebene Daten - Mit mehr Weißraum */}
                <div className="mt-10 bg-green-50 rounded-xl shadow-sm p-8 border border-green-100 text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-5">Ihre eingegebenen Daten:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700"><strong>Adresse:</strong> {address}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-gray-700"><strong>Gebäudetyp:</strong> {formatBuildingType(buildingType)}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700"><strong>Baujahr:</strong> {buildingYear}</span>
                    </li>
                  </ul>
                </div>

                {/* MwSt Angebot mit Timer - Mit mehr Weißraum und entspannterem Design */}
                <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 shadow-xl">
                  <div className="relative bg-white rounded-xl overflow-hidden border-2 border-green-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                    
                    {/* Pulsierender Timer */}
                    <div className="absolute top-6 right-6 flex items-center justify-center">
                      <div className="absolute w-16 h-16 bg-red-400 opacity-20 rounded-full animate-ping"></div>
                      <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    
                    <div className="pt-20 pb-12 px-10">
                      <div className="text-center mb-10">
                        <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">EXKLUSIVES ANGEBOT</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                          <span className="block">Sparen Sie jetzt die komplette</span>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">Mehrwertsteuer!</span>
                        </h2>
                        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                          Nutzen Sie dieses <span className="font-bold">zeitlich begrenzte Angebot</span> und sparen Sie 19% bei Ihrer Bestellung des Energieausweises.
                        </p>
                      </div>
                      
                      {/* Rabattcode mit Copy Button */}
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-10 relative">
                        <div className="text-center">
                          <p className="text-gray-500 mb-4">Ihr exklusiver Rabattcode:</p>
                          <div className="flex items-center justify-center">
                            <span 
                              ref={rabattcodeRef}
                              className="text-lg md:text-2xl font-bold text-gray-800 tracking-widest bg-white px-6 py-3 rounded-l-lg border-y-2 border-l-2 border-gray-300"
                            >
                              MWSTGESCHENKT
                            </span>
                            <button
                              onClick={copyRabattcode}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-4 rounded-r-lg transition-colors duration-200 border-y-2 border-r-2 border-green-600 hover:border-green-700"
                            >
                              {codeCopied ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                          </div>
                          {codeCopied && (
                            <p className="text-green-600 mt-3 absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium">
                              ✓ Code in die Zwischenablage kopiert!
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* Bestellbutton */}
                      <div className="text-center">
                        <a 
                          href={`${getPaymentLink(buildingType)}${buildingType === 'house' ? '&' : '?'}prefilled_code=MWSTGESCHENKT`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-10 py-5 
                            bg-gradient-to-r from-green-600 to-green-500 
                            hover:from-green-700 hover:to-green-600 
                            text-white text-xl font-bold
                            rounded-xl shadow-lg hover:shadow-xl
                            transform transition-all duration-300 hover:-translate-y-1"
                        >
                          <span>Jetzt Ihren Energieausweis bestellen</span>
                          <svg 
                            className="ml-3 w-6 h-6 animate-pulse" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                        <p className="mt-5 text-sm text-gray-500">
                          19% Rabatt wird beim Checkout mit Code "MWSTGESCHENKT" automatisch angewendet
                        </p>
                        
                        {/* Google Rezensionen Banner */}
                        <div className="mt-5 flex justify-center">
                          <img 
                            src="/images/2000+ Google Rezensionen.svg" 
                            alt="Über 2000 Google Rezensionen" 
                            className="max-w-full h-auto"
                            width={220}
                            height={45}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps - Ohne Rahmen mit mehr Weißraum */}
                <div className="pt-24 mt-24">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Ihre nächsten Schritte:</h2>
                  
                  <ul className="space-y-8">
                    <li className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <span className="font-bold text-green-600">1</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 text-lg">Proberechnung erhalten</h3>
                        <p className="text-gray-600 mt-2">
                          {contactMethod === 'email' 
                            ? 'Sie haben Ihre Proberechnung bereits als Download erhalten. Bitte prüfen Sie auch Ihren E-Mail-Posteingang sowie den Spam-Ordner.' 
                            : contactMethod === 'whatsapp'
                            ? 'Sie erhalten Ihre Proberechnung in Kürze per WhatsApp. Bitte stellen Sie sicher, dass Ihr Telefon eingeschaltet ist.'
                            : 'Wir werden Sie in Kürze telefonisch kontaktieren, um Ihnen alle Informationen zu Ihrem Energieausweis mitzuteilen und Ihre Fragen zu beantworten.'}
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <span className="font-bold text-green-600">2</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 text-lg">Proberechnung prüfen</h3>
                        <p className="text-gray-600 mt-2">Nehmen Sie sich einen Moment Zeit, um unsere Proberechnung zu überprüfen und sich von unserem Angebot zu überzeugen.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <span className="font-bold text-green-600">3</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 text-lg">Bestellung auslösen</h3>
                        <p className="text-gray-600 mt-2">Wenn Sie mit unserer Proberechnung zufrieden sind, können Sie Ihren Energieausweis bequem online bestellen. Vergessen Sie nicht, den Rabattcode "MWSTGESCHENKT" einzulösen!</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mt-1">
                        <span className="font-bold text-green-600">4</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-800 text-lg">Von lokaler Expertise profitieren</h3>
                        <p className="text-gray-600 mt-2">Als lokaler Anbieter aus Bremen mit über 10 Jahren Erfahrung bieten wir Ihnen persönlichen Service und Bestpreis-Garantie für Ihren Premium Energiepass®.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* CTA Button */}
                <div className="mt-12">
                  <a 
                    href={`${getPaymentLink(buildingType)}${buildingType === 'house' ? '&' : '?'}prefilled_code=MWSTGESCHENKT`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 
                        bg-green-600 hover:bg-green-700 
                        text-white font-semibold text-lg
                        rounded-lg shadow-lg hover:shadow-xl
                        transform transition-all duration-300 hover:-translate-y-1">
                    <span>Jetzt Ihren Energieausweis bestellen</span>
                    <svg 
                      className="ml-2 w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust badges - Direkt unter dem Bestellbutton */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">100% Rechtssicher</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Bestpreis-Garantie</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Express 24h</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">Lokale Fachexperten</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neue Sektion: Kostenloser Datenaufnahmetermin */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">KOSTENLOSER SERVICE</span>
              <h2 className="text-3xl font-bold mb-4">
                Vereinbaren Sie einen kostenlosen<br/>Datenaufnahmetermin
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Für ein optimales Ergebnis Ihres Energieausweises bieten wir Ihnen einen persönlichen Datenaufnahmetermin an. Dieser macht den Prozess für Sie wesentlich einfacher und führt zu einem präziseren Ergebnis.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Vorteile des Termins */}
                <div className="p-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Ihre Vorteile eines persönlichen Termins:</h3>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Kein mühsames Zusammensuchen von technischen Daten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Höhere Genauigkeit durch Vor-Ort-Begehung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Persönliche Beratung zu Energieeffizienzmaßnahmen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Kostenlose Bewertung von Optimierungspotentialen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">In 9 von 10 Fällen erreichen wir eine bessere Energieeffizienzklasse. Expertenaugen sehen immer mehr!</span>
                    </li>
                  </ul>
                  
                  <p className="mt-8 text-sm text-gray-500 italic">
                    * Verfügbar in Bremen und Umgebung (bis 50 km)
                  </p>
                </div>
                
                {/* Terminvereinbarung */}
                <div className="bg-white p-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Termin-Hotline:</h3>
                  
                  <div className="mb-8">
                    <a 
                      href="tel:+4915206077767" 
                      className="flex items-center justify-center gap-3 py-5 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 font-semibold text-lg shadow-lg hover:shadow-xl w-full"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>0152 060 777 67</span>
                    </a>
                    <p className="text-center mt-3 text-gray-600">
                      Rufen Sie uns an und vereinbaren Sie<br/>einen kostenlosen Termin
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Unsere Service-Zeiten:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between">
                        <span>Montag - Freitag:</span>
                        <span className="font-medium">9:00 - 18:00 Uhr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samstag:</span>
                        <span className="font-medium">Nach Vereinbarung</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                      <p>Terminvereinbarung auch außerhalb der regulären Zeiten möglich</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Persönlicher Kontakt zu Stephan Grosser - Verbessert mit mehr Weißraum */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Bild und Info */}
                <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-10 relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-x-16 translate-y-16"></div>
                  
                  <div className="relative">
                    <h3 className="text-xl font-semibold mb-3 text-green-100">Direkter Kontakt</h3>
                    <h2 className="text-3xl font-bold mb-6">Stephan Grosser</h2>
                    <p className="text-lg mb-8">Gründer & Geschäftsführer<br/>Premium Energiepass® Online</p>
                    
                    <div className="flex items-center gap-5 mb-10">
                      <div className="w-28 h-28 rounded-full bg-white p-1.5 shadow-lg">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                          <Image 
                            src="/images/stephan-grosser.webp" 
                            alt="Stephan Grosser" 
                            width={112} 
                            height={112} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback für den Fall, dass das Bild nicht existiert
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block mb-2">Bremer Energieexperte</span>
                        <p className="text-sm opacity-90">Seit über 10 Jahren Ihre<br/>verlässliche Anlaufstelle</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:+4915206077767" className="hover:text-white hover:underline transition-colors">0152 060 777 67</a>
                      </p>
                      <p className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@premium-energiepass.online" className="hover:text-white hover:underline transition-colors">info@premium-energiepass.online</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-5">
                    Haben Sie Fragen oder brauchen Hilfe?
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Ich bin persönlich für Sie da und beantworte alle Ihre Fragen rund um Ihren Energieausweis. 
                    Als lokaler Anbieter setze ich auf direkte Kommunikation und individuellen Service.
                  </p>
                  
                  <div className="space-y-5">
                    <a 
                      href="tel:+4915206077767" 
                      className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Jetzt anrufen
                    </a>
                    
                    <a 
                      href="https://wa.me/4915206077767" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl transition-colors duration-300 font-semibold"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      WhatsApp schreiben
                    </a>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <span className="text-sm text-gray-500">Unsere Beratung ist kostenlos und unverbindlich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* PDF Modal */}
      {pdfData && (
        <PDFModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          dataUrl={pdfData.dataUrl}
          fullUrl={pdfData.fullUrl}
          formattedAddress={pdfData.formattedAddress}
        />
      )}
      
      <div className="container mx-auto px-4 py-4 text-center">
        <Link href="/" className="text-green-600 hover:text-green-800 text-sm">
          Zurück zur Startseite
        </Link>
      </div>
      
      <Footer />
    </main>
  )
} 