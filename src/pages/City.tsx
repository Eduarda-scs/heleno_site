import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Waves,
} from "lucide-react";

import cityAerial from "@/assets/city-aerial.jpg";
import heroPrincipal from "@/assets/heleno-hero2.png"; // 🔥 USANDO A MESMA DO INDEX
import passarela from "@/assets/passarela.jpg";

/* --------------------------- LISTAS --------------------------- */

const cityStats = [
  { icon: Users, label: "População", value: "145 mil+" },
  { icon: TrendingUp, label: "Crescimento", value: "Constante" },
  { icon: Building2, label: "Edifícios", value: "Modernos" },
  { icon: ShieldCheck, label: "Segurança", value: "Excelente" },
];

const neighborhoods = [
  {
    name: "Centro",
    description: "Coração da cidade com infraestrutura completa e fácil acesso.",
    highlights: ["Praia Central", "Comércio", "Restaurantes"],
  },
  {
    name: "Barra Sul",
    description: "Exclusividade, alto padrão e total qualidade de vida.",
    highlights: ["Vista Mar", "Sofisticação", "Privacidade"],
  },
  {
    name: "Praia Brava",
    description: "Natureza preservada e empreendimentos de luxo.",
    highlights: ["Natureza", "Surf", "Alto Padrão"],
  },
  {
    name: "Pioneiros",
    description: "Local estratégico com excelente custo-benefício.",
    highlights: ["Acesso", "Comércio", "Residencial"],
  },
];

const investmentReasons = [
  {
    icon: TrendingUp,
    title: "Valorização Constante",
    description:
      "Uma das cidades que mais valoriza no Brasil, com investimentos contínuos.",
  },
  {
    icon: Heart,
    title: "Qualidade de Vida",
    description:
      "Cidade segura, moderna, com lazer completo e infraestrutura impecável.",
  },
  {
    icon: Waves,
    title: "Turismo Premium",
    description:
      "Capital do turismo de luxo no Sul do Brasil com fluxo anual intenso.",
  },
  {
    icon: Sparkles,
    title: "Infraestrutura Moderna",
    description:
      "Obras, tecnologia, mobilidade e urbanismo que colocam BC no topo.",
  },
];

/* ------------------------- COMPONENTE ------------------------- */

const City = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPrincipal})` }} // 🔥 AGORA CORRETO
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
            Balneário Camboriú
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto animate-fade-up text-primary-foreground/90">
            A cidade que une modernidade, praia, gastronomia e qualidade de vida.
          </p>
        </div>
      </section>

      {/* ESTATÍSTICAS — ajustado para mobile */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {cityStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center animate-fade-up">
                <Icon className="w-7 h-7 md:w-10 md:h-10 mx-auto mb-2 text-secondary" />
                <p className="text-xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs md:text-sm text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* POR QUE INVESTIR — 2x2 no mobile */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
            Por Que <span className="text-secondary">Investir</span> em BC?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
            {investmentReasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div
                  key={i}
                  className="bg-card p-4 md:p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-secondary/10 rounded-full mb-2">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-base md:text-xl font-bold">{reason.title}</h3>
                  <p className="text-xs md:text-base text-muted-foreground mt-1">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BAIRROS — carrossel mobile */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
            Melhores <span className="text-secondary">Bairros</span>
          </h2>

          {/* MOBILE CARROSSEL */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {neighborhoods.map((nb, i) => (
              <div
                key={i}
                className="min-w-[80%] snap-center bg-card p-6 rounded-xl shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <div>
                    <h3 className="text-xl font-bold">{nb.name}</h3>
                    <p className="text-muted-foreground text-sm">{nb.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {nb.highlights.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 gap-8">
            {neighborhoods.map((nb, i) => (
              <div key={i} className="p-8 bg-card rounded-xl shadow">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <div>
                    <h3 className="text-2xl font-bold">{nb.name}</h3>
                    <p className="text-muted-foreground">{nb.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {nb.highlights.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
            <img
              src={passarela}
              className="w-full h-[350px] md:h-[550px] object-cover"
              alt="Lifestyle"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Lifestyle <span className="text-secondary">Premium</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Balneário Camboriú combina natureza, luxo, gastronomia e lazer
              para oferecer um estilo de vida incomparável.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Praias de águas cristalinas",
                "Restaurantes renomados",
                "Vida noturna sofisticada",
                "Eventos culturais e esportivos",
                "Shopping centers de luxo",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <Link to="/empreendimentos">
                Encontre Seu Imóvel <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default City;
