'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaArrowUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Section } from '@/components/Section'
import Footer from '@/components/Footer'

export default function AProposPage() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Tableau des images du slider CODI
  const codiImages = [
    '/codi-event1.jpg',
    '/codi-event2.jpg'
  ]

  // Fonctions pour le slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === codiImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? codiImages.length - 1 : prev - 1))
  }

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <main className="pt-20" style={{ color: 'var(--text-1)' }}>
      {/* Section 1 : Introduction */}
      <Section customDelay={0}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Mon histoire commence ici</h1>
          <p className="text-lg leading-relaxed mb-4">
            Passionné par l'administration des systèmes et réseaux, je me suis lancé dans la tech pour relever des défis numériques et automatiser des tâches complexes.
          </p>
          <p className="text-lg leading-relaxed">
            Chaque défi est une occasion d'apprendre et d'innover. C'est dans cet esprit que mon aventure a débuté.
          </p>
        </div>
      </Section>

      {/* Image de passion */}
      <Section customDelay={0.2} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <Image
            src="/passion-horizontal.jpg"
            alt="Ma passion pour la tech"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
            priority
          />
        </motion.div>
      </Section>

      {/* Parcours académique */}
      <Section customDelay={0.4}>
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
          {[
            `Le soir du 3 juillet 2021, je vivais l'un de mes plus grands moments en décrochant mon baccalauréat scientifique (S2) au Sénégal, terre de la « teranga ».`,
            `Avant 2014, je n'avais jamais fréquenté l'école. En 2012, attiré par la radio et les documentaires, j'ai su que je devais apprendre. Malgré les réticences de certains parents sénégalais, j'ai persisté et commencé à m'auto-former en grammaire et conjugaison.`,
            `En 2014, grâce à ma détermination, j'ai intégré directement la classe de CM2. Après sept années d'études intenses, j'ai obtenu mon bac en 2021, soit en 7 ans au lieu des 13 habituels, témoignant de ma motivation et de mon ambition.`,
            `Après la 6e au Lycée des Parcelles Assainies (U14), j'ai sauté la 5e grâce à une procédure administrative réussie, soutenue par mes professeurs et un test. Chaque étape a renforcé ma capacité à relever des défis et à persévérer.`
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-lg leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </Section>

      {/* Image scolaire */}
      <Section customDelay={0.6} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <Image
            src="/schooling.jpg"
            alt="Mon parcours scolaire"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
          />
        </motion.div>
      </Section>

      {/* Histoire technique */}
      <Section customDelay={0.8}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Chaque ligne de code raconte une histoire</h2>
          <p className="text-lg leading-relaxed mb-4">
            Que ce soit un ping ou un déploiement automatisé, chaque commande révèle un défi technique et une solution ingénieuse.
          </p>
          <p className="text-lg leading-relaxed">
            J'ai appris à interpréter les flux réseau, diagnostiquer les erreurs et transformer ces données en infrastructures fiables.
          </p>
        </div>
      </Section>

      {/* Ambitions futures */}
      <Section customDelay={1.0}>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
          {[
            `Je souhaite devenir <strong>architecte systèmes, réseaux et cloud</strong> au sein d'un grand groupe pour acquérir une expertise avancée et piloter des infrastructures critiques.`,
            `Cette expérience me préparera à revenir au Sénégal et en Afrique pour <strong>fonder ma propre entreprise</strong>, promouvoir l'innovation locale et créer des opportunités économiques.`,
            `Mon objectif est de concevoir des architectures résilientes et évolutives qui stimuleront l'économie numérique africaine et inspireront la prochaine génération d'ingénieurs.`
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </div>
      </Section>

      {/* Image architecte */}
      <Section customDelay={1.2} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <Image
            src="/architecture.jpg"
            alt="Architecte systèmes et réseaux"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
          />
        </motion.div>
      </Section>

      {/* Présidence du CODI */}
      <Section customDelay={1.4}>
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6">Présidence du CODI : Une année transformative</h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}
          >
            En 2023, j'ai eu l'honneur d'être élu <strong>Président du CODI</strong> (Comité d'Organisation des Intégrations) à l'École Supérieure Polytechnique de Dakar. Ce comité crucial accompagne les nouveaux étudiants en informatique durant leurs premiers pas, en simplifiant leur intégration académique et administrative.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}
          >
            Notre mission : créer du lien. Par des <strong>soirées cinéma</strong>, des <strong>tournois inter-classes</strong>, et des ateliers pratiques, nous avons brisé les barrières entre promotions. Chaque événement était pensé pour mixer les générations, permettant aux anciens de partager leur expérience et aux nouveaux de trouver leur place.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}
          >
            Au-delà de l'animation, nous avons mis en place un <strong>système de parrainage</strong> et des permanences pour guider les étudiants dans les méandres administratifs. Résultat : une chute de 40% des requêtes redondantes au secrétariat et une meilleure cohésion départementale.
          </motion.p>
        </div>
      </Section>

      {/* Slider photos CODI */}
      <Section customDelay={1.5} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl relative"
        >
          <div className="relative overflow-hidden rounded-lg shadow-2xl" style={{ height: '600px' }}>
            {codiImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  transition: { duration: 0.5 }
                }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt={`Événement CODI ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
            aria-label="Image précédente"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
            aria-label="Image suivante"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {codiImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Compétences acquises */}
      <Section customDelay={1.6}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-8 rounded-xl shadow-lg"
            style={{ borderLeft: '3px solid var(--accent)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--accent)' }}>Leadership forgé dans l'action</h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Ce mandat a été mon accélérateur de croissance. Face aux <strong>directeurs d'école</strong>, j'ai appris à défendre des budgets avec des arguments percutants. Devant 300 étudiants, j'ai surmonté le trac pour <strong>porter une vision</strong>. Chaque crise gérée (annulation de sponsor, conflits entre promotions) a aiguisé mon <strong>calme stratégique</strong>.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
              Le plus précieux ? L'art de <strong>prendre des décisions impopulaires mais justes</strong>. Quand nous avons dû reporter un événement pour cause de grève, les critiques fusèrent. Mais en expliquant notre processus décisionnel transparent, nous avons gagné en crédibilité. Aujourd'hui, ces compétences irriguent chaque aspect de ma vie professionnelle : anticiper les objections, convaincre par les faits, et transformer chaque échec en levier.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Vision du monde */}
      <Section customDelay={1.8}>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
          <h2 className="text-3xl font-bold mb-4">Ma vision du monde</h2>
          {[
            `Face aux <strong>conflits et tensions géopolitiques</strong>, je suis convaincu que l'informatique peut fédérer les intérêts communs via des plateformes collaboratives sécurisées.`,
            `Je rêve d'un futur où chacun peut <strong>exprimer librement</strong> ses idées et <strong>circuler sans frontières</strong>, indépendamment de son origine, sa culture ou sa couleur de peau.`,
            `Mon espoir est de bâtir un monde où l'<strong>innovation profite à tous</strong>, offrant à chacun la chance de réaliser ses ambitions, sans barrières ni discriminations.`
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ))}
        </div>
      </Section>

      {/* Image vision */}
      <Section customDelay={2.0} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <Image
            src="/vision.jpg"
            alt="Ma vision pour l'avenir"
            width={1200}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
          />
        </motion.div>
      </Section>

      {/* Bouton retour en haut */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
          aria-label="Retour en haut"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}

      {/* Footer */}
      <Footer />
    </main>
  )
}
