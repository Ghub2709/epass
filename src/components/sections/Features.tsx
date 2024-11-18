'use client'

export default function Features() {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: "Express in 24 Stunden",
      description: "Garantierte Ausstellung innerhalb eines Werktages",
      icon: "⚡",
      highlight: "GARANTIERT"
    },
    {
      title: "100% Rechtssicher",
      description: "Offiziell beim DIBt registriert und anerkannt",
      icon: "✓",
      highlight: "AMTLICH"
    },
    {
      title: "Bis zu 40% günstiger",
      description: "Sparen Sie im Vergleich zu lokalen Anbietern",
      icon: "💰",
      highlight: "SPARPREIS"
    },
    {
      title: "Komplett Online",
      description: "Kein Vor-Ort Termin notwendig - sparen Sie Zeit",
      icon: "🖥",
      highlight: "ZEITSPAREND"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
            Ihre Vorteile
          </span>
          <h2 className="text-3xl font-bold mt-4 mb-4">
            Warum über 50.000 Kunden uns vertrauen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schnell, einfach und kostengünstig zum rechtssicheren Energieausweis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center relative group hover:shadow-xl transition-shadow"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                  {feature.highlight}
                </span>
              </div>
              <div className="text-4xl mb-4 text-green-600">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Kostenlose Proberechnung Starten
          </button>
        </div>
      </div>
    </section>
  )
} 