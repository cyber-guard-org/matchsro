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
    { name: "Marie", role: "head of Match", img: "Head images/Marie.png", initials: "MA" },
    { name: "Marek", role: "kreativní stratég a grafik", img: "Head images/Marek.jpg", initials: "MK" },
    { name: "Kuba", role: "content creator", img: "Head images/Kuba-content.jpg", initials: "KU" },
    { name: "Kuba", role: "seniorní videomaker", img: "Head images/Kuba-video.png", initials: "KU" },
    { name: "David", role: "PPC specialista", img: "Head images/David.png", initials: "DA" },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-['Inter',sans-serif]">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm py-2" : "bg-transparent py-4"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection("hero")}
              className={`font-['Playfair_Display',serif] text-3xl font-black tracking-widest hover:opacity-70 transition-opacity ${isScrolled ? 'text-black' : 'text-white'}`}
            >
              MATCH
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors relative group ${isScrolled ? 'text-zinc-600 hover:text-black' : 'text-zinc-300 hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-black' : 'bg-white'}`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded transition-colors ${isScrolled ? 'hover:bg-zinc-100 text-black' : 'hover:bg-white/10 text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 top-[88px] bg-white z-40 transition-all duration-500 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-[calc(100vh-88px)] gap-10 bg-white">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-4xl font-['Playfair_Display',serif] text-black tracking-wide hover:opacity-70 transition-all"
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

      {/* Hero Section - Dark premium look */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center relative px-6 lg:px-8 bg-zinc-950 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-zinc-950"></div>
        
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h1 className="font-['Playfair_Display',serif] text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-white mb-8 animate-[fadeIn_1s_ease-out_0.2s_both]">
            MATCH
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light tracking-widest max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out_0.5s_both]">
            VAŠE SPOJENÍ S ÚSPĚCHEM
          </p>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce p-4"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-8 h-8 text-zinc-500" />
        </button>
      </section>

      {/* About & Services Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`py-32 px-6 lg:px-8 bg-white transition-all duration-1000 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
            <div>
              <h2 className="font-['Playfair_Display',serif] text-5xl md:text-6xl mb-10 text-zinc-900 leading-tight">
                O nás
              </h2>
              <div className="space-y-8 text-zinc-600 text-xl font-light leading-relaxed">
                <p>
                  Orientovat se v dnešním informačně složitém světě není snadné. Všem našim klientům pomáháme rozeznat, co je skutečně podstatné, aby se mohli lépe soustředit na dosažení svých cílů.
                </p>
                <p>
                  Věříme, že díky naší expertize mohou své kroky i sdělení správně načasovat a přesně zacílit. Poskytujeme promyšlená, komplexní řešení v několika specializovaných odvětvích.
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 p-10 rounded-3xl">
              <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-10">
                Naše specializace
              </h3>
              <div className="space-y-0">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group border-b border-zinc-200 last:border-0 py-6 cursor-pointer transition-all duration-300 hover:px-4 hover:bg-white hover:shadow-sm rounded-xl -mx-4 px-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-medium mb-1 text-zinc-900 group-hover:text-black transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-zinc-500 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                          {service.description}
                        </p>
                      </div>
                      <span className="text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-2 transition-all">
                        →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        ref={teamRef}
        className={`py-32 px-6 lg:px-8 bg-zinc-950 text-white transition-all duration-1000 ${
          visibleSections.has("team") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-['Playfair_Display',serif] text-5xl md:text-6xl mb-8">Náš tým</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-light">
              Naši práci děláme rádi a jsme hrdí na to, co jsme pro naše klienty dokázali.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative w-40 h-40 mx-auto mb-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl ring-4 ring-zinc-900/50 group-hover:ring-zinc-700">
                 <img 
                  src={member.img} 
                  alt={member.name} 
                  // Fallback, if image fails to load, show initials
                 className="w-full h-full object-cover object-center scale-[1.2] opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.3]"
                  onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
                  <span className="hidden absolute inset-0 flex items-center justify-center text-4xl font-['Playfair_Display',serif] text-zinc-500">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-medium text-2xl mb-2">{member.name}</h3>
                <p className="text-sm text-zinc-400 uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section
        id="career"
        ref={careerRef}
        className={`py-32 px-6 lg:px-8 bg-white transition-all duration-1000 ${
          visibleSections.has("career") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
            <div>
              <h2 className="font-['Playfair_Display',serif] text-5xl md:text-6xl mb-10 text-zinc-900">
                Kariéra
              </h2>
              <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-3xl">
                <h3 className="text-2xl font-bold mb-6 text-black">Head of social media & content</h3>
                <div className="space-y-6 text-zinc-600 font-light text-lg">
                  <p>
                    Rádi byste se podíleli na tvorbě kvalitního a poutavého multimediálního obsahu pro online prostředí a chcete být u jeho přípravy od prvotního nápadu až po finální detaily?
                  </p>
                  <p>
                    Máte za sebou několik let zkušeností s řízením online brandových kampaní, víte, jak spolupracovat s influencery, a nové digitální trendy máte v malíku?
                  </p>
                  <p className="font-medium text-black">
                    Staňte se členem našeho týmu. Svůj talent uplatníte v rozmanitých kampaních pro firmy i úspěšné značky. Pošlete nám svoje CV.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white p-10 lg:p-12 border border-zinc-200 rounded-3xl shadow-xl shadow-zinc-200/50">
              <h3 className="font-['Playfair_Display',serif] text-4xl mb-10">Mám zájem</h3>

              {formState.succeeded ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold mb-3 text-black">Děkujeme za váš zájem!</p>
                  <p className="text-zinc-500 text-lg">Vaše údaje jsme v pořádku přijali a brzy se vám ozveme.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
                      placeholder="vas@email.cz"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-zinc-900 mb-3 uppercase tracking-wider">
                      Zpráva / Odkaz na CV
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all resize-none"
                      placeholder="Napište nám o sobě nebo vložte odkaz na LinkedIn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full py-5 bg-black text-white text-lg font-bold tracking-widest uppercase rounded-xl hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-lg shadow-black/20"
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
      <footer id="footer" className="bg-zinc-950 text-white pt-24 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
            <div>
              <h2 className="font-['Playfair_Display',serif] text-4xl font-bold mb-8">MATCH</h2>
              <p className="text-zinc-400 leading-relaxed text-lg font-light">
                PR & Marketing agentura
                <br />
                Vaše spojení s úspěchem
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-8">Kontakt</h3>
              <ul className="space-y-6">
                <li>
                  <a href="tel:+420774966336" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                    <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    +420 774 966 336
                  </a>
                </li>
                <li>
                  <a href="mailto:matchcom.sro@gmail.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
                    <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    matchcom.sro@gmail.com
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4 text-zinc-300">
                    <div className="p-2 rounded-full bg-zinc-900 mt-1">
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="leading-relaxed">
                      Nad schody 73
                      <br />
                      Praha - západ, 252 05
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-8">
                Fakturační údaje
              </h3>
              <ul className="space-y-4 text-zinc-300 font-light">
                <li className="font-medium text-white text-lg">Match s. r. o.</li>
                <li>IČO: 13972618</li>
                <li>Datová schránka: y59snmt</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-600">
              &copy; {new Date().getFullYear()} MATCH s.r.o. Všechna práva vyhrazena.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}