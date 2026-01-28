//src/components/CompetenceMetricsSection.tsx
'use client'

import { motion, useInView, TargetAndTransition } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Server, Network, Settings } from 'lucide-react'

// Composant pour afficher l'animation du cercle ET l'icône tournante
const AnimatedCircle = ({
  percentage,
  strokeColor,
  Icon,
}: {
  percentage: number
  strokeColor: string
  Icon: React.ElementType
}) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const [progress, setProgress] = useState(0)

  const circleRef = useRef(null)
  const isInView = useInView(circleRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let current = 0
      const interval = setInterval(() => {
        if (current < percentage) {
          current++
          setProgress(current)
        } else {
          clearInterval(interval)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isInView, percentage])

  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative w-28 h-28" ref={circleRef}>
      <svg width="120" height="120">
        {/* Cercle de fond */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        {/* Cercle animé */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ rotate: -90, transformOrigin: '50% 50%' }}
        />
      </svg>
      {/* Icône et pourcentage centré */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-100" />
        </motion.div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">{progress}%</span>
      </div>
    </div>
  )
}

// Composant pour une carte de compétence
const CompetenceCard = ({
  title,
  percentage,
  Icon,
  strokeColor,
  initialVariant,
}: {
  title: string
  percentage: number
  Icon: React.ElementType
  strokeColor: string
  initialVariant: TargetAndTransition
}) => {
  return (
    <motion.div
      className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg flex flex-col items-center"
      initial={initialVariant}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-4">
        <AnimatedCircle percentage={percentage} strokeColor={strokeColor} Icon={Icon} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        {title}
      </h3>
    </motion.div>
  )
}

export default function CompetenceMetricsSection() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          MES COMPÉTENCES
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <CompetenceCard
            title="Système d'information"
            percentage={50}
            Icon={Server}
            strokeColor="#3b82f6"
            initialVariant={{ opacity: 0, x: -100 }}
          />
          <CompetenceCard
            title="Infrastructures"
            percentage={30}
            Icon={Network}
            strokeColor="#10b981"
            initialVariant={{ opacity: 0, y: 100 }}
          />
          <CompetenceCard
            title="Autres"
            percentage={20}
            Icon={Settings}
            strokeColor="#f59e0b"
            initialVariant={{ opacity: 0, x: 100 }}
          />
        </div>
      </div>
    </section>
  )
}
