"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { ArrowDown } from "lucide-react"


const roles = ["Full Stack Developer", "Freelancer"]

export default function Hero() {
  const controls = useAnimation()
  const roleIndex = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })

    // Text morphing animation
    const animateRoles = () => {
      controls.start({ opacity: 0, y: 20 }).then(() => {
        roleIndex.current = (roleIndex.current + 1) % roles.length
        controls.start({ opacity: 1, y: 0 })
      })
    }

    intervalRef.current = setInterval(animateRoles, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [controls])

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 px-4 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Hi, I&apos;m <span className="gradient-text">Sumit Singh Raghuwanshi</span>
            </motion.h1>

            <div className="h-16 flex items-center">
              <motion.h2
                className="text-2xl md:text-4xl font-medium flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                I&apos;m a{" "}
                <motion.span
                  className="ml-2 text-purple-400"
                  animate={controls}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {roles[roleIndex.current]}
                </motion.span>
              </motion.h2>
            </div>

            <motion.p
              className="text-lg text-gray-300 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Crafting beautiful digital experiences with cutting-edge technologies. Specialized in creating modern,
              interactive web applications.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
          <a href="https://drive.google.com/file/d/14iFWqSaMKllf_FbJgi_zYROX1fcjIk5Y/view?usp=sharing">  <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Download Resume
              </motion.button>
              </a> 
              <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-10" />
              <Image
                src="/images/sumit.png"
                alt="Sumit - Developer & Designer"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          ease: "easeOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <ArrowDown className="text-purple-400" size={20} />
      </motion.div>
    </section>
  )
}
