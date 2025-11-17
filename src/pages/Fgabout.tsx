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

import fgHero from "@/assets/fg-hero1.png";
import fgTimeline from "@/assets/fg-timeline.jpg";
import fgLuxury from "@/assets/fg-luxury.jpg";
import fgInnovation from "@/assets/fg-innovation.jpg";

// Estatísticas da FG
const fgStats = [
  { icon: Building2, label: "Empreendimentos Entregues", value: "63+" },
  { icon: Award, label: "Anos de História", value: "20+" },
  { icon: Flag, label: "Investimentos Planejados", value: "R$ 750 mi+" },
  { icon: TrendingUp, label: "Crescimento", value: "Histórico" },
];

// Pilares da FG
const pillars = [
  {
    icon: ShieldCheck,
    title: "Excelência Construtiva",
    description:
      "Projetos de elevado padrão, com materiais premium, engenharia sofisticada e atenção aos detalhes.",
  },
  {
    icon: Diamond,
    title: "Sofisticação & Luxo",
    description:
      "Desenvolvimentos projetados para oferecer experiências residenciais de alto luxo e exclusividade.",
  },
  {
    icon: Sparkles,
    title: "Inovação",
    description:
      "Adoção de tecnologia, automação e soluções sustentáveis para tornar cada empreendimento moderno e eficiente.",
  },
  {
    icon: Library,
    title: "Tradição & Credibilidade",
    description:
      "Mais de 40 anos de legado, sólida governança corporativa e reputação consolidada no mercado.",
  },
];

const AboutFG = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[80vh] flex items-center justify-center overflow-hidden">

        <div
          className="
            absolute inset-0 
            bg-contain bg-top sm:bg-cover 
            bg-no-repeat
          "
          style={{ backgroundImage: `url(${fgHero})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

        
        

      </section>


      {/* Estatísticas */}
      <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {fgStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 text-secondary" />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sobre a FG */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Um marco na construção de Balneário Camboriú
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base sm:text-lg">
              Com mais de 40 anos de atuação, a FG Empreendimentos é uma das principais incorporadoras de alto padrão do Brasil.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base sm:text-lg">
              Em 2021, a empresa completou 20 anos de história, consolidando seu portfólio com empreendimentos icônicos.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
              Recentemente, a FG anunciou investimentos superiores a R$ 750 milhões para ampliar sua operação em Balneário Camboriú.
            </p>
            <Button variant="gold" size="lg" asChild>
              <Link to="/empreendimentos">Ver Portfólio</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgTimeline}
              alt="Linha do tempo FG"
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-16 sm:py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pilares da FG
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Valores que definem cada empreendimento da empresa
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
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

      {/* Luxo */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgLuxury}
              alt="Luxo FG"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </div>

          <div className="animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Luxo que Define um Novo Padrão
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Os empreendimentos da FG são planejados para um público que busca elegância, conforto e exclusividade.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Cada projeto é concebido para se tornar um ícone arquitetônico, com design sofisticado e alto valor agregado.
            </p>
          </div>
        </div>
      </section>

      {/* Inovação */}
      <section className="py-16 sm:py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tecnologia & <span className="text-secondary">Inovação</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              A FG aposta em automação, sistemas inteligentes e métodos construtivos sustentáveis para trazer valor real aos moradores.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Projetos são desenvolvidos com foco em segurança, eficiência energética e conforto, sempre com visão de futuro.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/empreendimentos">Ver Empreendimentos</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] animate-fade-up">
            <img
              src={fgInnovation}
              alt="Inovação FG"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Informações Corporativas */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 space-y-6 sm:space-y-10">
          <div className="animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Institucional e Impacto
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              A FG integra a FG Brazil Holding, que reúne empresas nos setores de construção civil, hotelaria, arquitetura e serviços.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              A empresa se destaca por governança robusta, estratégia de longo prazo e compromisso social e ambiental.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              A FG possui mais de 2 milhões de m² de potencial construtivo em Balneário Camboriú.
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              O grupo projeta crescimento financeiro sólido e mantém margens operacionais expressivas.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutFG;
