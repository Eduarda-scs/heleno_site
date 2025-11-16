import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building,
  Briefcase,
  MapPin,
  Users,
} from "lucide-react";
import propertyLuxury from "@/assets/property-luxury.jpg";
import cityAerial from "@/assets/city-aerial.jpg";

const values = [
  {
    icon: Briefcase,
    title: "Experiência",
    description:
      "Quase 30 anos atuando no mercado imobiliário com profissionalismo e credibilidade.",
  },
  {
    icon: Award,
    title: "Reconhecimento",
    description:
      "Referência em Fortaleza e Região Metropolitana pela ética e excelência nos serviços.",
  },
  {
    icon: Users,
    title: "Compromisso",
    description:
      "Atendimento humanizado e acompanhamento completo em cada etapa do processo.",
  },
  {
    icon: MapPin,
    title: "Atuação Regional",
    description:
      "Presença forte em Fortaleza, Eusébio e Caucaia, atendendo diferentes perfis e necessidades.",
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
            Sobre <span className="text-secondary">Heleno Alves</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Uma trajetória marcada por dedicação, confiança e liderança no
            mercado imobiliário.
          </p>
        </div>
      </section>

      {/* Sobre Heleno */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-8 h-8 text-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                  Quem é Heleno Alves
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Empresário e especialista em{" "}
                <span className="text-secondary">mercado imobiliário</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Com uma carreira consolidada de quase <strong>30 anos</strong>,
                Heleno Alves é reconhecido por sua forte atuação no mercado
                imobiliário de Fortaleza e Região Metropolitana.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sua história começou em <strong>1998</strong>, quando iniciou
                como corretor de imóveis. Pouco tempo depois, em{" "}
                <strong>2000</strong>, ampliou suas competências atuando como
                despachante imobiliário.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Desde <strong>2009</strong>, também exerce a função de
                correspondente bancário, oferecendo consultoria completa em
                financiamentos para facilitar a conquista da casa própria.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoje, Heleno é proprietário de um grupo empresarial que atende
                diferentes demandas do setor, sempre com ética, eficiência e um
                compromisso inabalável com seus clientes.
              </p>
            </div>

            <div className="relative animate-fade-up">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
                <img
                  src={propertyLuxury}
                  alt="Heleno Alves"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Carreira e Empresas */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center animate-fade-up mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Uma Trajetória de <span className="text-secondary">Liderança</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Conheça os principais marcos da carreira de Heleno Alves
            </p>
          </div>

          <div className="space-y-10 text-lg text-muted-foreground animate-fade-up">
            <p>
              Há <strong>19 anos</strong>, Heleno lidera uma imobiliária em
              Fortaleza especializada no programa{" "}
              <strong>Minha Casa Minha Vida</strong>, contribuindo diretamente
              para transformar o sonho da casa própria em realidade para
              milhares de famílias.
            </p>

            <p>
              Sua visão empreendedora o levou, há <strong>3 anos</strong>, a
              expandir sua atuação para a cidade do <strong>Eusébio</strong>,
              onde administra uma imobiliária voltada para empreendimentos de
              médio e alto padrão.
            </p>

            <p>
              Além disso, Heleno gerencia uma correspondente bancária em{" "}
              <strong>Caucaia</strong>, garantindo mais agilidade e segurança
              nos processos de crédito imobiliário.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Valores que Guiam a{" "}
              <span className="text-secondary">Sua Jornada</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Princípios que constroem confiança e resultados
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
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Quer conhecer mais sobre o trabalho de Heleno Alves?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Entre em contato e permita que nossa equipe te acompanhe no seu
            próximo passo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link to="/contato">
                Falar com a Equipe
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
