'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getAssetPath } from '@/lib/utils'

export default function HeroInput() {
  const [formStep, setFormStep] = useState<'initial' | 'loading' | 'email'>('initial')
  const [formData, setFormData] = useState({
    address: '',
    buildingYear: '',
    buildingType: 'house',
    email: ''
  })
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep('loading')
    setTimeout(() => setFormStep('email'), 5000)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

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
            Wir prüfen Ihre Eingaben, einen kleinen Moment Geduld bitte...
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
              Geben Sie Ihre E-Mail ein und erhalten Sie in den nächsten 2 Stunden Ihre Proberechnung plus ein exklusives Energieausweis-Angebot.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="ihre@email.de"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <span>Ja! Senden Sie mir jetzt meine Unterlagen zu</span>
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Straße, Hausnummer, PLZ, Ort"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="relative">
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear()}
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Baujahr, z.B. 1985"
                value={formData.buildingYear}
                onChange={(e) => setFormData({ ...formData, buildingYear: e.target.value })}
              />
            </div>

            <div className="relative">
              <select
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.buildingType}
                onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
              >
                <option value="house">Einfamilienhaus</option>
                <option value="apartment">Mehrfamilienhaus</option>
                <option value="commercial">Gewerbeimmobilie</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            <span>Jetzt Proberechnung erstellen</span>
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    )
  }

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
              {/* Trust Badges with more space */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-green-100 flex items-center">
                  ⭐️ <span className="text-green-700 font-bold mx-1">4.9/5</span> von über 2.000 Kunden
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-green-100 flex items-center">
                  ✓ <span className="text-green-700 font-bold mx-1">50.000+</span> ausgestellte Ausweise
                </span>
              </div>

              {/* Main content with increased spacing */}
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="text-green-600">In 24 Stunden</span> zu
                  <span className="block mt-6">Ihrem</span>
                  <span className="block mt-6">Energieausweis</span>
                </h1>
                
                <h2 className="text-2xl text-gray-600 mt-8">
                  Bis zu <span className="text-green-600">40% günstiger</span> als beim lokalen Anbieter
                </h2>
                
                <p className="text-lg text-gray-600 mt-8">
                  Sparen Sie sich den Vor-Ort-Termin und erstellen Sie Ihren amtlich anerkannten Energieausweis komplett online.
                </p>
              </div>

              {/* Trust Badges with more top margin */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <span className="text-green-600 text-2xl font-bold block mb-1">✓</span>
                  <span className="text-sm font-medium">TÜV-geprüft</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <span className="text-green-600 text-2xl font-bold block mb-1">⚡</span>
                  <span className="text-sm font-medium">Express in 24h</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <span className="text-green-600 text-2xl font-bold block mb-1">€</span>
                  <span className="text-sm font-medium">Bestpreis-Garantie</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <div className="mx-[10%]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Progress Bar - Modified to cap at 96% for email step */}
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
                  {renderFormContent()}
                </div>

                {/* Social Proof */}
                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">127 Personen</span> haben heute bereits bestellt
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 