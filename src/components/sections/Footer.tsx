'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Footer() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      {/* Logo und Kontaktinformationen */}
      <div className="container mx-auto px-4 mb-32">
        <div className="max-w-7xl mx-auto">
          <Image 
            src="/images/logo-white.svg" 
            alt="Premium Energiepass Online" 
            width={280}
            height={80}
            className="w-[80%] md:w-[35%] lg:w-[28%] mx-auto md:mx-0 mb-8"
          />
          
          <div className="space-y-4 mb-32">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@premium-energiepass.online</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>0152 060 777 67</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Chat</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Im Hollergrund 175A, 28357 Bremen</span>
            </div>
          </div>

          {/* Unterer Bereich mit Links - ohne Trenner aber mit Abstand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Unternehmen */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Unternehmen
              </h3>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => setIsVideoOpen(true)} 
                  className="text-left hover:text-white transition-colors"
                >
                  Über uns
                </button>
                <a href="#process-section" className="hover:text-white transition-colors">Team</a>
                <a href="#contact-section" className="hover:text-white transition-colors">Karriere</a>
                <a href="#contact-section" className="hover:text-white transition-colors">Partner werden</a>
              </div>
            </div>

            {/* Service */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Service
              </h3>
              <div className="flex flex-col space-y-2">
                <a href="#hero-input" className="hover:text-white transition-colors">Energieausweis beantragen</a>
                <a href="#pricing-section" className="hover:text-white transition-colors">Preise & Leistungen</a>
                <a href="#faq-section" className="hover:text-white transition-colors">Häufige Fragen</a>
                <a href="#contact-section" className="hover:text-white transition-colors">Kontakt</a>
              </div>
            </div>

            {/* Rechtliches */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                Rechtliches
              </h3>
              <div className="flex flex-col space-y-2">
                <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
                <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutzerklärung</a>
                <a href="/agb" className="hover:text-white transition-colors">AGB</a>
                <a href="/widerruf" className="hover:text-white transition-colors">Widerrufsbelehrung</a>
                <a href="/cookie-einstellungen" className="hover:text-white transition-colors">Cookie-Einstellungen</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright mit Trenner */}
      <div className="container mx-auto px-4 mt-32">
        <div className="max-w-7xl mx-auto text-center text-sm pt-16 mt-16 border-t border-gray-800">
          © 2024 Premium Energiepass® Online. Alle Rechte vorbehalten.
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-[540px] bg-black rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container mit 9:16 Aspect Ratio */}
            <div className="relative pt-[177.78%]">
              <video
                className="absolute inset-0 w-full h-full object-contain bg-black"
                controls
                autoPlay
                playsInline
                muted={false}
                preload="auto"
                onClick={(e) => e.stopPropagation()}
              >
                <source src="/videos/StephanGrosser.mp4" type="video/mp4" />
                Ihr Browser unterstützt keine Videos.
              </video>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
} 