
/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: "AlloDocteur",
    description:
      "AlloDocteur est un projet de gestion de prise de rendez-vous chez un médecin réalisé entièrement en Laravel. Ce système innovant facilite l'accès aux soins au Sénégal en permettant aux patients de prendre rendez-vous rapidement et aux médecins de gérer leur planning efficacement. Ce projet démontre ma capacité à développer des solutions qui améliorent la qualité des services de santé.",
    github: "https://github.com/Ousmane-java/AlloDocteurProject",
    image: "/projects/alloDocteur.jpg",
  },
  {
    title: "Expert",
    description:
      "Expert est un logiciel de gestion de stock et de génération de tickets de caisse. Ce projet permet aux commerçants de suivre l'évolution de leur stock, de recevoir des notifications en cas de rupture imminente et de générer automatiquement un fichier d'inventaire en renseignant seulement les dates. Un outil indispensable pour une gestion optimale des commerces.",
    github: "https://github.com/Ousmane-java/ticketCaisseProject",
    image: "/projects/expert.jpg",
  },
  {
    title: "Seahawks Monitoring System",
    description:
      "Seahawks Monitoring est une solution de scan réseau automatisé dotée d'une interface web intuitive, d'un serveur de réception distant et d'un système de transmission sécurisé des résultats d'analyse. Réalisé dans le cadre de ma formation en Administration Systèmes et Réseaux à l'EPSI Lyon, ce projet scanne automatiquement les machines d'un réseau local, détecte les ports ouverts et envoie les résultats à un serveur central hébergé dans le Cloud. Un véritable atout pour la sécurité et la gestion des infrastructures réseaux.",
    github: "https://github.com/Ousmane-java/MSPR1-EPSI",
    image: "/projects/seahawks.jpg",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projets" className="py-16 bg-white dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Titre de la section */}
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          MES PROJETS
        </motion.h2>
        {/* Pour chaque projet, une carte pleine largeur divisée en deux colonnes */}
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-zinc-800 rounded-xl mb-12 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Colonne gauche : Image */}
            <div className="w-full md:w-1/2">
              <motion.div
                className="overflow-hidden"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            {/* Colonne droite : Texte et bouton */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <motion.h3
                className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-6"
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
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
                >
                  Voir sur GitHub &rarr;
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
