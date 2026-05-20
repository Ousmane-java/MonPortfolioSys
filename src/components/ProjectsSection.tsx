// src/components/ProjectsSection.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'InfraMap',
    description:
      "InfraMap est une plateforme SaaS de gestion de parc serveurs pensée pour les équipes infra et MSP. Elle centralise l’inventaire des serveurs, des clients et de leurs contrats dans une vue claire, afin de piloter l’infrastructure au même endroit. La plateforme intègre une supervision en temps réel (état, métriques, alertes) et une vue unifiée par client pour suivre la disponibilité, les engagements, les incidents et l’historique des actions. Objectif : réduire la dispersion des informations, gagner du temps au quotidien et fiabiliser le suivi des parcs multi-clients.",
    github: 'https://www.inframap.io',
    image: '/projects/inframap.jpg', // ✅ même dossier que les autres images
    cta: 'Voir InfraMap →',
  },
  {
    title: 'Seahawks Monitoring System',
    description:
      "Seahawks Monitoring est une solution de scan réseau automatisé dotée d'une interface web intuitive, d'un serveur de réception distant et d'un système de transmission sécurisé des résultats d'analyse. Réalisé dans le cadre de ma formation en Administration Systèmes et Réseaux à l'EPSI Lyon, ce projet scanne automatiquement les machines d'un réseau local, détecte les ports ouverts et envoie les résultats à un serveur central hébergé dans le Cloud. Un véritable atout pour la sécurité et la gestion des infrastructures réseaux.",
    github: 'https://github.com/Ousmane-java/MSPR1-EPSI',
    image: '/projects/seahawks.jpg',
    cta: 'Voir sur GitHub →',
  },
  {
    title: 'Seahawks Nester & Infrastructure MSPR',
    description:
      "Projet majeur réalisé dans le cadre de la MSPR TPTE512, Seahawks Nester est une plateforme d'infrastructure complète conçue pour NFL IT. Ce projet regroupe plusieurs missions : création d'une infrastructure virtuelle sous ESXi, mise en place de services critiques (DHCP, DNS, Ticketing), déploiement d'un cluster haute disponibilité pour l'application web, configuration de firewalls pfSense, mise en œuvre d'un tunnel VPN IPsec, supervision avancée avec Zabbix, et système de télémaintenance sécurisé basé sur tunnel SSH inversé. Le tout dans une logique DevOps incluant GitLab CE et MariaDB. Ce projet illustre la maîtrise d’un écosystème complet d'administration système et réseau, orienté haute disponibilité et sécurité.",
    github: 'https://github.com/Ousmane-java/MSPR1-EPSI',
    image: '/projects/mspr.JPG',
    cta: 'Voir sur GitHub →',
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
                  href={project.github}
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
      </div>
    </section>
  )
}
