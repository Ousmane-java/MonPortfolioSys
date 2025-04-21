/* eslint-disable react/no-unescaped-entities */

'use client'

import { Section } from '@/components/Section'
import { motion } from 'framer-motion'
import { FaServer, FaCode, FaArrowUp } from 'react-icons/fa'
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
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
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
          {/* Expérience 1 : Administrateur Système */}
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
                IconComponent={FaServer}
                borderColor="#3b82f6"
                iconColor="#3b82f6"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-2xl font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-100">
                <FaServer className="mr-2 text-blue-600" /> Mars 2025 - En cours : Stage Administrateur Système sous Linux — InnovQube, France
              </h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Administration et optimisation d’infrastructures sous Linux</li>
                <li>Déploiement et configuration de nouvelles solutions techniques</li>
                <li>Sécurisation des accès et gestion des permissions</li>
                <li>Gestion du stockage</li>
                <li>Supervision et monitoring des systèmes IT</li>
                <li>Automatisation des tâches via des outils DevOps</li>
              </ul>
            </div>
          </motion.div>
          
          {/* Expérience 2 : Développeur */}
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
                <li>Développement d’un logiciel de gestion de stock et génération de tickets de caisse avec Laravel</li>
                <li>Collaboration avec les parties prenantes pour assurer la performance et la conformité du logiciel</li>
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
