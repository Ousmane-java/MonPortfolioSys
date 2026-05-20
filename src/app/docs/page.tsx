'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import {
  BookOpen,
  Search,
  Copy,
  Printer,
  ExternalLink,
  CheckCircle2,
  Wrench,
  Clock,
  Tag,
  PanelLeft,
  X,
  Hash,
  ChevronRight,
  FileText,
} from 'lucide-react'

type DocBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'callout'; tone: 'info' | 'warn' | 'success'; title: string; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; label?: string; language?: string; code: string }
  | { type: 'divider' }

type DocItem = {
  id: string
  title: string
  category: 'Introduction' | 'Résolutions'
  updatedAt: string
  tags: string[]
  summary: string
  blocks: DocBlock[]
}

/**
 * IMPORTANT :
 * Ne jamais mettre `${{ ... }}` dans une string en backticks (template literal).
 * Sinon TS/JS tente d'interpoler `${ ... }` => crash.
 */
const ghaCacheSnippet = [
  '# Exemple : key basée sur lockfile (stable)',
  "# key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}",
  '',
  '# Stratégie :',
  '# 1) Désactiver cache 1 run si doute',
  '# 2) Relancer',
  '# 3) Réactiver avec une key déterministe (hash lockfile)',
].join('\n')

const ghaDebugSnippet = [
  '# Debug pipeline (mode verbeux)',
  '- name: Debug context',
  '  shell: |',
  '    set -euxo pipefail',
  '    node -v || true',
  '    npm -v || true',
  '    pwd',
  '    ls -la',
  '    printenv | sort | sed -n "1,120p"',
].join('\n')

