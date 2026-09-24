'use client'

import { motion } from 'framer-motion'
import { Workflow, Mail } from 'lucide-react'
import Image from 'next/image'

export default function ExtraSections() {
  return (
    <section className="w-full px-6 py-20 space-y-32">
      {/* Processus de travail */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            >
              <Workflow className="text-blue-600 w-8 h-8" />
            </motion.span>
            Mon Processus de Travail
          </h2>

          <p className="text-lg" style={{ color: 'var(--text-2)' }}>
            Mon approche est orientée <strong>exploitation</strong> et <strong>fiabilité</strong> : je vise des systèmes
            stables, observables et sécurisés, avec une logique d’amélioration continue.
          </p>

          <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--text-2)' }}>
            <li>
              <strong>Audit & cadrage :</strong> compréhension du besoin, état des lieux (services, réseau, sécurité),
              identification des risques et priorités.
            </li>
            <li>
              <strong>Standardisation :</strong> baselines, conventions, durcissement, gestion des configurations et
              réduction de la dérive.
            </li>
            <li>
              <strong>Automatisation :</strong> industrialisation (Ansible / scripts), tâches récurrentes fiabilisées,
              déploiements reproductibles.
            </li>
            <li>
              <strong>Observabilité :</strong> métriques, logs, dashboards utiles, alerting calibré (moins de bruit,
              plus de signal).
            </li>
            <li>
              <strong>MCO & incidents :</strong> patching, contrôles, RCA, runbooks, retours d’expérience et
              améliorations concrètes.
            </li>
          </ul>
        </div>

        <div>
          <Image
            src="/process.JPG"
            alt="Processus de travail"
            width={600}
            height={400}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold flex justify-center items-center gap-2" style={{ color: 'var(--text-1)' }}>
          <Mail className="text-blue-600 w-8 h-8" />
          Me Contacter
        </h2>

        <p className="text-lg mb-5" style={{ color: 'var(--text-2)' }}>
          Après un an d&apos;alternance en support systèmes &amp; réseaux chez Open, me voici en Master Systèmes,
          Réseaux &amp; Cloud Computing à l&apos;ESGI. Je cherche l&apos;entreprise qui m&apos;accueillera pour les deux
          prochaines années : Technicien Informatique, support systèmes &amp; réseaux. Windows, Linux, partout en France.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {[
            'disponibilité : immédiate',
            'rythme : 3 sem. entreprise / 1 sem. école',
            'durée : 2 ans',
            'partout en France',
            'permis B',
          ].map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href="mailto:contact@ousmanedrame.com"
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59,130,246,0.75)' }}
          transition={{ duration: 0.3 }}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          📩 Envoyer un message
        </motion.a>
      </motion.div>
    </section>
  )
}
