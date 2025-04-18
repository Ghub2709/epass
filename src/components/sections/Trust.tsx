'use client'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

export default function Trust() {
  const certifications = [
    {
      title: "DIBt Registriert",
      description: "Offiziell beim Deutschen Institut für Bautechnik registriert",
      icon: getAssetPath('images/dibt-logo.png')
    },
    {
      title: "TÜV Geprüft",
      description: "Qualitätsmanagement nach ISO 9001 zertifiziert",
      icon: getAssetPath('images/tuv-logo.png')
    },
    {
      title: "DSGVO Konform",
      description: "Höchste Standards beim Datenschutz",
      icon: getAssetPath('images/dsgvo-logo.png')
    }
  ]

  const stats = [
    {
      number: "50.000+",
      label: "Zufriedene Kunden"
    },
    {
      number: "24h",
      label: "Express-Service"
    },
    {
      number: "100%",
      label: "Rechtssicher"
    }
  ]

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Vertrauen Sie dem Marktführer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tausende zufriedene Kunden vertrauen auf unseren Service
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="h-32 relative mb-6">
                <Image
                  src={cert.icon}
                  alt={cert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {cert.title}
              </h3>
              <p className="text-gray-600">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Jetzt Energieausweis erstellen
          </button>
        </div>
      </div>
    </section>
  )
} 