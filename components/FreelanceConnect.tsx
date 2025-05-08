"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket } from "lucide-react"

export default function FreelanceConnect() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 })

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="card p-10 md:p-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-purple-900/30 rounded-full">
              <Rocket className="text-purple-400" size={40} />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            🚀 Let&apos;s Work <span className="gradient-text">Together!</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I&apos;m currently available for freelance projects. If you have a project that needs creative solutions,
            let&apos;s talk about how we can collaborate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="btn-primary inline-block"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
