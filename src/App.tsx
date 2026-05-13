/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ArrowLeft,
  Bed, 
  Bath, 
  Square, 
  Layers, 
  Menu, 
  X,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Constants ---

const PROPERTIES_DATA = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    name: "Aether Heights",
    price: "12.4M",
    location: "Beverly Hills, CA",
    sqm: "840",
    floors: "3",
    beds: "5",
    baths: "6"
  },
  {
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=2070&auto=format&fit=crop",
    name: "Solaris Loft",
    price: "4.8M",
    location: "San Francisco, CA",
    sqm: "320",
    floors: "1",
    beds: "2",
    baths: "3"
  },
  {
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop",
    name: "Obsidian Villa",
    price: "8.9M",
    location: "Malibu, CA",
    sqm: "560",
    floors: "2",
    beds: "4",
    baths: "5"
  },
  {
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop",
    name: "Veridian Estate",
    price: "15.2M",
    location: "Aspen, CO",
    sqm: "1,200",
    floors: "3",
    beds: "6",
    baths: "8"
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    name: "Lumina Pavilion",
    price: "6.5M",
    location: "Miami, FL",
    sqm: "450",
    floors: "2",
    beds: "3",
    baths: "4"
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    name: "Elysian Sanctuary",
    price: "21.0M",
    location: "Hamptons, NY",
    sqm: "1,550",
    floors: "2",
    beds: "7",
    baths: "9"
  }
];

// --- Variants ---

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const slideUpReveal = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom ease-out expo
    }
  }
};

