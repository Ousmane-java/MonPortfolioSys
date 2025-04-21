// src/components/Section.tsx
'use client'

import { motion } from 'framer-motion'

type SectionProps = {
  children: React.ReactNode
  customDelay?: number
  className?: string
}

export const Section = ({ children, customDelay = 0, className = '' }: SectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: customDelay }}
      className={`my-12 px-4 ${className}`}
    >
      {children}
    </motion.section>
  )
}
