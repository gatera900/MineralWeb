"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, Compass, Droplets, Gem, Globe, Layers, Menu, Mountain } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen bg-stone-50">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-stone-900/90 backdrop-blur-md py-2" : "bg-transparent py-4",
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gem className={cn("h-8 w-8 transition-colors", isScrolled ? "text-amber-400" : "text-amber-500")} />
            <span
              className={cn(
                "font-serif text-xl font-medium tracking-tight transition-colors",
                isScrolled ? "text-white" : "text-stone-900",
              )}
            >
              TerraNova
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "About", href: "#about" },
              { name: "Education", href: "#education" },
              { name: "Innovation", href: "#innovation" },
              { name: "Sustainability", href: "#sustainability" },
              { name: "Showcase", href: "#showcase" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-amber-500",
                  isScrolled ? "text-stone-200" : "text-stone-700",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-amber-500 text-stone-900 hover:bg-amber-600">Contact Us</Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className={cn("h-6 w-6", isScrolled ? "text-white" : "text-stone-900")} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-stone-900 text-stone-100">
              <div className="flex flex-col gap-8 pt-8">
                {[
                  { name: "About", href: "#about" },
                  { name: "Education", href: "#education" },
                  { name: "Innovation", href: "#innovation" },
                  { name: "Sustainability", href: "#sustainability" },
                  { name: "Showcase", href: "#showcase" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-amber-500"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="mt-4 bg-amber-500 text-stone-900 hover:bg-amber-600">Contact Us</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-crystal.jpg"
            alt="Mineral crystal formation"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/70" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover the Earth's Hidden Treasures
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl mx-auto">
              Exploring the beauty and innovation of mineral materials with a deep respect for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 text-stone-900 hover:bg-amber-600">
                Explore Our Collection
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn About Our Mission
              </Button>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => scrollToSection(aboutRef)}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
          <span className="sr-only">Scroll down</span>
        </button>
      </motion.section>

      <section ref={aboutRef} id="about" className="py-24 bg-stone-100">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                A Deep Love for Earth's Minerals
              </h2>
              <p className="text-stone-700 mb-6">
                At TerraNova, we believe that minerals are not just resources to be extracted, but treasures to be
                cherished. Our passion for geology drives us to explore, educate, and innovate in ways that honor the
                Earth's natural beauty.
              </p>
              <p className="text-stone-700 mb-8">
                Founded by a team of geologists and designers, we bridge the gap between scientific understanding and
                aesthetic appreciation of mineral materials.
              </p>
              <Button className="bg-stone-800 hover:bg-stone-900 text-white">
                Our Story <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image src="/images/geologist.jpg" alt="Geologist examining minerals" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="education" className="py-24 bg-stone-900 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Discover the World of Minerals</h2>
              <p className="text-stone-300">
                Expand your knowledge about the fascinating world of geology, mineralogy, and the Earth's hidden
                treasures.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="h-10 w-10 text-amber-500" />,
                title: "Mineral Formation",
                description:
                  "Learn about the geological processes that create the Earth's diverse mineral deposits over millions of years.",
              },
              {
                icon: <Compass className="h-10 w-10 text-amber-500" />,
                title: "Exploration Techniques",
                description:
                  "Discover the methods geologists use to locate and identify valuable mineral resources around the world.",
              },
              {
                icon: <Gem className="h-10 w-10 text-amber-500" />,
                title: "Crystal Structures",
                description:
                  "Explore the fascinating geometric patterns that form the building blocks of all mineral specimens.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-stone-800 p-8 rounded-lg hover:bg-stone-700 transition-colors"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-stone-300">{item.description}</p>
                <Link href="#" className="inline-flex items-center mt-4 text-amber-400 hover:text-amber-300">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="innovation" className="py-24 bg-gradient-to-b from-stone-100 to-stone-200">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Mining Innovations for the Future
              </h2>
              <p className="text-stone-700">
                Exploring cutting-edge technologies and approaches that are transforming the mineral industry.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="/images/mining-innovation.jpg"
                alt="Mining innovation technology"
                fill
                className="object-cover"
              />
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  title: "Precision Extraction",
                  description:
                    "Using AI and robotics to minimize environmental impact while maximizing resource recovery.",
                },
                {
                  title: "Material Science Breakthroughs",
                  description:
                    "Developing new applications for mineral materials in technology, medicine, and sustainable energy.",
                },
                {
                  title: "Digital Mapping",
                  description:
                    "Creating detailed 3D models of underground deposits to improve planning and reduce exploration costs.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sustainability" className="py-24 bg-stone-800 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Committed to Sustainable Practices</h2>
                <p className="text-stone-300 mb-6">
                  We believe that responsible mining and material sourcing are essential for the future of our planet.
                  Our commitment to sustainability guides everything we do.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Globe className="h-6 w-6 text-amber-500" />,
                      title: "Environmental Stewardship",
                      description: "Minimizing our ecological footprint through careful planning and restoration.",
                    },
                    {
                      icon: <Droplets className="h-6 w-6 text-amber-500" />,
                      title: "Water Conservation",
                      description:
                        "Implementing closed-loop water systems to reduce consumption and prevent contamination.",
                    },
                    {
                      icon: <Mountain className="h-6 w-6 text-amber-500" />,
                      title: "Land Reclamation",
                      description:
                        "Restoring mining sites to their natural state or transforming them into new ecological habitats.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h3 className="font-serif text-lg font-bold mb-1">{item.title}</h3>
                        <p className="text-stone-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/images/sustainable-mining.jpg"
                alt="Sustainable mining practices"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="showcase" className="py-24 bg-stone-100">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-6">Rare Materials Showcase</h2>
              <p className="text-stone-700">
                Explore our collection of exceptional mineral specimens and innovative material applications.
              </p>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/images/minerals/amethyst.jpg",
                title: "Amethyst Geode",
                description: "A stunning purple crystal formation from the volcanic regions of Brazil.",
                price: "$1,250",
              },
              {
                image: "/images/minerals/malachite.jpg",
                title: "Malachite Specimen",
                description: "Vibrant green banded mineral with a silky luster from the Congo.",
                price: "$890",
              },
              {
                image: "/images/minerals/labradorite.png",
                title: "Labradorite Slab",
                description: "Iridescent feldspar with a remarkable play of colors from Madagascar.",
                price: "$1,450",
              },
              {
                image: "/images/minerals/pyrite-new.png",
                title: "Pyrite Cluster",
                description: "Metallic gold-colored crystal formation known as 'Fool's Gold'.",
                price: "$750",
              },
              {
                image: "/images/minerals/fluorite.jpg",
                title: "Fluorite Octahedron",
                description: "Geometric purple and green crystal with perfect octahedral structure.",
                price: "$980",
              },
              {
                image: "/images/minerals/rhodochrosite.jpg",
                title: "Rhodochrosite Slice",
                description: "Pink banded mineral with concentric patterns from Argentina.",
                price: "$1,200",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-bold">{item.price}</span>
                    <Button size="sm" className="bg-stone-800 hover:bg-stone-900 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-amber-500 text-stone-900 hover:bg-amber-600">
              View Full Collection
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-stone-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join Our Mineral Enthusiast Community</h2>
              <p className="text-stone-300 mb-8">
                Subscribe to our newsletter to receive updates on new specimens, educational content, and exclusive
                events.
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First Name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-500 text-stone-900 hover:bg-amber-600">
                  Subscribe
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-stone-800 p-8 rounded-lg"
            >
              <h3 className="font-serif text-2xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-4 mb-8">
                <p className="flex items-start gap-3">
                  <span className="text-amber-500">📍</span>
                  <span>123 Crystal Way, Mineral City, MC 12345</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-amber-500">📞</span>
                  <span>+1 (555) 123-4567</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-amber-500">✉️</span>
                  <span>info@terranova-minerals.com</span>
                </p>
              </div>

              <h4 className="font-serif text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {["Instagram", "Facebook", "Twitter", "YouTube"].map((platform) => (
                  <Link
                    key={platform}
                    href="#"
                    className="px-3 py-2 bg-stone-700 rounded-md text-sm hover:bg-stone-600 transition-colors"
                  >
                    {platform}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-stone-950 text-stone-400">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Gem className="h-8 w-8 text-amber-500" />
                <span className="font-serif text-xl font-medium tracking-tight text-white">TerraNova</span>
              </Link>
              <p className="text-sm">
                Exploring the beauty and innovation of mineral materials with a deep respect for our planet.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Our Collection", "Education", "Innovation", "Sustainability"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm hover:text-amber-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Blog", "Research Papers", "Mineral Database", "Events", "Press Kit"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm hover:text-amber-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Shipping Policy", "Returns & Refunds", "Cookie Policy"].map(
                  (link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm hover:text-amber-400 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} TerraNova Minerals. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
