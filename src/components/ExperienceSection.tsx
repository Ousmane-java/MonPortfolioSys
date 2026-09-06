'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const experiences = [
  {
    type: 'ALTERNANCE',
    color: '#00d4ff',
    period: 'Sep. 2025 — Août 2026',
    role: 'Technicien Support Systèmes & Réseaux',
    company: 'Open',
    location: 'France',
    tags: ['Active Directory', 'Linux', 'Windows Server', 'Centreon', 'Ansible', 'VMware ESXi', 'Docker', 'N1/N2'],
    missions: [
      "Gestion et administration du parc utilisateurs via Active Directory, de l'onboarding au support quotidien",
      "Support technique N1/N2 : analyse des logs, diagnostic d'incident et escalade vers les équipes N3",
      "Administration des services d'infrastructure : Active Directory, DNS, DHCP, gestion des accès et droits",
      "Contribution aux opérations réseaux : diagnostic connectivité (LAN/VLAN) et résolution des incidents réseau",
      "Administration et MCO de serveurs Linux (Ubuntu/CentOS) et Windows Server en production",
      "Supervision des infrastructures via Centreon : gestion des alertes et actions correctives",
      "Automatisation de tâches d'administration via Ansible (déploiement, configuration, mises à jour)",
      "Participation à l'exploitation d'un environnement virtualisé sous VMware ESXi",
      "Déploiement et gestion de conteneurs applicatifs avec Docker en environnement de test",
    ],
  },
  {
    type: 'STAGE',
    color: '#00ff88',
    period: 'Mars 2025 — Août 2025',
    role: 'Administrateur Systèmes Linux & Support Informatique',
    company: 'InnovQube',
    location: 'Lyon, France',
    tags: ['Linux', 'Support N1', 'Réseau', 'Services', 'GLPI'],
    missions: [
      "Installation et configuration de serveurs Linux : création d'utilisateurs, gestion des droits et services de base",
      "Administration systèmes de premier niveau : vérification des services, analyse des logs, redémarrage en cas d'incident",
      "Configuration réseau de base : adressage IP, test de connectivité et validation des services",
      "Support Informatique : prise en charge des incidents postes de travail et assistance bureautique",
      "Traitement des demandes et incidents : diagnostic, résolution, suivi et remontée des informations techniques",
    ],
  },
  {
    type: 'STAGE',
    color: '#f59e0b',
    period: '2024',
    role: 'Développeur',
    company: 'Bakeli',
    location: 'Sénégal',
    tags: ['Laravel', 'MySQL', 'API REST', 'Git', 'PHP', 'Postman'],
    missions: [
      "Développement d'un logiciel de gestion de stock (Laravel, MySQL)",
      "Conception et intégration d'API REST (Postman)",
      "Collaboration et suivi des tâches (Git, GitHub)",
      "Amélioration de l'UX et correction de bugs",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
            // deployment.log
          </span>
          <h2 className="text-3xl font-bold mt-1" style={{ color: 'var(--text-1)' }}>
            Expériences Professionnelles
          </h2>
          <div className="mt-2 h-0.5 w-14 rounded" style={{ background: 'var(--accent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--card-border)' }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-5 top-5 w-4 h-4 rounded-full -translate-x-1/2 items-center justify-center"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 10px ${exp.color}80`,
                  }}
                />

                {/* Card */}
                <div
                  className="glass rounded-xl p-6"
                  style={{ borderLeft: `3px solid ${exp.color}` }}
                >
                  {/* Type + period */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: `${exp.color}18`, color: exp.color }}
                    >
                      [{exp.type}]
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Role */}
                  <h3 className="text-lg font-semibold mb-0.5" style={{ color: 'var(--text-1)' }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium mb-4" style={{ color: 'var(--accent)' }}>
                    {exp.company} — {exp.location}
                  </p>

                  {/* Missions */}
                  <ul className="space-y-1.5 mb-5">
                    {exp.missions.map((m, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                        <span
                          className="mt-1 shrink-0 font-mono text-xs leading-none"
                          style={{ color: exp.color }}
                        >
                          ├─
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/situationProfessionnelle">
            <button
              className="px-6 py-2.5 rounded-full text-sm font-semibold border transition hover:opacity-80"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                background: 'var(--accent-muted)',
              }}
            >
              Voir toutes mes missions →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
