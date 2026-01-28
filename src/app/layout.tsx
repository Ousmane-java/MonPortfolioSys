import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: 'Ousmane Drame',
  description: 'Portfolio de Ousmane Drame',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Ousmane Drame</title>
      </head>
      <body className="relative">
        <Navbar />
        {children}
       
      </body>
    </html>
  )
}
