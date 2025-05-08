"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Home", href: "#home", section: "home" },
  { name: "About", href: "#about", section: "about" },
  { name: "Projects", href: "#projects", section: "projects" },
  { name: "Testimonials", href: "#testimonials", section: "testimonials" },
  { name: "Contact", href: "#contact", section: "contact" },
]

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string>("home")
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Update active section based on scroll position
  useEffect(() => {
    // Function to check which section is in view
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "testimonials", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section is in the viewport
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveLink(section)
            break
          }
        }
      }
    }

    // Update underline position based on active link
    const updateUnderline = () => {
      if (underlineRef.current && navRef.current) {
        const activeElement = document.querySelector(`a[href="#${activeLink}"]`)
        if (activeElement) {
          const linkRect = activeElement.getBoundingClientRect()
          const navRect = navRef.current.getBoundingClientRect()

          underlineRef.current.style.left = `${linkRect.left - navRect.left}px`
          underlineRef.current.style.width = `${linkRect.width}px`
          underlineRef.current.style.opacity = "1"
          underlineRef.current.style.transition = "all 0.3s ease"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    // Update underline on active link change
    updateUnderline()

    // Update underline on window resize
    window.addEventListener("resize", updateUnderline)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateUnderline)
    }
  }, [activeLink])

  // Handle scroll effect for navbar
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (navRef.current) {
        if (latest > 50) {
          navRef.current.classList.add("backdrop-blur-md", "bg-gray-900/70", "shadow-glow")
          navRef.current.classList.remove("bg-gray-900/30")
        } else {
          navRef.current.classList.remove("backdrop-blur-md", "bg-gray-900/70", "shadow-glow")
          navRef.current.classList.add("bg-gray-900/30")
        }
      }
    })
  }, [scrollY])

  const handleMouseEnter = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (underlineRef.current && event.currentTarget && navRef.current) {
      const linkRect = event.currentTarget.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()

      underlineRef.current.style.left = `${linkRect.left - navRect.left}px`
      underlineRef.current.style.width = `${linkRect.width}px`
      underlineRef.current.style.opacity = "1"
      underlineRef.current.style.transition = "all 0.3s ease"
    }
  }

  const handleMouseLeave = () => {
    if (underlineRef.current && navRef.current) {
      const activeElement = document.querySelector(`a[href="#${activeLink}"]`)
      if (activeElement) {
        const linkRect = activeElement.getBoundingClientRect()
        const navRect = navRef.current.getBoundingClientRect()

        underlineRef.current.style.left = `${linkRect.left - navRect.left}px`
        underlineRef.current.style.width = `${linkRect.width}px`
        underlineRef.current.style.opacity = "1"
        underlineRef.current.style.transition = "all 0.3s ease"
      }
    }
  }

  return (
    <header className="fixed w-full z-50 top-4">
      <div className="container mx-auto px-4">
        <div
          className="relative flex items-center justify-center py-2 px-4 rounded-full bg-gray-900/30 border border-gray-800 transition-all duration-300"
          ref={navRef}
        >
          {/* Mobile menu button */}
          <div className="md:hidden absolute left-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${activeLink === link.section ? "text-purple-300" : "text-white"}`}
                onMouseEnter={(e) => handleMouseEnter(link.href, e)}
                onMouseLeave={handleMouseLeave}
              >
                {link.name}
              </Link>
            ))}
            <div
              ref={underlineRef}
              className="absolute bottom-1.5 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-all duration-300"
            />
          </nav>

          {/* Mobile navigation */}
          <motion.div
            className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-xl backdrop-blur-md bg-gray-900/90 border border-gray-800 md:hidden ${isOpen ? "block" : "hidden"}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link block py-2 ${activeLink === link.section ? "text-purple-300" : "text-white"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
