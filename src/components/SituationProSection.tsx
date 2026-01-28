// SituationProSection.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function SituationProSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/situation-professionnelle.JPG"
          alt="Situation professionnelle"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4 backdrop-blur-sm">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ma situation professionnelle
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/situationProfessionnelle">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Voir ma situation Pro
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
