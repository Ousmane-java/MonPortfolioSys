// src/components/ProjectsSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'InfraMap',
    description:
      "InfraMap est une plateforme SaaS de gestion de parc serveurs pensée pour les équipes infra et MSP. Elle centralise l'inventaire des serveurs, des clients et de leurs contrats dans une vue claire. La plateforme intègre une supervision en temps réel (état, métriques, alertes) et une vue unifiée par client pour suivre la disponibilité, les engagements, les incidents et l'historique des actions.",
    link: 'https://www.inframap.io',
    image: '/projects/inframap.jpg',
    cta: 'Voir InfraMap →',
  },
  {
    title: 'Kyosk',
    description:
      "Kyosk est la première application mobile dédiée à la presse sénégalaise et africaine. Accédez instantanément à vos journaux, magazines et milliers de livres et ebooks directement depuis votre iPhone, où que vous soyez au Sénégal ou dans la diaspora.",
    link: 'https://www.kyosk.sn',
    image: null,
    cta: 'Voir Kyosk →',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projets" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre de la section */}
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          style={{ color: 'var(--text-1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          MES PROJETS
        </motion.h2>

        {/* Cartes projets */}
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="glass flex flex-col md:flex-row items-center rounded-xl mb-12 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Colonne gauche : Image ou placeholder */}
            <div className="w-full md:w-1/2">
              <motion.div
                className="overflow-hidden"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center"
                    style={{
                      minHeight: 220,
                      background: 'linear-gradient(135deg, #00d4ff18 0%, #818cf818 100%)',
                      borderRight: '1px solid var(--card-border)',
                    }}
                  >
                    <span className="font-mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                      {project.title}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Colonne droite : Texte et bouton */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <motion.h3
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--text-1)' }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {project.title}
              </motion.h3>

              <motion.p
                className="mb-6"
                style={{ color: 'var(--text-2)' }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                >
                  {project.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* CTA Voir tous les projets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 text-center"
        >
          <Link href="/projets">
            <button
              className="px-6 py-2.5 rounded-full text-sm font-semibold border transition hover:opacity-80"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                background: 'var(--accent-muted)',
              }}
            >
              Voir tous les projets →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
