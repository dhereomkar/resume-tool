// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Upload, FileEdit, ArrowRight, Check, LayoutTemplate, MoveRight, MousePointerClick } from 'lucide-react';
import { Image } from '@/components/ui/image';

// --- Constants & UI Data ---
const PLACEHOLDER_IMG = "https://static.wixstatic.com/media/5232c6_cc775aec3d8341819611bf12ad5665c1~mv2.png?originWidth=448&originHeight=704";

const PROCESS_STEPS = [
  {
    id: "01",
    title: "Upload & Extract",
    description: "Begin with the raw material. Upload your existing PDF resume. Our system strips away the noise, extracting the essential data—name, contact, skills, education—leaving you with a clean slate.",
    icon: <Upload className="w-6 h-6" />,
    link: "/upload"
  },
  {
    id: "02",
    title: "Refine & Edit",
    description: "Precision is key. Enter the builder interface to meticulously refine your narrative. Adjust the hierarchy, polish the language, and ensure every word serves a purpose.",
    icon: <FileEdit className="w-6 h-6" />,
    link: "/builder"
  },
  {
    id: "03",
    title: "Format & Export",
    description: "The final form. Select from our curated collection of minimalist templates. Designed to be invisible, they let your achievements speak without distraction.",
    icon: <LayoutTemplate className="w-6 h-6" />,
    link: "/builder"
  }
];

const TEMPLATE_PREVIEWS = [
  { title: "The Minimalist", type: "Clean" },
  { title: "The Executive", type: "Structured" },
  { title: "The Creative", type: "Open" },
];

// --- Components ---

const SectionDivider = () => (
  <div className="w-full max-w-[100rem] mx-auto px-6">
    <div className="w-full h-[1px] bg-grey300" />
  </div>
);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-20">
      {/* Background Grid Hint */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />

      <div className="w-full max-w-[100rem] mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
        <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading text-7xl md:text-9xl font-bold text-foreground tracking-tighter leading-[0.9] mb-8">
              RESUME <br />
              <span className="text-grey300">BUILDER</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="font-paragraph text-xl md:text-2xl text-secondary leading-relaxed mb-12">
              The transparent canvas for your professional narrative. 
              Upload, extract, and refine with absolute precision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/upload" className="group">
                <button className="bg-foreground text-background font-paragraph font-medium px-10 py-5 rounded-sm flex items-center gap-4 hover:bg-primary transition-colors duration-300">
                  <Upload size={20} />
                  <span>Upload Resume</span>
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </Link>
              <Link to="/builder" className="group">
                <button className="bg-transparent text-foreground border border-grey300 font-paragraph font-medium px-10 py-5 rounded-sm flex items-center gap-4 hover:border-foreground transition-colors duration-300">
                  <FileEdit size={20} />
                  <span>Build from Scratch</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract Visual */}
        <motion.div 
          style={{ y, opacity }}
          className="col-span-1 lg:col-span-4 hidden lg:flex items-center justify-center relative h-full min-h-[60vh]"
        >
           <div className="relative w-full h-full overflow-hidden rounded-sm">
              <Image 
                src={PLACEHOLDER_IMG} 
                alt="Minimalist Resume Preview" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-50" />
           </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-2 text-grey500"
      >
        <span className="text-xs font-heading tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-grey300 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full bg-foreground"
          />
        </div>
      </motion.div>
    </section>
  );
};

