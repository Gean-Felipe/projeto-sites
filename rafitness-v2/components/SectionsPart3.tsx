'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useState } from 'react';

export function Gallery() {
  const images = [
    'https://picsum.photos/seed/raf-gal1/800/600',
    'https://picsum.photos/seed/raf-gal2/600/800',
    'https://picsum.photos/seed/raf-gal3/800/800',
    'https://picsum.photos/seed/raf-gal4/600/600',
    'https://picsum.photos/seed/raf-gal5/800/1000',
    'https://picsum.photos/seed/raf-gal6/1000/600'
  ];
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-24 bg-brand-navy border-y border-brand-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-black italic uppercase text-white tracking-wide">NOSSO ESPAÇO</h2>
        </motion.div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-sm border border-brand-gray/10" onClick={() => setSelectedImg(src)}>
              <img src={src} alt="Galeria Rafitness" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest text-sm border border-white/30 px-6 py-2 backdrop-blur-sm rounded-sm">AMPLIAR</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div className="fixed inset-0 z-[100] bg-brand-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-6 right-6 md:top-10 md:right-10 text-brand-silver hover:text-brand-orange text-5xl transition-colors" onClick={() => setSelectedImg(null)}>&times;</button>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image src={selectedImg} alt="Galeria ampliada" fill className="object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}
    </section>
  );
}

export function Location() {
  return (
    <section id="localizacao" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-4">VENHA TREINAR<br/><span className="text-brand-orange">COM A GENTE.</span></h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-brand-navy p-8 rounded-sm border border-brand-gray/10 hover:border-brand-orange/30 transition-colors">
                <MapPin className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2 tracking-wide">ENDEREÇO</h4>
                  <p className="text-brand-silver font-light leading-relaxed">R. Alves de Oliveira, 2150<br/>Cristo Rei<br/>Várzea Grande - MT<br/>78118-081</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-brand-navy p-8 rounded-sm border border-brand-gray/10 hover:border-brand-orange/30 transition-colors">
                <Phone className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2 tracking-wide">TELEFONE</h4>
                  <p className="text-brand-silver font-light">(65) 98170-6248</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-brand-navy p-8 rounded-sm border border-brand-gray/10 hover:border-brand-orange/30 transition-colors">
                <Clock className="w-8 h-8 text-brand-orange shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2 tracking-wide">HORÁRIO</h4>
                  <p className="text-brand-silver font-medium text-brand-orange/90">CONSULTE NOSSO HORÁRIO DE FUNCIONAMENTO</p>
                </div>
              </div>
            </div>
            
            <a href="https://maps.google.com/?q=R.+Alves+de+Oliveira,+2150+-+Cristo+Rei,+Várzea+Grande+-+MT,+78118-081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-brand-orange hover:bg-brand-orange-dark text-brand-black px-8 py-5 rounded-none font-black tracking-widest uppercase italic transition-colors text-lg mt-6">
              COMO CHEGAR
            </a>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-[400px] lg:h-auto min-h-[400px] w-full rounded-sm overflow-hidden border border-brand-gray/20 shadow-2xl relative bg-brand-navy group">
            <Image src="https://picsum.photos/seed/raf-map-placeholder/800/800" alt="Localização" fill className="object-cover opacity-30 group-hover:opacity-40 transition-opacity" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-brand-navy/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
               <MapPin className="w-16 h-16 text-brand-orange mb-6 drop-shadow-[0_0_15px_rgba(255,106,0,0.5)] animate-bounce" />
               <h3 className="font-heading text-3xl font-black italic uppercase text-white mb-2 tracking-wider">RAFITNESS GYM</h3>
               <p className="text-brand-silver mb-8 text-lg font-light">Cristo Rei, Várzea Grande - MT</p>
               <a href="https://maps.google.com/?q=R.+Alves+de+Oliveira,+2150+-+Cristo+Rei,+Várzea+Grande+-+MT,+78118-081" target="_blank" rel="noopener noreferrer" className="border-2 border-brand-orange text-brand-orange px-8 py-3 rounded-none font-black tracking-widest uppercase italic hover:bg-brand-orange hover:text-brand-black transition-colors bg-brand-black/50 backdrop-blur-sm">
                 ABRIR NO GOOGLE MAPS
               </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden border-t border-brand-gray/10">
      <Image src="https://picsum.photos/seed/raf-cta/1920/800" alt="Treino intenso" fill className="object-cover" priority referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-brand-black/85" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl md:text-7xl font-black italic uppercase text-white mb-6 leading-none">
            SEU OBJETIVO NÃO VAI SE<br className="hidden md:block"/> ALCANÇAR <span className="text-brand-orange">SOZINHO.</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-silver mb-12 font-light tracking-wide">
            Comece hoje a construir uma versão mais forte de você.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym." target="_blank" rel="noopener noreferrer" className="bg-brand-orange hover:bg-brand-orange-dark text-brand-black px-10 py-5 rounded-none font-black uppercase tracking-widest transition-colors text-lg md:text-xl shadow-[0_0_30px_rgba(255,106,0,0.4)] hover:shadow-[0_0_40px_rgba(255,106,0,0.6)]">
              QUERO TREINAR
            </a>
            <a href="https://wa.me/5565981706248" target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-brand-orange hover:text-brand-orange text-white px-10 py-5 rounded-none font-black uppercase tracking-widest transition-colors text-lg md:text-xl bg-white/5 backdrop-blur-sm">
              FALAR NO WHATSAPP
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
