'use client'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function DatenschutzPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Datenschutzerklärung</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Der Schutz Ihrer Daten hat für uns höchste Priorität
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* Overview Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">1. Datenschutz auf einen Blick</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Verantwortliche Stelle</h3>
                      <p className="text-gray-600">
                        Premium Energiepass® Online<br />
                        Im Hollergrund 175A<br />
                        28357 Bremen<br />
                        Deutschland
                      </p>
                      <p className="text-gray-600 mt-4">
                        Vertreten durch: Stephan Grosser<br />
                        Telefon: 0152 060 777 67<br />
                        E-Mail: info@premium-energiepass.online
                      </p>
                    </div>
                  </div>
                </div>

                {/* Data Collection Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">2. Erhebung und Verarbeitung von Daten</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Arten der verarbeiteten Daten</h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                        <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
                        <li>Gebäudedaten (z.B. Adresse, Baujahr, Energieverbrauch)</li>
                        <li>Vertragsdaten (z.B. Vertragsgegenstand, Laufzeit)</li>
                        <li>Zahlungsdaten (z.B. Bankverbindung, Zahlungshistorie)</li>
                        <li>Nutzungsdaten (z.B. Zugriffszeiten, besuchte Websites)</li>
                        <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Purpose Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">3. Zweck der Datenverarbeitung</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">Wir verarbeiten Ihre personenbezogenen Daten für folgende Zwecke:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Erstellung und Ausstellung von Energieausweisen</li>
                      <li>Bereitstellung unserer Online-Dienste und Website-Funktionen</li>
                      <li>Kundenbetreuung und Kommunikation</li>
                      <li>Vertragsabwicklung und Rechnungsstellung</li>
                      <li>Marketing und Newsletterversand (nur mit Ihrer Einwilligung)</li>
                      <li>Verbesserung unserer Dienstleistungen</li>
                      <li>Erfüllung gesetzlicher Verpflichtungen</li>
                    </ul>
                  </div>
                </div>

                {/* Cookie Usage Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">4. Verwendung von Cookies</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Unsere Website verwendet Cookies, um Ihnen ein optimales Nutzungserlebnis zu bieten. 
                      Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. 
                      Wir nutzen sowohl technisch notwendige Cookies als auch optionale Analyse-Cookies.
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Folgende Cookies werden verwendet:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Technisch notwendige Cookies für die Grundfunktionen</li>
                        <li>Analyse-Cookies zur Verbesserung unserer Website (optional)</li>
                        <li>Marketing-Cookies für personalisierte Inhalte (optional)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Rights Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">5. Ihre Rechte</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">Nach der DSGVO stehen Ihnen folgende Rechte zu:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                      <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                      <li>Recht auf Berichtigung unrichtiger Daten</li>
                      <li>Recht auf Löschung Ihrer Daten ("Recht auf Vergessenwerden")</li>
                      <li>Recht auf Einschränkung der Datenverarbeitung</li>
                      <li>Recht auf Datenübertragbarkeit</li>
                      <li>Widerspruchsrecht gegen bestimmte Datenverarbeitungen</li>
                      <li>Recht auf Widerruf erteilter Einwilligungen</li>
                    </ul>
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