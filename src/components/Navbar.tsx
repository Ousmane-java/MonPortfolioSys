'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import CVModal from './CVModal'

const navLinks = [
  { href: '/#a-propos', label: 'À propos' },
  { href: '/#cv', label: 'CV' },
  { href: '/#experience', label: 'Expérience' },
  { href: '/#competences', label: 'Compétences' },
  { href: '/#projets', label: 'Projets' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/ousmane-drame-83858a334/', icon: <FaLinkedin size={20} />, color: 'hover:text-blue-600' },
  { href: 'https://github.com/Ousmane-java', icon: <FaGithub size={20} />, color: 'hover:text-gray-900' },
  { href: 'https://x.com/Ousmane2028', icon: <FaTwitter size={20} />, color: 'hover:text-sky-500' },
  { href: 'https://www.instagram.com/ousmane_draame/', icon: <FaInstagram size={20} />, color: 'hover:text-pink-600' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isCVOpen, setIsCVOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 12 }}
        className="fixed top-0 w-full bg-white shadow-lg z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/#a-propos" passHref>
              <p className="text-2xl font-extrabold text-gray-800 cursor-pointer hover:text-blue-600 transition">
                Ousmane DRAME
              </p>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map(link =>
                link.label === 'CV' ? (
                  <button
                    key={link.href}
                    onClick={() => setIsCVOpen(true)}
                    className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <p className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition">
                      {link.label}
                    </p>
                  </Link>
                )
              )}
            </div>

            {/* Social */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map(({ href, icon, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-700 transition ${color}`}
                  whileHover={{ scale: 1.2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Mobile button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-md text-gray-800 hover:text-blue-600 hover:bg-gray-200 transition"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} transition={{ duration: 0.3 }} className="md:hidden bg-white">
            <div className="px-4 pt-4 pb-3 space-y-2">
              {navLinks.map(link =>
                link.label === 'CV' ? (
                  <button
                    key={link.href}
                    onClick={() => { setIsCVOpen(true); setIsMobileOpen(false) }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition">
                      {link.label}
                    </p>
                  </Link>
                )
              )}
              <div className="pt-3 flex justify-around">
                {socialLinks.map(({ href, icon, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-700 ${color}`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* CV Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  )
}
