import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Heart,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import heroImage from "@/assets/heleno-hero.png";
import hero2Image from "@/assets/heleno-hero2.png";

import cityAerial from "@/assets/city-aerial.jpg";
import propertyLuxury from "@/assets/property-luxury.jpg";
import ferrisWheel from "@/assets/ferris-wheel.jpg";
import passarela from "@/assets/passarela.jpg";
import barraSul from "@/assets/barra-sul.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const cityFeatures = [
  { icon: Heart, title: "Qualidade de Vida", description: "Infraestrutura completa e lazer premium" },
  { icon: Star, title: "Gastronomia", description: "Restaurantes renomados e experiências únicas" },
  { icon: Sparkles, title: "Vida Noturna", description: "Entretenimento sofisticado e diversificado" },
  { icon: ShieldCheck, title: "Segurança", description: "Cidade segura e bem estruturada" },
];

const touristAttractions = [
  { title: "Roda Gigante", image: ferrisWheel, description: "Vista panorâmica inesquecível" },
  { title: "Passarela da Barra", image: passarela, description: "Caminhada à beira-mar" },
  { title: "Barra Sul", image: barraSul, description: "Sofisticação e tranquilidade" },
];

const featuredProperties = [
  { id: "1", title: "Edifício Vista Mar", location: "Praia Central", type: "Na Planta", image: propertyLuxury, featured: true },
  { id: "2", title: "Residence Barra Sul", location: "Barra Sul", type: "Pronto", image: cityAerial, featured: true },
  { id: "3", title: "Ocean Tower", location: "Avenida Atlântica", type: "Luxo", image: propertyLuxury, featured: true },
];

const Index = () => {
  // CSS para o HERO — ajustado para evitar cor verde no mobile
  const dynamicCss = `
    .hero-bg {
      background-image: url("${heroImage}");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    @media (max-width: 767px) {
      .hero-bg {
        background-image: url("${hero2Image}");
        background-size: cover;
        background-position: center top;
        background-color: #000;
      }
    }
  `;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <style>{dynamicCss}</style>

      {/* HERO */}
      <section
        className="
          hero-bg
          relative
          min-h-[100vh]
          flex
          items-center
          justify-center
          overflow-hidden
          m-0 p-0
        "
      >
        {/* Gradiente: removido excesso no mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/20 to-primary/70 md:via-primary/40" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 leading-tight">
            Viva o Melhor de <br />
            <span className="text-secondary">Balneário Camboriú</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl mb-6 text-primary-foreground/90 max-w-xl mx-auto">
            Descubra empreendimentos exclusivos na cidade mais desejada do Sul
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/cidade">
                Explore a Cidade <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

            <Button variant="gold" size="md" className="px-6 py-3" asChild>
              <Link to="/empreendimentos">Ver Empreendimentos</Link>
            </Button>
          </div>
        </div>

        {/* REMOVIDO SCROLL INDICATOR NO MOBILE */}
        <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-secondary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* POR QUE BC */}
      <section className="py-16 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Por Que <span className="text-secondary">Balneário Camboriú</span> é Única?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              A cidade que combina beleza natural com infraestrutura de primeiro mundo
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {cityFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-4 md:p-6 rounded-lg bg-card hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
            <img src={cityAerial} alt="Balneário aérea" className="w-full h-[380px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end">
              <div className="p-8 text-primary-foreground">
                <h3 className="text-3xl font-bold mb-2">A Dubai Brasileira</h3>
                <p className="text-lg mb-4">Modernidade, luxo e qualidade de vida</p>
                <Button variant="gold" asChild><Link to="/cidade">Conheça Mais <ArrowRight className="w-4 h-4" /></Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PONTOS TURÍSTICOS */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pontos Turísticos em <span className="text-secondary">Destaque</span></h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Lugares icônicos que fazem de Balneário Camboriú um destino único</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {touristAttractions.map((attraction, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={attraction.image} alt={attraction.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-secondary transition-colors">{attraction.title}</h3>
                  <p>{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPREENDIMENTOS */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Empreendimentos em <span className="text-secondary">Destaque</span></h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Imóveis cuidadosamente selecionados para você</p>
          </div>

          {/* MOBILE SLIDER */}
          <div className="md:hidden mb-12">
            <Swiper spaceBetween={16} slidesPerView={1.15}>
              {featuredProperties.map((p) => (
                <SwiperSlide key={p.id}><PropertyCard {...p} /></SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((p) => <PropertyCard key={p.id} {...p} />)}
          </div>

          <div className="text-center">
            <Button variant="hero" size="lg" className="px-6 py-4 text-base font-semibold mx-auto" asChild>
              <Link to="/empreendimentos">Ver Todos os Empreendimentos <ArrowRight className="w-5 h-5 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-8 h-8 text-secondary" />
                <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Excelência Imobiliária</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Seu Parceiro de <span className="text-secondary">Confiança</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Com anos de experiência no mercado imobiliário de Balneário Camboriú, oferecemos atendimento personalizado e soluções exclusivas para encontrar o imóvel perfeito.
              </p>

              <Button variant="gold" size="lg" asChild>
                <Link to="/sobre">Conheça Nossa História <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
                <img src={propertyLuxury} alt="Sobre nós" className="w-full h-[400px] md:h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
