'use client'

import { motion } from 'framer-motion'
import { Users, Workflow, Mail } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    text: "Ousmane Drame a brillamment configuré notre infrastructure sous Linux. Son professionnalisme nous a fait gagner un temps précieux.",
    author: "M. Diallo – DevOps Engineer",
  },
  {
    text: "Très impressionné par le déploiement de la plateforme Dify par Ousmane Drame. Une intégration fluide et sans accroc.",
    author: "Mme Sy – Lead Technique chez InnovQube",
  },
  {
    text: "Ses configurations de VM Ubuntu et Kali sont parfaites pour des tests réseau. Un excellent travail de virtualisation et de sécurité.",
    author: "M. Sow – Formateur EPSI",
  },
  {
    text: "Le projet d'arrosage automatique a captivé le jury. Ousmane Drame a su allier IoT et scripts Python avec précision.",
    author: "Mme Diouf – Enseignante en systèmes embarqués",
  },
  {
    text: "Il a su auditer et documenter une architecture complète tout en assurant une supervision efficace via Nagios.",
    author: "M. Faye – Consultant IT",
  },
  {
    text: "Son portfolio technique est sobre et très bien organisé, démontrant une expertise incontestable en IT.",
    author: "Mme Diallo – Responsable RH",
  },
  {
    text: "Les scans réseau en temps réel mis en place par Ousmane Drame sont une véritable avancée pour notre sécurité.",
    author: "Mme Kane – Architecte réseau",
  },
  {
    text: "Disponible, organisé et toujours à l'écoute. Un vrai plus dans une équipe tech.",
    author: "M. Ndiaye – Chef de projet",
  },
  {
    text: "Le déploiement de Dify sans Nginx sur un sous-domaine personnalisé était du grand art.",
    author: "M. Coulibaly – Mentor DevOps",
  },
  {
    text: "Ousmane Drame est proactif, apprend vite et propose des solutions pertinentes même dans des environnements complexes.",
    author: "Mme Fall – Responsable alternance EPSI",
  },
]

export default function ExtraSections() {
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
          <p className="text-gray-600 text-lg">
            En tant qu’Administrateur Systèmes et Réseaux, mon approche repose sur une méthodologie précise, axée sur la performance, la sécurité et la fiabilité des infrastructures IT.
          </p>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li><strong>Évaluation :</strong> Audit des systèmes, cartographie réseau et analyse des besoins.</li>
            <li><strong>Conception :</strong> Élaboration de l’architecture réseau et définition des services.</li>
            <li><strong>Déploiement :</strong> Configuration des serveurs et mise en place des réseaux.</li>
            <li><strong>Supervision & Sécurité :</strong> Monitoring, alertes, sauvegardes et politiques de sécurité.</li>
            <li><strong>Maintenance :</strong> Suivi continu, support et évolution des systèmes.</li>
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
            animate={{ x: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: 'linear'
            }}
            style={{ width: '200%' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.animationPlayState = 'running'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 min-w-[300px] max-w-xs flex-shrink-0"
              >
                <p className="text-gray-700 dark:text-gray-200 italic">“{testimonial.text}”</p>
                <p className="text-sm text-gray-500 mt-4">— {testimonial.author}</p>
              </motion.div>
            ))}
          </motion.div>
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex justify-center items-center gap-2">
          <Mail className="text-blue-600 w-8 h-8" />
          Me Contacter
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Je suis à la recherche d'une alternance pour approfondir mes compétences. N&apos;hésitez pas à me contacter pour toute collaboration.
        </p>
        <motion.a
          href="mailto:ousmanedrame.work@gmail.com"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59,130,246,0.75)" }}
          transition={{ duration: 0.3 }}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          📩 Envoyer un message
        </motion.a>
      </motion.div>

    </section>
  )
}
