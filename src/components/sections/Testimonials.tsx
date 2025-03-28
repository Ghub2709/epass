'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: "Michael Schmidt",
    location: "München",
    text: "Super schneller Service! Innerhalb von 24 Stunden hatte ich meinen Energieausweis. Sehr zu empfehlen.",
    rating: 5,
    image: "/testimonials/person1.jpg"
  },
  {
    name: "Sandra Weber",
    location: "Hamburg",
    text: "Unkompliziert und professionell. Der gesamte Prozess war einfach und transparent.",
    rating: 5,
    image: "/testimonials/person2.jpg"
  },
  {
    name: "Thomas Müller",
    location: "Berlin",
    text: "Faire Preise und kompetente Beratung. Kann ich nur weiterempfehlen!",
    rating: 5,
    image: "/testimonials/person3.jpg"
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="bg-white px-6 py-3 rounded-full text-lg font-medium shadow-sm border border-green-100 flex items-center">
              ⭐️ <span className="text-green-700 font-bold mx-1">4.9/5</span> von über 2.000 Kunden
            </span>
            <span className="bg-white px-6 py-3 rounded-full text-lg font-medium shadow-sm border border-green-100 flex items-center">
              ✓ <span className="text-green-700 font-bold mx-1">50.000+</span> ausgestellte Ausweise
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center mb-4">
            Warum über 50.000 Kunden uns vertrauen
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Schnell, einfach und kostengünstig zum rechtssicheren Energieausweis
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                GARANTIERT
              </div>
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Express in 24 Stunden</h3>
              <p className="text-gray-600">Garantierte Ausstellung innerhalb eines Werktages</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                AMTLICH
              </div>
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Rechtssicher</h3>
              <p className="text-gray-600">Offiziell beim DIBt registriert und anerkannt</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                SPARPREIS
              </div>
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Die Mehrwertsteuer gespart</h3>
              <p className="text-gray-600">Bei Online Bestellung sparen Sie 19% - garantiert!</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                ZEITSPAREND
              </div>
              <div className="text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Das Beste aus beiden Welten</h3>
              <p className="text-gray-600">Online Erstellung wo möglich, Vor-Ort Service wo nötig.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 