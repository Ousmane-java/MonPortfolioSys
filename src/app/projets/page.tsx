'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  cta: string;
  color: string;
}

const allProjects: Project[] = [
  {
    title: 'InfraMap',
    description:
      "InfraMap est une plateforme SaaS de gestion de parc serveurs pensée pour les équipes infra et MSP. Elle centralise l'inventaire des serveurs, des clients et de leurs contrats dans une vue claire. La plateforme intègre une supervision en temps réel (état, métriques, alertes) et une vue unifiée par client pour suivre la disponibilité, les engagements, les incidents et l'historique des actions.",
    tags: ['Next.js', 'TypeScript', 'Docker', 'CI/CD', 'SaaS'],
    link: 'https://www.inframap.io',
    cta: 'Voir InfraMap →',
    color: '#00d4ff',
  },
  {
    title: 'Kyosk',
    description:
      "Kyosk est la premi\xe8re application mobile d\xe9di\xe9e \xe0 la presse s\xe9n\xe9galaise et africaine. Acc\xe9dez instantan\xe9ment \xe0 vos journaux, magazines et milliers de livres et ebooks directement depuis votre iPhone, o\xf9 que vous soyez au S\xe9n\xe9gal ou dans la diaspora.",
    tags: ['Mobile', 'Presse', 'iOS', 'S\xe9n\xe9gal', 'Afrique'],
    link: 'https://www.kyosk.sn',
    cta: 'Voir Kyosk →',
    color: '#00ff88',
  },
  {
    title: 'Seahawks Monitoring System',
    description:
      "Solution de scan réseau automatisé dotée d'une interface web intuitive. Réalisé dans le cadre de ma formation en Administration Systèmes et Réseaux à l'EPSI Lyon, ce projet scanne automatiquement les machines d'un réseau local, détecte les ports ouverts et envoie les résultats à un serveur central hébergé dans le Cloud.",
    tags: ['nmap', 'Bash', 'Docker', 'Cloud Run', 'Bootstrap'],
    link: 'https://github.com/Ousmane-java/MSPR1-EPSI',
    cta: 'Voir sur GitHub →',
    color: '#f59e0b',
  },
  {
    title: 'Seahawks Nester & Infrastructure MSPR',
    description:
      "Projet majeur réalisé dans le cadre de la MSPR TPTE512. Infrastructure complète conçue pour NFL IT : infrastructure virtuelle sous ESXi, services critiques (DHCP, DNS, Ticketing), cluster haute disponibilité, firewalls pfSense, tunnel VPN IPsec, supervision Zabbix, télémaintenance SSH et gestion de versions avec GitLab CE.",
    tags: ['VMware ESXi', 'pfSense', 'Zabbix', 'GitLab', 'Linux', 'VPN IPsec'],
    link: 'https://github.com/Ousmane-java/MSPR1-EPSI',
    cta: 'Voir sur GitHub →',
    color: '#818cf8',
  },
  {
    title: 'Portfolio',
    description:
      "Portfolio personnel développé avec Next.js et déployé sur une VM Ubuntu auto-hébergée. Configuration NGINX comme reverse proxy, certificat SSL via Let's Encrypt (Certbot), et gestion du processus avec PM2. Infrastructure entièrement gérée de manière autonome.",
    tags: ['Next.js', 'NGINX', 'Ubuntu', 'PM2', 'Certbot', 'Tailwind CSS'],
    link: 'https://www.ousmanedrame.com',
    cta: 'Voir le site →',
    color: '#f97316',
  },
];

export default function ProjetsPage() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 flex flex-col">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mes Projets
      </motion.h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
        Projets personnels, académiques et professionnels réalisés dans le cadre de ma formation et de mon parcours.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto flex-grow">
        {allProjects.map((project, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6 shadow-md"
            style={{ borderLeft: `3px solid ${project.color}` }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: project.color, boxShadow: `0 0 6px ${project.color}` }}
              />
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">
                {project.title}
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:scale-105 transition font-medium text-sm"
            >
              {project.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          aria-label="Retour en haut"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}

      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
