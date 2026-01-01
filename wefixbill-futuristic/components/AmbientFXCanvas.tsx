'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { storage, prefersReducedMotion } from '@/lib/utils'

type FXMode = 'neon' | 'snow' | 'off'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function AmbientFXCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const animationRef = useRef<number>(0)
  const isRunningRef = useRef<boolean>(true)
  
  const [mode, setMode] = useState<FXMode>('neon')
  const [isVisible, setIsVisible] = useState(true)

  // Load saved preference
  useEffect(() => {
    const saved = storage.get('wefixbill-fx-mode') as FXMode
    if (saved && ['neon', 'snow', 'off'].includes(saved)) {
      setMode(saved)
    }
    
    if (prefersReducedMotion()) {
      setMode('off')
    }

    const handleVisibility = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Save preference
  const handleModeChange = useCallback((newMode: FXMode) => {
    setMode(newMode)
    storage.set('wefixbill-fx-mode', newMode)
  }, [])

  // Main canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || mode === 'off') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    isRunningRef.current = true

    const initCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createParticle = (): Particle => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      if (mode === 'snow') {
        return {
          x: Math.random() * (width + 100) - 50,
          y: -Math.random() * 50,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 1 + 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          hue: 200,
        }
      }
      
      // Neon mode
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 160, // Cyan to purple range
      }
    }

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 50 : 100
      particlesRef.current = Array.from({ length: count }, createParticle)
    }

    initCanvas()
    initParticles()

    const handleResize = () => {
      initCanvas()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      if (!isRunningRef.current) return
      animationRef.current = requestAnimationFrame(animate)

      if (!isVisible) return

      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            const force = (100 - dist) / 100
            p.vx += (dx / dist) * force * 0.5
            p.vy += (dy / dist) * force * 0.5
          }
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Dampening
        if (mode === 'neon') {
          p.vx *= 0.99
          p.vy *= 0.99
        }

        // Boundary handling
        if (mode === 'snow') {
          if (p.y > height + 50) {
            p.y = -20
            p.x = Math.random() * width
          }
          if (p.x < -50) p.x = width + 50
          if (p.x > width + 50) p.x = -50
        } else {
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
          p.x = Math.max(0, Math.min(width, p.x))
          p.y = Math.max(0, Math.min(height, p.y))
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        
        if (mode === 'snow') {
          ctx.fillStyle = `rgba(200, 220, 255, ${p.opacity})`
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity})`
        }
        ctx.fill()

        // Glow effect for neon
        if (mode === 'neon') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.opacity * 0.3})`
          ctx.fill()
        }
      })

      // Draw connections for neon mode
      if (mode === 'neon') {
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < 100) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `hsla(180, 100%, 70%, ${0.1 * (1 - dist / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          })
        })
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      isRunningRef.current = false
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mode, isVisible])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{ opacity: mode === 'off' ? 0 : 0.6, transition: 'opacity 0.3s ease' }}
      />

      {/* Mode toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex items-center gap-1 p-1 bg-midnight-900/90 backdrop-blur-sm border border-white/10 rounded-full">
          <button
            onClick={() => handleModeChange('neon')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              mode === 'neon'
                ? 'bg-neon-cyan/20 text-neon-cyan'
                : 'text-frost-400 hover:text-white'
            }`}
            aria-pressed={mode === 'neon'}
          >
            Neon
          </button>
          <button
            onClick={() => handleModeChange('snow')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              mode === 'snow'
                ? 'bg-white/20 text-white'
                : 'text-frost-400 hover:text-white'
            }`}
            aria-pressed={mode === 'snow'}
          >
            Snow
          </button>
          <button
            onClick={() => handleModeChange('off')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              mode === 'off'
                ? 'bg-frost-400/20 text-frost-300'
                : 'text-frost-400 hover:text-white'
            }`}
            aria-pressed={mode === 'off'}
          >
            Off
          </button>
        </div>
      </div>
    </>
  )
}
