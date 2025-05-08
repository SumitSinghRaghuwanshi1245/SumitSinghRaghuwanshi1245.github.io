"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechStart",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Sumit delivered an exceptional website that exceeded our expectations. His attention to detail and animation skills are truly impressive.",
  },
  {
    name: "Sarah Williams",
    role: "Marketing Director, CreativeHub",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with Sumit was a pleasure. He understood our vision perfectly and translated it into a beautiful, functional website.",
  },
  {
    name: "Michael Chen",
    role: "Founder, InnovateLabs",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The animations and interactions Sumit created for our platform have significantly improved user engagement. Highly recommended!",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, DesignCo",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Sumit is not just a developer but a problem solver. He found creative solutions to our complex requirements.",
  },
  {
    name: "David Kim",
    role: "CTO, FutureTech",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The performance optimizations Sumit implemented made our application lightning fast. His technical expertise is outstanding.",
  },
]

export default function Testimonials() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    // Manual marquee animation without GSAP
    const marqueeElements = marqueeRef.current?.querySelectorAll(".testimonial-item")
    if (!marqueeElements) return

    let position = 0
    const speed = 0.08

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
    <section id="testimonials" ref={sectionRef} className="py-20 px-4 bg-gradient-to-b from-gray-950 to-purple-950/30">
      <div className="container mx-auto mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Client <span className="gradient-text">Testimonials</span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          What clients say about working with me
        </motion.p>
      </div>

      <div className="overflow-hidden py-8">
        <div ref={marqueeRef} className="flex">
          {/* First set */}
          <div className="flex space-x-6 testimonial-item" style={{ minWidth: "100%" }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`testimonial-1-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="flex space-x-6 testimonial-item" style={{ minWidth: "100%" }}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`testimonial-2-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: {
    name: string
    role: string
    image: string
    quote: string
  }
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      className="card flex-shrink-0 w-80 p-6 h-full"
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Quote className="text-purple-400 mb-4" size={24} />

      <p className="text-gray-300 mb-6">{testimonial.quote}</p>

      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-sm text-purple-300">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}
