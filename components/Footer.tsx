"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Sumit
            </Link>
            <p className="text-gray-400 mt-2">Developer & Designer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <SocialLink href="https://github.com" icon={<Github size={20} />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} />
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} />
            </div>

            <p className="text-gray-400 text-sm">&copy; {currentYear} Sumit. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}
