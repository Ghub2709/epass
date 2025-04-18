import HeroInput from '@/components/sections/HeroInput'
import VideoSection from '@/components/sections/VideoSection'
import Features from '@/components/sections/Features'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import Trust from '@/components/sections/Trust'
import ContactForm from '@/components/sections/ContactForm'
import OptimizedFAQ from '@/components/sections/OptimizedFAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main>
      <HeroInput />
      <VideoSection />
      <Features />
      <Process />
      <Pricing />
      <Trust />
      <ContactForm />
      <OptimizedFAQ />
      <Contact />
      <Footer />
    </main>
  )
}
