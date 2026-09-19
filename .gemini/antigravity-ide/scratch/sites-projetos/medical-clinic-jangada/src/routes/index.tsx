import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Baby,
  Bone,
  Check,
  ChevronDown,
  Dna,
  HeartPulse,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import consultationImage from "@/assets/medical-consultation.jpg";
import clinicInterior from "@/assets/clinic-interior.jpg";
import medicalTeam from "@/assets/medical-team.jpg";

const whatsappUrl = "https://wa.me/5565984411382";

const navItems = [
  ["Início", "inicio"],
  ["A Clínica", "clinica"],
  ["Especialidades", "especialidades"],
  ["Serviços", "servicos"],
  ["Equipe", "equipe"],
  ["Unidades", "unidades"],
  ["FAQ", "faq"],
] as const;

const specialties = [
  { icon: HeartPulse, title: "Cardiologia", text: "Cuidado especializado para acompanhar a saúde do seu coração." },
  { icon: Dna, title: "Ginecologia", text: "Acolhimento e atenção à saúde da mulher em cada fase da vida." },
  { icon: Baby, title: "Pediatria", text: "Acompanhamento cuidadoso do desenvolvimento e da saúde infantil." },
  { icon: Microscope, title: "Exames", text: "Mais praticidade para investigar, acompanhar e cuidar da sua saúde." },
  { icon: Bone, title: "Fisioterapia", text: "Tratamentos que ajudam a recuperar movimentos, autonomia e bem-estar." },
  { icon: Activity, title: "Pilates", text: "Movimento orientado para fortalecer o corpo e melhorar a qualidade de vida." },
];

const faqs = [
  ["Como posso agendar um atendimento?", "Você pode falar diretamente com a equipe pelo WhatsApp. Clique em qualquer botão “Agendar atendimento” para iniciar a conversa."],
  ["Quais serviços a Medical Clinic oferece?", "A clínica oferece consultas em cardiologia, ginecologia e pediatria, além de exames, fisioterapia e pilates."],
  ["Onde fica a Medical Clinic em Jangada?", "A unidade de Jangada fica na R. Maria Felipa, Jangada — MT, CEP 78490-000."],
  ["A Medical Clinic atende em Acorizal?", "Sim. A Medical Clinic também realiza atendimentos em Acorizal — MT. Consulte a equipe para saber dias e horários."],
  ["Como entrar em contato com a clínica?", "Entre em contato pelo WhatsApp no número (65) 98441-1382 ou pelo Instagram @medicalclinicjgd_azl."],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medical Clinic — Saúde, cuidado e atendimento especializado" },
      { name: "description", content: "Medical Clinic — Dr. Geraldo Mendes. Atendimento em saúde, consultas, exames e serviços especializados em Jangada e região." },
      { property: "og:title", content: "Medical Clinic — Saúde e cuidado em Jangada" },
      { property: "og:description", content: "Consultas, exames e serviços especializados com atendimento próximo e humano em Jangada e região." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Medical Clinic, início">
      <span className="brand-mark" aria-hidden="true"><HeartPulse /></span>
      <span className="brand-copy"><strong><span>Medical</span> Clinic</strong><small>Dr. Geraldo Mendes</small></span>
    </a>
  );
}

