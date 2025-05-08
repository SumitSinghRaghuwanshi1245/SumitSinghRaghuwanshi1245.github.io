"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import ThreeScene from "./ThreeScene"

// Education data
const education = [
  {
    degree: "Master of Computer Science",
    institution: "Stanford University",
    year: "2018 - 2020",
    description: "Specialized in Artificial Intelligence and Human-Computer Interaction",
  },
  {
    degree: "Bachelor of Technology",
    institution: "Indian Institute of Technology",
    year: "2014 - 2018",
    description: "Computer Science and Engineering with minor in Design",
  },
]

// Experience data
const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Leading the frontend team in developing cutting-edge web applications using React, Next.js, and modern animation libraries.",
  },
  {
    role: "UI/UX Designer & Developer",
    company: "Creative Solutions",
    period: "2020 - 2021",
    description:
      "Designed and implemented user interfaces for various clients, focusing on accessibility and modern design principles.",
  },
  {
    role: "Frontend Developer",
    company: "Digital Products Ltd.",
    period: "2018 - 2020",
    description:
      "Developed responsive web applications and collaborated with design teams to implement pixel-perfect interfaces.",
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

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
    const sectionTitle = sectionRef.current.querySelector(".section-title")
    if (sectionTitle) observer.observe(sectionTitle)

    // Observe timeline items
    const timelineItems = sectionRef.current.querySelectorAll(".timeline-item")
    timelineItems.forEach((item) => observer.observe(item))

    return () => {
      if (sectionTitle) observer.unobserve(sectionTitle)
      timelineItems.forEach((item) => observer.unobserve(item))
      observer.disconnect()
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Education & <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-blue-300">Experience</h3>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <div key={index} className="timeline-item opacity-0 translate-x-[-50px] transition-all duration-700">
                  <div className="card hover-glow p-6 shadow-glow-sm transition-all duration-500">
                    <h4 className="text-xl font-bold text-white">{item.role}</h4>
                    <p className="text-purple-300 mb-1">{item.company}</p>
                    <p className="text-sm text-gray-400 mb-3">{item.period}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center text-purple-300">Education</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="timeline-item opacity-0 translate-x-[50px] transition-all duration-700">
                  <div className="card hover-glow p-6 shadow-glow-sm transition-all duration-500">
                    <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                    <p className="text-purple-300 mb-1">{item.institution}</p>
                    <p className="text-sm text-gray-400 mb-3">{item.year}</p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D Component */}
            <ThreeScene />
          </div>
        </div>
      </div>
    </section>
  )
}
