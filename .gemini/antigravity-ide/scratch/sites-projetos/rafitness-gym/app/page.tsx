import { Hero } from '@/components/Hero';
import { Benefits, About, Structure, Equipment } from '@/components/SectionsPart1';
import { Plans, MonthlyBenefits, Testimonials } from '@/components/SectionsPart2';
import { Gallery, Location, CtaFinal } from '@/components/SectionsPart3';

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <About />
      <Structure />
      <Equipment />
      <Plans />
      <MonthlyBenefits />
      <Testimonials />
      <Gallery />
      <Location />
      <CtaFinal />
    </>
  );
}
