'use client'

import { motion } from 'framer-motion'
import { Users, Workflow, Mail } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'

const testimonials = [
  {
    text: "Très solide en exploitation Linux : MCO, patching et durcissement SSH, avec une approche orientée stabilité et sécurité.",
    author: "Thomas Lefèvre — Manager Systèmes & Réseaux (Open, France)",
  },
  {
    text: "Ousmane structure le monitoring de façon propre : métriques, alerting et dashboards utiles, avec une vraie réduction du bruit d’alertes.",
    author: "Camille Morel — Ingénieure Observabilité (Open, France)",
  },
  {
    text: "Excellent réflexe incident : diagnostic rapide, collecte de preuves (logs), RCA claire et runbooks actionnables.",
    author: "Nicolas Garnier — Responsable Exploitation (Open, France)",
  },
  {
    text: "Automatisation fiable : playbooks Ansible propres, idempotents, avec une logique d’industrialisation et de standardisation très pro.",
    author: "Julie Bernard — Ingénieure DevOps (InnovQube, France)",
  },
  {
    text: "Très bon niveau réseau pour un profil systèmes : DNS/DHCP, routage de base, analyse trafic et dépannage structuré.",
    author: "Maxime Robert — Manager Infrastructure (InnovQube, France)",
  },
  {
    text: "Documentation de qualité : procédures claires, checklists de MEP, et bonnes pratiques transmises à l’équipe.",
    author: "Sophie Laurent — Cheffe de projet IT (InnovQube, France)",
  },
  {
    text: "Le fait de gérer InfraMap en conditions réelles (déploiement, logs Docker, évolutions) démontre une rigueur rare et un vrai sens produit.",
    author: "Pierre Dubois — Enseignant Systèmes & Réseaux (EPSI Lyon)",
  },
  {
    text: "Profil autonome et orienté amélioration continue : priorisation, communication claire et capacité à livrer des changements sûrs.",
    author: "Élodie Richard — Enseignante / Référente alternance (EPSI Lyon)",
  },
]

export default function ExtraSections() {
  const [isPaused, setIsPaused] = useState(false)

  const marqueeAnimation = useMemo(
    () => ({
      x: isPaused ? undefined : '-50%',
      transition: isPaused
        ? undefined
        : { repeat: Infinity, duration: 40, ease: 'linear' as const },
    }),
    [isPaused]
  )

  // On duplique pour créer une boucle fluide
  const marqueeItems = useMemo(() => [...testimonials, ...testimonials], [])

  return (
    <section className="w-full px-6 py-20 bg-gray-100 dark:bg-zinc-900 space-y-32">
      {/* Processus de travail */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            >
              <Workflow className="text-blue-600 w-8 h-8" />
            </motion.span>
            Mon Processus de Travail
          </h2>

          <p className="text-gray-600 text-lg dark:text-gray-300">
            Mon approche est orientée <strong>exploitation</strong> et <strong>fiabilité</strong> : je vise des systèmes
            stables, observables et sécurisés, avec une logique d’amélioration continue.
          </p>

          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
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

      {/* Témoignages */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex justify-center items-center gap-2 mb-10">
          <Users className="text-green-600 w-8 h-8" />
          Témoignages & Retours
        </h2>

        <div className="overflow-hidden relative w-full">
          <motion.div
            className="flex gap-6"
            initial={{ x: '0%' }}
            animate={marqueeAnimation}
            style={{ width: '200%' }}
          >
            {marqueeItems.map((testimonial, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 min-w-[320px] max-w-sm flex-shrink-0 text-left"
              >
                <p className="text-gray-700 dark:text-gray-200 italic">
                  “{testimonial.text}”
                </p>
                <p className="text-sm text-gray-500 mt-4 dark:text-gray-400">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Astuce : survolez un témoignage pour mettre le défilement en pause.
        </p>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex justify-center items-center gap-2">
          <Mail className="text-blue-600 w-8 h-8" />
          Me Contacter
        </h2>

        <p className="text-gray-600 text-lg mb-6 dark:text-gray-300">
          Admis en Master Cybersecurity, Cloud, System and Networks, je recherche une alternance pour la rentrée 2026
          (Ingénieur / Administrateur / Technicien Systèmes & Réseaux, orientation Linux).
          N&apos;hésitez pas à me contacter pour toute opportunité.
        </p>

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
