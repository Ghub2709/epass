'use client'
import { useState, useRef, useEffect } from 'react'

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Single video reference for both background and preview
  const videoUrl = "https://ghub2709.github.io/epass/videos/StephanGrosser.mp4"

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen">
      {/* Video Background with proper overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          loop
          className="w-full h-full object-cover"
        >
          <source src="/videos/StephanGrosser.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Improved overlay with better gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 max-w-6xl h-full">
          <div className="grid md:grid-cols-2 gap-20 items-center h-full">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center space-y-20">
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ⭐️ <span className="text-green-700 font-bold mx-1">4.9/5</span> von über 2.000 Kunden
                </span>
                <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  ✅ <span className="text-green-700 font-bold mx-1">50.000+</span> ausgestellte Ausweise
                </span>
              </div>

              <div className="space-y-12 text-center max-w-xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                  Energieausweis sofort online berechnen
                  <span className="block text-green-400 mt-8">100% amtlich anerkannt</span>
                </h1>
                
                <h2 className="text-xl text-gray-200 leading-relaxed">
                  Sparen Sie <span className="font-bold">Zeit und bis zu 40% Kosten</span> mit unserem Express-Service. 
                  Keine Vor-Ort-Termine nötig.
                </h2>

                {/* Price Comparison with improved visibility */}
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Lokaler Energieberater</p>
                      <p className="text-gray-500 line-through text-2xl">ab 497€</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 text-sm mb-1">Unser Online-Preis</p>
                      <p className="text-3xl font-bold text-green-600">ab 297€</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">inkl. MwSt. und DIBt-Registrierung</p>
                </div>
              </div>
            </div>

            {/* Right Column - Video Preview */}
            <div className="hidden md:flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                <div className="aspect-[9/16] w-[280px] rounded-xl overflow-hidden shadow-lg relative group">
                  {/* Video Controls */}
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-3 right-3 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  {/* Sound Hint */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {isMuted ? 'Ton aktivieren' : 'Ton deaktivieren'}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="font-semibold text-lg text-gray-800">Stephan Grosser</p>
                  <p className="text-gray-600">Gründer & Geschäftsführer</p>
                  <div className="flex items-center justify-center gap-1 text-green-600 text-sm mt-1">
                    <span>✓</span>
                    <p>Persönliche Beratungsgarantie</p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Proberechnung Anfordern
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 