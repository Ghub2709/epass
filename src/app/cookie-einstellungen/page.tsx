'use client'
import { useState, useEffect } from 'react'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { useRouter } from 'next/navigation'

export default function CookieSettingsPage() {
  const router = useRouter()
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  })

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('cookieSettings')
    if (savedSettings) {
      setCookieSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSaveSettings = () => {
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings))
    window.location.reload()
  }

  const scrollToForm = () => {
    router.push('/#contact-form')
  }

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie-Einstellungen</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hier können Sie Ihre Cookie-Präferenzen verwalten
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* Information Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Über Cookies</h2>
                  <p className="text-gray-600 mb-4">
                    Cookies sind kleine Textdateien, die auf Ihrem Computer gespeichert werden und uns helfen, 
                    Ihre Nutzererfahrung zu verbessern. Sie können selbst entscheiden, welche Kategorien von 
                    Cookies Sie zulassen möchten.
                  </p>
                </div>

                {/* Settings Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Cookie-Einstellungen anpassen</h2>
                  <div className="space-y-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg">Notwendige Cookies</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Diese Cookies sind für die Grundfunktionen der Website erforderlich
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={cookieSettings.necessary}
                          disabled
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg">Analyse Cookies</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Helfen uns zu verstehen, wie Besucher mit der Website interagieren
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={cookieSettings.analytics}
                          onChange={(e) => setCookieSettings({
                            ...cookieSettings,
                            analytics: e.target.checked
                          })}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg">Marketing Cookies</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Werden verwendet, um Besuchern relevante Werbung anzuzeigen
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={cookieSettings.marketing}
                          onChange={(e) => setCookieSettings({
                            ...cookieSettings,
                            marketing: e.target.checked
                          })}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleSaveSettings}
                      className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      Einstellungen speichern
                    </button>
                  </div>
                </div>

                {/* Details Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Details zu unseren Cookies</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Notwendige Cookies</h3>
                      <p className="text-gray-600">
                        Diese Cookies sind für den Betrieb der Website unerlässlich. Hierzu gehören beispielsweise 
                        Cookies, die es Ihnen ermöglichen, sich in sichere Bereiche unserer Website einzuloggen oder 
                        den Warenkorb zu nutzen.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Analyse Cookies</h3>
                      <p className="text-gray-600">
                        Diese Cookies ermöglichen es uns, Besucherzahlen zu erfassen und zu erfahren, wie Besucher 
                        sich auf unserer Website bewegen. Dies hilft uns, die Funktionsweise der Website zu verbessern.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Marketing Cookies</h3>
                      <p className="text-gray-600">
                        Diese Cookies werden verwendet, um Werbung relevanter für Sie und Ihre Interessen zu gestalten. 
                        Sie werden auch verwendet, um die Häufigkeit der Anzeigen zu begrenzen und die Effektivität 
                        von Werbekampagnen zu messen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-b from-green-50 to-white p-8 rounded-2xl border border-green-100 shadow-sm text-center mt-12 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Bereit für Ihren Energieausweis?
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Starten Sie jetzt mit Ihrer kostenlosen Proberechnung und erhalten Sie Ihren Energieausweis innerhalb von 24 Stunden.
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Kostenlose Proberechnung starten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
} 