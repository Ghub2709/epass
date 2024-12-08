'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const prices = [
    {
      title: "Einfamilienhaus",
      originalPrice: "497 €",
      currentPrice: "297 €",
      features: [
        "Bedarfsausweis",
        "Registrierung beim DIBt",
        "In 24 Std. bei Ihnen",
        "Rechtssicher & anerkannt"
      ],
      suffix: "inkl. MwSt.",
      popular: true,
      gradient: "from-green-400 to-primary-600",
      paymentLink: "https://buy.stripe.com/6oE4iIdtrfFC7Ty288?locale=de"
    },
    {
      title: "Mehrfamilienhaus bis 4 Wohneinheiten",
      originalPrice: "897 €",
      currentPrice: "497 €",
      features: [
        "Bester Bedarfsausweis",
        "Registrierung beim DIBt",
        "24h Express-Service",
        "Für bis zu 4 Wohneinheiten"
      ],
      suffix: "Paketpreis inkl. MwSt.",
      gradient: "from-blue-400 to-blue-600",
      paymentLink: "https://buy.stripe.com/fZeg1qgFDdxu0r6289?locale=de"
    },
    {
      title: "Mehrfamilienhaus über 4 Wohneinheiten",
      originalPrice: "1.497 €",
      currentPrice: "997 €",
      features: [
        "Individuelle Beratung",
        "Maßgeschneiderte Lösung",
        "Express-Service 24 Stunden",
        "Festpreis Bedarfsausweis"
      ],
      prefix: "",
      gradient: "from-orange-400 to-red-600",
      paymentLink: "https://buy.stripe.com/8wM16w753bpmb5K4gi?locale=de"
    },
    {
      title: "Nichtwohngebäude (NWG)",
      originalPrice: "1.997 €",
      currentPrice: "997 €",
      features: [
        "Alles aus einer Hand",
        "Maßgeschneiderte Lösung",
        "Express-Service inklusive",
        "Bestpreisgarantie"
      ],
      prefix: "",
      gradient: "from-purple-400 to-purple-600",
      paymentLink: "https://buy.stripe.com/5kA7uUexv8da8XCfZ1?locale=de"
    }
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing-section" className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Unsere Preise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparente Preise ohne versteckte Kosten
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {prices.map((price, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`
                bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full
                transform transition-all duration-500
                hover:-translate-y-2 hover:shadow-xl
                ${price.popular ? 'ring-2 ring-primary-500' : ''}
              `}>
                {price.popular && (
                  <div className={`bg-gradient-to-r ${price.gradient} text-white text-center py-2 text-sm font-medium`}>
                    Beliebteste Wahl
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-4">
                    {price.title}
                  </h3>
                  <div className="mb-6">
                    {price.originalPrice && (
                      <p className="text-gray-500 line-through text-lg">
                        {price.originalPrice}
                      </p>
                    )}
                    <p className={`text-4xl font-bold bg-gradient-to-r ${price.gradient} bg-clip-text text-transparent`}>
                      {price.prefix}{price.currentPrice}
                    </p>
                    {price.suffix && (
                      <p className="text-sm text-gray-600 mt-1">{price.suffix}</p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {price.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${price.gradient === 'from-green-400 to-primary-600' ? 'text-primary-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.a 
                    href={price.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    whileTap={{ y: 0 }}
                    className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${price.gradient} transition-all duration-300 hover:shadow-lg text-center block`}
                  >
                    Jetzt bestellen
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-gray-600"
        >
          <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>
          <p className="mt-2">Kostenlose Stornierung vor Bearbeitung möglich.</p>
        </motion.div>
      </div>
    </section>
  )
} 