import { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Target,
  Users,
  Shield,
  Layers,
  Menu,
  X,
} from "lucide-react";

const publicBase = import.meta.env.BASE_URL;
const assetPath = (path: string) => encodeURI(`${publicBase}${path}`);

const navItems = [
  { label: "O nás", id: "about" },
  { label: "Služby", id: "services" },
  { label: "Naše práce", id: "portfolio" },
  { label: "Tým", id: "team" },
  { label: "Kariéra", id: "career" },
  { label: "Kontakt", id: "contact" },
];

const teamMembers = [
  { name: "Marie", role: "head of Match", img: assetPath("Head images/Marie.png"), initials: "M" },
  { name: "Marek", role: "kreativní stratég", img: assetPath("Head images/Marek.jpg"), initials: "MK" },
  { name: "Kuba", role: "content creator", img: assetPath("Head images/Kuba-content.jpg"), initials: "K" },
  { name: "Kuba", role: "senior videomaker", img: assetPath("Head images/Kuba-video.png"), initials: "KV" },
  { name: "David", role: "PPC specialista", img: assetPath("Head images/David.png"), initials: "D" },
];

export default function MatchPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formState, handleSubmit] = useForm("mzdkvaqg");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center">
              <span className="font-serif text-lg">M</span>
            </div>
            <div className="flex flex-col">
              <div className="font-serif font-bold tracking-[0.3em] text-base leading-tight">
                MATCH
              </div>
              <div className="text-[8px] tracking-[0.15em] text-neutral-400 uppercase leading-tight">
                VAŠE SPOJENÍ S ÚSPĚCHEM
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm text-neutral-600 hover:text-neutral-900 transition-colors group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100">
            <nav className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-3 text-neutral-600 hover:text-neutral-900 transition-colors border-b border-neutral-100 last:border-0"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[650px] h-[650px] rounded-full border border-neutral-200 flex items-center justify-center relative">
            <span className="font-serif text-[450px] text-neutral-900 opacity-[0.05] select-none leading-none">
              M
            </span>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-8">
            Marketingová Agentura
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
            Vaše spojení
            <br />
            <span className="text-neutral-400">s úspěchem</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Pomáháme značkám a organizacím komunikovat přesně, strategicky a s
            maximálním dopadem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("services")}
              className="bg-neutral-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-neutral-800 transition-colors"
            >
              NAŠE SLUŽBY
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border border-neutral-900 text-neutral-900 px-8 py-4 text-sm tracking-wider hover:bg-neutral-50 transition-colors"
            >
              KONTAKTUJTE NÁS
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border border-neutral-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-neutral-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
                O Nás
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
                Jsme MATCH
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                V dnešním informačně přesyceném světě je klíčové rozeznat, co je
                skutečně podstatné. Pomáháme našim klientům soustředit se na to
                nejdůležitější.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Věříme, že díky naší expertize mohou své kroky i sdělení správně
                načasovat a přesně zacílit. Poskytujeme promyšlená, komplexní
                řešení v několika specializovaných odvětvích.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { number: "15+", label: "Let zkušeností" },
                { number: "200+", label: "Úspěšných projektů" },
                { number: "50+", label: "Spokojených klientů" },
                { number: "100%", label: "Nasazení" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 px-6 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
              Naše Služby
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Naše specializace
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Orientovat se v dnešním informačně složitém světě není snadné.
              Všem našim klientům pomáháme rozeznat, co je skutečně podstatné.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: "Public affairs a politický marketing",
                description:
                  "Strategické poradenství a komunikace s veřejnými institucemi, politickými aktéry a regulačními orgány.",
              },
              {
                icon: Users,
                title: "PR a social",
                description:
                  "Komplexní řízení vztahů s médii, tvorba obsahu a správa sociálních sítí pro maximální dosah vaší značky.",
              },
              {
                icon: Shield,
                title: "Reputation management",
                description:
                  "Ochrana a budování dobré pověsti vaší značky, krizová komunikace a monitoring mediálního prostoru.",
              },
              {
                icon: Layers,
                title: "Integrovaný marketing",
                description:
                  "Propojení všech marketingových kanálů do jednotné strategie pro konzistentní a efektivní komunikaci.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 md:p-10 border border-neutral-100 hover:border-neutral-200 transition-colors"
              >
                <service.icon
                  className="w-10 h-10 text-neutral-400 mb-6"
                  strokeWidth={1}
                />
                <h3 className="font-serif text-xl md:text-2xl mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
                Portfolio
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                Naše práce
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-neutral-400 leading-relaxed">
                Naši práci děláme rádi a jsme hrdí na to, co jsme pro naše
                klienty dokázali.
              </p>
            </div>
          </div>

          <div className="divide-y divide-neutral-800">
            {[
              {
                year: "2024",
                title: "Strategická kampaň",
                category: "PUBLIC AFFAIRS",
              },
              {
                year: "2024",
                title: "Brand Repositioning",
                category: "INTEGROVANÝ MARKETING",
              },
              {
                year: "2023",
                title: "Krizová komunikace",
                category: "REPUTATION MANAGEMENT",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="py-8 md:py-10 flex items-center justify-between group cursor-pointer hover:opacity-70 transition-opacity"
              >
                <div className="flex items-center gap-6 md:gap-16">
                  <span className="text-neutral-500 text-sm">{project.year}</span>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <span className="hidden md:block text-xs tracking-[0.2em] text-neutral-500">
                    {project.category}
                  </span>
                </div>
                <ArrowRight className="w-6 h-6 text-neutral-500 group-hover:translate-x-2 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
              Náš Tým
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Seznamte se s námi
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed">
              Za každým úspěšným projektem stojí skvělý tým. Poznejte lidi,
              kteří vaše vize přeměňují ve skutečnost.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 mx-auto relative bg-neutral-200 flex items-center justify-center group-hover:bg-neutral-300 transition-colors duration-500">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-center scale-[1.2] grayscale group-hover:grayscale-0 transition-all duration-500 z-10 relative"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback to initials if image fails to load */}
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl md:text-5xl text-neutral-500 group-hover:text-neutral-700 transition-colors duration-500 z-0">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-1">
                  {member.name}
                </h3>
                <p className="text-neutral-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-24 md:py-32 px-6 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
              Kariéra
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
              Staňte se součástí týmu
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-neutral-100 p-8 md:p-12">
              <h3 className="font-serif text-2xl md:text-3xl mb-6">
                Head of Social Media & Content
              </h3>
              <p className="text-neutral-500 leading-relaxed mb-4">
                Rádi byste se podíleli na tvorbě kvalitního a poutavého
                multimediálního obsahu pro online prostředí a chcete být u jeho
                přípravy od prvotního nápadu až po finální detaily?
              </p>
              <p className="text-neutral-500 leading-relaxed mb-4">
                Máte za sebou několik let zkušeností s řízením online brandových
                kampaní, víte, jak spolupracovat s influencery, a nové digitální
                trendy máte v malíku?
              </p>
              <p className="text-neutral-500 leading-relaxed mb-8">
                Jako head of social media & content svůj talent a nápady
                uplatníte v rozmanitých kampaních pro firmy i úspěšné značky.
              </p>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-neutral-900 text-white px-8 py-4 text-sm tracking-wider hover:bg-neutral-800 transition-colors"
              >
                MÁM ZÁJEM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4">
                Kontakt
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
                Spojme se
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-12">
                Máte projekt, který potřebuje správnou strategii? Ozvěte se nám
                a společně najdeme to nejlepší řešení.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, text: "+420 774 966 336", href: "tel:+420774966336" },
                  {
                    icon: Mail,
                    text: "matchcom.sro@gmail.com",
                    href: "mailto:matchcom.sro@gmail.com",
                  },
                  {
                    icon: MapPin,
                    text: "Praha, Česká republika",
                    href: null,
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center">
                      <contact.icon className="w-5 h-5 text-neutral-500" />
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-neutral-700">{contact.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {formState.succeeded ? (
                <div className="bg-white p-8 border border-neutral-200 text-center">
                  <h3 className="font-serif text-2xl mb-4">Děkujeme!</h3>
                  <p className="text-neutral-500">
                    Vaši zprávu jsme obdrželi a brzy se vám ozveme.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm text-neutral-600 mb-2"
                      >
                        Jméno
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Vaše jméno"
                        className="w-full px-4 py-3 border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-neutral-600 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="vas@email.cz"
                        className="w-full px-4 py-3 border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm text-neutral-600 mb-2"
                    >
                      Předmět
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="O čem byste rádi mluvili?"
                      className="w-full px-4 py-3 border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-neutral-600 mb-2"
                    >
                      Zpráva
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Vaše zpráva..."
                      className="w-full px-4 py-3 border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 transition-colors resize-none placeholder:text-neutral-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="w-full bg-neutral-900 text-white py-4 text-sm tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState.submitting ? "ODESÍLÁNÍ..." : "ODESLAT ZPRÁVU"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-lg">M</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>Match s.r.o.</span>
            <span className="text-neutral-300">•</span>
            <span>+420 774 966 336</span>
            <span className="text-neutral-300">•</span>
            <span>matchcom.sro@gmail.com</span>
          </div>
          
          <p className="text-sm text-neutral-500">
            © 2026 MATCH
          </p>
        </div>
      </footer>
    </div>
  );
}