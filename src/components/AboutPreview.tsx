// src/components/AboutPreview.tsx
/* eslint-disable react/no-unescaped-entities */

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const fullText = `Chaque infrastructure est une toile, et moi, j’en suis le bâtisseur. Je suis Ousmane Drame, étudiant en Cybersecurity, Cloud, System and Networks. Passionné par la sécurité, la fiabilité des systèmes et l’automatisation, j’aime concevoir des environnements stables et bien pensés. Mon objectif : transformer la complexité en solutions simples et évolutives, et devenir Ingénieur Systèmes Linux. Si, comme moi, vous pensez qu’un bon système se ressent dans sa fluidité, alors vous êtes au bon endroit. Bienvenue dans mon univers !`

export default function AboutPreview() {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index])
        setIndex(index + 1)
      }, 26) // vitesse d’écriture
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Photo à gauche */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, type: 'spring' }}
          className="flex justify-start"
        >
          <Image
            src="/profil.jpg"
            alt="Photo de Ousmane Drame"
            width={420}
            height={420}
            priority
            className="rounded-full shadow-xl border-4 border-gray-200"
          />
        </motion.div>

        {/* Texte à droite */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.35, type: 'spring' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-3">À propos de moi</h2>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              Systems &amp; Information Security Engineering Student
            </span>

            <Link
              href="https://inframap.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              CEO — InfraMap ↗
            </Link>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 min-h-[170px] whitespace-pre-line">
            {displayedText}
          </p>

          {index === fullText.length && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/a-propos">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                  Lire la suite →
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
