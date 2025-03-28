'use client'
import AddressForm from '@/components/AddressForm'
import { motion } from 'framer-motion'

export default function HeroInput() {
  return (
    <section id="hero-input" className="relative bg-gradient-to-b from-green-50 via-white to-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
            {/* Left Column - Headline and Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12 text-left lg:text-left"
            >
              {/* Vorteile am Anfang - zentriert auf Mobile */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <div className="flex items-center gap-3 whitespace-normal">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Gratis Proberechnung</span>
                </div>
                <div className="flex items-center gap-3 whitespace-normal">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-600">Express 24h</span>
                </div>
                <div className="flex items-center gap-3 whitespace-normal">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Bestpreis-Garantie</span>
                </div>
              </div>

              {/* Main content - zentriert auf Mobile */}
              <div className="space-y-8 text-center lg:text-left relative">
                {/* Dekorative Elemente im Hintergrund */}
                <div className="absolute -top-12 -left-12 w-36 h-36 bg-green-100 rounded-full opacity-40 blur-3xl -z-10"></div>
                <div className="absolute top-1/3 -right-8 w-24 h-24 bg-blue-100 rounded-full opacity-30 blur-2xl -z-10"></div>

                {/* Haupttitel mit Split-Design */}
                <div className="relative">
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    <span className="block relative">Bremer</span>
                    <span className="block relative">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800 animate-gradient-x">Energieausweis-Express</span>
                    </span>
                  </h1>
                </div>
                
                {/* Untertitel mit moderner Darstellung */}
                <div className="mt-8 flex items-center justify-center lg:justify-start">
                  <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-green-500"></div>
                  <h2 className="mx-4 text-2xl font-semibold text-gray-800 tracking-wider">
                    <span className="text-green-600">Lokal.</span> <span className="text-gray-700">Persönlich.</span> <span className="text-green-700">Digital.</span>
                  </h2>
                  <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-green-500"></div>
                </div>
                
                {/* Hauptinhalt ohne Box */}
                <div className="mt-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Ihr Energieausweis von <span className="font-semibold text-green-600">echten Bremer Experten</span> – nicht von anonymen Online-Portalen. Genießen Sie die Vorteile eines lokalen Anbieters mit digitaler Effizienz:
                  </p>
                  
                  {/* Feature List statt Grid */}
                  <ul className="mt-6 space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Schnelle Erstellung - 24 Stunden</span>
                    </li>
                    
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Persönliche Beratung - kostenlos inklusive</span>
                    </li>
                    
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-800">Vor-Ort-Service - exklusiv für Bremer und Bremerinnen</span>
                    </li>
                  </ul>
                  
                  {/* CTA Button */}
                  <div className="mt-8">
                    <button 
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center justify-center px-8 py-4 
                        bg-green-600 hover:bg-green-700 
                        text-white font-semibold text-lg
                        rounded-lg shadow-lg hover:shadow-xl
                        transform transition-all duration-300 hover:-translate-y-1"
                    >
                      <span>Proberechnung Sofort Starten</span>
                      <svg 
                        className="ml-2 w-5 h-5 animate-pulse" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <div className="w-full lg:mx-[10%] relative z-10">
              <AddressForm isHeroVariant={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 