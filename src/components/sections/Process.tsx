'use client'
import { useState, useRef } from 'react'
import { getAssetPath } from '@/lib/utils'

export default function Process() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      number: "1",
      title: "Daten eingeben",
      description: "Geben Sie die grundlegenden Informationen zu Ihrer Immobilie ein: Adresse, Baujahr und Gebäudetyp",
      icon: "📝"
    },
    {
      number: "2",
      title: "Gratis Probeberechnung prüfen",
      description: "Wir erstellen eine kostenlose Proberechnung für Sie und senden diese per E-Mail oder WhatsApp zu",
      icon: "📊"
    },
    {
      number: "3",
      title: "Bestellen und Bezahlen",
      description: "Bei Zufriedenheit können Sie direkt online bestellen und bezahlen - sicher und unkompliziert",
      icon: "💳"
    },
    {
      number: "4",
      title: "Energieausweis erhalten",
      description: "Sie erhalten Ihren bereits beim DIBt registrierten Energieausweis innerhalb von 24 Stunden per E-Mail oder WhatsApp",
      icon: "📨"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            So einfach geht's
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            In nur wenigen Schritten zu Ihrem rechtssicheren Energieausweis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Steps */}
          <div>
            <div className="grid gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-[calc(100%+2rem)] bg-green-200" />
                    )}
                  </div>
                  <div>
                    <div className="text-4xl mb-2">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={scrollToForm}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Kostenlose Proberechnung Anfordern
              </button>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative aspect-[9/16] w-full max-w-[400px] mx-auto rounded-xl overflow-hidden shadow-xl">
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40">
                <button
                  onClick={handleVideoClick}
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
                  <span className="font-medium">Video abspielen</span>
                </button>
              </div>
            )}
            
            <video
              ref={videoRef}
              loop
              playsInline
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleVideoClick}
            >
              <source src={getAssetPath('videos/LisaMeyerdierks.mp4')} type="video/mp4" />
            </video>

            {/* Play/Pause Overlay - nur sichtbar wenn Video spielt */}
            {isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 cursor-pointer"
                onClick={handleVideoClick}
              >
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg 
                    className="w-16 h-16 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={toggleMute}
                className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
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
            </div>

            {/* Sound Hint */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {isMuted ? 'Ton aktivieren' : 'Ton deaktivieren'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 