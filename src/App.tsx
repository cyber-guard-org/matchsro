import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowDown, Phone, Mail, MapPin } from "lucide-react"
import { useForm } from '@formspree/react'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [formState, handleSubmit] = useForm("mzdkvaqg")

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const aboutRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const careerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    const refs = [aboutRef, teamRef, careerRef]
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "O nás", id: "about" },
    { label: "Tým", id: "team" },
    { label: "Kariéra", id: "career" },
    { label: "Kontakt", id: "footer" },
  ]

  const services = [
    { title: "Public affairs a politický marketing", description: "Strategická komunikace s veřejným sektorem a stakeholdery" },
    { title: "PR a social", description: "Media relations, krizová komunikace a správa sítí" },
    { title: "Reputation management", description: "Budování a ochrana reputace značek" },
    { title: "Integrovaný marketing", description: "Komplexní a promyšlená řešení" },
  ]

  const team = [
    { name: "Marie", role: "head of", initials: "MA" },
    { name: "Marek", role: "kreativní stratég a grafik", initials: "MK" },
    { name: "Kuba", role: "content creator", initials: "KU" },
    { name: "Kuba", role: "seniorní videomaker", initials: "KU" },
    { name: "David", role: "PPC specialista", initials: "DA" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-serif text-2xl font-bold tracking-wide hover:opacity-70 transition-opacity"
            >
              MATCH
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm tracking-wide text-gray-500 hover:text-gray-900 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-20 bg-white z-40 transition-all duration-500 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-12">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-3xl font-serif tracking-wide hover:opacity-70 transition-all"
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms",
                  transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative px-6 lg:px-8"
      >
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            MATCH
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.8s_ease-out_0.5s_both]">
            VAŠE SPOJENÍ S ÚSPĚCHEM
          </p>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </button>
      </section>

      {/* About & Services Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-32 px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* About Text */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-balance">
                O nás
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Orientovat se v dnešním informačně složitém světě není snadné. Všem našim klientům pomáháme rozeznat, co je skutečně podstatné, aby se mohli lépe soustředit na dosažení svých cílů.
                </p>
                <p>
                  Věříme, že díky naší expertize mohou své kroky i sdělení správně načasovat a přesně zacílit. Poskytujeme promyšlená, komplexní řešení v několika specializovaných odvětvích.
                </p>
              </div>
            </div>

            {/* Services List */}
            <div>
              <h3 className="text-sm tracking-widest uppercase font-bold text-gray-400 mb-12">
                Naše specializace
              </h3>
              <div className="space-y-0">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group border-t border-gray-200 py-6 cursor-pointer transition-all duration-300 hover:pl-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold mb-1 group-hover:text-black transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {service.description}
                        </p>
                      </div>
                      <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        ref={teamRef}
        className={`py-32 px-6 lg:px-8 bg-white transition-all duration-1000 ${
          visibleSections.has("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">Náš tým</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Naši práci děláme rádi a jsme hrdí na to, co jsme pro naše klienty dokázali.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <span className="text-3xl font-serif text-gray-400 group-hover:scale-110 transition-transform duration-500">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section
        id="career"
        ref={careerRef}
        className={`py-32 px-6 lg:px-8 bg-gray-50 transition-all duration-1000 ${
          visibleSections.has("career") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Career Info */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-balance">
                Kariéra
              </h2>
              <h3 className="text-2xl font-bold mb-4 text-black">Head of social media & content</h3>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Rádi byste se podíleli na tvorbě kvalitního a poutavého multimediálního obsahu pro online prostředí a chcete být u jeho přípravy od prvotního nápadu až po finální detaily?
                </p>
                <p>
                  Máte za sebou několik let zkušeností s řízením online brandových kampaní, víte, jak spolupracovat s influencery, a nové digitální trendy máte v malíku?
                </p>
                <p className="font-bold text-black">
                  Staňte se členem našeho týmu. Svůj talent uplatníte v rozmanitých kampaních pro firmy i úspěšné značky. Pošlete nám svoje CV.
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white p-8 lg:p-12 border border-gray-200 rounded-xl shadow-sm">
              <h3 className="text-2xl font-serif mb-8">Mám zájem</h3>

              {formState.succeeded ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold mb-2">Děkujeme za váš zájem!</p>
                  <p className="text-gray-500">Vaše údaje jsme v pořádku přijali a brzy se vám ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:outline-none transition-colors"
                      placeholder="vas@email.cz"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Zpráva / Odkaz na CV
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:border-black focus:outline-none transition-colors resize-none"
                      placeholder="Napište nám o sobě nebo vložte odkaz na LinkedIn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full py-4 bg-black text-white font-bold tracking-wide rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    Odeslat
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h2 className="font-serif text-3xl font-bold mb-6">MATCH</h2>
              <p className="text-gray-400 leading-relaxed">
                PR & Marketing agentura
                <br />
                Vaše spojení s úspěchem
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">Kontakt</h3>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+420774966336" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    +420 774 966 336
                  </a>
                </li>
                <li>
                  <a href="mailto:matchcom.sro@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    matchcom.sro@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" />
                    <span>
                      Nad schody 73
                      <br />
                      Praha - západ, PSČ 252 05
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-6">
                Firemní údaje
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="font-bold text-white">Match s. r. o.</li>
                <li>IČO: 13972618</li>
                <li>Datová schránka: y59snmt</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MATCH s.r.o. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}