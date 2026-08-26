'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

export function Hero() {
  return (
    <section id="inicio" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image 
        src="https://picsum.photos/seed/raf-hero/1920/1080" 
        alt="Rafitness Gym Environment" 
        fill 
        className="object-cover"
        priority
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-navy/80 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-28 md:pt-32 lg:pt-36 mt-0">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block border-l-4 border-brand-orange pl-4 mb-2"
          >
            <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-sm">A melhor estrutura de Várzea Grande</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] text-white mb-6"
          >
            SEU PRÓXIMO <br />
            <span className="text-brand-orange">NÍVEL</span> COMEÇA <br />
            AQUI.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-brand-silver mb-10 leading-relaxed max-w-xl font-light"
          >
            Treine em um ambiente completo, climatizado e preparado para você buscar mais força, saúde e evolução todos os dias.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 mb-12"
          >
            <a href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym." target="_blank" rel="noopener noreferrer" className="bg-brand-orange text-brand-black font-black px-8 py-4 uppercase tracking-tighter text-lg md:text-xl italic hover:scale-105 transition-transform text-center flex items-center justify-center">
              Começar a Treinar
            </a>
            <a href="#sobre" className="border border-white/20 hover:border-brand-orange bg-white/5 backdrop-blur-sm text-white font-black px-8 py-4 uppercase tracking-tighter text-lg md:text-xl italic transition-all text-center flex items-center justify-center">
              Conhecer Espaço
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-sm mt-12"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Ambiente climatizado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Variedade de equipamentos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Atendimento próximo</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
