import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Award,
  Building2,
  Diamond,
  Flag,
  Library,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import fgHero from "@/assets/fg-hero.jpg"; 
import fgTimeline from "@/assets/fg-timeline.jpg"; 
import fgLuxury from "@/assets/fg-luxury.jpg"; 
import fgInnovation from "@/assets/fg-innovation.jpg"; 

// Dados para a página
const fgStats = [
  { icon: Building2, label: "Empreendimentos Entregues", value: "50+" },
  { icon: Award, label: "Anos de História", value: "20+" },
  { icon: Flag, label: "Obras em Andamento", value: "10+" },
  { icon: TrendingUp, label: "Valorização Média", value: "Alta" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Excelência Construtiva",
    description:
      "Projetos com padrão internacional, materiais premium e engenharia de alto desempenho.",
  },
  {
    icon: Diamond,
    title: "Sofisticação & Luxo",
    description:
      "Design exclusivo, acabamentos nobres e experiências de morar que definem estilo e status.",
  },
  {
    icon: Sparkles,
    title: "Inovação",
    description:
      "Tecnologia, inteligência urbana e arquitetura futurista aplicada em cada detalhe.",
  },
  {
    icon: Library,
    title: "Tradição & Credibilidade",
    description:
      "Referência em Balneário Camboriú, entregando obras icônicas que marcam a cidade.",
  },
];

const FG = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fgHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            FG Empreendimentos
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Excelência, luxo e inovação que transformam Balneário Camboriú.
          </p>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 bg-primary text-primary-foreground -mt-20 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {fgStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <Icon className="w-10 h-10 mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sobre a FG */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Um Marco na Construção de Balneário Camboriú
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              A FG Empreendimentos é reconhecida como uma das maiores e mais
              respeitadas construtoras de alto padrão do Brasil, responsável por
              transformar o skyline de Balneário Camboriú com projetos
              futuristas e empreendimentos icônicos.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Cada obra carrega a assinatura da marca: exclusividade,
              tecnologia, acabamento impecável e experiências de alto luxo que
              redefinem a forma de viver.
            </p>

            <Button variant="gold" size="lg" asChild>
              <Link to="/empreendimentos">Conhecer Empreendimentos</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgTimeline}
              alt="FG História"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pilares <span className="text-secondary">FG</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Valores que tornam a FG referência nacional em alto padrão.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Luxo & Sofisticação */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgLuxury}
              alt="Luxo FG"
              className="w-full h-[600px] object-cover"
            />
          </div>

          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Luxo que Define um Novo Padrão
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Os empreendimentos FG são criados para um público que busca o
              máximo em conforto, elegância e exclusividade.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Cada torre é projetada para se tornar um ícone arquitetônico,
              elevando ainda mais o patamar de Balneário Camboriú como uma das
              cidades mais luxuosas do Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Tecnologia & Inovação */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tecnologia & <span className="text-secondary">Inovação</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A FG é pioneira em sistemas inteligentes, automação, segurança de
              alto desempenho e soluções de sustentabilidade.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Seus empreendimentos incorporam o que há de mais avançado em
              engenharia e tecnologia, proporcionando experiências únicas.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/empreendimentos">Ver Portfólio</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgInnovation}
              alt="Inovação FG"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FG;
