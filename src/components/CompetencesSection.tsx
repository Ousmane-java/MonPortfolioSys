'use client'

import { motion } from 'framer-motion'

interface Skill { name: string; level: number }
interface Panel { tag: string; label: string; color: string; skills: Skill[] }

const panels: Panel[] = [
  {
    tag: 'SYS',
    label: 'Systèmes & Administration',
    color: '#00d4ff',
    skills: [
      { name: 'Linux (Ubuntu / Debian)',       level: 3 },
      { name: 'Windows Server (bases)',        level: 2 },
      { name: 'Active Directory',             level: 3 },
      { name: 'systemd / gestion services',   level: 3 },
      { name: 'Gestion utilisateurs & droits', level: 3 },
    ],
  },
  {
    tag: 'NET',
    label: 'Réseau',
    color: '#818cf8',
    skills: [
      { name: 'TCP/IP / Adressage IP',        level: 3 },
      { name: 'DNS / DHCP',                   level: 3 },
      { name: 'LAN / VLAN (diagnostic)',      level: 2 },
      { name: 'SSH / Accès distants',         level: 3 },
      { name: 'Tests de connectivité',        level: 2 },
    ],
  },
  {
    tag: 'SUP',
    label: 'Support Informatique',
    color: '#f97316',
    skills: [
      { name: 'Support N1/N2',                level: 3 },
      { name: 'Analyse de logs',              level: 3 },
      { name: "Diagnostic d'incidents",       level: 3 },
      { name: 'Ticketing ITSM (GLPI)',        level: 3 },
      { name: 'Escalade & communication',     level: 3 },
    ],
  },
  {
    tag: 'OBS',
    label: 'Supervision',
    color: '#00ff88',
    skills: [
      { name: 'Centreon',                     level: 3 },
      { name: 'Gestion des alertes',          level: 2 },
      { name: 'Suivi état des services',      level: 3 },
      { name: 'Analyse journald / logs',      level: 3 },
    ],
  },
  {
    tag: 'AUTO',
    label: 'Automatisation',
    color: '#f59e0b',
    skills: [
      { name: 'Ansible (bases)',              level: 2 },
      { name: 'Bash scripting (bases)',       level: 2 },
      { name: 'Git / GitHub',                level: 3 },
    ],
  },
  {
    tag: 'VIRT',
    label: 'Virtualisation & Conteneurs',
    color: '#a78bfa',
    skills: [
      { name: 'VMware ESXi (bases)',          level: 2 },
      { name: 'Docker (bases)',              level: 2 },
      { name: 'Proxmox (notions)',            level: 1 },
    ],
  },
]

function Dots({ level, color }: { level: number; color: string }) {
  return (
    <span className="flex gap-0.5 ml-auto shrink-0">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i < level ? color : 'var(--card-border)' }}
        />
      ))}
    </span>
  )
}

export default function CompetencesSection() {
  return (
    <section className="py-20 px-4" id="competences">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
            // system.status
          </span>
          <h2 className="text-3xl font-bold mt-1" style={{ color: 'var(--text-1)' }}>
            Compétences Techniques
          </h2>
          <div className="mt-2 h-0.5 w-14 rounded" style={{ background: 'var(--accent)' }} />
        </motion.div>

        {/* Panels grid — 2 colonnes */}
        <div className="grid md:grid-cols-2 gap-5">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-xl overflow-hidden"
            >
              {/* Panel header */}
              <div
                className="px-5 py-3 flex items-center gap-3"
                style={{
                  borderBottom: `1px solid ${panel.color}28`,
                  background: `${panel.color}08`,
                }}
              >
                <span
                  className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: `${panel.color}18`, color: panel.color }}
                >
                  [{panel.tag}]
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                  {panel.label}
                </span>
                <span
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: panel.color, boxShadow: `0 0 6px ${panel.color}` }}
                />
              </div>

              {/* Skills list */}
              <div className="px-5 py-4 space-y-2.5">
                {panel.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs shrink-0"
                      style={{ color: `${panel.color}90` }}
                    >
                      ›
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>
                      {skill.name}
                    </span>
                    <Dots level={skill.level} color={panel.color} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-7 flex flex-wrap items-center gap-5 justify-center"
        >
          <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
            niveau :
          </span>
          {[
            { dots: 1, label: 'notions' },
            { dots: 3, label: 'opérationnel' },
            { dots: 5, label: 'expert' },
          ].map(({ dots, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i < dots ? 'var(--accent)' : 'var(--card-border)' }}
                  />
                ))}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-3)' }}>
                = {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
