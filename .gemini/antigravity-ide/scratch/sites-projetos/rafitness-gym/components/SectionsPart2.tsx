'use client';
import { motion } from 'motion/react';
import { CheckCircle2, Star } from 'lucide-react';

export function Plans() {
  const highlights = [
    'Sem fidelidade',
    'Sem multa',
    'Débito automático no cartão',
    'Mais liberdade',
    'Ambiente climatizado',
    'Variedade de equipamentos'
  ];

  return (
    <section id="planos" className="py-24 bg-brand-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-navy/50 via-brand-black to-brand-black" />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-4">ESCOLHA COMO VOCÊ<br/><span className="text-brand-orange">QUER TREINAR.</span></h2>
        </motion.div>
        
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-brand-navy/90 border border-white/10 rounded-none overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-brand-orange text-brand-black text-[10px] font-black px-2 py-1 uppercase italic">Destaque</div>
            </div>
            <div className="p-8 md:p-10 pb-0 text-left">
              <h3 className="text-xs font-bold text-brand-orange tracking-[0.3em] uppercase mb-1">Plano Mensal</h3>
              <h2 className="text-4xl font-black italic uppercase leading-none mb-4 text-white">Sem Fidelidade</h2>
            </div>
            <div className="p-8 md:p-10 pt-4">
              <ul className="space-y-3 mb-8 text-left">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="text-brand-orange italic font-black">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-white/10 pt-6 mb-6 text-left">
                <span className="text-sm text-white/50 uppercase block mb-1">A partir de</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black italic text-white">CONSULTE</span>
                </div>
              </div>

              <a href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym." target="_blank" rel="noopener noreferrer" className="block w-full text-center border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-black py-4 font-black uppercase italic tracking-widest transition-all">
                QUERO SER ALUNO
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function MonthlyBenefits() {
  const cards = [
    { title: 'SEM FIDELIDADE', desc: 'Você não fica preso a contratos longos.' },
    { title: 'SEM MULTA', desc: 'Mais liberdade para organizar sua rotina.' },
    { title: 'DÉBITO AUTOMÁTICO', desc: 'Praticidade para manter sua mensalidade em dia.' },
    { title: 'PAGA MAIS BARATO', desc: 'Uma opção prática para quem quer treinar com mais liberdade.' }
  ];

  return (
    <section className="py-24 bg-brand-navy">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl font-black italic uppercase text-white leading-tight">POR QUE ESCOLHER A<br/><span className="text-brand-orange">MENSALIDADE RAFITNESS?</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-brand-black p-8 rounded-sm border-l-2 border-brand-orange hover:bg-brand-black/80 transition-colors shadow-lg">
              <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-wide">{c.title}</h3>
              <p className="text-brand-silver text-sm leading-relaxed font-light">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 bg-brand-black relative border-t border-brand-gray/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-black italic uppercase text-white mb-12">
            QUEM TREINA, <span className="text-brand-orange">RECOMENDA.</span>
          </h2>
          
          <div className="bg-white/5 p-6 border-l-2 border-brand-orange rounded-none inline-block w-full max-w-md shadow-2xl relative text-left">
            <div className="flex items-center gap-1 text-brand-orange mb-2">
              <span className="text-xl leading-none tracking-widest text-brand-orange">★★★★★</span>
              <span className="text-xs font-bold text-white ml-2">5.0 no Google</span>
            </div>
            <p className="text-xs text-white/60 italic leading-relaxed mb-4">
              "Ambiente excelente, profissionais atenciosos e máquinas de primeira qualidade. Super recomendo!"
            </p>
            <span className="text-[10px] uppercase font-bold mt-2 block text-white/40">Avaliação Real • Várzea Grande-MT</span>
            <a href="https://maps.google.com/?q=Rafitness+Gym+Varzea+Grande" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block border border-white/20 text-white hover:border-brand-orange px-6 py-2 rounded-none font-bold tracking-wide transition-colors text-xs uppercase">
              DEIXE SUA AVALIAÇÃO
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
