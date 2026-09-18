'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import Footer from '@/components/Footer'

type GraphNode = {
  id: string
  kind: 'trunk' | 'branch'
  tag: string
  period: string
  title: string
  place: string
  text: string
  color: string
  branchFrom?: string
  branchTo?: string
}

const nodes: GraphNode[] = [
  {
    id: 'racine',
    kind: 'trunk',
    tag: 'origin',
    period: '2012 — 2014',
    title: 'Racine',
    place: 'Dakar, Sénégal',
    text: "Avant 2014, je n'avais jamais mis les pieds à l'école. Attiré par la radio et les documentaires, j'apprends seul — grammaire, conjugaison — jusqu'à intégrer directement le CM2.",
    color: '#818cf8',
  },
  {
    id: 'bac',
    kind: 'trunk',
    tag: 'bac',
    period: '2021',
    title: 'Baccalauréat Scientifique (S2)',
    place: 'Lycée Sergent Malamine Camara — Dakar',
    text: "Obtenu après un parcours scolaire compressé (7 ans au lieu de 13). Spécialités : mathématiques, sciences physiques, sciences de la vie et de la terre (SVT) — les bases logiques qui mèneront à l'informatique.",
    color: '#f59e0b',
  },
  {
    id: 'licence',
    kind: 'trunk',
    tag: 'licence',
    period: '2021 — 2024',
    title: 'Licence Informatique',
    place: 'École Supérieure Polytechnique — Dakar',
    text: 'Algorithmique, programmation, bases de données : les fondamentaux techniques, et le goût de structurer des problèmes concrets.',
    color: '#00d4ff',
  },
  {
    id: 'codi',
    kind: 'branch',
    tag: 'leadership',
    period: '2023',
    title: 'Présidence du CODI',
    place: 'ESP Dakar',
    text: "Élu à la tête du comité d'intégration des nouveaux étudiants : gestion de budget, animation de 300+ étudiants, décisions impopulaires assumées. Une rigueur qui infuse encore mon approche technique aujourd'hui.",
    color: '#f97316',
    branchFrom: 'Licence Informatique',
    branchTo: 'Bachelor ASR & BD',
  },
  {
    id: 'bachelor',
    kind: 'trunk',
    tag: 'pivot',
    period: '2024 — 2026',
    title: 'Bachelor Administrateur Systèmes, Réseaux et Bases de Données',
    place: 'EPSI — Lyon',
    text: 'Le vrai virage vers les systèmes et réseaux : administration Windows/Linux, virtualisation, sécurité. Les projets MSPR (infrastructure ESXi, pfSense, supervision Zabbix) posent les bases du métier.',
    color: '#00ff88',
  },
  {
    id: 'stage',
    kind: 'trunk',
    tag: 'terrain',
    period: '2025',
    title: 'Stage Administrateur Systèmes Linux & Support',
    place: 'InnovQube — Lyon',
    text: "Première immersion en production : administration Linux N1, support informatique, diagnostic d'incidents. La théorie rencontre le terrain.",
    color: '#00d4ff',
  },
  {
    id: 'open',
    kind: 'trunk',
    tag: 'exploitation',
    period: '2025 — 2026 · en cours',
    title: 'Alternance Technicien Support Systèmes & Réseaux',
    place: 'Open — Paris',
    text: "Support N1/N2, Active Directory, supervision Centreon, automatisation Ansible. Le poste qui structure aujourd'hui mon quotidien technique.",
    color: '#818cf8',
  },
  {
    id: 'inframap',
    kind: 'branch',
    tag: 'produit',
    period: '2026',
    title: 'InfraMap',
    place: 'Projet personnel',
    text: "En parallèle, je lance InfraMap, un SaaS de gestion de parc serveurs. Exploiter mes propres serveurs en production m'apprend une rigueur qu'aucun cours ne donne.",
    color: '#f97316',
    branchFrom: 'Alternance chez Open',
    branchTo: 'Ambition',
  },
  {
    id: 'master',
    kind: 'trunk',
    tag: 'suite',
    period: '2026 — 2028',
    title: 'Master Systèmes, Réseaux & Cloud Computing',
    place: 'ESGI — Paris',
    text: 'La suite logique : approfondir le cloud et les architectures à grande échelle, en alternance, pour continuer à apprendre sur le terrain.',
    color: '#00ff88',
  },
  {
    id: 'ambition',
    kind: 'trunk',
    tag: 'cap',
    period: 'Objectif',
    title: 'Ambition',
    place: 'Ingénieur / Architecte Systèmes, Réseaux & Cloud',
    text: 'Piloter des infrastructures critiques dans un grand groupe, puis revenir au Sénégal fonder ma propre entreprise et contribuer à l’économie numérique africaine.',
    color: '#f59e0b',
  },
]

function BranchConnector({ color }: { color: string }) {
  return (
    <svg
      className="hidden md:block absolute -left-8 top-7 pointer-events-none"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M0 0 C 20 0, 20 16, 32 16"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
    </svg>
  )
}

export default function AProposPage() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <main className="pt-28 pb-16 px-4" style={{ color: 'var(--text-1)' }}>
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
          // graph.parcours
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4" style={{ color: 'var(--text-1)' }}>
          Mon parcours est un réseau
        </h1>
        <p className="text-base md:text-lg" style={{ color: 'var(--text-2)' }}>
          Chaque nœud est une étape, chaque connexion une compétence ou une leçon qui mène à la suivante.
          Deux expériences — le CODI et InfraMap — se sont greffées en cours de route avant de rejoindre le tronc principal.
        </p>
      </motion.div>

      {/* Graph */}
      <div className="max-w-3xl mx-auto relative">
        <div
          className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
          style={{ background: 'var(--card-border)' }}
        />

        <div className="space-y-6">
          {nodes.map((node, i) => {
            if (node.kind === 'branch') {
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="relative md:pl-28"
                >
                  <BranchConnector color={node.color} />

                  <div
                    className="glass rounded-xl p-5"
                    style={{ border: `1px dashed ${node.color}70` }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: `${node.color}18`, color: node.color }}
                      >
                        [branche · {node.tag}]
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                        {node.period}
                      </span>
                    </div>

                    <p className="font-mono text-xs mb-2" style={{ color: node.color }}>
                      ↳ ramifiée depuis : {node.branchFrom}
                    </p>

                    <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>
                      {node.title}
                    </h3>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                      {node.place}
                    </p>

                    <p className="text-sm mb-3" style={{ color: 'var(--text-2)' }}>
                      {node.text}
                    </p>

                    <p className="font-mono text-xs" style={{ color: node.color }}>
                      → rejoint : {node.branchTo}
                    </p>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="relative md:pl-16"
              >
                <div
                  className="hidden md:flex absolute left-5 top-6 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center"
                  style={{ background: node.color, boxShadow: `0 0 10px ${node.color}80` }}
                />

                <div className="glass rounded-xl p-6" style={{ borderLeft: `3px solid ${node.color}` }}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: `${node.color}18`, color: node.color }}
                    >
                      [{node.tag}]
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                      {node.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>
                    {node.title}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                    {node.place}
                  </p>

                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                    {node.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
          aria-label="Retour en haut"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}

      <div className="mt-20">
        <Footer />
      </div>
    </main>
  )
}
