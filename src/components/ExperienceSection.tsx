// src/components/ExperienceSection.tsx
'use client'

import { Section } from '@/components/Section'
import { motion } from 'framer-motion'
import { FaServer, FaCode, FaArrowUp, FaCloud, FaNetworkWired } from 'react-icons/fa'
import { useState, useEffect } from 'react'

// Composant pour afficher une icône animée dans un cercle
const AnimatedIcon = ({
  IconComponent,
  borderColor,
  iconColor,
}: {
  IconComponent: React.ElementType
  borderColor: string
  iconColor: string
}) => {
  return (
    <motion.div
      className="w-40 h-40 flex items-center justify-center rounded-full border-4 shadow-xl"
      style={{ borderColor }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      <IconComponent className="w-16 h-16" style={{ color: iconColor }} />
    </motion.div>
  )
}

export default function ExperienceSection() {
  const [showArrow, setShowArrow] = useState(false)

  // Affiche la flèche quand l'utilisateur a scrollé au-delà d'un certain seuil
  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Section customDelay={0.4}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          EXPÉRIENCES PROFESSIONNELLES
        </h2>

        <div className="space-y-12">
          {/* Expérience 1 : Alternance Administrateur Systèmes & Réseaux */}
          <motion.div
            className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Icône animée pour l'expérience 1 */}
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              <AnimatedIcon
                IconComponent={FaCloud}
                borderColor="#3b82f6"
                iconColor="#3b82f6"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-100">
                <FaCloud className="mr-2 text-blue-600" /> Septembre 2026 - Août 2027 : Alternance Administrateur Systèmes & Réseaux — Open, France
              </h3>

              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                {/* 3 missions Systèmes */}
                <li>
                  Industrialisation MCO Linux : standardisation (baseline), hardening, gestion des patchs et suivi de conformité (audit + remédiation).
                </li>
                <li>
                  Exploitation avancée : gestion services systemd, optimisation performances (CPU/RAM/IO), supervision des ressources et capacity planning.
                </li>
                <li>
                  Automatisation d’exploitation : playbooks Ansible + scripts Bash/Python (idempotence, inventaires, contrôles, reporting).
                </li>

                {/* 2 missions Réseau */}
                <li>
                  Administration réseau : diagnostic L2/L3 (DNS/DHCP, routage de base, MTU), analyse trafic (tcpdump), résolution d’incidents de connectivité.
                </li>
                <li>
                  Sécurisation & segmentation : règles d’accès (ACL/pare-feu), durcissement SSH, contrôle des flux et validation post-changements.
                </li>

                {/* 1 mission Support */}
                <li>
                  Support N2/N3 : traitement tickets, RCA (analyse cause racine), rédaction de runbooks, amélioration continue et réduction de récurrence.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Expérience 2 : Administrateur Système */}
          <motion.div
            className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Icône animée pour l'expérience 2 */}
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              <AnimatedIcon
                IconComponent={FaServer}
                borderColor="#3b82f6"
                iconColor="#3b82f6"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-100">
                <FaServer className="mr-2 text-blue-600" /> Mars 2025 - Août 2025 : Stage Administrateur Système sous Linux — InnovQube, France
              </h3>

              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Administration et optimisation d’infrastructures Linux (Ubuntu/Debian et systemd)</li>
                <li>Supervision et monitoring des systèmes IT (Centreon et SNMP)</li>
                <li>Sécurisation des accès et gestion des permissions (SSH et sudo)</li>
                <li>Gestion du stockage et sauvegardes (LVM et rsync)</li>
                <li>Automatisation des tâches récurrentes (Bash et Ansible)</li>
                <li>Support d’exploitation et résolution d’incidents (diagnostic et documentation)</li>
              </ul>
            </div>
          </motion.div>

          {/* Expérience 3 : Développeur */}
          <motion.div
            className="flex flex-col md:flex-row items-center bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Icône animée pour l'expérience 3 */}
            <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
              <AnimatedIcon
                IconComponent={FaCode}
                borderColor="#10b981"
                iconColor="#10b981"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-100">
                <FaCode className="mr-2 text-green-600" /> 2024 : Stage Développeur — Bakeli, Sénégal
              </h3>

              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Développement d’un logiciel de gestion de stock et génération de tickets de caisse (Laravel et MySQL)</li>
                <li>Conception d’API et intégration des fonctionnalités (REST et Postman)</li>
                <li>Collaboration et suivi des tâches (Git et GitHub)</li>
                <li>Amélioration de l’UX et correction de bugs (debug et tests)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bouton flèche pour remonter en haut */}
      {showArrow && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
          aria-label="Retour en haut"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </Section>
  )
}
