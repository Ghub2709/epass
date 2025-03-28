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
      title: "Mehrwertsteuer gespart",
      description: "Bei Online Bestellung sparen Sie 19% - garantiert!",
      icon: "💰",
      highlight: "SPARPREIS"
    },
    {
      title: "Vor-Ort und Online",
      description: "Online Erstellung wo möglich, Vor-Ort Service wo nötig.",
      icon: "🖥",
      highlight: "ZEITSPAREND"
    }
  ]

  return (
    <section className="py-32 md:py-16 bg-white">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-10">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100 flex items-center">
              ⭐️ <span className="text-green-700 font-bold mx-1">4.9/5</span> von über 2.000 Kunden
            </span>
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100 flex items-center">
              ✓ <span className="text-green-700 font-bold mx-1">50.000+</span> ausgestellte Ausweise
            </span>
          </div>

          <h2 className="text-4xl font-bold text-center mb-4 px-4">
            Warum über 50.000 Kunden uns vertrauen
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 px-4">
            Schnell, einfach und kostengünstig zum rechtssicheren Energieausweis
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 mb-16 md:my-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 md:p-6 rounded-lg shadow-lg text-center relative group hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    {feature.highlight}
                  </span>
                </div>
                <div className="text-4xl mb-6 md:mb-4 text-green-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 md:mt-12">
            <button
              onClick={scrollToForm}
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Kostenlose Proberechnung
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 