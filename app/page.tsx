import Hero from "@/components/Hero"
import Timeline from "@/components/Timeline"
import TechMarquee from "@/components/TechMarquee"
import Projects from "@/components/Projects"
import Testimonials from "@/components/Testimonials"
import FreelanceConnect from "@/components/FreelanceConnect"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Timeline />
      <TechMarquee />
      <Projects />
      <Testimonials />
      <FreelanceConnect />
      <Contact />
    </div>
  )
}
