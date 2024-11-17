'use client'
import { useState, useEffect } from 'react'

type FormStep = 'initial' | 'loading' | 'email'

export default function ContactForm() {
  const [formStep, setFormStep] = useState<FormStep>('initial')
  const [formData, setFormData] = useState({
    address: '',
    buildingYear: '',
    buildingType: 'house',
    email: ''
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (formStep === 'loading') {
      const duration = 5000 // 5 seconds
      const interval = 50 // update every 50ms
      const steps = duration / interval
      const increment = 100 / steps

      const timer = setInterval(() => {
        setProgress(prev => {
          const next = Math.min(prev + increment, 100)
          if (next >= 100) {
            clearInterval(timer)
            setTimeout(() => setFormStep('email'), 200) // Small delay after reaching 100%
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep('loading')
    setTimeout(() => setFormStep('email'), 5000)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  const formWrapper = "w-full max-w-2xl mx-auto my-16"

  if (formStep === 'loading') {
    return (
      <div className={formWrapper}>
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all">
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
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (formStep === 'email') {
    return (
      <div className={formWrapper}>
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-2xl -z-1"></div>
          
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

          <form onSubmit={handleEmailSubmit} className="space-y-6 relative z-10">
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
                placeholder="ihre@email.de"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 transition-all duration-300 hover:bg-primary-700 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative z-10 flex items-center gap-2">
                <span>Ja! Senden Sie mir jetzt meine Unterlagen zu</span>
                <svg 
                  className="w-5 h-5 transform transition-all duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </form>

          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-1"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-1"></div>
        </div>
      </div>
    )
  }

  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className={formWrapper}>
        <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-2xl -z-1"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-3">
              <svg className="w-8 h-8 text-primary-600 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ihre individuelle Proberechnung - Gratis!</h3>
            <p className="text-gray-600">Innerhalb weniger Sekunden berechnen wir Ihren Energieausweis zur Probe.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  id="address"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
                  placeholder="Straße, Hausnummer, PLZ, Ort"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="number"
                  id="buildingYear"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300"
                  placeholder="Baujahr, z.B. 1985"
                  value={formData.buildingYear}
                  onChange={(e) => setFormData({ ...formData, buildingYear: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="relative group">
                <select
                  id="buildingType"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 hover:border-primary-300 appearance-none bg-white cursor-pointer"
                  value={formData.buildingType}
                  onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                >
                  <option value="house">Einfamilienhaus</option>
                  <option value="apartment">Mehrfamilienhaus</option>
                  <option value="commercial">Gewerbeimmobilie</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 transition-colors duration-300 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 transition-all duration-300 hover:bg-primary-700 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative z-10 flex items-center gap-2">
                <span>Jetzt Proberechnung erstellen</span>
                <svg 
                  className="w-5 h-5 transform transition-all duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </form>

          <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-1"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 blur-xl transition-all duration-300 group-hover:scale-150 -z-1"></div>
        </div>
      </div>
    </section>
  )
} 