const docs: DocItem[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    category: 'Introduction',
    updatedAt: '2026-01-31',
    tags: ['documentation', 'runbooks', 'amélioration continue'],
    summary:
      'Espace de documentation opérationnelle : procédures, résolutions d’incidents, bonnes pratiques, et retours d’expérience.',
    blocks: [
      { type: 'heading', text: 'Objectif' },
      {
        type: 'paragraph',
        text:
          "Cette page centralise mes documentations (runbooks) : chaque fois que je résous un problème (DNS, mail, Linux, réseau, CI/CD…), je le formalise ici avec un format clair : contexte → symptômes → cause racine → solution → vérifications.",
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Philosophie',
        text:
          "Un bon runbook doit être exécutable : étapes courtes, commandes testables, points de contrôle, et erreurs fréquentes. L’objectif : réduire le MTTR et fiabiliser l’exploitation.",
      },
      { type: 'heading', text: 'Comment utiliser la documentation' },
      {
        type: 'list',
        items: [
          "Utilise la recherche à gauche pour retrouver un sujet rapidement.",
          "Clique sur une résolution : le contenu se met à jour au centre, sans ouvrir une autre page.",
          "À droite : actions rapides, table des sections, copie des commandes.",
        ],
      },
      
    ],
  },

  /**
   * ✅ NE PAS TOUCHER : demandé par toi.
   * Doc OVH/Vercel laissée STRICTEMENT identique.
   */
  {
    id: 'ovh-mail-vercel-dns',
    title: 'Restaurer la réception d’emails OVH après migration DNS vers Vercel',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['dns', 'vercel', 'ovh', 'mx', 'spf', 'dkim', 'dmarc'],
    summary:
      "Après migration des nameservers OVH vers Vercel, les MX OVH ne s’appliquent plus. Il faut recréer MX/SPF/DKIM/DMARC dans le DNS Vercel.",
    blocks: [
      { type: 'heading', text: 'Contexte' },
      {
        type: 'paragraph',
        text:
          "Site (portfolio) hébergé sur Vercel. Pour utiliser le DNS Vercel, changement des nameservers vers ns1.vercel-dns.com et ns2.vercel-dns.com. Après ce changement, l’adresse email OVH (ex : contact@domaine.com) ne recevait plus de messages.",
      },

      { type: 'heading', text: 'Symptômes observés' },
      {
        type: 'list',
        items: [
          'Les emails partent (envoi SMTP parfois OK) mais ne sont pas reçus.',
          'Les expéditeurs peuvent recevoir des erreurs “Domain not found” (souvent faute de frappe) ou des bounces “user unknown / mailbox unavailable” si la boîte n’existe pas.',
          "Dans OVH, les MX semblent corrects, mais la réception ne revient pas.",
        ],
      },

      { type: 'heading', text: 'Cause racine' },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Point clé DNS',
        text:
          "Quand on passe le domaine sur les nameservers Vercel, la zone DNS OVH n’est plus utilisée. Même si OVH affiche des MX “corrects”, ils ne servent plus tant qu’ils ne sont pas recréés dans le DNS Vercel (autorité DNS).",
      },

      { type: 'heading', text: 'Solution' },
      {
        type: 'callout',
        tone: 'success',
        title: 'Objectif',
        text:
          'Garder le site sur Vercel + continuer à utiliser les emails OVH → recréer MX + SPF + DKIM (+ DMARC optionnel) dans Vercel DNS.',
      },

      { type: 'heading', text: 'Étape 1 — Vérifier que Vercel gère bien le DNS' },
      {
        type: 'list',
        items: [
          'Vercel Dashboard → Domains → sélectionner domaine.com',
          'Vérifier : Nameservers = Vercel, DNS Records visibles',
        ],
      },

      { type: 'heading', text: 'Étape 2 — Ajouter les enregistrements MX OVH (obligatoire)' },
      {
        type: 'paragraph',
        text:
          'Vercel → Domains → domaine.com → DNS Records → Add Record. Ajouter 3 MX (Name = @ / root domain) :',
      },
      {
        type: 'list',
        items: [
          'MX: mx1.mail.ovh.net. (Priority 1)',
          'MX: mx2.mail.ovh.net. (Priority 5)',
          'MX: mx3.mail.ovh.net. (Priority 100)',
          'TTL : valeur par défaut (ou 60 si tu veux accélérer les tests)',
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Bonnes pratiques',
        text:
          "Ne pas supprimer les records ALIAS/CAA gérés par Vercel. S’assurer qu’il n’existe aucun autre MX concurrent sur @.",
      },

      { type: 'heading', text: 'Étape 3 — Ajouter SPF (recommandé)' },
      {
        type: 'code',
        label: 'TXT SPF',
        language: 'dns',
        code: `Type: TXT
Name: @
Value: v=spf1 include:mx.ovh.com -all`,
      },

      { type: 'heading', text: 'Étape 4 — Ajouter DKIM (recommandé, très important)' },
      {
        type: 'paragraph',
        text:
          "OVH fournit généralement 2 enregistrements DKIM (selector1 et selector2) en CNAME. Les valeurs exactes sont à récupérer dans OVHcloud → Service Email → DKIM / Zone DNS.",
      },
      {
        type: 'code',
        label: 'DKIM (exemple de structure)',
        language: 'dns',
        code: `Type: CNAME
Name: selector1._domainkey
Value: (valeur fournie par OVH)

Type: CNAME
Name: selector2._domainkey
Value: (valeur fournie par OVH)`,
      },

      { type: 'heading', text: 'Étape 5 — Ajouter DMARC (optionnel mais pro)' },
      {
        type: 'code',
        label: 'TXT DMARC (mode observation)',
        language: 'dns',
        code: `Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:postmaster@domaine.com; adkim=s; aspf=s`,
      },
      {
        type: 'paragraph',
        text:
          "p=none = mode observation (safe). Plus tard tu peux passer à quarantine ou reject.",
      },

      { type: 'heading', text: 'Étape 6 — Vérification technique (dig)' },
      {
        type: 'code',
        label: 'Commandes de vérification',
        language: 'bash',
        code: `dig +short MX domaine.com
dig +short TXT domaine.com
dig +short TXT _dmarc.domaine.com
dig +short CNAME selector1._domainkey.domaine.com
dig +short CNAME selector2._domainkey.domaine.com`,
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Résultat attendu',
        text:
          'Les MX doivent renvoyer mx1/mx2/mx3.mail.ovh.net ; le TXT doit contenir ton SPF ; les CNAME DKIM doivent répondre ; DMARC doit renvoyer la politique.',
      },

      { type: 'heading', text: 'Étape 7 — Test fonctionnel' },
      {
        type: 'list',
        items: [
          'Envoyer un email depuis Gmail vers contact@domaine.com',
          'Vérifier Inbox + Spam + Corbeille dans OVH Webmail',
          'Si bounce : lire le mail d’échec → contient souvent la cause exacte',
        ],
      },

      { type: 'heading', text: 'Erreurs fréquentes (et comment les éviter)' },
      {
        type: 'list',
        items: [
          'Faute de frappe domaine → “domain not found”',
          'MX ajoutés chez OVH mais pas chez Vercel → inutile si NS chez Vercel',
          'Oubli DKIM/SPF → délivrabilité faible / spam / rejet possible',
          'Suppression d’un record géré par Vercel → peut casser site/SSL',
        ],
      },

      { type: 'heading', text: 'Conclusion' },
      {
        type: 'paragraph',
        text:
          "Lorsque le DNS est géré par Vercel, tous les enregistrements liés au mail (MX, SPF, DKIM, DMARC) doivent être définis dans Vercel, même si le service email reste chez OVH. Une fois les records ajoutés et vérifiés via dig, la réception redevient opérationnelle.",
      },
    ],
  },

  // ============================================================================
  // ✅ NOUVELLES DOCS (très détaillées, style runbook pro)
  // ============================================================================

  {
    id: 'ssh-hardening-bastion-mfa',
    title: 'Durcissement SSH : clés uniquement, bastion, MFA, allowlist, Fail2ban, audit',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['ssh', 'linux', 'security', 'hardening', 'bastion', 'mfa', 'fail2ban', 'audit'],
    summary:
      'Runbook complet pour sécuriser SSH en production : modèle de menace, configuration sshd, bastion, MFA via PAM, filtrage réseau, anti brute-force, logs et rollback.',
    blocks: [
      { type: 'heading', text: 'Contexte & objectif' },
      {
        type: 'paragraph',
        text:
          "SSH est une surface d’attaque majeure (brute force, credential stuffing, scans automatisés). Objectif : réduire drastiquement le risque en imposant : accès via bastion, authentification par clés, MFA sur bastion, filtrage IP, durcissement sshd, anti brute-force, et audit exploitable.",
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Principe “safe-first”',
        text:
          "Toujours garder une session SSH ouverte pendant les changements. Toujours valider la config (`sshd -t`) AVANT reload. Prévoir un rollback immédiat.",
      },

      { type: 'divider' },

      { type: 'heading', text: 'Pré-requis (avant de toucher sshd)' },
      {
        type: 'list',
        items: [
          'Avoir un accès console/Out-of-band (VM console, iLO/IPMI, cloud console).',
          'Avoir au moins 1 utilisateur admin non-root (ex: opsadmin) avec sudo.',
          'Avoir des clés SSH prêtes (ed25519 recommandé) et déployées dans `~/.ssh/authorized_keys`.',
          'Avoir identifié : IP/subnet du bastion, et éventuels réseaux d’admin (VPN).',
        ],
      },
      {
        type: 'code',
        label: 'Générer une clé (poste admin)',
        language: 'bash',
        code: `ssh-keygen -t ed25519 -a 64 -C "ops@<ENV>" -f ~/.ssh/id_ed25519_ops
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519_ops
chmod 644 ~/.ssh/id_ed25519_ops.pub`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 1 — Créer/valider un compte admin + sudo' },
      {
        type: 'code',
        label: 'Créer un utilisateur admin (serveur)',
        language: 'bash',
        code: `sudo adduser <USER_ADMIN>
sudo usermod -aG sudo <USER_ADMIN>
id <USER_ADMIN>
sudo -l -U <USER_ADMIN>`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Interdiction root direct',
        text:
          "En production, `PermitRootLogin` doit être `no` (ou au minimum `prohibit-password`). On travaille via un compte admin + sudo.",
      },

      { type: 'heading', text: 'Étape 2 — Déployer la clé (authorized_keys)' },
      {
        type: 'code',
        label: 'Copie clé publique',
        language: 'bash',
        code: `# Depuis ton poste
ssh-copy-id -i ~/.ssh/id_ed25519_ops.pub <USER_ADMIN>@<HOST>

# Vérifier sur le serveur
sudo -u <USER_ADMIN> ls -la /home/<USER_ADMIN>/.ssh
sudo -u <USER_ADMIN> cat /home/<USER_ADMIN>/.ssh/authorized_keys`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 3 — Durcir sshd_config (clés uniquement + restrictions)' },
      {
        type: 'paragraph',
        text:
          'On applique un profil durci raisonnable : pas de mot de passe, pas de root, pas de forwarding inutiles, limite tentatives, et log plus verbeux.',
      },
      {
        type: 'code',
        label: '/etc/ssh/sshd_config (baseline durci)',
        language: 'conf',
        code: `# Auth
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes

# Sécurité / surface
X11Forwarding no
AllowTcpForwarding no
PermitTunnel no
AllowAgentForwarding no
GatewayPorts no
PermitUserEnvironment no

# Durcissement protocole
Protocol 2
MaxAuthTries 3
LoginGraceTime 20
ClientAliveInterval 300
ClientAliveCountMax 2

# Logs (utile pour audit)
LogLevel VERBOSE

# Limiter les users
AllowUsers <USER_ADMIN> <USER_OPS>`,
      },
      {
        type: 'code',
        label: 'Validation + reload safe',
        language: 'bash',
        code: `sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
sudo systemctl status ssh --no-pager || sudo systemctl status sshd --no-pager`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Astuce safe',
        text:
          "Toujours tester une 2e session avant de fermer la première : `ssh -i ~/.ssh/id_ed25519_ops <USER_ADMIN>@<HOST>`.",
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 4 — Filtrage réseau (allowlist)' },
      {
        type: 'paragraph',
        text:
          'Objectif : SSH accessible uniquement depuis le bastion et/ou VPN. Même un sshd durci reste attaquable si exposé au monde.',
      },
      {
        type: 'code',
        label: 'UFW (exemple)',
        language: 'bash',
        code: `sudo ufw default deny incoming
sudo ufw default allow outgoing

# Autoriser SSH uniquement depuis le bastion/VPN
sudo ufw allow from <BASTION_IP_OR_SUBNET> to any port 22 proto tcp

sudo ufw enable
sudo ufw status verbose`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Important',
        text:
          'Si tu appliques l’allowlist, assure-toi que tu te connectes bien depuis le bastion/VPN avant d’activer le firewall.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 5 — Anti brute-force (Fail2ban)' },
      {
        type: 'code',
        label: 'Installation + jail sshd (Ubuntu/Debian)',
        language: 'bash',
        code: `sudo apt-get update && sudo apt-get install -y fail2ban

cat <<'EOF' | sudo tee /etc/fail2ban/jail.d/sshd.local
[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s

# Politique (adapter selon contexte)
maxretry = 5
findtime = 10m
bantime = 1h
EOF

sudo systemctl enable --now fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 6 — Bastion (ProxyJump) : modèle recommandé' },
      {
        type: 'list',
        items: [
          'Exposer SSH uniquement sur le bastion (public ou accessible via VPN).',
          'Sur les serveurs cibles : SSH allowlist = IP/subnet du bastion.',
          'Accès admin : `ssh -J bastion user@target` (ProxyJump).',
          'Activer logs détaillés et éventuellement session recording sur bastion (Teleport, auditd, SIEM).',
        ],
      },
      {
        type: 'code',
        label: '~/.ssh/config (poste admin)',
        language: 'sshconfig',
        code: `Host bastion
  HostName <BASTION_PUBLIC_IP>
  User <USER_ADMIN>
  IdentityFile ~/.ssh/id_ed25519_ops

Host target-*
  User <USER_ADMIN>
  IdentityFile ~/.ssh/id_ed25519_ops
  ProxyJump bastion`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 7 — MFA sur bastion (PAM TOTP)' },
      {
        type: 'paragraph',
        text:
          "MFA est recommandé surtout sur le bastion. Sur Ubuntu, on peut utiliser `libpam-google-authenticator` (TOTP). Cette étape doit être testée prudemment.",
      },
      {
        type: 'code',
        label: 'Installer PAM TOTP',
        language: 'bash',
        code: `sudo apt-get update
sudo apt-get install -y libpam-google-authenticator

# Pour chaque utilisateur (session interactive)
sudo -u <USER_ADMIN> google-authenticator`,
      },
      {
        type: 'code',
        label: 'Activer PAM (extrait) — /etc/pam.d/sshd',
        language: 'conf',
        code: `# Ajouter en haut ou proche des modules auth
auth required pam_google_authenticator.so nullok`,
      },
      {
        type: 'code',
        label: 'Activer challenge-response — /etc/ssh/sshd_config',
        language: 'conf',
        code: `KbdInteractiveAuthentication yes

# Exemple MFA + clé :
# 1) clé requise, 2) OTP requis
AuthenticationMethods publickey,keyboard-interactive`,
      },
      {
        type: 'code',
        label: 'Reload + test',
        language: 'bash',
        code: `sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd

# Tester depuis une autre session
ssh <USER_ADMIN>@<BASTION_PUBLIC_IP>`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Anti-lockout',
        text:
          "Ne déploie jamais MFA sans accès console. Teste avec une seconde session. Si tu te lock, rollback via console : retirer pam_google_authenticator + remettre AuthenticationMethods publickey.",
      },

      { type: 'divider' },

      { type: 'heading', text: 'Vérifications & preuves' },
      {
        type: 'code',
        label: 'Checks',
        language: 'bash',
        code: `# Vérifier que le mot de passe est bien désactivé
sudo sshd -T | egrep "passwordauthentication|permitrootlogin|authenticationmethods|loglevel"

# Logs SSH
sudo journalctl -u ssh -n 200 --no-pager || sudo journalctl -u sshd -n 200 --no-pager

# Fail2ban
sudo fail2ban-client status sshd`,
      },

      { type: 'heading', text: 'Rollback (plan immédiat)' },
      {
        type: 'list',
        items: [
          '1) Revenir à un sshd_config fonctionnel (backup).',
          '2) Désactiver MFA (pam_google_authenticator) si ça bloque.',
          '3) Ouvrir temporairement firewall depuis IP admin (si allowlist).',
        ],
      },
      {
        type: 'code',
        label: 'Rollback — commandes',
        language: 'bash',
        code: `# 1) Restaurer sshd_config si backup
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bad.$(date +%F_%H%M) || true
sudo cp /etc/ssh/sshd_config.bak /etc/ssh/sshd_config || true

# 2) Enlever MFA (si activé) — /etc/pam.d/sshd
# -> commenter la ligne pam_google_authenticator.so

# 3) Valider et redémarrer
sudo sshd -t
sudo systemctl restart ssh || sudo systemctl restart sshd`,
      },

      { type: 'heading', text: 'Erreurs fréquentes' },
      {
        type: 'list',
        items: [
          'Oublier de tester dans une 2e session → lockout.',
          'Activer allowlist firewall avant de passer par bastion/VPN.',
          'Mettre AuthenticationMethods MFA sans activer KbdInteractiveAuthentication.',
          'Oublier AllowUsers → accès impossible pour le bon compte.',
          'Fail2ban mal configuré (logpath faux) → ne bannit pas.',
        ],
      },
    ],
  },

  {
    id: 'systemd-service-failed-recovery',
    title: 'Restauration d’un service systemd en échec : diagnostic, overrides propres, rollback',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['linux', 'systemd', 'journald', 'incident', 'service', 'ops'],
    summary:
      'Runbook terrain pour diagnostiquer un service systemd en échec (exit code, permissions, env, ports, dépendances) et appliquer une correction réversible (drop-in) avec preuves.',
    blocks: [
      { type: 'heading', text: 'Contexte & symptômes typiques' },
      {
        type: 'list',
        items: [
          'Service en “failed”, redémarrages en boucle (Restart=always).',
          'Erreur “ExecStart=… not found”, “permission denied”, “status=203/EXEC”.',
          'Port déjà utilisé (EADDRINUSE), config invalide, env manquante.',
          'Après update/upgrade, un service qui marchait ne démarre plus.',
        ],
      },

      { type: 'heading', text: 'Étape 0 — Triage (ne rien casser)' },
      {
        type: 'callout',
        tone: 'info',
        title: 'Objectif',
        text:
          'Collecter la preuve : état, logs, code de sortie, unit file effectif. Ne pas modifier avant d’avoir compris le mécanisme.',
      },

      { type: 'heading', text: 'Étape 1 — État + logs ciblés' },
      {
        type: 'code',
        label: 'Status & logs',
        language: 'bash',
        code: `systemctl status <SERVICE> --no-pager -l
journalctl -u <SERVICE> -b --no-pager -n 300

# Logs par fenêtre de temps (utile pendant incident)
journalctl -u <SERVICE> --since "10 min ago" --no-pager -n 300`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 2 — Lire l’unité effective (unit + drop-ins)' },
      {
        type: 'paragraph',
        text:
          "systemd peut assembler l’unité depuis plusieurs sources (package + override). Il faut lire la version effective, pas seulement un fichier.",
      },
      {
        type: 'code',
        label: 'Unit effective',
        language: 'bash',
        code: `systemctl cat <SERVICE>
systemctl show <SERVICE> -p FragmentPath -p DropInPaths -p ExecStart -p User -p Group -p WorkingDirectory`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 3 — Identifier la cause (patterns réels)' },
      {
        type: 'list',
        items: [
          'status=203/EXEC → binaire non exécutable / mauvais chemin / mauvais format.',
          'status=217/USER → user/group inexistant.',
          'Permission denied → droits fichiers, SELinux/AppArmor, capabilities.',
          'EADDRINUSE → port déjà occupé.',
          'Missing env var → EnvironmentFile absent / variable non définie.',
          'TimeoutStartSec → service trop lent à démarrer.',
        ],
      },
      {
        type: 'code',
        label: 'Checks rapides',
        language: 'bash',
        code: `# Vérifier ExecStart réel
systemctl show <SERVICE> -p ExecStart

# Vérifier que le binaire existe et est exécutable
which <BIN> || true
ls -la <PATH_TO_BIN>

# Tester lancement à la main (très utile)
sudo -u <SERVICE_USER> <PATH_TO_BIN> --version || true`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 4 — Cas fréquents : port déjà utilisé' },
      {
        type: 'code',
        label: 'Port conflict',
        language: 'bash',
        code: `# Exemple si service écoute 8080
sudo ss -lntp | grep ":8080" || true
sudo lsof -i :8080 || true`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Résolution',
        text:
          'Soit tu arrêtes le service concurrent, soit tu changes le port via config appli (et idéalement override systemd).',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 5 — Appliquer une correction propre (drop-in override)' },
      {
        type: 'paragraph',
        text:
          "Ne modifie pas l’unité packagée. Utilise un override (drop-in) : c’est traçable, réversible, compatible updates.",
      },
      {
        type: 'code',
        label: 'Créer un override',
        language: 'bash',
        code: `sudo systemctl edit <SERVICE>

# Exemple de contenu :
# [Service]
# Environment="ENV=production"
# EnvironmentFile=-/etc/<SERVICE>/<SERVICE>.env
# Restart=on-failure
# RestartSec=5
# TimeoutStartSec=90`,
      },
      {
        type: 'code',
        label: 'Reload + restart',
        language: 'bash',
        code: `sudo systemctl daemon-reload
sudo systemctl restart <SERVICE>
systemctl status <SERVICE> --no-pager -l`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 6 — Gérer les permissions (user, dossiers, fichiers)' },
      {
        type: 'code',
        label: 'Ownership & perms',
        language: 'bash',
        code: `# Vérifier user du service
systemctl show <SERVICE> -p User -p Group

# Vérifier accès sur le répertoire de travail
namei -l <WORKDIR_PATH> || true
ls -la <WORKDIR_PATH> || true

# Corriger (exemple)
sudo chown -R <SERVICE_USER>:<SERVICE_GROUP> <WORKDIR_PATH>
sudo chmod -R u+rwX,go-rwx <WORKDIR_PATH>`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Vérifications (preuve de résolution)' },
      {
        type: 'list',
        items: [
          'systemctl status = active (running) + pas de restart loop.',
          'journalctl ne montre plus d’erreur au démarrage.',
          'Service répond fonctionnellement (port ouvert / endpoint OK).',
        ],
      },
      {
        type: 'code',
        label: 'Checks finaux',
        language: 'bash',
        code: `systemctl is-active <SERVICE>
journalctl -u <SERVICE> -b --no-pager -n 120

# Si service web
curl -fsS http://127.0.0.1:<PORT>/health || true
sudo ss -lntp | grep ":<PORT>" || true`,
      },

      { type: 'heading', text: 'Rollback (revenir à l’état stable)' },
      {
        type: 'code',
        label: 'Revert override',
        language: 'bash',
        code: `sudo systemctl revert <SERVICE>
sudo systemctl daemon-reload
sudo systemctl restart <SERVICE>
systemctl status <SERVICE> --no-pager -l`,
      },

      { type: 'heading', text: 'Erreurs fréquentes' },
      {
        type: 'list',
        items: [
          'Modifier /lib/systemd/system/<SERVICE>.service directement → cassé au prochain update.',
          'Oublier `daemon-reload` après modification.',
          'Service en boucle (Restart=always) → logs flood, masquer la vraie cause.',
          'Changer la config mais ne pas tester le binaire à la main.',
        ],
      },
    ],
  },

  {
    id: 'cicd-debug-build-cache-artifacts',
    title: 'Debug CI/CD (GitHub Actions) : build cassé, variables, cache, artefacts, rollback',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['cicd', 'github-actions', 'nextjs', 'build', 'cache', 'artifacts', 'release'],
    summary:
      'Runbook complet pour diagnostiquer un pipeline CI/CD qui échoue : reproduction locale, Node/npm, lockfile, variables, cache, logs, artefacts, et stratégie de rollback.',
    blocks: [
      { type: 'heading', text: 'Symptômes typiques' },
      {
        type: 'list',
        items: [
          '“Process completed with exit code 1” sans info claire.',
          'Build OK en local mais KO en CI.',
          'Erreurs TypeScript/Lint uniquement en CI.',
          'Cache corrompu (node_modules, .next/cache) → comportements bizarres.',
          'Variables env manquantes (NEXT_PUBLIC_*, secrets).',
        ],
      },

      { type: 'heading', text: 'Étape 1 — Reproduire local en mode “CI-like”' },
      {
        type: 'paragraph',
        text:
          "Objectif : reproduire exactement ce que fait la CI. Toujours privilégier `npm ci` (lockfile strict), supprimer node_modules, et fixer la version Node.",
      },
      {
        type: 'code',
        label: 'Repro locale',
        language: 'bash',
        code: `node -v
npm -v || true

rm -rf node_modules .next
npm ci
npm run build`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Point clé',
        text:
          'Si local = OK mais CI = KO, la différence est souvent : version Node, variables env, OS, cache, ou dépendances natives.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 2 — Verrouiller Node & npm (éviter les surprises)' },
      {
        type: 'list',
        items: [
          'Définir une version Node stable (ex: 20.x LTS).',
          'Utiliser `npm ci` (pas `npm install`) en CI.',
          'S’assurer que package-lock.json est commité et à jour.',
        ],
      },

      { type: 'heading', text: 'Étape 3 — Variables d’environnement : audit sans exposer les secrets' },
      {
        type: 'code',
        label: 'Pattern safe',
        language: 'bash',
        code: `# Vérifier uniquement la présence (sans afficher la valeur)
[ -n "$SOME_VAR" ] && echo "SOME_VAR=OK" || (echo "SOME_VAR=MISSING" && exit 1)`,
      },
      {
        type: 'code',
        label: 'Debug step (YAML)',
        language: 'yaml',
        code: ghaDebugSnippet,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 4 — Cache : méthode pro (désactiver → confirmer → réactiver)' },
      {
        type: 'paragraph',
        text:
          'Le cache doit être déterministe. Si un build casse “au hasard”, le cache est souvent suspect : on le désactive 1 run pour confirmer.',
      },
      {
        type: 'code',
        label: 'Cache GitHub Actions (extrait)',
        language: 'yaml',
        code: ghaCacheSnippet,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Anti-pattern',
        text:
          'Cacher node_modules sans stratégie claire peut produire des incohérences. Préférer le cache npm (cache du registry) ou `.next/cache` avec une key stable.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 5 — Lints/TS : aligner local et CI' },
      {
        type: 'list',
        items: [
          'Exécuter `npm run lint` et `npm run typecheck` en local.',
          'S’assurer que tsconfig / eslint config sont identiques.',
          'Vérifier que CI ne traite pas les warnings comme erreurs (flags).',
        ],
      },
      {
        type: 'code',
        label: 'Local checks',
        language: 'bash',
        code: `npm run lint
npm run typecheck || true
npx tsc -v || true`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 6 — Artefacts : prouver la sortie du build' },
      {
        type: 'paragraph',
        text:
          'Objectif : voir concrètement ce qui est produit (dist/build/.next) et l’exporter si nécessaire (debug).',
      },
      {
        type: 'code',
        label: 'Lister outputs',
        language: 'bash',
        code: `pwd
ls -la
ls -la dist || true
ls -la build || true
ls -la .next || true`,
      },

      { type: 'heading', text: 'Étape 7 — Stratégie de rollback (quand prod est bloqué)' },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Priorité prod',
        text:
          'Si le déploiement est bloquant, on revient au dernier commit/tag stable, on redéploie, puis on corrige sur une branche.',
      },
      {
        type: 'code',
        label: 'Rollback Git (exemple)',
        language: 'bash',
        code: `git tag --list | tail -n 20
git checkout <LAST_STABLE_TAG>
# redeploy
# puis correction sur branche
git checkout -b fix/cicd-build`,
      },

      { type: 'heading', text: 'Erreurs fréquentes' },
      {
        type: 'list',
        items: [
          'Utiliser `npm install` en CI → dépendances non déterministes.',
          'Node version différente entre local et CI.',
          'Variables env présentes en local mais absentes en CI.',
          'Cache réutilisé malgré lockfile changé.',
          'Dépendance native (sharp, etc.) qui échoue selon OS.',
        ],
      },
    ],
  },

  {
    id: 'network-dns-mtu-asymmetric-routing-tcpdump',
    title: 'Réseau : DNS intermittent, MTU, routage asymétrique, tcpdump (preuve)',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['network', 'dns', 'mtu', 'routing', 'tcpdump', 'linux', 'incident'],
    summary:
      'Runbook réseau terrain : isoler un DNS intermittent, détecter MTU/fragmentation, prouver un routage asymétrique, et capturer une preuve exploitable (pcap).',
    blocks: [
      { type: 'heading', text: 'Contexte & symptômes' },
      {
        type: 'list',
        items: [
          'Résolution DNS aléatoire (1 requête OK, 1 KO).',
          'Certaines URL marchent, d’autres non.',
          'Timeout HTTP/TLS, handshake qui bloque.',
          'Problème qui n’apparaît que depuis certains réseaux (VPN / site distant).',
        ],
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 1 — DNS : identifier le résolveur effectif' },
      {
        type: 'paragraph',
        text:
          "Sur Linux moderne, `/etc/resolv.conf` peut pointer vers systemd-resolved. Il faut identifier le vrai résolveur, puis tester plusieurs serveurs DNS.",
      },
      {
        type: 'code',
        label: 'Identifier resolver',
        language: 'bash',
        code: `cat /etc/resolv.conf
resolvectl status 2>/dev/null || true
systemctl status systemd-resolved --no-pager 2>/dev/null || true`,
      },
      {
        type: 'code',
        label: 'Comparer plusieurs DNS',
        language: 'bash',
        code: `dig <DOMAIN> @1.1.1.1 +time=2 +tries=1
dig <DOMAIN> @8.8.8.8 +time=2 +tries=1
dig <DOMAIN> @<INTERNAL_DNS> +time=2 +tries=1`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Interprétation',
        text:
          'Si externe (1.1.1.1) OK mais interne KO → souci DNS interne. Si tout KO → souci réseau/MTU/route ou domaine.',
      },

      { type: 'heading', text: 'Étape 2 — DNS avancé : prouver la délégation / propagation' },
      {
        type: 'code',
        label: 'Trace DNS',
        language: 'bash',
        code: `dig <DOMAIN> +trace
dig NS <DOMAIN> +short
dig SOA <DOMAIN> +short`,
      },
      {
        type: 'paragraph',
        text:
          "Si les NS ne sont pas ceux attendus, la zone n’est pas celle que tu penses. En incident DNS, +trace permet souvent de localiser le niveau où ça casse.",
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 3 — MTU : détecter fragmentation / PMTUD cassé' },
      {
        type: 'paragraph',
        text:
          "Une MTU trop grande (ou un ICMP bloqué) casse TLS/HTTP de manière intermittente. On teste avec ping DF (do not fragment).",
      },
      {
        type: 'code',
        label: 'MTU test (Linux)',
        language: 'bash',
        code: `# 1472 + 28 (ICMP/IP) = 1500
ping -M do -s 1472 <DEST_IP> -c 3

# Tester plus petit si échec
ping -M do -s 1412 <DEST_IP> -c 3
ping -M do -s 1372 <DEST_IP> -c 3`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Si ping DF échoue',
        text:
          'Suspicion forte MTU/PMTUD. Vérifier tunnel/VPN, VLAN, PPPoE, ou règles qui bloquent ICMP “Fragmentation needed”.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 4 — Routage : détecter asymétrie / policy routing' },
      {
        type: 'paragraph',
        text:
          "Un routage asymétrique = aller par une route, retour par une autre. Ça casse souvent les firewalls stateful. Il faut prouver le chemin.",
      },
      {
        type: 'code',
        label: 'Route & tables',
        language: 'bash',
        code: `ip addr
ip route
ip rule

# Chemin vers une IP
ip route get <DEST_IP>

# Outils de preuve
traceroute -n <DEST_IP> || true
mtr -n <DEST_IP> -r -c 20 || true`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Pattern classique',
        text:
          'Policy routing (ip rule) + plusieurs gateways (multi-WAN, VPN) → réponses qui sortent par la mauvaise interface.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Étape 5 — tcpdump : capturer une preuve exploitable (pcap)' },
      {
        type: 'paragraph',
        text:
          "On capture en ciblant : DNS (53), TLS/HTTPS (443), ou un host précis. Le pcap sert de preuve et d’analyse (Wireshark).",
      },
      {
        type: 'code',
        label: 'Captures ciblées',
        language: 'bash',
        code: `# DNS
sudo tcpdump -ni any port 53 -vv

# HTTPS vers une cible
sudo tcpdump -ni any host <DEST_IP> and port 443 -vv

# Capture pcap
sudo tcpdump -ni any host <DEST_IP> -w capture_<DEST_IP>.pcap`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: 'Bon réflexe',
        text:
          'Toujours capturer pendant que tu reproduis le problème (curl / dig). Sans reproduction, tcpdump sert peu.',
      },

      { type: 'heading', text: 'Étape 6 — Vérification fonctionnelle' },
      {
        type: 'code',
        label: 'Repro HTTP/TLS',
        language: 'bash',
        code: `# DNS + connectivité
dig +short <DOMAIN>
ping -c 3 <DEST_IP> || true

# TLS handshake verbeux
curl -vk https://<DOMAIN>/ -m 10 || true

# OpenSSL (si besoin)
openssl s_client -connect <DOMAIN>:443 -servername <DOMAIN> -brief </dev/null || true`,
      },

      { type: 'heading', text: 'Erreurs fréquentes' },
      {
        type: 'list',
        items: [
          'Confondre “DNS KO” et “réseau KO” : toujours tester IP directe (curl vers IP).',
          'MTU cassée uniquement sur VPN → test DF indispensable.',
          'Capturer tcpdump sur la mauvaise interface → utiliser `-i any`.',
          'Oublier que systemd-resolved cache et réécrit resolv.conf.',
        ],
      },
    ],
  },

  {
    id: 'ansible-automation-117-servers',
    title: 'Automatisation Ansible à grande échelle (117 serveurs) : inventaires, rôles, rollout, rollback',
    category: 'Résolutions',
    updatedAt: '2026-01-31',
    tags: ['ansible', 'automation', 'linux', 'fleet', 'idempotence', 'devops', 'rollout'],
    summary:
      'Runbook complet pour industrialiser Ansible sur une flotte : structure repo, inventaires, group_vars/host_vars, rôles idempotents, exécution progressive (serial), reporting et rollback.',
    blocks: [
      { type: 'heading', text: 'Objectif & contraintes réelles (à 117 serveurs)' },
      {
        type: 'list',
        items: [
          'Éviter l’incident massif : déploiement progressif (batch).',
          'Idempotence : relancer sans casser ni répéter inutilement.',
          'Traçabilité : logs, diff, recap, et preuves.',
          'Rollback rapide : revenir à l’état stable en cas d’impact.',
        ],
      },
      {
        type: 'callout',
        tone: 'success',
        title: 'Standard pro',
        text:
          'Un rollout Ansible doit être : progressif (serial), contrôlé (max_fail_percentage), observable (logs), et réversible (backups + playbook rollback).',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Structure de dépôt recommandée (éprouvée)' },
      {
        type: 'code',
        label: 'Layout repo',
        language: 'bash',
        code: `ansible/
  ansible.cfg
  inventories/
    prod/
      hosts.ini
      group_vars/
        all.yml
        web.yml
        db.yml
      host_vars/
        host-001.yml
  roles/
    common/
      tasks/main.yml
      handlers/main.yml
    ssh_hardening/
      tasks/main.yml
      handlers/main.yml
      templates/sshd_config.j2
    monitoring_agent/
      tasks/main.yml
  playbooks/
    check.yml
    site.yml
    rollout.yml
    rollback.yml`,
      },

      { type: 'heading', text: 'Inventaire : bonnes pratiques' },
      {
        type: 'list',
        items: [
          'Séparer prod/staging.',
          'Groupes métiers (web/db/infra) + groupe parent (prod).',
          'Éviter les IP “en dur” partout : centraliser.',
        ],
      },
      {
        type: 'code',
        label: 'inventories/prod/hosts.ini (exemple)',
        language: 'ini',
        code: `[web]
host-001
host-002

[db]
host-010

[infra]
host-050

[prod:children]
web
db
infra`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Configuration Ansible (ansible.cfg) : stabilité & performance' },
      {
        type: 'code',
        label: 'ansible.cfg (recommandé)',
        language: 'ini',
        code: `[defaults]
inventory = inventories/prod/hosts.ini
host_key_checking = False
retry_files_enabled = False
stdout_callback = yaml
bin_ansible_callbacks = True
forks = 20
timeout = 30
interpreter_python = auto_silent

[ssh_connection]
pipelining = True`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Note perf',
        text:
          'forks + pipelining accélèrent fortement sur flotte. Adapter selon infra et limites SSH.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Variables : group_vars / host_vars (propre et scalable)' },
      {
        type: 'code',
        label: 'group_vars/all.yml',
        language: 'yaml',
        code: `ansible_user: <SSH_USER>
ansible_become: true

base_packages:
  - curl
  - vim
  - ca-certificates
  - htop

ssh_allowed_users:
  - <USER_ADMIN>
  - <USER_OPS>

ssh_allowlist_sources:
  - <BASTION_SUBNET_OR_IP>`,
      },
      {
        type: 'paragraph',
        text:
          'host_vars sert pour les exceptions (un serveur a un port SSH différent, un agent particulier, etc.). Éviter les exceptions dans les rôles.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Playbook 1 — Preflight (zéro changement) : check.yml' },
      {
        type: 'code',
        label: 'playbooks/check.yml',
        language: 'yaml',
        code: `- name: Preflight checks (no change)
  hosts: prod
  become: true
  gather_facts: true
  tasks:
    - name: Ping
      ansible.builtin.ping:

    - name: OS summary
      ansible.builtin.debug:
        msg: "host={{ inventory_hostname }} os={{ ansible_distribution }} {{ ansible_distribution_version }} kernel={{ ansible_kernel }}"

    - name: Disk usage
      ansible.builtin.command: df -h
      register: df_out
      changed_when: false

    - name: Show disk
      ansible.builtin.debug:
        var: df_out.stdout_lines`,
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Pourquoi check.yml',
        text:
          'Avant rollout, tu confirmes connectivité, sudo, facts. Ça évite 30 erreurs en prod.',
      },

      { type: 'divider' },

      { type: 'heading', text: 'Playbook 2 — Déploiement standard : site.yml' },
      {
        type: 'code',
        label: 'playbooks/site.yml',
        language: 'yaml',
        code: `- name: Standard configuration
  hosts: prod
  become: true
  gather_facts: true
  roles:
    - common
    - ssh_hardening
    - monitoring_agent`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Playbook 3 — Rollout progressif : rollout.yml' },
      {
        type: 'paragraph',
        text:
          'Le cœur “fleet” : déployer par batch (serial), stopper si trop d’échecs, et valider post-déploiement.',
      },
      {
        type: 'code',
        label: 'playbooks/rollout.yml',
        language: 'yaml',
        code: `- name: Progressive rollout (batch)
  hosts: prod
  become: true
  gather_facts: true

  serial: 10               # batch size: 5/10/20 selon criticité
  max_fail_percentage: 5   # stop si trop d'échecs

  pre_tasks:
    - name: Preflight ping
      ansible.builtin.ping:

  roles:
    - common
    - ssh_hardening
    - monitoring_agent

  post_tasks:
    - name: SSH service should be active
      ansible.builtin.command: systemctl is-active ssh || systemctl is-active sshd
      register: ssh_active
      changed_when: false
      failed_when: ssh_active.rc != 0`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Rôles : règles d’or (idempotence & safety)' },
      {
        type: 'list',
        items: [
          'Toujours faire un backup avant remplacer une config critique (ex: sshd_config).',
          'Toujours valider la config (ex: sshd -t) avant restart.',
          'Utiliser handlers pour redémarrer seulement si changement.',
          'Éviter `shell` si module existe (apt, user, template, service…).',
          'Définir `changed_when: false` pour les commandes de lecture.',
        ],
      },

      { type: 'heading', text: 'Role ssh_hardening : exemple robuste' },
      {
        type: 'code',
        label: 'roles/ssh_hardening/tasks/main.yml',
        language: 'yaml',
        code: `- name: Backup current sshd_config
  ansible.builtin.copy:
    src: /etc/ssh/sshd_config
    dest: /etc/ssh/sshd_config.bak
    remote_src: true
  ignore_errors: true

- name: Deploy hardened sshd_config
  ansible.builtin.template:
    src: sshd_config.j2
    dest: /etc/ssh/sshd_config
    owner: root
    group: root
    mode: "0644"
  notify:
    - Validate sshd
    - Restart ssh

- name: Ensure SSH is enabled
  ansible.builtin.service:
    name: ssh
    enabled: true
  ignore_errors: true`,
      },
      {
        type: 'code',
        label: 'roles/ssh_hardening/handlers/main.yml',
        language: 'yaml',
        code: `- name: Validate sshd
  ansible.builtin.command: sshd -t
  changed_when: false

- name: Restart ssh
  ansible.builtin.service:
    name: ssh
    state: restarted
  ignore_errors: true`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Playbook 4 — Rollback : rollback.yml' },
      {
        type: 'paragraph',
        text:
          'Rollback = revenir à une configuration connue stable. Exemple : restaurer sshd_config.bak, redémarrer SSH.',
      },
      {
        type: 'code',
        label: 'playbooks/rollback.yml',
        language: 'yaml',
        code: `- name: Rollback (restore previous known-good configs)
  hosts: prod
  become: true
  gather_facts: true
  tasks:
    - name: Restore sshd_config from backup if exists
      ansible.builtin.copy:
        src: /etc/ssh/sshd_config.bak
        dest: /etc/ssh/sshd_config
        remote_src: true
      ignore_errors: true

    - name: Restart SSH
      ansible.builtin.service:
        name: ssh
        state: restarted
      ignore_errors: true`,
      },

      { type: 'divider' },

      { type: 'heading', text: 'Exécution : patterns pro (safe)' },
      {
        type: 'code',
        label: 'Commandes',
        language: 'bash',
        code: `# 1) Connectivité
ansible -m ping prod

# 2) Preflight (aucun changement)
ansible-playbook playbooks/check.yml

# 3) Dry-run (simulation)
ansible-playbook playbooks/rollout.yml --check --diff

# 4) Rollout réel par groupe (ex: web)
ansible-playbook playbooks/rollout.yml -l web

# 5) Rollout complet
ansible-playbook playbooks/rollout.yml

# Rollback si besoin
ansible-playbook playbooks/rollback.yml -l web`,
      },

      { type: 'heading', text: 'Erreurs fréquentes (fleet)' },
      {
        type: 'list',
        items: [
          'Rollout “all at once” → incident massif.',
          'Pas de serial / max_fail_percentage → aucune barrière de sécurité.',
          'Rôles non idempotents → dérive et surprises.',
          'Pas de backup avant config critique → lockout SSH.',
          'Secrets en clair → utiliser ansible-vault.',
        ],
      },
    ],
  },
]

function slugifyHeading(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function toneClasses(tone: 'info' | 'warn' | 'success') {
  switch (tone) {
    case 'warn':
      return 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-50'
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-50'
    default:
      return 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-50'
  }
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-200">
      {children}
    </span>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 900)
    } catch {
      // ignore
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Wrench className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{label ?? 'Commande'}</span>
        </div>
        <button
          onClick={onCopy}
          className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copié' : 'Copier'}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-gray-900 dark:text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function isHeadingBlock(b: DocBlock): b is Extract<DocBlock, { type: 'heading' }> {
  return b.type === 'heading'
}

function isCodeBlock(b: DocBlock): b is Extract<DocBlock, { type: 'code' }> {
  return b.type === 'code'
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState<string>('introduction')
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement | null>(null)

  // Deep-link via hash (#id)
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (hash && docs.some((d) => d.id === hash)) setActiveId(hash)
  }, [])

  const activeDoc = useMemo(() => docs.find((d) => d.id === activeId) ?? docs[0], [activeId])

  const headings = useMemo(() => {
    return activeDoc.blocks
      .filter(isHeadingBlock)
      .map((b) => b.text)
      .map((t) => ({ text: t, id: slugifyHeading(t) }))
  }, [activeDoc])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return docs
    return docs.filter((d) => {
      const inTitle = d.title.toLowerCase().includes(q)
      const inTags = d.tags.join(' ').toLowerCase().includes(q)
      const inSummary = d.summary.toLowerCase().includes(q)
      return inTitle || inTags || inSummary
    })
  }, [query])

  const grouped = useMemo(() => {
    const groups: Record<DocItem['category'], DocItem[]> = { Introduction: [], Résolutions: [] }
    for (const d of filtered) groups[d.category].push(d)
    return groups
  }, [filtered])

  const selectDoc = (id: string) => {
    setActiveId(id)
    setSidebarOpen(false)
    window.history.replaceState(null, '', `#${id}`)
    setTimeout(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  const copyPermalink = async () => {
    try {
      const url = `${window.location.origin}/docs#${activeDoc.id}`
      await navigator.clipboard.writeText(url)
    } catch {
      // ignore
    }
  }

  const copyAllCommands = async () => {
    const commands = activeDoc.blocks.filter(isCodeBlock).map((b) => b.code).join('\n\n')
    if (!commands.trim()) return
    try {
      await navigator.clipboard.writeText(commands)
    } catch {
      // ignore
    }
  }

  const scrollToHeading = (hid: string) => {
    const el = document.getElementById(hid)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen w-full" style={{ color: 'var(--text-1)' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 w-full" style={{ borderBottom: '1px solid var(--nav-border)', background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le sommaire"
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <Link href="/" className="hover:underline">
                    Accueil
                  </Link>
                  <span className="mx-1">/</span>
                  <span>Docs</span>
                </p>
                <h1 className="text-base md:text-lg font-semibold">Documentation & Runbooks</h1>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={copyPermalink}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition text-sm flex items-center gap-2"
              title="Copier le lien"
            >
              <Copy className="w-4 h-4" /> Copier le lien
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 transition text-sm flex items-center gap-2"
              title="Imprimer / Export PDF"
            >
              <Printer className="w-4 h-4" /> Imprimer
            </button>
          </div>
        </div>
      </div>

      {/* Full width 3 columns */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)_360px] gap-0">
          {/* LEFT SIDEBAR */}
          <aside className="hidden md:flex flex-col" style={{ borderRight: '1px solid var(--card-border)', background: 'var(--card-bg)', backdropFilter: 'blur(14px)' }}>
            <div className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                  placeholder="Rechercher… (dns, linux, ci/cd)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 outline-none text-sm focus:ring-2 focus:ring-blue-600/30"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Runbooks</Pill>
                <Pill>Ops</Pill>
                <Pill>DNS</Pill>
                <Pill>Linux</Pill>
              </div>
            </div>

            <div className="px-2 pb-6 overflow-y-auto">
              {(['Introduction', 'Résolutions'] as const).map((cat) => (
                <div key={cat} className="mb-5">
                  <p className="px-3 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                    {cat}
                  </p>

                  {grouped[cat].length === 0 && (
                    <p className="px-3 text-sm text-gray-500 dark:text-gray-400">Aucun résultat</p>
                  )}

                  <div className="space-y-1">
                    {grouped[cat].map((d) => {
                      const active = d.id === activeDoc.id
                      return (
                        <button
                          key={d.id}
                          onClick={() => selectDoc(d.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-start gap-2 ${
                            active
                              ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40'
                              : 'hover:bg-gray-50 dark:hover:bg-zinc-900'
                          }`}
                        >
                          <ChevronRight className={`w-4 h-4 mt-0.5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                          <div className="min-w-0">
                            <p
                              className={`text-sm font-semibold leading-snug ${
                                active ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                              }`}
                            >
                              {d.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{d.summary}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* MOBILE DRAWER */}
          {sidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <motion.div
                initial={{ x: -340, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 bottom-0 w-[340px] glass"
                style={{ borderRight: '1px solid var(--card-border)' }}
              >
                <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
                  <p className="font-semibold">Sommaire</p>
                  <button
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={query}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                      placeholder="Rechercher…"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="px-2 pb-6 overflow-y-auto">
                  {(['Introduction', 'Résolutions'] as const).map((cat) => (
                    <div key={cat} className="mb-5">
                      <p className="px-3 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        {cat}
                      </p>
                      <div className="space-y-1">
                        {grouped[cat].map((d) => {
                          const active = d.id === activeDoc.id
                          return (
                            <button
                              key={d.id}
                              onClick={() => selectDoc(d.id)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl transition flex items-start gap-2 ${
                                active
                                  ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40'
                                  : 'hover:bg-gray-50 dark:hover:bg-zinc-900'
                              }`}
                            >
                              <ChevronRight className={`w-4 h-4 mt-0.5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                              <div className="min-w-0">
                                <p className="text-sm font-semibold leading-snug">{d.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{d.summary}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* CENTER CONTENT */}
          <main>
            <div className="px-4 md:px-10 py-8">
              <motion.div
                key={activeDoc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="max-w-5xl mx-auto"
              >
                <div className="glass rounded-3xl shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8 border-b border-gray-200 dark:border-zinc-800">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <FileText className="w-4 h-4" />
                          <span>{activeDoc.category}</span>
                          <span className="opacity-60">•</span>
                          <span>{activeDoc.updatedAt}</span>
                        </div>

                        <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-tight">{activeDoc.title}</h2>

                        <p className="mt-3 text-gray-700 dark:text-gray-200 leading-relaxed">{activeDoc.summary}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4" /> Dernière maj : {activeDoc.updatedAt}
                          </span>
                          <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Tag className="w-4 h-4" /> {activeDoc.tags.join(', ')}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={copyPermalink}
                          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition text-sm flex items-center gap-2 justify-center"
                        >
                          <Copy className="w-4 h-4" /> Copier le lien
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-sm flex items-center gap-2 justify-center"
                        >
                          <Printer className="w-4 h-4" /> Imprimer
                        </button>
                      </div>
                    </div>
                  </div>

                  <div ref={contentRef} className="p-6 md:p-8 space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                    {activeDoc.blocks.map((b, i) => {
                      if (b.type === 'heading') {
                        const hid = slugifyHeading(b.text)
                        return (
                          <div key={i} className="pt-4">
                            <h3 id={hid} className="text-lg md:text-xl font-semibold flex items-center gap-2 scroll-mt-24">
                              <Hash className="w-4 h-4 text-blue-600" />
                              {b.text}
                            </h3>
                          </div>
                        )
                      }

                      if (b.type === 'paragraph') {
                        return (
                          <p key={i} className="text-gray-700 dark:text-gray-200 leading-relaxed">
                            {b.text}
                          </p>
                        )
                      }

                      if (b.type === 'list') {
                        return (
                          <ul key={i} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
                            {b.items.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>
                        )
                      }

                      if (b.type === 'callout') {
                        return (
                          <div key={i} className={`rounded-2xl border p-4 ${toneClasses(b.tone)}`}>
                            <p className="font-semibold mb-1">{b.title}</p>
                            <p className="text-sm leading-relaxed opacity-95">{b.text}</p>
                          </div>
                        )
                      }

                      if (b.type === 'code') {
                        return <CodeBlock key={i} code={b.code} label={b.label} />
                      }

                      if (b.type === 'divider') {
                        return <div key={i} className="h-px w-full bg-gray-200 dark:bg-zinc-800 my-2" />
                      }

                      return null
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </main>

          {/* RIGHT PANEL */}
          <aside className="hidden md:block border-l border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="sticky top-[72px] p-4 space-y-4 h-[calc(100vh-72px)] overflow-y-auto">
              <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  Outils
                </p>

                <div className="mt-3 grid grid-cols-1 gap-2">
                  <button
                    onClick={copyPermalink}
                    className="w-full px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition text-sm flex items-center gap-2 justify-center"
                  >
                    <Copy className="w-4 h-4" /> Copier le lien
                  </button>

                  <button
                    onClick={copyAllCommands}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-sm flex items-center gap-2 justify-center"
                  >
                    <Copy className="w-4 h-4" /> Copier toutes les commandes
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-sm flex items-center gap-2 justify-center"
                  >
                    <Printer className="w-4 h-4" /> Imprimer / PDF
                  </button>

                  <Link
                    href="/"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-sm flex items-center gap-2 justify-center"
                  >
                    Retour au portfolio <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Hash className="w-4 h-4 text-blue-600" />
                  Sommaire de la page
                </p>

                <div className="mt-3 space-y-1">
                  {headings.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Aucun titre détecté.</p>
                  ) : (
                    headings.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => scrollToHeading(h.id)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition text-sm flex items-center gap-2"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{h.text}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Checklist (runbook)
                </p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                    Contexte + symptômes + cause racine
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                    Étapes actionnables + commandes testables
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                    Vérifications techniques + test fonctionnel
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600" />
                    Pièges fréquents documentés
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