function SectionIntro({ label, title, text }: { label: string; title: ReactNode; text?: string }) {
  return (
    <div className="section-intro reveal">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <Button asChild size="lg" className="header-cta"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Agendar atendimento</a></Button>
        <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Navegação móvel">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}<ArrowDownRight /></a>)}
          <Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Agendar pelo WhatsApp</a></Button>
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <main>
      <Header />

      <section className="hero" id="inicio">
        <div className="hero-grid page-shell">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Medical Clinic</p>
            <h1>Sua saúde em<br /><em>boas mãos.</em></h1>
            <p className="hero-lead">Cuidado, saúde e atendimento especializado para você e sua família, com profissionais preparados e atendimento próximo em Jangada e região.</p>
            <p className="hero-note">Na Medical Clinic, você encontra diferentes serviços de saúde em um só lugar.</p>
            <div className="hero-actions">
              <Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Agendar atendimento</a></Button>
              <Button asChild size="lg" variant="outline"><a href="#clinica">Conhecer a clínica <ArrowRight /></a></Button>
            </div>
            <div className="hero-meta"><span>Jangada — MT</span><i /><span>Atendimento também em Acorizal</span></div>
          </div>
          <div className="hero-visual reveal">
            <div className="hero-image-wrap"><img src={consultationImage} alt="Médico ouvindo uma paciente durante uma consulta" width={1408} height={1712} /></div>
            <div className="image-caption"><span>01</span><p>Escuta atenta.<br />Cuidado próximo.</p></div>
            <span className="turquoise-rule" />
          </div>
        </div>
        <a className="scroll-cue" href="#especialidades">Conheça nossos cuidados <ArrowDownRight /></a>
      </section>

      <section className="section specialties" id="especialidades">
        <div className="page-shell">
          <SectionIntro label="Especialidades" title={<>Cuidado completo para<br /> todas as fases da vida.</>} text="Atendimento especializado e serviços de saúde pensados para facilitar o cuidado com você e sua família." />
          <div className="specialty-grid">
            {specialties.map(({ icon: Icon, title, text }, index) => (
              <article className="specialty-card reveal" key={title}>
                <div className="card-top"><span className="service-icon"><Icon /></span><span className="card-number">0{index + 1}</span></div>
                <h3>{title}</h3><p>{text}</p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">Conhecer serviço <ArrowRight /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about" id="clinica">
        <div className="page-shell about-grid">
          <div className="about-image reveal"><img src={clinicInterior} alt="Ambiente acolhedor e iluminado da Medical Clinic" loading="lazy" width={1408} height={1104} /><span>Jangada<br />Mato Grosso</span></div>
          <div className="about-copy reveal">
            <SectionIntro label="Sobre a Medical Clinic" title={<>Mais do que consultas.<br /><em>Um cuidado que acompanha você.</em></>} />
            <div className="about-body"><p>A Medical Clinic busca aproximar diferentes serviços de saúde das pessoas de Jangada e região, oferecendo atendimento profissional em um ambiente acolhedor e organizado.</p><p>Nossa proposta é tornar a experiência de cuidar da saúde mais simples, próxima e humana.</p></div>
            <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Fale com a nossa equipe <ArrowRight /></a>
          </div>
        </div>
      </section>

      <section className="section reasons">
        <div className="page-shell">
          <SectionIntro label="Por que escolher a Medical Clinic" title="Cuidar bem começa por ouvir." />
          <div className="reason-list">
            {[
              [Users, "Atendimento humanizado", "Cada pessoa é recebida com atenção, respeito e escuta."],
              [Stethoscope, "Profissionais especializados", "Um cuidado responsável, conduzido por profissionais preparados."],
              [HeartPulse, "Estrutura completa", "Diferentes serviços de saúde reunidos em um ambiente organizado."],
              [Microscope, "Tecnologia e diagnóstico", "Recursos que apoiam avaliações mais precisas e seguras."],
            ].map(([Icon, title, text], index) => {
              const ReasonIcon = Icon as typeof Users;
              return <article className="reason reveal" key={String(title)}><span>0{index + 1}</span><ReasonIcon /><div><h3>{String(title)}</h3><p>{String(text)}</p></div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="page-shell services-grid">
          <div className="services-sticky"><SectionIntro label="Serviços" title={<>Tudo mais perto<br /> de você.</>} text="Uma clínica pensada para facilitar sua rotina de cuidado, do primeiro atendimento ao acompanhamento." /><Button asChild variant="outline" size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer">Consultar disponibilidade <ArrowRight /></a></Button></div>
          <div className="service-lines">
            {["Consultas", "Exames", "Acompanhamento", "Fisioterapia", "Pilates"].map((item, index) => <a className="service-line reveal" href={whatsappUrl} target="_blank" rel="noreferrer" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowDownRight /></a>)}
          </div>
        </div>
      </section>

      <section className="section team" id="equipe">
        <div className="page-shell team-grid">
          <div className="team-copy reveal"><SectionIntro label="Nossa equipe" title={<>Pessoas cuidando<br /> de pessoas.</>} text="Conheça os profissionais que fazem parte da Medical Clinic." /><p className="availability-note"><Check /> Perfis profissionais em atualização</p></div>
          <div className="team-image reveal"><img src={medicalTeam} alt="Equipe de profissionais de saúde reunida na clínica" loading="lazy" width={1408} height={1008} /><div className="team-placeholder"><span>Equipe Medical Clinic</span><small>Informações profissionais serão apresentadas em breve.</small></div></div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="page-shell testimonial-layout">
          <SectionIntro label="Depoimentos" title={<>Cuidado que<br /><em>faz diferença.</em></>} />
          <div className="testimonial-placeholder reveal"><span className="quote-mark">“</span><p>Este espaço será dedicado a relatos reais de pacientes sobre sua experiência de cuidado na Medical Clinic.</p><small>Depoimentos em atualização</small></div>
        </div>
      </section>

      <section className="section locations" id="unidades">
        <div className="page-shell">
          <SectionIntro label="Onde estamos" title="Medical Clinic perto de você." />
          <div className="location-grid">
            <article className="location reveal"><span className="location-index">01</span><div><p className="eyebrow">Unidade</p><h3>Jangada</h3><address>R. Maria Felipa<br />Jangada — MT<br />CEP 78490-000</address><a href="tel:+5565984411382"><Phone /> (65) 98441-1382</a></div><div className="location-actions"><Button asChild variant="outline"><a href="https://maps.google.com/?q=R.+Maria+Felipa,+Jangada,+MT" target="_blank" rel="noreferrer"><MapPin /> Como chegar</a></Button><Button asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button></div></article>
            <article className="location reveal"><span className="location-index">02</span><div><p className="eyebrow">Atendimento em</p><h3>Acorizal</h3><address>Acorizal — MT<br /><span>Consulte dias, horários e local de atendimento.</span></address></div><div className="location-actions"><Button asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Consultar atendimento</a></Button></div></article>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="page-shell faq-grid">
          <SectionIntro label="Dúvidas frequentes" title={<>Tudo o que você<br /> precisa saber.</>} />
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <details className="faq-item reveal" key={question}><summary><span>0{index + 1}</span><strong>{question}</strong><ChevronDown /></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="page-shell final-cta-inner reveal"><div><p className="eyebrow">Comece por aqui</p><h2>Seu cuidado começa<br /> com uma conversa.</h2></div><div><p>Fale com a equipe da Medical Clinic e encontre o atendimento ideal para você.</p><Button asChild size="lg"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle /> Agendar atendimento</a></Button></div></div>
      </section>

      <footer>
        <div className="page-shell footer-top"><div><Brand /><p>Cuidado profissional, próximo e humano<br /> em Jangada e região.</p></div><nav aria-label="Navegação do rodapé">{navItems.slice(1).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="footer-contact"><p className="eyebrow">Contato</p><a href="tel:+5565984411382"><Phone /> +55 65 98441-1382</a><a href="https://instagram.com/medicalclinicjgd_azl" target="_blank" rel="noreferrer"><Instagram /> @medicalclinicjgd_azl</a></div></div>
        <div className="page-shell footer-bottom"><span>© 2026 Medical Clinic — Dr. Geraldo Mendes</span><a href="#inicio">Voltar ao início <ArrowRight /></a></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Agendar atendimento pelo WhatsApp"><MessageCircle /><span>Agendar</span></a>
    </main>
  );
}