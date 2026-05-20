'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import { Sun, Moon, Menu, X } from 'lucide-react'
import CVModal from './CVModal'

const navLinks = [
  { href: '/#a-propos',   label: 'À propos' },
  { href: '/#experience', label: 'Expérience' },
  { href: '/#competences', label: 'Compétences' },
  { href: '/#projets',    label: 'Projets' },
  { href: '/situationProfessionnelle', label: 'Situation Pro' },
  { href: '/docs',        label: 'Docs' },
]

export default function Navbar() {
  const [open, setOpen]   = useState(false)
  const [cvOpen, setCvOpen] = useState(false)
  const [dark, setDark]   = useState(false)

  useEffect(() => {
    setDark(document.documentElement.getAttribute('data-theme') === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setDark(!dark)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 15 }}
        style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 50,
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--nav-border)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo / prompt */}
            <Link href="/#a-propos">
              <span className="font-mono text-sm font-semibold tracking-tight select-none" style={{ color: 'var(--accent)' }}>
                ousmane@portfolio<span style={{ color: 'var(--text-3)' }}>:~$</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="nav-link px-3 py-1.5 rounded-md text-sm font-medium">
                    {link.label}
                  </span>
                </Link>
              ))}
              <button
                onClick={() => setCvOpen(true)}
                className="nav-link px-3 py-1.5 rounded-md text-sm font-medium border-0 bg-transparent"
              >
                CV
              </button>
            </nav>

            {/* Right: socials + theme */}
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/ousmane-drame-83858a334/" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <FaLinkedin size={17} />
              </a>
              <a href="https://github.com/Ousmane-java" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <FaGithub size={17} />
              </a>
              <a href="https://x.com/Ousmane2028" target="_blank" rel="noopener noreferrer" className="icon-btn">
                <FaTwitter size={17} />
              </a>
              <button onClick={toggleTheme} className="theme-btn ml-1" aria-label="Toggle theme">
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--text-2)' }}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'var(--nav-bg)', borderTop: '1px solid var(--nav-border)' }}
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                    <span className="nav-link px-3 py-2 rounded-md text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
                <button onClick={() => { setCvOpen(true); setOpen(false) }} className="nav-link w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-transparent border-0">
                  CV
                </button>
                <div className="flex items-center gap-3 pt-2 px-3">
                  <a href="https://www.linkedin.com/in/ousmane-drame-83858a334/" target="_blank" rel="noopener noreferrer" className="icon-btn"><FaLinkedin size={17} /></a>
                  <a href="https://github.com/Ousmane-java" target="_blank" rel="noopener noreferrer" className="icon-btn"><FaGithub size={17} /></a>
                  <a href="https://x.com/Ousmane2028" target="_blank" rel="noopener noreferrer" className="icon-btn"><FaTwitter size={17} /></a>
                  <button onClick={toggleTheme} className="theme-btn ml-auto" aria-label="Toggle theme">
                    {dark ? <Sun size={15} /> : <Moon size={15} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  )
}
