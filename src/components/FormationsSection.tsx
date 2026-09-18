'use client'

import { motion } from 'framer-motion'

const formations = [
  {
    color: '#00d4ff',
    period: '2026 — 2028',
    diploma: 'Master Systèmes, Réseaux & Cloud Computing',
    school: 'ESGI — Paris',
    detail: "Poursuite d'études en alternance. Recherche d'un poste Technicien Informatique / Support Systèmes & Réseaux pour la rentrée 2026.",
  },
  {
    color: '#00ff88',
    period: '2024 — 2026',
    diploma: 'Bachelor Administrateur Systèmes, Réseaux et Bases de Données',
    school: 'EPSI — Lyon',
    detail: "Administration Windows/Linux, réseaux et virtualisation, complétée par un stage et une alternance en environnement de production ainsi que des projets MSPR (infrastructure ESXi, pfSense, supervision Zabbix).",
  },
  {
    color: '#f59e0b',
    period: '2021 — 2024',
    diploma: 'Licence Informatique',
    school: 'École Supérieure Polytechnique — Dakar',
    detail: 'Fondamentaux en informatique et développement : algorithmique, programmation, bases de données.',
  },
]

export default function FormationsSection() {
  return (
    <section className="py-20 px-4" id="formations">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
            // education.log
          </span>
          <h2 className="text-3xl font-bold mt-1" style={{ color: 'var(--text-1)' }}>
            Formations
          </h2>
          <div className="mt-2 h-0.5 w-14 rounded" style={{ background: 'var(--accent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--card-border)' }}
          />

          <div className="space-y-8">
            {formations.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative md:pl-16"
              >
                <div
                  className="hidden md:flex absolute left-5 top-5 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center"
                  style={{
                    background: f.color,
                    boxShadow: `0 0 10px ${f.color}80`,
                  }}
                />

                <div
                  className="glass rounded-xl p-6"
                  style={{ borderLeft: `3px solid ${f.color}` }}
                >
                  <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                    {f.period}
                  </span>

                  <h3 className="text-lg font-semibold mt-1 mb-0.5" style={{ color: 'var(--text-1)' }}>
                    {f.diploma}
                  </h3>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                    {f.school}
                  </p>

                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                    {f.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
