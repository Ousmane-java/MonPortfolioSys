/* eslint-disable react/no-unescaped-entities */

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
          {/* Administration Systèmes et Réseaux - entrée depuis la gauche */}
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
                Administration Systèmes et Réseaux
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Installation, configuration et maintenance de serveurs (Linux et Windows Server)</li>
              <li>Services réseau : DHCP, DNS, FTP, TFTP, NTP, NFS, Apache/Nginx</li>
              <li>Routage, VLANs, pare-feu, surveillance réseau (SNMP, Nagios, Zabbix)</li>
              <li>Supervision et monitoring d'infrastructure (Centreon, Grafana)</li>
            </ul>
          </motion.div>
          
          {/* Systèmes d’Exploitation, Virtualisation & Stockage - entrée depuis la droite */}
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
                Systèmes d’Exploitation, Virtualisation & Stockage
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Environnements : Linux (Debian, Ubuntu, CentOS), Windows</li>
              <li>Virtualisation : VMware Workstation, VMware ESXi, VirtualBox, Proxmox</li>
              <li>Conteneurisation : Docker</li>
              <li>Solutions de stockage : NAS, NFS, Samba, LVM</li>
            </ul>
          </motion.div>
          
          {/* Scripting & Automatisation - entrée depuis le bas */}
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
                Scripting & Automatisation
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Scripting Shell : Bash, PowerShell</li>
              <li>Automatisation : Cron, Ansible (débutant), scripts Python pour automatisation système</li>
            </ul>
          </motion.div>
          
          {/* Développement & Bases de Données - entrée depuis le haut */}
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
                Développement & Bases de Données
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Développement : Python (Flask, Django), HTML/CSS (Bootstrap), JavaScript</li>
              <li>Bases de données : MySQL / MariaDB, PostgreSQL, MongoDB</li>
              <li>Conception de schémas et requêtage SQL (CRUD, jointures, vues)</li>
            </ul>
          </motion.div>
          
          {/* Gestion de Projet & Méthodologies - entrée avec zoom et rotation */}
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
                Gestion de Projet & Méthodologies
              </h3>
            </div>
            <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Gestion de projet agile (Scrum, Kanban)</li>
              <li>Utilisation d’outils collaboratifs : Jira, Trello, OpenProject</li>
              <li>Suivi des tâches, sprints, tickets, documentation technique</li>
              <li>Communication inter-équipes (rédaction de rapports, tableaux de bord)</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
