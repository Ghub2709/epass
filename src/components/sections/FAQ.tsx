'use client'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "Was ist ein Energieausweis und wofür brauche ich ihn?",
      answer: "Ein Energieausweis ist ein gesetzlich vorgeschriebenes Dokument, das die energetische Qualität eines Gebäudes bewertet. Er ist verpflichtend beim Verkauf oder der Vermietung von Immobilien und gibt Auskunft über den Energieverbrauch bzw. den Energiebedarf des Gebäudes."
    },
    {
      question: "Wie lange ist der Energieausweis gültig?",
      answer: "Der Energieausweis hat eine Gültigkeit von 10 Jahren ab dem Ausstellungsdatum. Nach Ablauf dieser Frist muss ein neuer Energieausweis erstellt werden."
    },
    {
      question: "Welche Unterlagen benötige ich für die Ausstellung?",
      answer: "Für die Ausstellung benötigen wir lediglich die Adresse des Gebäudes, das Baujahr und die Art des Objektes. Nach der Bestellung benötigen wir lediglich 2 Bilder von Ihnen und das Baujahr Ihrer Heizungsanlage. Alle weiteren erforderlichen Informationen ermitteln wir für Sie."
    },
    {
      question: "Verbrauchs- oder Bedarfsausweis - welcher ist der Richtige für mich?",
      answer: "Die Wahl hängt von verschiedenen Faktoren ab. Allerdings stellen wir ausschließlich Bedarfsausweise aus. Diese haben die höchstmögliche Qualität und geben tatsächlich Auskunft über die energetische Beschaffenheit des Gebäudes. Einzige Ausnahme von dieser Verfahrensweise stellen die Nichtwohngebäude dar, da hier unverhältnismäßig hohe Aufwände und Kosten zur Erstellung eines Bedarfsausweises entstehen."
    },
    {
      question: "Wie schnell erhalte ich meinen Energieausweis?",
      answer: "Mit unserem Express-Service erhalten Sie Ihren Energieausweis innerhalb von 24 Stunden nach Bereitstellung aller erforderlichen Unterlagen. Die Registrierung beim DIBt erfolgt dabei automatisch am gleichen Tag."
    },
    {
      question: "Ist der online erstellte Energieausweis rechtsgültig?",
      answer: "Ja, absolut. Unser Energieausweis wird von zertifizierten Energieberatern erstellt und ist beim Deutschen Institut für Bautechnik (DIBt) registriert. Er erfüllt alle gesetzlichen Anforderungen und ist bundesweit anerkannt."
    }
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Häufig gestellte Fragen
          </h2>
          <p className="text-gray-600 mb-8">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Energieausweis
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
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
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Energieausweis Berechnung Gratis Erhalten
          </button>
        </div>
      </div>
    </section>
  )
} 