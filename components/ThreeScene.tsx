"use client"

import { useEffect, useRef, useState } from "react"

export default function ThreeScene() {
  return (
    <div className="w-[300px] h-[300px] mx-auto my-8 shadow-glow rounded-full overflow-hidden">
      <FallbackAnimation />
    </div>
  )
}

// A CSS-based animation fallback that doesn't require Three.js
function FallbackAnimation() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 300
    canvas.height = 300

    // Create particles
    const particlesArray = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        angle: Math.random() * Math.PI * 2,
      })
    }

    setParticles(particlesArray)

    // Animation function
    let rotation = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "rgba(20, 20, 30, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw center circle
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(138, 43, 226, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw rotating polygon
      rotation += 0.005
      const sides = 8
      const radius = 100
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * 2 * Math.PI) / sides
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = "rgba(138, 43, 226, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Update and draw particles
      particlesArray.forEach((particle) => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(138, 43, 226, 0.7)"
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
