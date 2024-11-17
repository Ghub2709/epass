'use client'
import Link from 'next/link'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function WiderrufPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Widerrufsbelehrung</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Informationen zu Ihrem Widerrufsrecht bei Premium Energiepass® Online
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {/* Right of Withdrawal Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Widerrufsrecht</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                    </p>
                    <p className="text-gray-600">
                      Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600">
                        Premium Energiepass® Online<br />
                        Im Hollergrund 175A<br />
                        28357 Bremen<br />
                        E-Mail: info@premium-energiepass.online<br />
                        Telefon: 0152 060 777 67
                      </p>
                    </div>
                    <p className="text-gray-600">
                      mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
                    </p>
                  </div>
                </div>

                {/* Consequences Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Folgen des Widerrufs</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                    </p>
                    <p className="text-gray-600">
                      Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
                    </p>
                  </div>
                </div>

                {/* Special Notes Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Besondere Hinweise</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
                    </p>
                  </div>
                </div>

                {/* Sample Form Card */}
                <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-6">Muster-Widerrufsformular</h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 italic">
                      (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                      <p className="text-gray-600">
                        An<br />
                        Premium Energiepass® Online<br />
                        Im Hollergrund 175A<br />
                        28357 Bremen<br />
                        E-Mail: info@premium-energiepass.online
                      </p>
                      <p className="text-gray-600">
                        Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:
                      </p>
                      <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                        <li>Bestellt am (*)/erhalten am (*)</li>
                        <li>Name des/der Verbraucher(s)</li>
                        <li>Anschrift des/der Verbraucher(s)</li>
                        <li>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
                        <li>Datum</li>
                      </ul>
                      <p className="text-gray-600 italic">
                        (*) Unzutreffendes streichen
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