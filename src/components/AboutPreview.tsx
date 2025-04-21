/* eslint-disable react/no-unescaped-entities */

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const fullText = `Je suis Ousmane Drame, passionné par l'administration des systèmes et réseaux, le DevOps et la cybersécurité. J'aime concevoir des solutions innovantes, automatiser des tâches et relever des défis techniques. Mon objectif est de devenir un Expert en Infrastructures Systèmes & Réseaux et cloud.`;

export default function Home() {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[index])
        setIndex(index + 1)
      }, 30) // vitesse d’écriture
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Photo à gauche agrandie et alignée à gauche */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: 'spring' }}
          className="flex justify-start"
        >
          <Image
            src="/profil.jpg" // Chemin vers ta photo dans /public
            alt="Photo de Ousmane"
            width={400}
            height={400}
            className="rounded-full shadow-xl border-4 border-gray-200"
          />
        </motion.div>

        {/* Texte à droite */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: 'spring' }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">À propos de moi</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 min-h-[150px]">
            {displayedText}
          </p>
          {index === fullText.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
