'use client'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function AGBPage() {
  const scrollToForm = () => {
    window.location.href = '/#contact-form';
  }

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Allgemeine Geschäftsbedingungen</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transparente Regelungen für eine vertrauensvolle Zusammenarbeit
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* Scope Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§1 Geltungsbereich</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend "AGB") gelten für alle Verträge zwischen Premium Energiepass® Online (nachfolgend "Anbieter") und dem Kunden (nachfolgend "Auftraggeber") über die Erstellung von Energieausweisen.
                    </p>
                    <p className="text-gray-600">
                      (2) Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
                    </p>
                  </div>
                </div>

                {/* Services Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§2 Leistungsbeschreibung</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Der Anbieter erstellt Energieausweise gemäß den Vorgaben der Energieeinsparverordnung (EnEV) bzw. des Gebäudeenergiegesetzes (GEG).
                    </p>
                    <p className="text-gray-600">
                      (2) Die Erstellung erfolgt auf Grundlage der vom Auftraggeber bereitgestellten Informationen und Unterlagen.
                    </p>
                    <p className="text-gray-600">
                      (3) Der Energieausweis wird nach Fertigstellung in digitaler Form als PDF-Dokument zur Verfügung gestellt.
                    </p>
                  </div>
                </div>

                {/* Customer Obligations Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§3 Mitwirkungspflichten des Auftraggebers</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Der Auftraggeber ist verpflichtet, alle für die Erstellung des Energieausweises erforderlichen Unterlagen und Informationen vollständig und wahrheitsgemäß zur Verfügung zu stellen.
                    </p>
                    <p className="text-gray-600">
                      (2) Der Auftraggeber versichert, zur Beauftragung berechtigt zu sein.
                    </p>
                  </div>
                </div>

                {/* Prices and Payment Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§4 Preise und Zahlung</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
                    </p>
                    <p className="text-gray-600">
                      (2) Die Zahlung erfolgt per Vorkasse durch die angebotenen Zahlungsmethoden.
                    </p>
                  </div>
                </div>

                {/* Delivery and Processing Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§5 Lieferung und Bearbeitung</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Die Bearbeitungszeit beträgt in der Regel 24 Stunden nach Eingang aller erforderlichen Unterlagen und der Zahlung.
                    </p>
                    <p className="text-gray-600">
                      (2) Der fertige Energieausweis wird per E-Mail zugestellt.
                    </p>
                  </div>
                </div>

                {/* Warranty and Liability Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§6 Gewährleistung und Haftung</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Der Anbieter haftet für Schäden nur bei Vorsatz oder grober Fahrlässigkeit.
                    </p>
                    <p className="text-gray-600">
                      (2) Die Haftung ist auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
                    </p>
                  </div>
                </div>

                {/* Final Provisions Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">§7 Schlussbestimmungen</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      (1) Es gilt das Recht der Bundesrepublik Deutschland.
                    </p>
                    <p className="text-gray-600">
                      (2) Gerichtsstand ist Bremen, soweit der Auftraggeber Kaufmann ist.
                    </p>
                    <p className="text-gray-600">
                      (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                    </p>
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