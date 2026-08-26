'use client';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      href="https://wa.me/5565981706248?text=Olá! Gostaria de conhecer os planos da Rafitness Gym."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-all duration-300 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-brand-black text-white px-4 py-2 rounded-sm text-sm font-bold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-brand-navy">
        Falar conosco
      </span>
    </motion.a>
  );
}
