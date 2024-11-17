'use client'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function ImpressumPage() {
  const scrollToForm = () => {
    window.location.href = '/#contact-form'
  }

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Impressum</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transparenz und Vertrauen sind die Basis unserer Geschäftsbeziehung
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* Company Details Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Angaben gemäß § 5 TMG</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Geschäftsadresse</h3>
                        <p className="text-gray-600">
                          Premium Energiepass® Online<br />
                          Im Hollergrund 175A<br />
                          28357 Bremen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Kontakt</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                        <a href="tel:015206077767" className="text-green-600 hover:text-green-700 transition-colors">
                          0152 060 777 67
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">WhatsApp</h3>
                        <a href="https://wa.me/4915206077767" className="text-green-600 hover:text-green-700 transition-colors">
                          0152 060 777 67
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">E-Mail</h3>
                        <a href="mailto:info@premium-energiepass.online" className="text-green-600 hover:text-green-700 transition-colors">
                          info@premium-energiepass.online
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Details Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Rechtliche Informationen</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Geschäftsführung</h3>
                      <p className="text-gray-600">Stephan Grosser</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Registereintrag</h3>
                      <p className="text-gray-600">
                        Amtsgericht Bremen<br />
                        Handelsregister: HRB XXXXX<br />
                        USt-IdNr.: DE XXX XXX XXX
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