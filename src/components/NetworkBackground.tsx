'use client'

import { useEffect, useRef } from 'react'

const LABELS = [
  'nginx', 'ssh:22', 'dns:53', 'http:80', 'ansible',
  'prometheus', 'grafana', 'firewall', 'dhcp', 'vpn:1194',
  'mysql:3306', 'linux', 'docker', 'api:443', 'smtp:25',
  'nfs', 'ldap', 'snmp', 'rsync', 'systemd',
]

interface Node { x: number; y: number; vx: number; vy: number; label: string }
interface Packet { from: number; to: number; p: number; speed: number }

export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let nodes: Node[] = []
    let packets: Packet[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      const count = Math.min(Math.max(Math.floor((canvas.width * canvas.height) / 22000), 14), 32)
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        label: LABELS[i % LABELS.length],
      }))
      packets = Array.from({ length: 10 }, () => ({
        from: Math.floor(Math.random() * nodes.length),
        to: Math.floor(Math.random() * nodes.length),
        p: Math.random(),
        speed: 0.0012 + Math.random() * 0.002,
      }))
    }

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const d = isDark()
      const MAX = 165
      const nc   = d ? 'rgba(0,212,255,.65)'  : 'rgba(37,99,235,.55)'
      const lc   = d ? 'rgba(0,212,255,.09)'  : 'rgba(37,99,235,.09)'
      const pc   = d ? 'rgba(0,255,136,.85)'  : 'rgba(5,150,105,.75)'
      const lb   = d ? 'rgba(0,212,255,.26)'  : 'rgba(37,99,235,.28)'
      const glow = d ? 'rgba(0,212,255,.07)'  : 'rgba(37,99,235,.05)'

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          if (dx * dx + dy * dy < MAX * MAX) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = lc
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // packets
      for (const pkt of packets) {
        const f = nodes[pkt.from]
        const t = nodes[pkt.to]
        const dx = t.x - f.x
        const dy = t.y - f.y
        if (dx * dx + dy * dy < MAX * MAX) {
          ctx.beginPath()
          ctx.arc(f.x + dx * pkt.p, f.y + dy * pkt.p, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = pc
          ctx.fill()
        }
        pkt.p += pkt.speed
        if (pkt.p > 1) {
          pkt.p = 0
          pkt.from = pkt.to
          pkt.to = Math.floor(Math.random() * nodes.length)
        }
      }

      // nodes
      for (const n of nodes) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16)
        g.addColorStop(0, glow)
        g.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(n.x, n.y, 16, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        ctx.beginPath()
        ctx.arc(n.x, n.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = nc
        ctx.fill()

        ctx.font = '9px monospace'
        ctx.fillStyle = lb
        ctx.fillText(n.label, n.x + 8, n.y + 3)

        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden
    />
  )
}
