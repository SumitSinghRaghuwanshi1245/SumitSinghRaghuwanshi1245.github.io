"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiPython,
  SiCplusplus,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiGreensock, // Replace FaGsap with SiGreensock which is the official GSAP icon
} from "react-icons/si"
import { TbBrandFramerMotion } from "react-icons/tb"

const technologies = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Framer Motion", icon: TbBrandFramerMotion, color: "#0055FF" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
]

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    // Manual marquee animation without GSAP
    const marqueeElements = marqueeRef.current?.querySelectorAll(".marquee-item")
    if (!marqueeElements) return

    let position = 0
    const speed = 0.5

    const animate = () => {
      position -= speed

      // Reset position when first set is completely off-screen
      if (position <= -100) {
        position = 0
      }

      // Apply position to both sets
      marqueeElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.transform = `translateX(${position}%)`
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Pause animation on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    const handleMouseLeave = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    marqueeElements.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnter)
      item.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      marqueeElements.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnter)
        item.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden" id="tech-stack">
      <div className="container mx-auto mb-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 tech-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tech <span className="gradient-text">Stack</span>
        </motion.h2>
      </div>

      <div ref={marqueeRef} className="flex whitespace-nowrap overflow-hidden">
        <div className="flex space-x-8 marquee-item" style={{ minWidth: "100%" }}>
          {technologies.map((tech, index) => (
            <TechItem key={`tech-1-${index}`} tech={tech} />
          ))}
        </div>

        <div className="flex space-x-8 marquee-item" style={{ minWidth: "100%" }}>
          {technologies.map((tech, index) => (
            <TechItem key={`tech-2-${index}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TechItem({ tech }: { tech: { name: string; icon: React.ElementType; color: string } }) {
  const Icon = tech.icon

  return (
    <motion.div
      className="inline-flex flex-col items-center justify-center px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 shadow-glow-sm hover:shadow-glow"
      whileHover={{ scale: 1.1, rotate: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="text-3xl mb-2" style={{ color: tech.color }} />
      <span className="text-sm font-medium">{tech.name}</span>
    </motion.div>
  )
}
