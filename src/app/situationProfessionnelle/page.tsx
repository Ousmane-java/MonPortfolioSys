'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import Footer from '@/components/Footer';
import ModalForm from '@/components/ModalForm';

interface Task {
  title: string;
  contexte: string;
  description: string[];
  environnement: string;
  moyens: string;
  competences: string[];
  lien?: string;
}

export default function SituationProfessionnellePage() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState('');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tasks: Task[] = [
    // -----------------------------
    // Open / SI
    // -----------------------------
    {
      title: 'MCO Linux & standardisation',
      contexte:
        "Alternance chez Open — Assurer le maintien en conditions opérationnelles d’un parc Linux en standardisant les configurations et en renforçant la fiabilité des services du SI.",
      description: [
        "Mise en place d’une baseline Linux (services systemd, configuration standard, bonnes pratiques).",
        "Gestion des mises à jour et patch management (maintenance planifiée, contrôle des versions).",
        "Durcissement des accès (SSH hardening, gestion sudo, principes du moindre privilège).",
        "Contrôles de conformité et corrections (permissions, services inutiles, sécurisation des configurations).",
        "Rédaction et mise à jour de procédures d’exploitation (runbooks).",
      ],
      environnement: 'Linux (Ubuntu/Debian), systemd, SSH, sudo, Bash',
      moyens:
        'Accès serveurs, dépôt Git interne, procédures SI, ticketing interne, environnement de test',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C1.6 Maintenir en conditions opérationnelles l’infrastructure',
        'C3.4 Gérer la sécurité des accès',
        'C4.2 Documenter techniquement les procédures internes',
      ],
    },
    {
      title: 'Automatisation d’exploitation (Ansible & Python)',
      contexte:
        "Alternance chez Open — Réduire les tâches manuelles et fiabiliser les opérations récurrentes via l’automatisation et la standardisation.",
      description: [
        "Automatisation des mises à jour et actions récurrentes (playbooks Ansible).",
        "Déploiement de configurations et services via rôles (idempotence, variables, inventaires).",
        "Scripting Python pour des contrôles (vérifications, collecte d’informations, reporting).",
        "Gestion sécurisée des secrets et bonnes pratiques d’exploitation (vault/variables sensibles).",
        "Traçabilité des exécutions et amélioration continue des playbooks.",
      ],
      environnement: 'Ansible, Python, Bash, SSH, Git',
      moyens:
        'Serveurs Linux, inventaires, dépôts Git, environnement de staging, documentation interne',
      competences: [
        'C2.4 Automatiser les procédures d’exploitation',
        'C1.6 Maintenir les systèmes en conditions opérationnelles',
        'C2.2 Assurer l’évolution des infrastructures',
        'C4.2 Rédiger une documentation technique',
      ],
    },
    {
      title: 'Supervision & observabilité (SI)',
      contexte:
        "Alternance chez Open — Mettre en place une visibilité fiable sur l’état des services du SI (disponibilité, performance, alertes) afin d’anticiper les incidents.",
      description: [
        "Mise en place/optimisation des dashboards de supervision et indicateurs clés.",
        "Configuration d’alertes pertinentes (seuils, criticité, réduction du bruit).",
        "Analyse d’incidents à partir des métriques et logs (diagnostic, actions correctives).",
        "Suivi de la disponibilité et des tendances (capacité, charges, dérives).",
        "Formalisation de runbooks et procédures d’astreinte/traitement.",
      ],
      environnement: 'Prometheus, Grafana, logs Linux (journald), outils de supervision',
      moyens:
        'Accès aux plateformes de monitoring, référentiels d’alertes, incidents/tickets, documentation interne',
      competences: [
        'C2.6 Superviser le SI et les applications',
        'C1.5 Gérer les alertes et les correctifs',
        'C1.6 Maintenir en conditions opérationnelles',
        'C4.1 Communiquer avec les acteurs internes',
      ],
    },
    {
      title: 'Support N2/N3 & gestion des incidents',
      contexte:
        "Alternance chez Open — Contribuer au support et à l’exploitation du SI (incidents, demandes, améliorations) avec un traitement structuré et documenté.",
      description: [
        "Prise en charge de tickets : qualification, priorisation, diagnostic et résolution.",
        "Analyse de causes racines (RCA) et actions correctives/préventives.",
        "Standardisation des procédures de résolution (documentation, checklists, runbooks).",
        "Amélioration continue : propositions d’optimisation et réduction des récurrences.",
        "Communication claire avec les équipes (suivi, comptes-rendus, escalade).",
      ],
      environnement: 'Linux, ticketing (ITSM), documentation interne, Git',
      moyens:
        'Outil de ticketing, accès serveurs/applicatifs, base de connaissances interne, procédures SI',
      competences: [
        'C2.7 Organiser l’assistance technique',
        'C1.6 Maintenir en conditions opérationnelles',
        'C4.1 Communiquer avec les acteurs internes',
        'C4.2 Documenter techniquement les procédures internes',
      ],
    },

    // -----------------------------
    // Support Systèmes / Réseaux
    // -----------------------------
    {
      title: 'Support Systèmes & Réseaux — Diagnostic & dépannage',
      contexte:
        "En contexte support, intervenir sur des incidents systèmes et réseaux pour rétablir le service rapidement et fiabiliser l’environnement.",
      description: [
        "Diagnostic réseau : tests de connectivité, analyse DNS/DHCP, routage de base, vérification des ACL/règles.",
        "Diagnostic Linux : services systemd, logs journald, ressources (CPU/RAM/disque), droits/permissions.",
        "Analyse et résolution : identification de la cause, correction, validation, retour à l’état nominal.",
        "Rédaction de compte-rendu : actions effectuées, cause racine, recommandations de prévention.",
        "Escalade structurée si nécessaire (N3) avec éléments techniques exploitables.",
      ],
      environnement:
        'Linux, TCP/IP, DNS/DHCP, SSH, journalctl, ss/netstat, ping/traceroute, tcpdump',
      moyens:
        'Accès serveurs, outils CLI, procédures internes, base de connaissances, ticketing',
      competences: [
        'C2.7 Organiser l’assistance technique',
        'C1.6 Maintenir en conditions opérationnelles',
        'C1.5 Gérer les alertes et les correctifs',
        'C4.1 Communiquer avec les acteurs internes',
      ],
    },
    {
      title: 'Support Réseau — Mise en service & sécurisation',
      contexte:
        "En contexte support, contribuer à la mise en service et à la sécurisation d’éléments réseau (segmentation, accès, services) avec validation et documentation.",
      description: [
        "Mise en place/ajustements de VLAN et segmentation (logique de cloisonnement, règles d’accès).",
        "Configuration et validation de services réseau : DNS, DHCP, reverse proxy (selon contexte).",
        "Sécurisation des accès : durcissement SSH, gestion des comptes, moindre privilège.",
        "Vérifications post-changement : tests, monitoring, rollback si besoin.",
        "Documentation : procédures, schémas simples, checklists de mise en production.",
      ],
      environnement:
        'Réseaux (VLAN, routage), Linux, pfSense (selon contexte), DNS/DHCP, SSH',
      moyens: 'Schémas, outils de test, accès admin, procédures, ticketing, documentation',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C3.3 Mettre en œuvre les protections réseau',
        'C3.4 Gérer la sécurité des accès',
        'C4.2 Documenter techniquement les procédures internes',
      ],
    },

    // -----------------------------
    // MSPR / Projets
    // -----------------------------
    {
      title: 'Infrastructure virtuelle',
      contexte:
        'Concevoir l’ossature d’un système d’information pour l’entreprise NFL IT, en simulant un environnement virtuel complet composé du siège, d’un datacenter et d’une franchise distante.',
      description: [
        'Installation et configuration de VMware ESXi sur chaque hôte.',
        'Création et organisation de vSwitch pour la segmentation réseau.',
        'Déploiement de machines virtuelles pour les rôles DNS, DHCP, etc.',
        'Mise en œuvre des VLANs et de la gestion des ports réseau.',
        'Mise en place d’une architecture réaliste : LAN, DMZ, WAN.',
        'Réalisation d’un schéma topologique documenté.',
      ],
      environnement: 'VMware ESXi, vSphere, VLAN, vSwitch, Ubuntu Server (ISO)',
      moyens:
        'PC hôte, VMware Workstation, ISO serveurs, documentation VMware, cahier des charges',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C1.2 Concevoir une infrastructure virtuelle',
        'C1.6 Maintenir en conditions opérationnelles l’infrastructure',
        'C2.3 Planifier le déploiement des matériels et logiciels',
      ],
    },
    {
      title: 'Services réseaux',
      contexte:
        "Fournir les services réseaux essentiels à l’infrastructure du siège afin d'assurer l'automatisation de l’adressage IP, la résolution des noms internes, et la gestion centralisée des demandes utilisateurs.",
      description: [
        'Installation et configuration du serveur DNS interne.',
        'Mise en place d’un serveur DHCP avec une stratégie d’attribution dynamique.',
        'Déploiement de GLPI comme solution de ticketing.',
        'Intégration d’un monitoring de base pour les services.',
        'Tests fonctionnels : résolution DNS et attribution IP.',
      ],
      environnement: 'Debian Server, ISC DHCP Server',
      moyens: 'VM ESXi, documentation officielle',
      competences: [
        'C1.1 Administrer le SI',
        'C1.5 Identifier les besoins en correctifs',
        'C2.6 Superviser l’infrastructure',
        'C2.7 Gérer l’assistance utilisateurs',
      ],
    },
    {
      title: 'Cluster web',
      contexte:
        "Garantir la haute disponibilité de l’application web Seahawks Nester pour l’ensemble des franchises en mettant en œuvre une solution de clustering web.",
      description: [
        'Installation de deux serveurs Nginx configurés en actif/passif.',
        'Partage des fichiers avec DRBD ou NFS.',
        'Mise en place du failover avec Pacemaker et Corosync.',
        'Déploiement de l’application Seahawks Nester avec base de données MariaDB.',
        'Tests de basculement et validation de la résilience.',
      ],
      environnement: 'Ubuntu Server, Nginx, MariaDB',
      moyens: "Scripts d'installation, documentation applicative",
      competences: [
        'C1.1 Administrer le SI',
        'C1.4 Maintenir une infrastructure haute disponibilité',
        'C3.1 Définir une politique de continuité d’activité',
        'C1.3 Identifier les composants à corriger',
      ],
    },
    {
      title: 'Supervision',
      contexte:
        "Permettre la surveillance proactive de tous les équipements critiques de l’infrastructure IT via une solution de supervision centralisée.",
      description: [
        'Installation de Zabbix Server.',
        'Déploiement et configuration des agents sur tous les serveurs.',
        'Création de tableaux de bord personnalisés avec alertes.',
        'Génération automatique de rapports (disponibilité, charge, incidents).',
        'Intégration de sondes pour les services critiques.',
      ],
      environnement: 'Zabbix, Ubuntu Server',
      moyens: 'VM, documentation Zabbix',
      competences: [
        'C2.6 Superviser le SI et les applications',
        'C1.5 Gérer les alertes et les correctifs',
        'C1.4 Consolider les services critiques',
        'C3.5 Identifier les vulnérabilités et appliquer des mesures préventives',
      ],
    },
    {
      title: 'VPN IPsec inter-sites',
      contexte:
        'Assurer la sécurité des échanges inter-sites (siège ↔ datacenter) via un tunnel VPN IPsec, tout en cloisonnant les flux à l’aide de pare-feux pfSense.',
      description: [
        'Déploiement de deux firewalls pfSense sur les deux sites.',
        'Configuration des interfaces, NAT, VLAN et routage.',
        'Création et test d’un tunnel VPN IPsec chiffré.',
        'Mise en œuvre de règles de filtrage strictes.',
        'Vérification de la communication inter-sites via le VPN.',
      ],
      environnement: 'pfSense, IPsec',
      moyens: 'ISO pfSense, schémas réseau, documentation de sécurité',
      competences: [
        'C3.1 Élaborer une politique de sécurité réseau',
        'C3.3 Mettre en œuvre les protections réseau',
        'C3.6 Corriger les failles de sécurité',
        'C1.1 Administrer le SI de manière sécurisée',
      ],
    },
    {
      title: 'Télémaintenance',
      contexte:
        "Mettre en place une solution sécurisée de télémaintenance permettant aux techniciens du siège d'intervenir sur les serveurs distants en cas de panne ou de dysfonctionnement.",
      description: [
        'Configuration d’un tunnel SSH inversé pour accéder aux serveurs protégés.',
        'Déploiement de VNC sécurisé pour une prise de main graphique.',
        'Mise en œuvre d’une authentification par clés RSA.',
        "Rédaction d’une procédure d’exploitation pour les équipes support.",
        'Scénarios de test simulés pour valider la connectivité.',
      ],
      environnement: 'SSH, VNC',
      moyens: 'Clés SSH, scripts de tunnelisation',
      competences: [
        'C3.4 Gérer la sécurité des accès',
        'C1.1 Administrer les accès à distance',
        'C2.7 Organiser l’assistance technique',
        'C4.1 Communiquer avec les équipes internes',
      ],
    },
    {
      title: 'Versioning',
      contexte:
        "Centraliser le développement et l’administration de l’application Seahawks Nester dans un espace collaboratif sécurisé, et intégrer la base de gestion Nester Manager.",
      description: [
        'Installation de GitLab CE en local sur une VM dédiée.',
        'Création des projets, utilisateurs et gestion des accès SSH.',
        'Intégration de la base de données MariaDB pour le module Nester Manager.',
        'Mise en place d’un plan de sauvegarde automatique.',
        'Documentation de l’architecture DevOps interne.',
      ],
      environnement: 'GitLab CE, MariaDB',
      moyens: 'Scripts de déploiement, fichiers SQL, VM dédiée, guides GitLab',
      competences: [
        'C1.1 Administrer les applications et bases de données',
        'C1.5 Maintenir les mises à jour des services',
        'C2.2 Assurer l’évolution des infrastructures',
        'C4.2 Rédiger une documentation technique',
      ],
    },
    {
      title: 'Active Directory',
      contexte:
        "Entreprise InnovQube – Mise en place d’un annuaire centralisé pour la gestion des utilisateurs, des groupes et des politiques de sécurité.",
      description: [
        'Installation et configuration du rôle Active Directory Domain Services (ADDS).',
        'Création du domaine et promotion du contrôleur de domaine.',
        'Gestion des unités organisationnelles (OU) pour les utilisateurs, groupes, machines.',
        'Mise en place de GPO (Group Policy Objects) pour sécuriser l’environnement Windows.',
        "Tests d’authentification et de réplication AD sur un deuxième contrôleur.",
      ],
      environnement: 'Windows Server 2019, GPO',
      moyens: 'VM Windows Server',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C1.2 Concevoir une infrastructure virtuelle',
        'C3.1 Définir une politique de sécurité SI',
        'C4.1 Communiquer avec les acteurs internes',
      ],
    },
    {
      title: 'Segmentation',
      contexte:
        "Mise en œuvre de la segmentation réseau entre les différents services de l’entreprise.",
      description: [
        'Création de VLAN pour les services : Admin, Users, DMZ, Management.',
        'Configuration des interfaces de routage sur pfSense.',
        'Règles de filtrage inter-VLAN avec pfSense (accès restreint entre services).',
        "Tests de connectivité et d’isolation réseau.",
        "Documentation du plan d’adressage et des règles de sécurité.",
      ],
      environnement: 'pfSense, VLANs, switchs virtuels, VMware vSwitch',
      moyens: 'VM pfSense, documentation réseau, outils de test (ping, traceroute)',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C3.3 Configurer les solutions de sécurité classiques',
        'C3.5 Identifier les vulnérabilités et prévenir les risques',
        'C3.6 Appliquer des mesures correctives aux failles de sécurité',
      ],
    },
    {
      title: 'rSyslog',
      contexte:
        'Entreprise NFL IT – Collecte centralisée et analyse des logs système du pare-feu pour audit et supervision.',
      description: [
        'Installation de rSyslog sur un serveur central.',
        'Configuration de l’expédition des logs depuis pfSense vers rSyslog.',
        'Filtrage et tri des logs en fonction du service ou niveau de criticité.',
        'Analyse manuelle et automatisée (grep, journalctl, alertes).',
        "Documentation et plan d’archivage des logs critiques.",
      ],
      environnement: 'rSyslog, pfSense, Linux Ubuntu Server',
      moyens: 'Script de configuration, documentation logs, accès root sur les VMs',
      competences: [
        'C2.6 Superviser le SI et les applications',
        'C3.5 Identifier les vulnérabilités et prévenir les risques',
        'C3.6 Appliquer des mesures correctives aux failles de sécurité',
        'C4.2 Documenter techniquement les procédures internes',
      ],
    },
    {
      title: 'Serveurs physiques',
      contexte:
        'Entreprise InnovQube – Préparation de serveurs physiques (Supermicro, Dell, HP) pour accueillir une infrastructure virtualisée stable avec monitoring à distance.',
      description: [
        'Accès à l’interface IPMI/iDRAC/iLO pour console distante.',
        'Réglage du BIOS : ordre de boot, virtualisation (VT-x), désactivation des options non essentielles.',
        'Mise en œuvre du monitoring matériel via IPMI (température, ventilateurs).',
        'Installation et configuration de Proxmox : stockage, réseau (bridge, VLAN), VMs de test.',
        'Clonage de la configuration sur plusieurs serveurs physiques.',
      ],
      environnement: 'Proxmox, IPMI, BIOS, Dell iDRAC, HP, Linux',
      moyens:
        'Accès distant IPMI, documentations serveurs constructeurs, clé USB boot',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C1.2 Concevoir une infrastructure virtuelle',
        'C1.6 Maintenir en conditions opérationnelles l’infrastructure',
        'C2.2 Gérer l’évolution des infrastructures IT',
        'C2.3 Planifier le déploiement des matériels et logiciels',
      ],
    },
    {
      title: 'Seahawks Monitoring',
      contexte:
        'EPSI Lyon – Projet personnel réalisé dans le cadre de la formation ASR (Administration Systèmes et Réseaux).',
      description: [
        'Développement d’un script de scan réseau automatique basé sur nmap.',
        'Détection du sous-réseau local /24 et analyse des ports ouverts.',
        'Interface web responsive (Bootstrap 5) pour visualisation des résultats.',
        'Envoi des données vers un serveur cloud Dockerisé (Cloud Run).',
        'Automatisation des mises à jour via Bash (git pull, dépendances).',
      ],
      environnement: 'nmap, Bash, Bootstrap 5, Docker, Google Cloud Run',
      moyens: 'Scripts Bash, documentation API Cloud, VM locale et cloud',
      competences: [
        'C1.1 Administrer l’infrastructure informatique',
        'C2.6 Superviser le SI et les applications',
        'C4.2 Documenter techniquement les procédures internes',
        'C3.5 Identifier les vulnérabilités et prévenir les risques',
      ],
      lien: 'https://github.com/Ousmane-java/MSPR1-EPSI',
    },
    {
      title: 'Mapping LDAP',
      contexte:
        'Entreprise InnovQube – Mise en place d’une correspondance claire entre les groupes LDAP (DL) et les rôles de la plateforme Teleport.',
      description: [
        'Analyse des groupes existants dans Active Directory (DL_*).',
        'Établissement d’un tableau de correspondance LDAP → Rôle Teleport.',
        'Définition des labels Teleport et des rôles associés (admin, maintainer, reader).',
        'Justification technique des rôles attribués selon AGDLP.',
        "Livraison d’un fichier Excel et documentation d’intégration.",
      ],
      environnement: 'Teleport, LDAP, Active Directory',
      moyens: 'Fichier gestion_des_acces.xlsx, dépôt Git, document de consignes',
      competences: [
        'C3.1 Définir une politique de sécurité SI',
        'C3.5 Identifier les vulnérabilités et prévenir les risques',
        'C4.1 Communiquer avec les acteurs internes',
        'C4.2 Documenter techniquement les procédures internes',
      ],
    },
    {
      title: 'Automatisation avec Ansible',
      contexte:
        "Dans le cadre de mon stage chez InnovQube, nous utilisons Ansible pour automatiser la gestion des serveurs physiques et virtuels (Debian/Ubuntu). Cette approche vise à renforcer la cohérence, la rapidité et la sécurité des opérations récurrentes sur l’infrastructure.",
      description: [
        'Écriture de playbooks pour mettre à jour (`apt update`) et upgrader (`apt upgrade`) automatiquement les serveurs.',
        'Installation automatisée de paquets essentiels : nginx, fail2ban, zabbix-agent, git, curl, etc.',
        'Déploiement de configurations via des rôles personnalisés (nginx reverse proxy, configuration réseau, sécurité SSH).',
        'Centralisation des logs d’exécution pour audit et traçabilité des actions.',
        'Utilisation d’Ansible Vault pour sécuriser les variables sensibles.',
        "Gestion d’inventaires dynamiques en fonction de l’environnement (production, test).",
      ],
      environnement: 'Ansible, Debian/Ubuntu Server, Inventaire YAML, Playbooks, Vault',
      moyens:
        'Réseau interne, Serveurs physiques Dell/HP, VM, éditeurs de texte (VS Code), SSH',
      competences: [
        'C1.1 Administrer le SI via des outils d’automatisation',
        'C1.6 Maintenir les systèmes en conditions opérationnelles',
        'C2.4 Automatiser les procédures d’exploitation',
        'C3.3 Mettre en œuvre des protections standardisées',
        'C4.2 Rédiger des procédures techniques',
      ],
    },
    {
      title: 'Portfolio',
      contexte:
        "Projet personnel – Mise en place d’un portfolio Next.js dans un environnement DevOps auto-hébergé, démontrant la capacité à concevoir, sécuriser et maintenir une infrastructure web complète.",
      description: [
        'Configuration d’un serveur NGINX sur une VM Ubuntu hébergée localement.',
        'Obtention d’un certificat SSL via Let’s Encrypt (Certbot) avec redirection HTTPS.',
        'Déploiement d’un projet Next.js optimisé en production avec PM2.',
        'Redirection de ports 80/443 depuis la box Internet vers la VM.',
        'Gestion complète de l’infrastructure de manière autonome et sécurisée.',
      ],
      environnement: 'Next.js, Tailwind CSS, NGINX, Certbot, Ubuntu Server, PM2',
      moyens: 'VM Ubuntu, nom de domaine OVH, scripts de déploiement, documentation DevOps',
      competences: [
        'C1.1 Administrer les services web',
        'C1.6 Maintenir en condition opérationnelle',
        'C2.6 Superviser les déploiements',
        'C4.2 Documenter techniquement les procédures internes',
      ],
      lien: 'https://www.ousmanedrame.com',
    },

    // -----------------------------
    // InfraMap (3 tâches) — en dernier + lien
    // -----------------------------
    {
      title: 'InfraMap — Conception & développement du SaaS (Full-stack)',
      contexte:
        "Projet SaaS personnel — Conception, développement et lancement de InfraMap, une plateforme de gestion de parc serveurs et de suivi multi-clients (inventaire, supervision, historique).",
      description: [
        "Définition du produit : besoins, périmètre MVP, roadmap et priorisation des fonctionnalités.",
        "Développement de l’interface web : pages clés, composants réutilisables, responsive design, UX orientée clarté.",
        "Conception des APIs : endpoints structurés, gestion des erreurs, validation des données, logique métier.",
        "Sécurisation applicative : authentification, contrôle d’accès, gestion des sessions, bonnes pratiques côté serveur.",
        "Qualité et maintenabilité : modularisation, conventions de code, refactoring continu, documentation technique.",
      ],
      environnement:
        'Next.js/React, TypeScript, API REST, Git/GitHub, Tailwind CSS, bonnes pratiques sécurité',
      moyens:
        'Repo GitHub, environnement local + préprod, outillage dev (lint, build), suivi de tâches',
      competences: [
        'C2.2 Assurer l’évolution des infrastructures',
        'C4.2 Rédiger une documentation technique',
        'C1.6 Maintenir en conditions opérationnelles',
        'C4.1 Communiquer avec les acteurs internes',
      ],
      lien: 'https://inframap.io/',
    },
    {
      title: 'InfraMap — CI/CD, versioning & déploiement continu',
      contexte:
        "Projet SaaS personnel — Mise en place d’un flux CI/CD complet pour livrer InfraMap de manière fiable (build, tests, déploiement) avec une logique de versioning.",
      description: [
        "Mise en place de pipelines CI/CD : build, contrôle qualité (lint/typecheck), packaging et déploiement.",
        "Gestion des secrets et variables d’environnement : séparation dev/staging/prod et bonnes pratiques de sécurité.",
        "Versioning : tags/releases, suivi des changements, rollback si nécessaire.",
        "Automatisation des livraisons : déploiement à chaque merge sur la branche principale selon règles définies.",
        "Stabilisation : corrections rapides après logs d’erreurs, amélioration continue du pipeline.",
      ],
      environnement:
        'GitHub Actions / CI, Docker, variables d’environnement, Git flow (branches, PR), releases',
      moyens:
        'Pipelines CI, dépôts Git, environnements séparés, logs de build, checklists de release',
      competences: [
        'C2.4 Automatiser les procédures d’exploitation',
        'C1.6 Maintenir en conditions opérationnelles',
        'C4.2 Documenter techniquement les procédures internes',
        'C1.5 Gérer les alertes et les correctifs',
      ],
      lien: 'https://inframap.io/',
    },
    {
      title: 'InfraMap — Exploitation Docker, monitoring applicatif & fiabilité',
      contexte:
        "Projet SaaS personnel — Exploitation et maintien en conditions opérationnelles de InfraMap : conteneurs Docker, suivi des logs, stabilité et amélioration de la fiabilité.",
      description: [
        "Conteneurisation : création/maintien d’images Docker, gestion des volumes, réseaux, bonnes pratiques.",
        "Supervision d’exploitation : suivi des logs Docker, détection d’erreurs, identification rapide des incidents.",
        "Fiabilisation : redémarrages contrôlés, stratégies de relance, vérifications post-déploiement.",
        "Sécurité & accès : durcissement de l’exécution, gestion des secrets, configuration des environnements.",
        "Documentation d’exploitation : runbooks, procédures de diagnostic, checklist de mise en production.",
      ],
      environnement:
        'Docker, logs (stdout/stderr), Linux, reverse proxy (selon hébergement), pratiques MCO',
      moyens:
        'Serveur/hébergement, accès shell, logs, outils de diagnostic, documentation d’exploitation',
      competences: [
        'C1.6 Maintenir en conditions opérationnelles',
        'C2.6 Superviser le SI et les applications',
        'C1.5 Gérer les alertes et les correctifs',
        'C4.2 Documenter techniquement les procédures internes',
      ],
      lien: 'https://inframap.io/',
    },
  ];

  const handleClick = (task: Task) => {
    if (task.lien) {
      window.open(task.lien, '_blank');
    } else {
      setSelectedTaskTitle(task.title);
      setModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-16 px-4 flex flex-col">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Situations professionnelles
      </motion.h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
        Il s&apos;agit de l’ensemble des tâches concrètes réalisées dans un cadre professionnel, académique ou personnel.
      </p>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto flex-grow">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            className="glass rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-zinc-800 dark:text-white">
              {task.title}
            </h3>

            <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
              <strong>Contexte :</strong> {task.contexte}
            </p>

            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Description :</strong>
              <ul className="list-disc ml-5 mt-1">
                {task.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Environnement :</strong> {task.environnement}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>Moyens :</strong> {task.moyens}
            </p>

            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <strong>Compétences :</strong>
              <ul className="list-disc ml-5 mt-1">
                {task.competences.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleClick(task)}
              className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:scale-105 transition font-medium"
            >
              🎓 Productions
            </button>
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

      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        taskTitle={selectedTaskTitle}
      />
    </main>
  );
}
