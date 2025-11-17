import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { getEmpresasHeleno } from "@/components/supabaseActions";



// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Empresa {
  id: number;
  nome: string;
  describ: string;
  pdf: string;
  foto: string;
  carrossel: number;
}

export default function AboutFG() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getEmpresasHeleno();
      setEmpresas(data);
    }
    load();
  }, []);

  // Estatísticas da FG
  const fgStats = [
    { icon: Building2, label: "Empreendimentos Entregues", value: "63+" },
    { icon: Award, label: "Anos de História", value: "20+" },
    { icon: Flag, label: "Investimentos Planejados", value: "R$ 750 mi+" },
    { icon: TrendingUp, label: "Crescimento", value: "Histórico" },
  ];

  // Pilares
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Excelência Construtiva",
      description:
        "Projetos com materiais premium, engenharia sofisticada e atenção aos detalhes.",
    },
    {
      icon: Diamond,
      title: "Sofisticação & Luxo",
      description:
        "Empreendimentos de alto padrão focados em exclusividade e experiências superiores.",
    },
    {
      icon: Sparkles,
      title: "Inovação",
      description:
        "Tecnologia, automação e sustentabilidade em cada projeto.",
    },
    {
      icon: Library,
      title: "Tradição & Credibilidade",
      description:
        "Mais de 40 anos de legado e reputação consolidada no mercado.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO LIMPO E NÍTIDO */}
      <section className="w-full relative">
        <img
          src={fgHero}
          alt="FG Hero"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Estatísticas */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {fgStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Um marco na construção de Balneário Camboriú
            </h2>

            <p className="text-muted-foreground mb-4 text-lg">
              Com mais de 40 anos de atuação, a FG é uma das principais incorporadoras de alto padrão do Brasil.
            </p>

            <p className="text-muted-foreground mb-4 text-lg">
              Em 2021 completou 20 anos como uma gigante em inovação e arquitetura.
            </p>

            <p className="text-muted-foreground mb-6 text-lg">
              Anunciou investimentos superiores a R$ 750 milhões para expansão em BC.
            </p>

            <Button variant="gold" size="lg" asChild>
              <Link to="/empreendimentos">Ver Portfólio</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-up">
            <img src={fgTimeline} className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Pilares da FG</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Valores que definem a empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-card rounded-xl shadow-lg hover:shadow-[var(--shadow-gold)] transition-all animate-fade-up"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Luxo */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={fgLuxury} className="w-full object-cover" />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Luxo que redefine padrões
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Projetos planejados para um público que busca exclusividade e sofisticação.
            </p>
            <p className="text-muted-foreground text-lg">
              Arquitetura icônica e valorização garantida.
            </p>
          </div>
        </div>
      </section>

      {/* Inovação */}
      <section className="py-20 bg-luxury-bg">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tecnologia & <span className="text-secondary">Inovação</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Automação, segurança, eficiência e sustentabilidade.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              Projetos pensados para o futuro.
            </p>

            <Button variant="hero" size="lg" asChild>
              <Link to="/empreendimentos">Ver Empreendimentos</Link>
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={fgInnovation} className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Empresas parceiras */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Detalhes de cada empreendimento
          </h2>

          {/* Mobile Carrossel */}
          <div className="md:hidden">
            <Swiper slidesPerView={1.1} spaceBetween={20} className="pb-10">
              {empresas.map((empresa) => (
                <SwiperSlide key={empresa.id}>
                  <div className="rounded-2xl overflow-hidden relative bg-black text-white shadow-xl">
                    <img
                      src={empresa.foto}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 p-5">
                      <p className="text-green-400 text-sm">Parceiro oficial</p>
                      <h3 className="text-xl font-bold">{empresa.nome}</h3>
                      <p className="text-white/80 text-sm line-clamp-3">
                        {empresa.describ}
                      </p>

                      {empresa.pdf && (
                        <a href={empresa.pdf} target="_blank">
                          <Button className="mt-3 bg-green-600 hover:bg-green-700 rounded-full px-4 py-2 text-sm">
                            Baixar PDF
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {empresas.map((empresa) => (
              <div
                key={empresa.id}
                className="rounded-2xl overflow-hidden relative bg-black text-white shadow-xl hover:scale-[1.02] transition"
              >
                <img
                  src={empresa.foto}
                  className="w-full h-72 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 p-5">
                  <p className="text-green-400 text-sm">Parceiro oficial</p>
                  <h3 className="text-xl font-bold">{empresa.nome}</h3>
                  <p className="text-white/80 text-sm line-clamp-3">
                    {empresa.describ}
                  </p>

                  {empresa.pdf && (
                    <a href={empresa.pdf} target="_blank">
                      <Button className="mt-3 bg-green-600 hover:bg-green-700 rounded-full px-4 py-2 text-sm">
                        Baixar PDF
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
