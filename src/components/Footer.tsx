'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const links = [
  { href: 'https://github.com/Ousmane-java',                              icon: <Github   className="w-5 h-5" /> },
  { href: 'https://www.linkedin.com/in/ousmane-drame-83858a334/',         icon: <Linkedin className="w-5 h-5" /> },
  { href: 'mailto:contact@ousmanedrame.com',                              icon: <Mail     className="w-5 h-5" /> },
  { href: 'https://x.com/Ousmane2028',                                    icon: <Twitter  className="w-5 h-5" /> },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full px-6 py-8 glass"
      style={{ borderTop: '1px solid var(--card-border)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">

        <div className="flex items-center gap-5">
          {links.map(({ href, icon }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="icon-btn"
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="font-mono text-xs text-center" style={{ color: 'var(--text-3)' }}>
          <span style={{ color: 'var(--accent)' }}>ousmane@portfolio</span>
          <span style={{ color: 'var(--text-3)' }}>:~$ </span>
          <span style={{ color: 'var(--text-2)' }}>
            © {new Date().getFullYear()} Ousmane Drame — v3.0.0
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
