import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Menu, 
  X, 
  Clock, 
  Sparkles, 
  Check, 
  Calendar, 
  User, 
  Mail, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  
  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: 'Masaje de Autor Kurē',
    fecha: '',
    hora: '',
    notas: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Monitor scroll to update active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'contacto'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato de correo no es válido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }
    if (!formData.fecha) newErrors.fecha = 'Selecciona una fecha';
    if (!formData.hora) newErrors.hora = 'Selecciona una hora';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API request
      setTimeout(() => {
        setIsSubmitted(true);
      }, 600);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      servicio: 'Masaje de Autor Kurē',
      fecha: '',
      hora: '',
      notas: ''
    });
    setIsSubmitted(false);
    setIsModalOpen(false);
  };

  const services = [
    {
      id: 1,
      title: "Masaje de Autor Kurē",
      tagline: "Relajación Profunda y Restauración",
      price: "$1,650 MXN",
      duration: "80 min",
      description: "Nuestra terapia insignia fusiona técnicas orientales y occidentales con piedras calientes de basalto y aceites esenciales orgánicos para disolver tensiones físicas y calmar la mente de manera absoluta.",
      image: "/img/service-1.jpg",
      benefits: ["Alivio de tensión muscular", "Reducción del estrés mental", "Mejora de la circulación linfática"]
    },
    {
      id: 2,
      title: "Facial Renovación Luminosa",
      tagline: "Hidratación Botánica y Juventud",
      price: "$1,450 MXN",
      duration: "60 min",
      description: "Tratamiento facial rejuvenecedor diseñado con extractos florales puros y ácido hialurónico vegano. Purifica los poros, hidrata a nivel celular y devuelve un brillo natural y saludable a tu rostro.",
      image: "/img/service-2.jpg",
      benefits: ["Hidratación celular intensa", "Efecto lifting natural inmediato", "Limpieza de toxinas impurezas"]
    },
    {
      id: 3,
      title: "Envoltura Corporal Botánica",
      tagline: "Exfoliación y Nutrición Orgánica",
      price: "$1,800 MXN",
      duration: "90 min",
      description: "Ritual completo que inicia con una exfoliación suave de sales marinas y lavanda, seguido de una mascarilla de arcilla blanca y aloe vera local de Yucatán. Nutre, desinflama y suaviza la piel.",
      image: "/img/service-3.jpg",
      benefits: ["Exfoliación y regeneración cutánea", "Nutrición con arcillas botánicas", "Desintoxicación del tejido corporal"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-sand selection:text-brand-navy overflow-x-hidden font-sans">
      
      {/* 1. Header/Navegación */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 glass-header">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase text-brand-sage group-hover:text-brand-gold transition-colors duration-300">
              Kurē
            </span>
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-brand-gold group-hover:text-brand-sage transition-colors duration-300 mt-1.5 pl-1 border-l border-brand-gold/45">
              Spa
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'contacto', label: 'Contacto & Ubicación' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative py-2 text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:text-brand-sage ${
                  activeSection === link.id ? 'text-brand-sage font-medium' : 'text-brand-taupe'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-brand-gold animate-fade-in" />
                )}
              </a>
            ))}
          </nav>

          {/* CTAs / Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-brand-sage text-brand-cream text-xs tracking-[0.2em] uppercase rounded-none hover:bg-brand-gold hover:text-brand-navy transition-all duration-500 ease-in-out hover:tracking-[0.25em]"
            >
              Reservar Cita
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-sage hover:text-brand-gold transition-colors duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div 
          className={`md:hidden absolute top-20 left-0 w-full bg-brand-cream/95 backdrop-blur-md border-b border-brand-sand transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'contacto', label: 'Contacto & Ubicación' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm tracking-[0.2em] uppercase py-2 border-b border-brand-sand ${
                  activeSection === link.id ? 'text-brand-sage font-medium pl-2 border-brand-gold' : 'text-brand-taupe border-transparent'
                } transition-all duration-300`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full py-3.5 bg-brand-sage text-brand-cream text-xs tracking-[0.2em] uppercase rounded-none text-center hover:bg-brand-gold transition-colors duration-300"
            >
              Reservar Cita
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/hero-bg.jpg" 
            alt="Interior elegante de Kurē Spa" 
            className="w-full h-full object-cover object-center scale-105 animate-fade-in"
            style={{ animationDuration: '2.5s' }}
          />
          {/* Elegant radial/linear overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-brand-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-brand-navy/35" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-left py-12 md:py-24">
          <div className="max-w-2xl text-white">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-cream/10 backdrop-blur-md border border-white/10 rounded-full mb-6 animate-fade-in-up">
              <Sparkles size={14} className="text-brand-gold" />
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-sans text-brand-sand">
                Tu refugio de paz en Mérida
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] mb-6 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              El arte de la calma y la <span className="italic font-normal text-brand-gold">restauración</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm md:text-lg text-brand-sand/90 font-sans font-light leading-relaxed mb-10 max-w-lg tracking-wide animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Descubre un santuario de relajación minimalista en Montebello. Tratamientos diseñados meticulosamente para armonizar tu cuerpo, mente y espíritu.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-navy text-xs tracking-[0.2em] font-semibold uppercase rounded-none hover:bg-brand-cream hover:text-brand-sage transition-all duration-300 ease-in-out shadow-lg hover:shadow-white/5"
              >
                Agendar Experiencia
              </button>
              
              <a
                href="#servicios"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/30 text-white text-xs tracking-[0.2em] uppercase rounded-none hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Ver Servicios
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40">
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans">Desplazar</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-brand-gold/60 to-transparent animate-bounce" />
        </div>
      </section>

      {/* 3. Sección de Servicios */}
      <section 
        id="servicios" 
        className="py-24 md:py-32 bg-brand-cream relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3 block">
              Nuestra Colección
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-brand-sage font-light mb-4">
              Rituales de Bienestar
            </h2>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6" />
            <p className="text-sm md:text-base text-brand-taupe leading-relaxed">
              Cada terapia ha sido concebida con un enfoque holístico, utilizando ingredientes orgánicos de la más alta calidad y técnicas terapéuticas especializadas.
            </p>
          </div>

          {/* Grid de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="group flex flex-col bg-white border border-brand-sand/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-brand-sage/5 hover:-translate-y-1.5"
              >
                {/* Image Container with zoom effect */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-brand-sand">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-navy/10 transition-opacity duration-300 group-hover:opacity-0" />
                  
                  {/* Luxury Floating Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-brand-cream/90 backdrop-blur-md px-3 py-1.5 border border-brand-sand/50 text-xs tracking-wider font-semibold text-brand-sage">
                    {service.price}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Duration & Tagline */}
                    <div className="flex justify-between items-center text-xs tracking-widest uppercase text-brand-gold mb-3">
                      <span>{service.tagline}</span>
                      <span className="font-semibold text-brand-taupe">{service.duration}</span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-xl md:text-2xl font-serif text-brand-sage font-medium mb-4 group-hover:text-brand-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-brand-taupe leading-relaxed mb-6 font-light">
                      {service.description}
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2 mb-8">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2.5 text-xs text-brand-taupe">
                          <Check size={12} className="text-brand-gold shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Trigger inside Card */}
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, servicio: service.title }));
                      setIsModalOpen(true);
                    }}
                    className="w-full py-3 bg-brand-sand text-brand-navy text-xs tracking-[0.25em] font-semibold uppercase hover:bg-brand-sage hover:text-brand-cream transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                  >
                    Reservar Servicio
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Note about customization */}
          <div className="mt-16 text-center text-xs md:text-sm text-brand-taupe italic bg-brand-sand/30 py-6 border-y border-brand-sand/40 max-w-4xl mx-auto">
            ¿Deseas personalizar tu ritual? Cuéntale a nuestros terapeutas tus necesidades al llegar o indícalo en tu nota de reservación.
          </div>
        </div>
      </section>

      {/* Philosophy Callout / Interior Preview Banner */}
      <section className="relative py-24 bg-brand-navy text-brand-cream overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-radial-gradient from-brand-gold to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side text */}
            <div className="text-left max-w-xl">
              <span className="text-xs tracking-[0.3em] uppercase text-brand-gold mb-3 block">
                Nuestra Filosofía
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mb-6 leading-tight">
                Un oasis diseñado para la <span className="italic text-brand-gold">desconexión</span> total
              </h2>
              <p className="text-sm md:text-base text-brand-sand/80 mb-8 font-light leading-relaxed">
                En Kurē Spa no solo ofrecemos masajes; diseñamos experiencias inmersivas que detienen el tiempo. Cada textura, olor y sonido está calibrado en nuestro espacio para apagar el ruido cotidiano y conectar contigo mismo en un nivel más puro.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-sand/15">
                <div>
                  <h4 className="font-serif text-2xl text-brand-gold font-light mb-1">100%</h4>
                  <p className="text-xs text-brand-sand/70 uppercase tracking-widest">Ingredientes Orgánicos</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-brand-gold font-light mb-1">Mérida</h4>
                  <p className="text-xs text-brand-sand/70 uppercase tracking-widest">Montebello Exclusividad</p>
                </div>
              </div>
            </div>

            {/* Right side Spa Interior Image */}
            <div className="relative">
              <div className="absolute -inset-2 border border-brand-gold/30 translate-x-4 translate-y-4 z-0" />
              <div className="relative z-10 overflow-hidden bg-brand-sand aspect-video lg:aspect-square">
                <img 
                  src="/img/spa-interior.jpg" 
                  alt="Instalaciones exclusivas de Kurē Spa" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Sección de Contacto y Ubicación */}
      <section 
        id="contacto" 
        className="py-24 md:py-32 bg-brand-cream relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
            
            {/* Columna 1: Información de Contacto */}
            <div className="flex flex-col justify-between text-left">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3 block">
                  Información y Reservas
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-brand-sage font-light mb-6">
                  Visítanos
                </h2>
                <div className="w-12 h-[1px] bg-brand-gold mb-8" />
                <p className="text-sm md:text-base text-brand-taupe leading-relaxed mb-10 font-light">
                  Nos ubicamos en la prestigiosa zona de Montebello, al norte de Mérida. Nuestro santuario cuenta con estacionamiento privado y concierge para asegurar tu absoluta comodidad desde tu llegada.
                </p>

                {/* Info Cards */}
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-sand flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-brand-sage" />
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-brand-sage mb-1.5">
                        Ubicación
                      </h4>
                      <p className="text-xs md:text-sm text-brand-taupe leading-relaxed">
                        Calle 33 #478 x16 y 18<br />
                        Fracc. Montebello, Mérida, México, CP 97113
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-sand flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-brand-sage" />
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-brand-sage mb-1.5">
                        Teléfono
                      </h4>
                      <a 
                        href="tel:+529993714843" 
                        className="text-xs md:text-sm text-brand-taupe hover:text-brand-gold transition-colors duration-300"
                      >
                        999 371 4843
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-sand flex items-center justify-center shrink-0">
                      <Instagram size={18} className="text-brand-sage" />
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-brand-sage mb-1.5">
                        Redes Sociales
                      </h4>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs md:text-sm text-brand-taupe hover:text-brand-gold transition-colors duration-300 flex items-center gap-1.5"
                      >
                        @kure.spa
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-sand flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-brand-sage" />
                    </div>
                    <div>
                      <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-brand-sage mb-1.5">
                        Horarios de Atención
                      </h4>
                      <p className="text-xs md:text-sm text-brand-taupe leading-relaxed">
                        Lunes a Sábado: 9:00 AM – 8:00 PM<br />
                        Domingo: Cerrado por descanso
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="mt-12 pt-8 border-t border-brand-sand">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full md:w-auto px-8 py-4 bg-brand-sage text-brand-cream text-xs tracking-[0.25em] font-semibold uppercase hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Agendar Tu Visita Ahora
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Columna 2: Mapa mock elegante */}
            <div className="relative h-[450px] lg:h-auto min-h-[350px] bg-brand-sand border border-brand-sand flex flex-col overflow-hidden">
              {/* Styled Mock map background with elegant layout */}
              <div className="absolute inset-0 z-0 bg-[#EFECE6] opacity-90 flex items-center justify-center">
                
                {/* Simulated Map Layout lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-12 opacity-20 pointer-events-none">
                  <div className="h-[2px] bg-brand-navy w-full" />
                  <div className="h-[2px] bg-brand-navy w-full" />
                  <div className="h-[2px] bg-brand-navy w-full" />
                </div>
                <div className="absolute inset-0 flex justify-between p-12 opacity-20 pointer-events-none">
                  <div className="w-[2px] bg-brand-navy h-full" />
                  <div className="w-[2px] bg-brand-navy h-full" />
                  <div className="w-[2px] bg-brand-navy h-full" />
                </div>

                {/* Mérida Map Text Accent */}
                <div className="absolute top-1/4 left-1/4 text-brand-navy/15 text-[4vw] lg:text-[2vw] font-serif uppercase tracking-[0.3em] select-none pointer-events-none">
                  Montebello
                </div>
                <div className="absolute bottom-1/4 right-1/4 text-brand-navy/15 text-[4vw] lg:text-[2vw] font-serif uppercase tracking-[0.3em] select-none pointer-events-none">
                  Mérida
                </div>

                {/* Spa Pin Marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce" style={{ animationDuration: '2s' }}>
                  <div className="w-16 h-16 rounded-full bg-brand-sage/10 flex items-center justify-center border border-brand-sage/20 shadow-xl">
                    <div className="w-10 h-10 rounded-full bg-brand-sage flex items-center justify-center shadow-lg border border-brand-cream/35">
                      <span className="font-serif text-brand-cream font-medium text-xs">K</span>
                    </div>
                  </div>
                  {/* Pin label */}
                  <div className="mt-3 bg-brand-navy text-brand-cream px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-sans shadow-xl border border-brand-sand/15">
                    Kurē Spa
                  </div>
                </div>

              </div>

              {/* Quick Route button overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 bg-white/95 backdrop-blur-sm p-5 border border-brand-sand/55 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="text-xs tracking-wider font-semibold text-brand-sage">¿Cómo llegar?</h4>
                  <p className="text-[10px] text-brand-taupe mt-1">Abre tu aplicación GPS favorita para guiarte.</p>
                </div>
                <a 
                  href="https://maps.google.com/?q=Calle+33+478+Montebello+Mérida+México"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-brand-sage text-brand-cream text-[10px] tracking-wider uppercase font-semibold text-center hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 shrink-0"
                >
                  Abrir Mapa Google
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-brand-navy text-brand-cream py-16 border-t border-brand-sand/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            
            {/* Columna 1: Brand & Logo */}
            <div className="md:col-span-2">
              <span className="font-serif text-3xl tracking-[0.2em] uppercase text-brand-gold block mb-4">
                Kurē Spa
              </span>
              <p className="text-xs text-brand-sand/70 font-light leading-relaxed max-w-sm">
                Un exclusivo santuario de bienestar físico y mental en el corazón de Montebello, Mérida. Dedicados a restaurar tu equilibrio natural a través de terapias personalizadas en un ambiente de absoluto lujo y silencio.
              </p>
            </div>

            {/* Columna 2: Redundancia Contacto */}
            <div>
              <h4 className="text-xs tracking-[0.25em] uppercase text-brand-gold font-semibold mb-6">
                Contacto
              </h4>
              <ul className="space-y-3.5 text-xs text-brand-sand/80 font-light">
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-brand-gold shrink-0 mt-0.5" />
                  <span>Calle 33 #478 x16 y 18, Montebello, Mérida.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-gold shrink-0" />
                  <a href="tel:+529993714843" className="hover:text-white transition-colors duration-300">999 371 4843</a>
                </li>
              </ul>
            </div>

            {/* Columna 3: Enlaces */}
            <div>
              <h4 className="text-xs tracking-[0.25em] uppercase text-brand-gold font-semibold mb-6">
                Seguir Conectados
              </h4>
              <ul className="space-y-3.5 text-xs text-brand-sand/80 font-light">
                <li>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2.5 hover:text-brand-gold transition-colors duration-300"
                  >
                    <Instagram size={14} className="text-brand-gold" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="#inicio" className="hover:text-brand-gold transition-colors duration-300">Volver al Inicio</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="h-[1px] bg-brand-sand/15 mb-8" />

          {/* Copyright & Legal */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-sand/50 tracking-widest uppercase">
            <span>© {new Date().getFullYear()} Kurē Spa. Todos los derechos reservados.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-brand-gold transition-colors duration-300">Aviso de Privacidad</a>
              <span className="text-brand-sand/20">|</span>
              <a href="#" className="hover:text-brand-gold transition-colors duration-300">Términos de Servicio</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 6. Interactive Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-brand-cream border border-brand-sand/55 shadow-2xl p-6 md:p-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-brand-sage hover:text-brand-gold transition-colors duration-300 focus:outline-none"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            {!isSubmitted ? (
              <div>
                {/* Header */}
                <div className="text-center mb-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-bold block mb-2">
                    Agenda Tu Sesión
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-brand-sage font-light">
                    Reserva en Kurē Spa
                  </h3>
                  <div className="w-10 h-[1px] bg-brand-gold mx-auto mt-4" />
                </div>

                {/* Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-5 text-left">
                  
                  {/* Nombre */}
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                      Nombre Completo
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej. Sofia Rodriguez"
                        className={`w-full pl-9 pr-4 py-2.5 text-xs md:text-sm bg-white border ${
                          errors.nombre ? 'border-red-400' : 'border-brand-sand'
                        } focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-none transition-all duration-300`}
                      />
                    </div>
                    {errors.nombre && <p className="text-[10px] text-red-500 mt-1 font-light">{errors.nombre}</p>}
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="sofia@ejemplo.com"
                          className={`w-full pl-9 pr-4 py-2.5 text-xs md:text-sm bg-white border ${
                            errors.email ? 'border-red-400' : 'border-brand-sand'
                          } focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-none transition-all duration-300`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-500 mt-1 font-light">{errors.email}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                        Número de Teléfono
                      </label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="999 371 4843"
                          className={`w-full pl-9 pr-4 py-2.5 text-xs md:text-sm bg-white border ${
                            errors.telefono ? 'border-red-400' : 'border-brand-sand'
                          } focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-none transition-all duration-300`}
                        />
                      </div>
                      {errors.telefono && <p className="text-[10px] text-red-500 mt-1 font-light">{errors.telefono}</p>}
                    </div>
                  </div>

                  {/* Servicio Selector */}
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                      Selecciona un Ritual
                    </label>
                    <select
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-white border border-brand-sand focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-none transition-all duration-300"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title} ({service.duration}) — {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Fecha */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                        Fecha
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="fecha"
                          value={formData.fecha}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-3 py-2.5 text-xs bg-white border ${
                            errors.fecha ? 'border-red-400' : 'border-brand-sand'
                          } focus:outline-none focus:border-brand-sage rounded-none transition-all duration-300`}
                        />
                      </div>
                      {errors.fecha && <p className="text-[10px] text-red-500 mt-1 font-light">{errors.fecha}</p>}
                    </div>

                    {/* Hora */}
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                        Hora
                      </label>
                      <select
                        name="hora"
                        value={formData.hora}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${
                          errors.hora ? 'border-red-400' : 'border-brand-sand'
                        } focus:outline-none focus:border-brand-sage rounded-none transition-all duration-300`}
                      >
                        <option value="">Selecciona hora</option>
                        {["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM"].map((timeOption) => (
                          <option key={timeOption} value={timeOption}>{timeOption}</option>
                        ))}
                      </select>
                      {errors.hora && <p className="text-[10px] text-red-500 mt-1 font-light">{errors.hora}</p>}
                    </div>
                  </div>

                  {/* Notas */}
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-brand-sage font-semibold mb-1.5">
                      Notas o Peticiones Especiales (Opcional)
                    </label>
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Ej. Alguna lesión a considerar, alergias a aceites aromáticos..."
                      className="w-full px-4 py-2.5 text-xs md:text-sm bg-white border border-brand-sand focus:outline-none focus:border-brand-sage focus:ring-1 focus:ring-brand-sage rounded-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-sage text-brand-cream text-xs tracking-[0.25em] font-semibold uppercase hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                    Confirmar Pre-Reservación
                    <Calendar size={14} />
                  </button>

                  <p className="text-[9px] text-brand-taupe text-center mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck size={12} className="text-brand-gold" />
                    <span>Tus datos están protegidos. Un agente te llamará para finalizar la confirmación.</span>
                  </p>

                </form>
              </div>
            ) : (
              // Success Screen
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-brand-sage/10 flex items-center justify-center border border-brand-sage/20 mx-auto mb-6">
                  <Check size={32} className="text-brand-sage animate-bounce" />
                </div>
                
                <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-bold block mb-2">
                  ¡Pre-Reservación Recibida!
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-brand-sage font-light mb-4">
                  Gracias, {formData.nombre.split(' ')[0]}
                </h3>
                <div className="w-10 h-[1px] bg-brand-gold mx-auto mb-6" />
                
                <div className="bg-white border border-brand-sand/50 p-6 text-left max-w-sm mx-auto space-y-3 mb-8">
                  <p className="text-xs text-brand-taupe"><strong className="text-brand-sage font-medium">Ritual:</strong> {formData.servicio}</p>
                  <p className="text-xs text-brand-taupe"><strong className="text-brand-sage font-medium">Fecha:</strong> {formData.fecha}</p>
                  <p className="text-xs text-brand-taupe"><strong className="text-brand-sage font-medium">Hora:</strong> {formData.hora}</p>
                  <p className="text-xs text-brand-taupe"><strong className="text-brand-sage font-medium">Medio de contacto:</strong> {formData.telefono}</p>
                </div>

                <p className="text-xs md:text-sm text-brand-taupe font-light max-w-xs mx-auto leading-relaxed mb-8">
                  Hemos enviado una notificación y un asesor se pondrá en contacto contigo telefónicamente en un lapso de 15 minutos para confirmar la hora exacta y detalles de pago.
                </p>

                <button
                  onClick={resetForm}
                  className="px-8 py-3.5 bg-brand-sage text-brand-cream text-xs tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
