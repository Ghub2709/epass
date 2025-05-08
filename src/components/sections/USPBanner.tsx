'use client'

import { motion } from 'framer-motion'

export default function USPBanner() {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-green-50 rounded-2xl shadow-lg border border-green-100 overflow-hidden"
        >
          <div className="px-6 py-10 md:px-10 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
              Das Besondere an unserem Service:
            </h2>
            
            <div className="text-gray-700 text-lg leading-relaxed space-y-8">
              <p>
                Als einziger Anbieter in Bremen und im Umkreis von 50km bieten wir einen kostenlosen Vor-Ort-Service an! Unser Experte kommt 
                zu Ihnen und erhebt alle notwendigen Daten direkt vor Ort – Sie müssen sich um nichts kümmern. Dies 
                hat entscheidende Vorteile:
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center text-green-800 font-bold mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 text-xl">Kein Papierkram für Sie:</span>
                    <span className="ml-2">Wir übernehmen die komplette Datenerhebung, Sie müssen nur die Haustür öffnen.</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center text-green-800 font-bold mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 text-xl">Besseres Ergebnis:</span>
                    <span className="ml-2">Durch die präzise Vor-Ort-Aufnahme erreichen wir in 9 von 10 Fällen ein 
                    besseres Ergebnis für Ihren Energieausweis.</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full h-8 w-8 flex items-center justify-center text-green-800 font-bold mt-0.5 flex-shrink-0">
                    3
                  </div>
                  <div className="relative">
                    <span className="font-bold text-gray-800 text-xl">19% MwSt. geschenkt:</span>
                    <span className="ml-2">Aktuell sparen Sie die komplette Mehrwertsteuer! Sichern Sie sich jetzt diesen zeitlich begrenzten Vorteil für Ihren Energieausweis.</span>
                    <div className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full transform rotate-12 shadow-md">
                      AKTUELL
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-center md:justify-end">
              <a 
                href="#contact-form" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors duration-300 transform hover:scale-105 inline-flex items-center group shadow-lg"
              >
                <span>Jetzt kostenlose Proberechnung erstellen</span>
                <svg 
                  className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 