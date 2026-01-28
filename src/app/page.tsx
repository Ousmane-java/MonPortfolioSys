'use client'

import AboutPreview from '@/components/AboutPreview'
import ExperienceSection from '@/components/ExperienceSection'
import CompetencesSection from '@/components/CompetencesSection'
import CompetenceMetricsSection from '@/components/CompetenceMetricsSection'
import ProjectsSection from '@/components/ProjectsSection'
import SituationProSection from '@/components/SituationProSection'
import ExtraSections from '@/components/ExtraSections'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <section id="a-propos">
        <AboutPreview />
      </section>
      <section id="experience">
        <ExperienceSection />
      </section>
      <section id="competences">
        <CompetencesSection />
      </section>
      <section id="mes-competences">
        <CompetenceMetricsSection />
      </section>
      <section id="projets">
        <ProjectsSection />
      </section>
      <section id="situation-pro">
        <SituationProSection />
      </section>
      <ExtraSections />
      <Footer />
    </main>
  )
}
