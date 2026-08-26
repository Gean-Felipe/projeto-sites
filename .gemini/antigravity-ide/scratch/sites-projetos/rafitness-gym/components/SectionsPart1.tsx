'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Thermometer, Dumbbell, CalendarX2, Users } from 'lucide-react';

export function Benefits() {
  const benefits = [
    { icon: Thermometer, title: 'AMBIENTE CLIMATIZADO', desc: 'Treine com mais conforto durante seus treinos.' },
    { icon: Dumbbell, title: 'EQUIPAMENTOS', desc: 'Variedade de equipamentos para diferentes objetivos.' },
    { icon: CalendarX2, title: 'SEM FIDELIDADE', desc: 'Plano mensal pensado para oferecer mais liberdade.' },
    { icon: Users, title: 'ATENDIMENTO PRÓXIMO', desc: 'Um ambiente onde você é bem recebido e acompanhado.' }
  ];

  return (
    <section className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-4">
            MAIS QUE UMA ACADEMIA.<br/>
            <span className="text-brand-orange">UM AMBIENTE PARA EVOLUIR.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-brand-navy p-8 rounded-sm border border-brand-gray/10 hover:border-brand-orange/50 transition-colors group">
              <b.icon className="w-12 h-12 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-wide">{b.title}</h3>
              <p className="text-brand-silver text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="py-24 bg-brand-navy relative overflow-hidden border-y border-brand-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-8">
              AQUI, SEU ESFORÇO<br/>
              <span className="text-brand-orange">TEM PROPÓSITO.</span>
            </h2>
            <div className="space-y-6 text-brand-silver text-lg font-light">
              <p>A Rafitness Gym foi criada para quem busca um espaço completo para cuidar da saúde, desenvolver força e evoluir de forma consistente.</p>
              <p>Nossa proposta é oferecer um ambiente amplo, climatizado e equipado, com variedade de aparelhos e atendimento próximo para tornar sua experiência melhor a cada treino.</p>
              <p>Não importa se você está começando agora ou já treina há anos. Aqui existe espaço para sua evolução.</p>
            </div>
            <a href="#estrutura" className="inline-block mt-10 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-black px-8 py-4 rounded-none font-black tracking-widest uppercase italic transition-colors">
              CONHEÇA NOSSO ESPAÇO
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 relative h-[400px] md:h-[500px]">
            <Image src="https://picsum.photos/seed/raf-about/800/1000" alt="Sobre a Rafitness" fill className="object-cover rounded-sm" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Structure() {
  const images = [
    { src: 'https://picsum.photos/seed/raf-str1/600/400', alt: 'Área de musculação' },
    { src: 'https://picsum.photos/seed/raf-str2/600/400', alt: 'Equipamentos modernos' },
    { src: 'https://picsum.photos/seed/raf-str3/600/400', alt: 'Ambiente climatizado' },
    { src: 'https://picsum.photos/seed/raf-str4/600/400', alt: 'Área de cardio' },
  ];
  return (
    <section id="estrutura" className="py-24 bg-brand-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-4">UMA ESTRUTURA PENSADA<br/><span className="text-brand-orange">PARA O SEU TREINO.</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative h-64 md:h-80 lg:h-96 group overflow-hidden rounded-sm">
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-brand-black/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Equipment() {
  const categories = [
    { title: 'MUSCULAÇÃO', img: 'https://picsum.photos/seed/raf-eq1/600/800' },
    { title: 'CARDIO', img: 'https://picsum.photos/seed/raf-eq2/600/800' },
    { title: 'FORÇA', img: 'https://picsum.photos/seed/raf-eq3/600/800' },
    { title: 'TREINO FUNCIONAL', img: 'https://picsum.photos/seed/raf-eq4/600/800' },
  ];
  return (
    <section className="py-24 bg-brand-navy border-t border-brand-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-6">EQUIPAMENTOS PARA IR ALÉM.</h2>
          <p className="text-brand-silver text-lg font-light">Tenha variedade para montar treinos completos e trabalhar diferentes grupos musculares.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative h-80 md:h-96 group overflow-hidden rounded-sm cursor-default">
              <Image src={c.img} alt={c.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-bold text-white tracking-wide">{c.title}</h3>
                <div className="h-1 w-12 bg-brand-orange mt-4 transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
