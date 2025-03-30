'use client'
import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: React.ReactNode
}

export default function OptimizedFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "Warum kostet ein Energieausweis so viel? Gibt es günstigere Alternativen?",
      answer: (
        <div className="space-y-4">
          <p>Der Preis eines Energieausweises setzt sich aus mehreren Faktoren zusammen:</p>
          <ul className="list-decimal pl-5 space-y-2">
            <li><strong>Fachexpertise:</strong> Unsere Ausweise werden von qualifizierten Experten mit lokaler Bremer Marktkenntnis erstellt</li>
            <li><strong>Behördliche Registrierung:</strong> Jeder Ausweis wird offiziell beim DIBt registriert (gesetzlich vorgeschrieben)</li>
            <li><strong>Haftung und Versicherung:</strong> Wir übernehmen die volle Verantwortung für die Rechtssicherheit</li>
            <li><strong>Persönlicher Service:</strong> Unser Vor-Ort-Service unterscheidet uns von anonymen Online-Anbietern</li>
          </ul>
          <p>Während es scheinbar günstigere Angebote gibt, fehlt dort oft die persönliche Beratung oder lokale Expertise. Durch unsere Bestpreis-Garantie erhalten Sie bei uns immer das beste Preis-Leistungs-Verhältnis. Zudem sparen Sie aktuell die komplette Mehrwertsteuer (19%), was den Preis deutlich senkt.</p>
          <p>Bedenken Sie auch: Ein rechtssicherer Energieausweis vermeidet teure Bußgelder (bis zu 15.000€) und kann bei Verkauf oder Vermietung den Wert Ihrer Immobilie steigern.</p>
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Jetzt unverbindliche Proberechnung anfordern</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )
    },
    {
      question: "Wann benötige ich einen Energieausweis und was passiert, wenn ich keinen habe?",
      answer: (
        <div className="space-y-4">
          <p>Ein Energieausweis ist gesetzlich vorgeschrieben in folgenden Situationen:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bei <strong>Verkauf einer Immobilie:</strong> Muss bereits in Immobilienanzeigen angegeben werden</li>
            <li>Bei <strong>Vermietung:</strong> Muss potenziellen Mietern vorgelegt werden</li>
            <li>Bei <strong>Neubau oder umfassender Sanierung:</strong> Teil der Bauunterlagen</li>
          </ul>
          <p>Das Fehlen eines gültigen Energieausweises kann folgende Konsequenzen haben:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rechtliche Risiken:</strong> Bußgelder bis zu 15.000€ sind möglich</li>
            <li><strong>Verzögerung bei Verkauf/Vermietung:</strong> Immobilienportale akzeptieren Anzeigen ohne Energiekennwerte oft nicht mehr</li>
            <li><strong>Preisabschläge:</strong> Potenzielle Käufer/Mieter könnten Preisminderungen fordern oder vom Kauf zurücktreten</li>
            <li><strong>Nachträgliche Forderungen:</strong> Käufer können nachträglich Schadensersatzansprüche geltend machen</li>
          </ul>
          <p>Als Bremer Experten prüfen wir für Sie kostenlos und unverbindlich, ob für Ihre Immobilie ein Energieausweis erforderlich ist. Rufen Sie uns einfach an: <a href="tel:+4915206077767" className="text-green-600 hover:underline">0152 060 777 67</a> oder fordern Sie Ihre Proberechnung an.</p>
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Kostenlose Proberechnung starten</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )
    },
    {
      question: "Welche Unterlagen benötige ich für die Ausstellung eines Energieausweises?",
      answer: (
        <div className="space-y-4">
          <p>Für die Grundberechnung Ihres Energieausweises benötigen wir nur minimale Angaben:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Adresse</strong> der Immobilie</li>
            <li><strong>Baujahr</strong> des Gebäudes</li>
            <li><strong>Gebäudetyp</strong> (Einfamilienhaus, Mehrfamilienhaus, etc.)</li>
          </ul>
          <p>Für ein optimales Ergebnis sind folgende Unterlagen hilfreich, aber nicht zwingend erforderlich:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Baupläne</li>
            <li>Informationen zur Heizungsanlage</li>
            <li>Daten zu Dämmung und Fenstern</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-4">
            <p className="font-semibold text-green-800">Das Besondere an unserem Service:</p>
            <p className="mt-2">Als einziger Anbieter in Bremen bieten wir einen kostenlosen Vor-Ort-Service an! Unser Experte kommt zu Ihnen und erhebt alle notwendigen Daten direkt vor Ort – Sie müssen sich um nichts kümmern. Dies hat zwei entscheidende Vorteile:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li><strong>Kein Papierkram für Sie:</strong> Wir übernehmen die komplette Datenerhebung</li>
              <li><strong>Besseres Ergebnis:</strong> Durch die präzise Vor-Ort-Aufnahme erreichen wir in 99,7% der Fälle ein besseres Ergebnis für Ihren Energieausweis</li>
            </ol>
          </div>
          <p>Starten Sie einfach mit der kostenlosen Proberechnung oder rufen Sie uns an: <a href="tel:+4915206077767" className="text-green-600 hover:underline">0152 060 777 67</a>, um einen Termin für die Datenaufnahme zu vereinbaren.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Proberechnung anfordern</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <a 
              href="tel:+4915206077767"
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Termin vereinbaren</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      )
    },
    {
      question: "Ist der online erstellte Energieausweis rechtsgültig und amtlich anerkannt?",
      answer: (
        <div className="space-y-4">
          <p>Ja, unser Energieausweis ist zu 100% rechtsgültig und amtlich anerkannt:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Offizielle Registrierung:</strong> Jeder Ausweis wird beim Deutschen Institut für Bautechnik (DIBt) registriert</li>
            <li><strong>Ausstellerberechtigung:</strong> Unsere Ausweise werden von zertifizierten Energieberatern erstellt, die beim DIBt registriert sind</li>
            <li><strong>Rechtsgrundlage:</strong> Erfüllt alle Anforderungen des Gebäudeenergiegesetzes (GEG)</li>
            <li><strong>TÜV-geprüft:</strong> Unser Qualitätsmanagement ist nach ISO 9001 zertifiziert</li>
          </ul>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-4">
            <p className="font-semibold text-green-800">Der Unterschied unseres Angebots zu anonymen Online-Portalen:</p>
            <p className="mt-2">Wir kombinieren die Effizienz digitaler Prozesse mit der Sicherheit eines lokalen, persönlichen Dienstleisters aus Bremen. Sie erhalten also:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Die <strong>Schnelligkeit</strong> eines Online-Prozesses (24h Express-Service)</li>
              <li>Die <strong>Rechtssicherheit</strong> eines offiziell registrierten Ausweises</li>
              <li>Den <strong>persönlichen Service</strong> eines lokalen Bremer Anbieters</li>
            </ul>
          </div>
          <p>Wir übernehmen die volle Verantwortung für die Rechtssicherheit Ihres Energieausweises. Bei über 50.000 ausgestellten Ausweisen hatten wir noch nie einen Fall, in dem ein Ausweis nicht anerkannt wurde.</p>
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Jetzt rechtssicheren Energieausweis anfordern</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )
    },
    {
      question: "Wie läuft der Prozess ab und wie viel Zeit muss ich investieren?",
      answer: (
        <div className="space-y-4">
          <p className="font-medium">Unser Prozess ist bewusst einfach und zeiteffizient gestaltet:</p>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 mb-3">Für Sie als Kunde sind nur wenige Minuten Aufwand nötig:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Proberechnung anfordern (2 Minuten):</strong> Geben Sie nur Adresse, Baujahr und Gebäudetyp ein</li>
              <li><strong>Proberechnung prüfen (1 Minute):</strong> Werfen Sie einen Blick auf unsere unverbindliche Berechnung</li>
              <li><strong>Bestellung auslösen (2 Minuten):</strong> Bei Zufriedenheit bestellen Sie online mit wenigen Klicks</li>
            </ol>
          </div>
          <p>Danach haben Sie zwei Optionen:</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800">Express ohne Termin</h4>
              <p className="mt-2 text-gray-600">Sie erhalten Ihren Energieausweis innerhalb von 24 Stunden digital</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800">Premium mit Vor-Ort-Termin</h4>
              <p className="mt-2 text-gray-600">Unser Experte kommt zu Ihnen und nimmt alle Daten auf (empfohlen für ein besseres Ergebnis)</p>
            </div>
          </div>
          <p><strong>Der Zeitaufwand für Sie beträgt maximal 5 Minuten</strong> bei der Express-Variante. Bei der Premium-Variante mit Vor-Ort-Termin kommt nur die Zeit für den Termin hinzu (ca. 45-60 Minuten).</p>
          <p>Im Gegensatz zu anderen Anbietern müssen Sie keine komplexen Formulare ausfüllen oder technische Details recherchieren. Wir haben den Prozess so gestaltet, dass er für Sie so einfach und zeitsparend wie möglich ist.</p>
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              <span>Jetzt in 2 Minuten Proberechnung starten</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )
    }
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq-section" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Häufige Fragen zu Ihrem Energieausweis
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Wir haben die wichtigsten Fragen unserer Kunden übersichtlich beantwortet, damit Sie bestens informiert sind
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  openIndex === index ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 py-6 bg-white border-t border-gray-100 text-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto bg-green-50 p-8 rounded-xl border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Andere Fragen zu Ihrem Energieausweis?
            </h3>
            <p className="text-gray-600 mb-8">
              Unsere Bremer Energieexperten stehen Ihnen gerne persönlich zur Verfügung und beraten Sie zu Ihrem individuellen Fall.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4915206077767"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0152 060 777 67</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 