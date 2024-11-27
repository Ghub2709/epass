'use client'
import AddressForm from '@/components/AddressForm'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HeroInput() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-green-50 via-white to-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline and Trust Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              {/* Vorteile am Anfang */}
              <div className="flex flex-row gap-6 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Gratis Proberechnung</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-600">Express 24h</span>
                </div>
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Bestpreis-Garantie</span>
                </div>
              </div>

              {/* Main content */}
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-green-600">In 24 Stunden</span> zu
                  <span className="block mt-2">Ihrem</span>
                  <span className="block mt-2">Energieausweis</span>
                </h1>
                
                <h2 className="text-2xl text-gray-600 mt-8">
                  Bis zu <span className="text-green-600">40% günstiger</span> als beim lokalen Anbieter
                </h2>
                
                <p className="text-lg text-gray-600 mt-8">
                  Sparen Sie sich den Vor-Ort-Termin und erstellen Sie Ihren amtlich anerkannten Energieausweis komplett online. Starten Sie jetzt mit Ihrer kostenlosen Proberechnung oder werfen Sie einen Blick in unser Erklärvideo, beides lohnt sich.
                </p>

                {/* Video Button */}
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg 
                      className="w-6 h-6 text-green-600 transform group-hover:scale-110 transition-transform" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="font-medium">Erklärvideo ansehen</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <div className="mx-[10%] relative z-10">
              <AddressForm isHeroVariant={true} />
            </div>
          </div>
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
    </section>
  )
} 