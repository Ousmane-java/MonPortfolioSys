import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import NetworkBackground from '../components/NetworkBackground'

export const metadata: Metadata = {
  title: 'Ousmane Drame — Ingénieur Systèmes & Réseaux',
  description: 'Portfolio de Ousmane Drame — Cybersecurity, Cloud, System and Networks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Theme init — runs before React to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
            document.documentElement.setAttribute('data-theme',t);
            if(t==='dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
          })();
        `}} />
      </head>
      <body style={{ position: 'relative' }}>
        <NetworkBackground />
        <div style={{ position: 'relative', zIndex: 10, overflowX: 'hidden' }}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
