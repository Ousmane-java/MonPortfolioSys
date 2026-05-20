/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const fullText = `Chaque infrastructure est une toile, et moi, j'en suis le bâtisseur. Je suis Ousmane Drame, étudiant en Cybersecurity, Cloud, System and Networks. Passionné par la sécurité, la fiabilité des systèmes et l'automatisation, j'aime concevoir des environnements stables et bien pensés. Mon objectif : transformer la complexité en solutions simples et évolutives, et devenir Ingénieur Systèmes Linux. Si, comme moi, vous pensez qu'un bon système se ressent dans sa fluidité, alors vous êtes au bon endroit. Bienvenue dans mon univers !`

export default function AboutPreview() {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (idx < fullText.length) {
      const t = setTimeout(() => {
        setDisplayed(p => p + fullText[idx])
        setIdx(i => i + 1)
      }, 26)
      return () => clearTimeout(t)
    }
  }, [idx])

  return (
    <section className="min-h-screen flex items-center justify-center py-28 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, type: 'spring' }}
          className="flex justify-center md:justify-start"
        >
          <div
            className="rounded-full p-[3px]"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
          >
            <div
              className="rounded-full p-1"
              style={{ background: 'var(--bg)' }}
            >
              <Image
                src="/profil.jpg"
                alt="Ousmane Drame"
                width={400}
                height={400}
                priority
                className="rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.35, type: 'spring' }}
        >
          {/* Status badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent2)' }}
            >
              ● ONLINE
            </span>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
            >
              ingénieur-systèmes
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-1" style={{ color: 'var(--text-1)' }}>
            Ousmane Drame
          </h1>
          <p className="font-mono text-sm mb-5" style={{ color: 'var(--accent)' }}>
            Cybersecurity · Cloud · System &amp; Networks
          </p>

          {/* Skill badges */}
          <div className="mb-5 flex flex-wrap gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{ background: 'var(--accent-muted)', color: 'var(--text-2)' }}
            >
              Systems &amp; Information Security Engineering
            </span>
            <Link
              href="https://inframap.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition hover:opacity-80"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              CEO — InfraMap ↗
            </Link>
          </div>

          {/* Typing text */}
          <p
            className="text-base leading-relaxed mb-7 min-h-[160px]"
            style={{ color: 'var(--text-2)' }}
          >
            {displayed}
            {idx < fullText.length && (
              <span
                className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                style={{ background: 'var(--accent)' }}
              />
            )}
          </p>

          {idx === fullText.length && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/a-propos">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-80"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  En savoir plus →
                </button>
              </Link>
              <a href="#experience">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition hover:opacity-80 glass"
                  style={{ color: 'var(--text-2)' }}
                >
                  Voir mes expériences
                </button>
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
