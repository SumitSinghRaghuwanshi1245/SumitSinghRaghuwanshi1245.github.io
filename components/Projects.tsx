"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

// Project data
const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered application that generates content based on user prompts using OpenAI API.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "OpenAI", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Website",
    description: "A modern, animated portfolio website showcasing projects and skills with advanced animations.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    // Use Intersection Observer for animations instead of GSAP
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when element is in view
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.2 },
    )

    // Observe section title
    const projectsTitle = sectionRef.current.querySelector(".projects-title")
    if (projectsTitle) observer.observe(projectsTitle)

    // Observe project cards
    const projectCards = sectionRef.current.querySelectorAll(".project-card")
    projectCards.forEach((card) => observer.observe(card))

    return () => {
      if (projectsTitle) observer.unobserve(projectsTitle)
      projectCards.forEach((card) => observer.unobserve(card))
      observer.disconnect()
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center projects-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    liveUrl: string
    githubUrl: string
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={cardRef}
      className="card hover-glow group h-full project-card shadow-glow-sm transition-all duration-500 opacity-0 translate-y-12"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden aspect-video">
        <motion.div
          className="absolute inset-0 bg-purple-900/30 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{project.title}</h3>

        <p className="text-gray-300 text-sm">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-purple-900/30 rounded-full text-purple-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <motion.a
            href={project.liveUrl}
            className="flex items-center gap-1 text-sm text-white hover:text-purple-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </motion.a>

          <motion.a
            href={project.githubUrl}
            className="flex items-center gap-1 text-sm text-white hover:text-purple-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span>Source Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
