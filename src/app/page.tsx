import Hero from '@/components/sections/Hero'
import HeroInput from '@/components/sections/HeroInput'
import Features from '@/components/sections/Features'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import Trust from '@/components/sections/Trust'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroInput />
      <Features />
      <Process />
      <Pricing />
      <Trust />
      <ContactForm />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
