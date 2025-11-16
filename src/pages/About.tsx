import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Heart,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import propertyLuxury from "@/assets/property-luxury.jpg";
import cityAerial from "@/assets/city-aerial.jpg";

const values = [
  {
    icon: Heart,
    title: "Paixão",
    description: "Amamos o que fazemos e isso se reflete em cada atendimento",
  },
  {
    icon: ShieldCheck,
    title: "Confiança",
    description: "Transparência e honestidade em todas as nossas relações",
  },
  {
    icon: Award,
    title: "Excelência",
    description: "Buscamos sempre a melhor solução para nossos clientes",
  },
  {
    icon: Target,
    title: "Resultados",
    description: "Focados em realizar o sonho do seu imóvel ideal",
  },
];

const testimonials = [
  {
    name: "Maria Silva",
    text: "Excelente atendimento! Encontrei o apartamento dos meus sonhos com a ajuda da equipe.",
    role: "Cliente desde 2023",
  },
  {
    name: "João Santos",
    text: "Profissionais competentes e dedicados. Recomendo a todos que buscam qualidade.",
    role: "Investidor",
  },
  {
    name: "Ana Paula",
    text: "Realizei meu sonho de morar de frente para o mar. Gratidão por todo suporte!",
    role: "Proprietária",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cityAerial})` }}
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossa <span className="text-secondary">História</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Conectando pessoas aos melhores imóveis de Balneário Camboriú
          </p>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-8 h-8 text-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Quem Somos
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Especialistas em <span className="text-secondary">Imóveis de Luxo</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Com anos de experiência no mercado imobiliário de Balneário
                Camboriú, nos consolidamos como referência em imóveis de alto
                padrão. Nossa equipe é formada por profissionais apaixonados
                que entendem profundamente o mercado local.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Acreditamos que encontrar o imóvel perfeito vai além de uma
                simples transação comercial. É sobre realizar sonhos,
                proporcionar qualidade de vida e criar conexões duradouras.
              </p>
            </div>

            <div className="relative animate-fade-up">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
                <img
                  src={propertyLuxury}
                  alt="Nossa Equipe"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nossa Missão
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Transformar sonhos em realidade, oferecendo soluções
              imobiliárias personalizadas e de excelência. Conectamos pessoas
              aos melhores empreendimentos de Balneário Camboriú, sempre com
              transparência, compromisso e dedicação.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossos <span className="text-secondary">Valores</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Princípios que guiam nosso trabalho todos os dias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-card rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              O Que Dizem <span className="text-secondary">Nossos Clientes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias de sucesso e satisfação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  <svg
                    className="w-10 h-10 text-secondary/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-secondary">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para Encontrar Seu Imóvel Ideal?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudá-lo a realizar seu sonho
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link to="/contato">
                Entre em Contato
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/empreendimentos">Ver Empreendimentos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
