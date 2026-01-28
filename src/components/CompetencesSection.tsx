//src/components/CompetencesSection.tsx
'use client'

import { Section } from '@/components/Section'
import { motion } from 'framer-motion'
import { FaServer, FaDesktop, FaCode, FaDatabase, FaProjectDiagram } from 'react-icons/fa'

export default function CompetencesSection() {
  return (
    <Section customDelay={0.4}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          COMPÉTENCES TECHNIQUES
        </h2>

        <div className="space-y-12">
          {/* Linux & Infrastructure */}
          <motion.div 
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <FaServer className="text-blue-600 mr-3" size={30} />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Linux & Infrastructure (Systèmes / Réseaux / Sécurité)
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Administration Linux : installation, durcissement, patching, systemd, gestion des services</li>
              <li>Réseau : adressage, VLAN, routage, DNS/DHCP, reverse proxy, troubleshooting (tcpdump, ss, journalctl)</li>
              <li>Sécurité opérationnelle : SSH hardening, gestion des droits (sudo/RBAC), principes moindre privilège</li>
              <li>Services d’infra : Nginx/Apache, Samba/NFS, certificats TLS/Let’s Encrypt</li>
              <li>Stockage : LVM, partitions, permissions, montages, quotas, stratégies de sauvegarde</li>
              <li>Documentation d’exploitation : procédures, standards, runbooks</li>
            </ul>
          </motion.div>

          {/* Cloud, Virtualisation & Conteneurs */}
          <motion.div 
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaDesktop className="text-purple-600 mr-3" size={30} />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Cloud, Virtualisation & Conteneurs
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Virtualisation : ESXi/vSphere, Proxmox, VMware Workstation, VirtualBox (templates, snapshots, ressources)</li>
              <li>Fondamentaux Cloud : compute, réseau, stockage, IAM, déploiement sur VM (AWS / GCP / OVHcloud)</li>
              <li>Conteneurisation : Docker (images, registries, réseaux, volumes, bonnes pratiques)</li>
              <li>Orchestration : bases Kubernetes (déploiements, services, ingress, config/secrets)</li>
              <li>Architecture : environnements séparés (dev/staging/prod), haute disponibilité, scalabilité</li>
            </ul>
          </motion.div>

          {/* DevOps & Automatisation */}
          <motion.div 
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <FaCode className="text-yellow-600 mr-3" size={30} />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                DevOps & Automatisation
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Automatisation : Ansible (inventaires, rôles) et scripting (Bash, Python)</li>
              <li>CI/CD : GitLab CI et GitHub Actions (build, tests, déploiement, secrets)</li>
              <li>Infrastructure as Code : Terraform (modules, state, bonnes pratiques)</li>
              <li>Gestion de configuration : standards, idempotence, pipelines reproductibles</li>
              <li>Git : workflow propre (branches, PR/MR, tags/versionning, revues)</li>
            </ul>
          </motion.div>

          {/* Observabilité, Logs & Données */}
          <motion.div 
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <FaDatabase className="text-green-600 mr-3" size={30} />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Observabilité, Logs & Données
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Monitoring : Prometheus et Grafana (métriques, dashboards, alerting)</li>
              <li>Supervision : Centreon / Nagios (checks, seuils, notifications)</li>
              <li>Logs : Elastic Stack (collecte, recherche, corrélation) et journald</li>
              <li>Sauvegardes : stratégies de rétention, restauration, tests de reprise (rsync, snapshots)</li>
              <li>Bases de données : MySQL/MariaDB et PostgreSQL (sécurité, sauvegarde, exploitation)</li>
            </ul>
          </motion.div>

          {/* Support, Gestion de Projet & Développement */}
          <motion.div 
            className="bg-gray-100 dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <FaProjectDiagram className="text-red-600 mr-3" size={30} />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Support, Gestion de Projet & Développement
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Support & exploitation : diagnostic, analyse de causes, gestion d’incidents, escalade, SLA</li>
              <li>Ticketing & suivi : GLPI et Jira (priorisation, reporting, communication)</li>
              <li>Méthodes : Scrum/Kanban, organisation, documentation claire et orientée production</li>
              <li>Développement utile à l’infra : API REST, scripts/outils internes, intégration et déploiement</li>
              <li>Web : Next.js/React, TypeScript, Tailwind CSS (interfaces propres et maintenables)</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}