import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Premium Energieausweis Online',
  description: 'Erstellen Sie Ihren Energieausweis schnell und unkompliziert online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
