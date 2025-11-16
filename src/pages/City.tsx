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
import heroBalneario from "@/assets/hero-balneario.jpg";
import passarela from "@/assets/passarela.jpg";

const cityStats = [
  { icon: Users, label: "População", value: "145 mil+" },
  { icon: TrendingUp, label: "Crescimento", value: "Constante" },
  { icon: Building2, label: "Edifícios", value: "Modernos" },
  { icon: ShieldCheck, label: "Segurança", value: "Excelente" },
];

const neighborhoods = [
  {
    name: "Centro",
    description:
      "Coração da cidade com infraestrutura completa e fácil acesso a tudo",
    highlights: ["Praia Central", "Comércio", "Restaurantes"],
  },
  {
    name: "Barra Sul",
    description:
      "Exclusividade e tranquilidade em um dos bairros mais nobres",
    highlights: ["Vista Mar", "Sofisticação", "Privacidade"],
  },
  {
    name: "Praia Brava",
    description: "Natureza preservada e empreendimentos de alto padrão",
    highlights: ["Natureza", "Surf", "Alto Padrão"],
  },
  {
    name: "Pioneiros",
    description:
      "Localização estratégica com ótima relação custo-benefício",
    highlights: ["Acesso", "Comércio", "Residencial"],
  },
];

const investmentReasons = [
  {
    icon: TrendingUp,
    title: "Valorização Constante",
    description:
      "Imóveis em BC apresentam uma das maiores valorizações do Brasil",
  },
  {
    icon: Heart,
    title: "Qualidade de Vida",
    description:
      "Infraestrutura completa, segurança e lazer de primeiro mundo",
  },
  {
    icon: Waves,
    title: "Turismo Premium",
    description:
      "Destino consolidado que atrai turistas o ano todo",
  },
  {
    icon: Sparkles,
    title: "Infraestrutura Moderna",
    description: "Cidade em constante desenvolvimento e expansão",
  },
];

const City = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden ">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBalneario})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Balneário Camboriú
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            A cidade que une modernidade, beleza natural e qualidade de vida excepcional
          </p>
        </div>
      </section>

      {/* Estatísticas Rápidas */}
      <section className="py-16 bg-primary text-primary-foreground relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
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
        </div>
      </section>

      {/* Por Que Investir */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Por Que <span className="text-secondary">Investir</span> em BC?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Razões que fazem de Balneário Camboriú o melhor investimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {investmentReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="flex gap-6 p-8 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
            <img
              src={cityAerial}
              alt="Vista Aérea BC"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent flex items-end">
              <div className="p-12 text-primary-foreground max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Uma Cidade em Constante Evolução
                </h3>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  Balneário Camboriú não para de crescer e se modernizar.
                  Novos empreendimentos, infraestrutura de ponta e eventos
                  internacionais consolidam a cidade como referência em
                  qualidade de vida.
                </p>
                <Button variant="gold" size="lg" asChild>
                  <Link to="/empreendimentos">
                    Ver Empreendimentos
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melhores Bairros */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Melhores <span className="text-secondary">Bairros</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça as regiões mais procuradas da cidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {neighborhoods.map((neighborhood, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {neighborhood.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {neighborhood.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {neighborhood.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
                <img
                  src={passarela}
                  alt="Lifestyle BC"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            <div className="order-1 md:order-2 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Lifestyle <span className="text-secondary">Premium</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Balneário Camboriú oferece um estilo de vida incomparável.
                Praias paradisíacas, gastronomia internacional, vida noturna
                agitada e espaços de lazer para toda a família.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A cidade combina o melhor de dois mundos: a tranquilidade de
                um balneário e a infraestrutura de uma grande metrópole.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Praias de águas cristalinas",
                  "Restaurantes premiados",
                  "Shopping centers de luxo",
                  "Eventos culturais e esportivos",
                  "Parques e espaços verdes",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="hero" size="lg" asChild>
                <Link to="/empreendimentos">
                  Encontre Seu Imóvel
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default City;
