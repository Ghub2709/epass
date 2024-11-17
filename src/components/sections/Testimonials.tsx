'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    name: "Michael Schmidt",
    location: "München",
    text: "Super schneller Service! Innerhalb von 24 Stunden hatte ich meinen Energieausweis. Sehr zu empfehlen.",
    rating: 5,
    image: "/testimonials/person1.jpg" // Add actual image paths
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
  const [activeIndex, setActiveIndex] = useState(0)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-gray-600">
            Tausende zufriedene Kunden vertrauen unserem Service
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  {/* Add actual images later */}
                  <div className="w-full h-full bg-blue-600/20" />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600"
              >
                {testimonial.text}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">Zufriedene Kunden</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">24h</div>
              <div className="text-gray-600">Bearbeitungszeit</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Rechtssicher</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 