const fadeInLift = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white py-4 border-gray-100 shadow-sm' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <a href="/" className="text-2xl font-display font-bold tracking-tighter">
            ZENITH<span className="hidden sm:inline">.</span>
          </a>
          
          <div className="hidden lg:flex gap-8">
            {['Properties', 'Mortgage', 'Company', 'Careers', 'Blog'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-gray-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-brand-white bg-brand-black px-6 py-3 text-sm font-bold tracking-tight hover:bg-gray-800 transition-all active:scale-95">
            Post a Property
          </button>
          
          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-b border-gray-100 lg:hidden p-6 flex flex-col gap-4"
        >
          {['Properties', 'Mortgage', 'Company', 'Careers', 'Blog'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full text-brand-white bg-brand-black px-6 py-4 text-center text-sm font-bold tracking-tight">
            Post a Property
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern luxury villa background"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-end"
        >
          <div className="overflow-hidden">
            <motion.h1 
              variants={slideUpReveal}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tighter text-brand-white"
            >
              Discover space <br className="hidden md:block" /> you truly belong in
            </motion.h1>
          </div>
          
          <motion.div 
            variants={fadeInLift}
            className="lg:pl-12 space-y-8"
          >
            <p className="text-xl text-gray-300 font-light max-w-md leading-relaxed">
              We redefine luxury living through architectural excellence and curated spaces that resonate with your lifestyle.
            </p>
            <button className="flex items-center gap-4 bg-brand-white text-brand-black px-8 py-4 sm:px-10 sm:py-5 font-bold hover:gap-6 transition-all group">
              Book a Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-brand-white/60 to-transparent" 
          />
        </motion.div>
      </div>
    </section>
  );
};

const PropertyCard = ({ image, name, price, location, sqm, floors, beds, baths, index, onClick, isHovered, isAnyHovered, onMouseEnter, onMouseLeave }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <motion.div 
      ref={cardRef}
      layout
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: isAnyHovered && !isHovered ? 0.4 : 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      animate={{ 
        opacity: isAnyHovered && !isHovered ? 0.4 : 1,
        scale: isHovered ? 1.02 : 1,
        filter: isAnyHovered && !isHovered ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-brand-gray/30 rounded-sm">
        <motion.div
          className="w-full h-full"
          style={{ scale }}
          animate={{ scale: isHovered ? 1.1 : undefined }} // Combined with scroll scale logic
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img 
            src={image} 
            alt={name}
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            onLoad={() => setIsLoaded(true)}
            transition={{ duration: 1.2 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
        
        <div className="absolute top-6 left-6 z-10">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"
          >
            Exclusive
          </motion.span>
        </div>

        <motion.div 
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8"
        >
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">View Details</p>
            <ArrowRight size={20} />
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-between items-end mb-1">
        <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tighter uppercase whitespace-nowrap">{name}</h3>
        <p className="text-base sm:text-lg font-bold text-gray-400 tracking-tighter">${price}</p>
      </div>
      
      <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-[0.2em] font-bold">{location}</p>
      
      <div className="flex gap-6 py-4 border-t border-gray-100 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <Square size={12} strokeWidth={2.5} /> {sqm}m²
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <Bed size={12} strokeWidth={2.5} /> {beds} BD
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
          <Bath size={12} strokeWidth={2.5} /> {baths} BA
        </div>
      </div>
    </motion.div>
  );
};

const PropertyGrid = ({ onPropertyClick }: { onPropertyClick: (index: number) => void }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="properties" className="py-24 lg:py-40 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 lg:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 block">Our Portfolio</span>
            <h2 className="text-3xl sm:text-5xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1] uppercase">
              Architectural <br className="hidden sm:block" /> masterpieces
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gray-500 text-base sm:text-lg max-w-sm font-light leading-relaxed mb-4 lg:mb-2"
          >
            A curated selection of properties that define the pinnacle of modern luxury and architectural innovation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {PROPERTIES_DATA.map((prop, i) => (
            <PropertyCard 
              key={i} 
              {...prop} 
              index={i} 
              isHovered={hoveredIndex === i}
              isAnyHovered={hoveredIndex !== null}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onPropertyClick(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExclusiveSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="py-40 bg-brand-black text-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-20 items-center">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-6xl lg:text-8xl tracking-tighter uppercase font-display leading-[1.1]">
                Exclusive <br /> Collection
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 font-light max-w-md leading-relaxed">
                Access our private listings of world-class architectural marvels not available on the public market.
              </p>
            </motion.div>
            
            <button className="group flex items-center justify-between sm:justify-start gap-4 sm:gap-6 px-8 py-4 sm:px-10 sm:py-5 border border-white/20 hover:bg-white hover:text-brand-black transition-all duration-500 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Free Consultation</span>
              <div className="w-8 sm:w-10 h-[1px] bg-white group-hover:bg-brand-black transition-colors" />
            </button>
          </div>

          <div className="relative w-full lg:w-[500px] h-[700px] overflow-hidden bg-gray-900">
            <motion.div style={{ y, height: '120%', top: '-10%', position: 'absolute', width: '100%' }}>
              {/* INSERT: Large vertical architectural image here */}
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Architectural detail"
                className="w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <a href="/" className="text-3xl font-display font-bold tracking-tighter mb-8 block">
              ZENITH.
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Architectural luxury defined by minimalism and precision. Shaping the future of high-end living.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {['Properties', 'Mortgage', 'Company', 'Careers', 'Blog'].map(item => (
                <a key={item} href="#" className="text-sm text-gray-500 hover:text-brand-black transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Support</h4>
            <div className="flex flex-col gap-4">
              {['Contact Us', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <a key={item} href="#" className="text-sm text-gray-500 hover:text-brand-black transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Social</h4>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-brand-black"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-brand-black"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-brand-black"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-50 gap-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            &copy; 2026 ZENITH REALTY GROUP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">DESIGNED BY ZENITH STUDIOS</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">BASED IN CALIFORNIA, US</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState<number | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPropertyIndex(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedPropertyIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPropertyIndex]);

  const handleNext = () => {
    setSelectedPropertyIndex((prev) => 
      prev !== null ? (prev === PROPERTIES_DATA.length - 1 ? 0 : prev + 1) : null
    );
  };

  const handlePrev = () => {
    setSelectedPropertyIndex((prev) => 
      prev !== null ? (prev === 0 ? PROPERTIES_DATA.length - 1 : prev - 1) : null
    );
  };

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <PropertyGrid onPropertyClick={(index: number) => setSelectedPropertyIndex(index)} />
        <ExclusiveSection />
      </main>
      <Footer />

      {/* Luxury Modal Experience */}
      <AnimatePresence>
        {selectedPropertyIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 lg:p-12">
            {/* Backdrop with Glassmorphism */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPropertyIndex(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            {/* Desktop Modal (Hidden on Mobile) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: 40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex relative w-full h-[85vh] max-w-[1440px] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm"
            >
              {/* Close Button UI */}
              <button 
                onClick={() => setSelectedPropertyIndex(null)}
                className="absolute top-10 right-10 z-[130] w-12 h-12 flex items-center justify-center bg-brand-gray/20 hover:bg-brand-black hover:text-white transition-all rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-[1fr_1.5fr] w-full h-full">
                {/* Info Column */}
                <div className="flex flex-col p-16 xl:p-24 overflow-y-auto">
                  <div className="mb-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6 block">Collection Item {selectedPropertyIndex + 1}</span>
                    <h3 className="text-5xl xl:text-7xl font-display font-extrabold tracking-tighter uppercase leading-[0.9] mb-8 break-words">
                      {PROPERTIES_DATA[selectedPropertyIndex].name}
                    </h3>
                    <p className="text-2xl font-bold tracking-tighter mb-12">${PROPERTIES_DATA[selectedPropertyIndex].price}</p>
                    
                    <div className="space-y-6 mb-16 max-w-sm">
                      <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold flex items-center gap-3">
                         <span className="w-8 h-[1px] bg-gray-300" /> {PROPERTIES_DATA[selectedPropertyIndex].location}
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed font-light">
                        This architectural achievement seamlessly blends contemporary minimalism with organic elements, creating a sanctuary of unparalleled light and volume.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8 py-10 border-y border-black/5 mb-16">
                      <div className="space-y-2">
                        <Square size={16} strokeWidth={2.5} className="text-gray-400" />
                        <p className="text-lg font-bold tracking-tighter">{PROPERTIES_DATA[selectedPropertyIndex].sqm}</p>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Total Sqm</p>
                      </div>
                      <div className="space-y-2">
                        <Bed size={16} strokeWidth={2.5} className="text-gray-400" />
                        <p className="text-lg font-bold tracking-tighter">{PROPERTIES_DATA[selectedPropertyIndex].beds}</p>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Bedrooms</p>
                      </div>
                      <div className="space-y-2">
                        <Bath size={16} strokeWidth={2.5} className="text-gray-400" />
                        <p className="text-lg font-bold tracking-tighter">{PROPERTIES_DATA[selectedPropertyIndex].baths}</p>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Bathrooms</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-brand-black text-white px-6 py-4 font-bold hover:bg-gray-800 transition-all uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
                      Book Visit <ArrowRight size={12} />
                    </button>
                    <button className="flex-1 border border-black/10 px-6 py-4 font-bold hover:bg-gray-50 transition-all uppercase tracking-widest text-[9px]">
                      Explore Property
                    </button>
                  </div>
                </div>

                {/* Media Column */}
                <div className="relative bg-brand-gray overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPropertyIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
                    >
                      <img 
                        src={PROPERTIES_DATA[selectedPropertyIndex].image} 
                        alt={PROPERTIES_DATA[selectedPropertyIndex].name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Overlays */}
                  <div className="absolute inset-y-0 left-0 w-32 flex items-center justify-center">
                    <button onClick={handlePrev} className="p-8 group opacity-40 hover:opacity-100 transition-all cursor-pointer">
                      <ArrowLeft size={32} strokeWidth={1} className="group-hover:-translate-x-2 transition-transform" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-32 flex items-center justify-center">
                    <button onClick={handleNext} className="p-8 group opacity-40 hover:opacity-100 transition-all cursor-pointer">
                      <ArrowRight size={32} strokeWidth={1} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  <div className="absolute bottom-16 right-16 flex items-center gap-6">
                    <span className="text-[10px] font-bold text-white tracking-[0.5em] uppercase">0{selectedPropertyIndex + 1} / 0{PROPERTIES_DATA.length}</span>
                    <div className="w-12 h-[1px] bg-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Experience (Bottom Sheet) */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] max-h-[95vh] overflow-y-auto z-[150] shadow-2xl"
            >
              <div className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-gray-100">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-3" />
                <h4 className="text-sm font-bold uppercase tracking-widest mt-4">Details</h4>
                <button onClick={() => setSelectedPropertyIndex(null)} className="p-2 bg-gray-100 rounded-full mt-2 cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img src={PROPERTIES_DATA[selectedPropertyIndex].image} className="w-full h-full object-cover" alt={PROPERTIES_DATA[selectedPropertyIndex].name} />
                </div>
                
                <h3 className="text-4xl font-display font-extrabold tracking-tighter uppercase mb-2">{PROPERTIES_DATA[selectedPropertyIndex].name}</h3>
                <p className="text-2xl font-bold tracking-tighter mb-6">${PROPERTIES_DATA[selectedPropertyIndex].price}</p>
                
                <p className="text-gray-500 uppercase tracking-widest text-[9px] font-bold mb-6">{PROPERTIES_DATA[selectedPropertyIndex].location}</p>
                
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex-shrink-0 bg-gray-50 px-6 py-4 rounded-xl flex flex-col gap-1 items-center min-w-[100px]">
                    <Square size={16} className="text-gray-400" />
                    <span className="text-sm font-bold">{PROPERTIES_DATA[selectedPropertyIndex].sqm}m²</span>
                  </div>
                  <div className="flex-shrink-0 bg-gray-50 px-6 py-4 rounded-xl flex flex-col gap-1 items-center min-w-[100px]">
                    <Bed size={16} className="text-gray-400" />
                    <span className="text-sm font-bold">{PROPERTIES_DATA[selectedPropertyIndex].beds}BD</span>
                  </div>
                  <div className="flex-shrink-0 bg-gray-50 px-6 py-4 rounded-xl flex flex-col gap-1 items-center min-w-[100px]">
                    <Bath size={16} className="text-gray-400" />
                    <span className="text-sm font-bold">{PROPERTIES_DATA[selectedPropertyIndex].baths}BA</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed font-light mb-10">
                  Experience architectural precision in this stunning residence. Designed for comfort and luxury living.
                </p>

                <div className="mt-8 flex flex-col gap-2 pb-6">
                  <button className="w-full bg-brand-black text-white px-5 py-3.5 font-bold rounded-lg uppercase tracking-widest text-[9px]">
                    Book a Private Viewing
                  </button>
                  <button className="w-full border border-black/10 px-5 py-3.5 font-bold rounded-lg uppercase tracking-widest text-[9px]">
                    Get Details via Email
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
