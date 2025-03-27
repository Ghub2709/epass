'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayButton = () => {
    setIsVideoOpen(true)
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('hero-input');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl -z-10 transform translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="text-green-600">Sehen Sie </span> 
                <span className="relative">
                  wie einfach
                  <span className="absolute bottom-0 left-0 right-0 h-3 bg-green-100 -z-10 transform -rotate-1"></span>
                </span>
                <span> es wirklich ist!</span>
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Unser kurzes Video zeigt Ihnen, wie Sie in nur wenigen Minuten Ihren gesetzlich vorgeschriebenen Energieausweis online erhalten können - ganz ohne komplizierte Formulare oder Vor-Ort-Termine.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Schnelle Bearbeitung</span>
                  </div>
                  <div className="flex items-center gap-3 text-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>100% amtlich anerkannt</span>
                  </div>
                </div>
                
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Jetzt Energieausweis beantragen
                  <svg className="w-5 h-5 ml-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Video Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative aspect-[9/16] w-full max-w-[380px] rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="absolute inset-0 overflow-hidden cursor-pointer z-10"
                  onClick={handlePlayButton}
                >
                  {/* Video Vorschaubild - StephanGrosser.mp4 als Video */}
                  <video
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                  >
                    <source src="/videos/StephanGrosser.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Play Button - nur einen zentralen Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Der Text wurde entfernt */}
                  </div>
                  
                  {/* Zentraler Play Button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-green-600 ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Audio Mute Button */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
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
                ref={videoRef}
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