const StickyProcessSection = () => {
  return (
    <section className="relative bg-background py-32 md:py-48">
      <div className="w-full max-w-[100rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Header */}
        <div className="col-span-1 lg:col-span-4 h-fit lg:sticky lg:top-32 mb-12 lg:mb-0">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            THE <br /> PROCESS
          </h2>
          <p className="font-paragraph text-lg text-secondary max-w-xs">
            A reductionist approach to resume creation. Three steps to clarity.
          </p>
          <div className="mt-12 hidden lg:block">
             <div className="w-12 h-[1px] bg-primary mb-2" />
             <span className="text-xs font-heading text-primary tracking-widest uppercase">Workflow</span>
          </div>
        </div>

        {/* Scrolling Cards */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-32">
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessCard = ({ step, index }: { step: typeof PROCESS_STEPS[0], index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-grey300 pt-12"
    >
      <div className="order-2 md:order-1">
        <span className="block font-heading text-8xl text-grey100 font-bold mb-4 select-none group-hover:text-grey300 transition-colors duration-500">
          {step.id}
        </span>
        <h3 className="font-heading text-3xl font-semibold text-foreground mb-4 flex items-center gap-3">
          {step.title}
        </h3>
        <p className="font-paragraph text-secondary text-lg leading-relaxed mb-8 max-w-md">
          {step.description}
        </p>
        <Link to={step.link} className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
          <span className="border-b border-current pb-0.5">Start Action</span>
          <MoveRight size={16} />
        </Link>
      </div>
      
      <div className="order-1 md:order-2 relative aspect-[4/3] bg-grey100 rounded-sm overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-grey300 group-hover:text-primary transition-colors duration-500 z-10">
          {React.cloneElement(step.icon as React.ReactElement, { size: 64, strokeWidth: 1 })}
        </div>
        <Image 
          src={PLACEHOLDER_IMG} 
          alt={step.title} 
          className="w-full h-full object-cover opacity-50 grayscale group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </motion.div>
  );
};

const HorizontalScrollShowcase = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-grey900 text-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-6 md:left-12 z-10">
           <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
             DESIGNED FOR <br /> <span className="text-grey500">SILENCE</span>
           </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-12 w-max">
          {/* Intro Card */}
          <div className="w-[80vw] md:w-[40vw] h-[60vh] flex flex-col justify-end p-8 border border-grey700 rounded-sm bg-grey900">
            <p className="font-paragraph text-2xl text-grey300 max-w-md">
              Our templates are devoid of decoration. Their form is defined by typography and whitespace.
            </p>
          </div>

          {/* Template Cards */}
          {TEMPLATE_PREVIEWS.map((template, i) => (
            <div key={i} className="relative w-[80vw] md:w-[50vw] h-[60vh] bg-white rounded-sm overflow-hidden group">
              <div className="absolute top-6 left-6 z-10 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-black font-heading text-sm font-medium uppercase tracking-wider">{template.type}</span>
              </div>
              <Image 
                src={PLACEHOLDER_IMG} 
                alt={template.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-heading text-2xl font-bold">{template.title}</h3>
              </div>
            </div>
          ))}
          
          {/* End Card */}
           <div className="w-[80vw] md:w-[30vw] h-[60vh] flex items-center justify-center">
              <Link to="/builder" className="group flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full border border-grey700 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowRight className="w-8 h-8 text-grey300 group-hover:text-white" />
                </div>
                <span className="font-heading text-xl text-grey300 group-hover:text-white transition-colors">View All Templates</span>
              </Link>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureGrid = () => {
  return (
    <section className="py-32 bg-background">
      <div className="w-full max-w-[100rem] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-grey300 border border-grey300">
          {[
            { title: "ATS Friendly", desc: "Optimized for parsing algorithms." },
            { title: "PDF Export", desc: "High-fidelity vector output." },
            { title: "Real-time Preview", desc: "See changes as you type." }
          ].map((feature, i) => (
            <div key={i} className="bg-background p-12 flex flex-col gap-4 hover:bg-grey100 transition-colors duration-300">
              <Check className="text-primary w-6 h-6" />
              <h4 className="font-heading text-xl font-bold text-foreground">{feature.title}</h4>
              <p className="font-paragraph text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className="py-40 bg-background flex flex-col items-center text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
          BEGIN YOUR <br /> NARRATIVE
        </h2>
        <p className="font-paragraph text-xl text-secondary mb-12 max-w-2xl mx-auto">
          No distractions. No clutter. Just your professional story, told with absolute clarity.
        </p>
        <Link to="/upload">
          <button className="bg-primary text-primary-foreground font-heading font-medium text-lg px-12 py-6 rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Create Resume
          </button>
        </Link>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <HeroSection />
      <SectionDivider />
      <StickyProcessSection />
      <HorizontalScrollShowcase />
      <FeatureGrid />
      <SectionDivider />
      <CtaSection />
    </div>
  );
}