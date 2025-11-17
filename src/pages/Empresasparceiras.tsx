import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import supabase from "@/utility/supabaseClient";

// Imagem do HERO
import heroImg from "@/assets/empresas.jpg";

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

export default function EmpresasParceiras() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("empresas_heleno")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) setEmpresas(data);
    }

    load();
  }, []);


  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[45vh] md:h-[100vh] w-full overflow-hidden flex items-center justify-center">
        <img
          src={heroImg}
          alt="Empreendimentos"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          Nossos Empreendimentos Parceiros
        </h1>
      </section>

      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {CARROSSEIS.map((car, idx) => {
          const items = empresas.filter((e) => e.carrossel === car.id);
          if (items.length === 0) return null;

          return (
            <section key={idx} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-green-600">
                {car.titulo}
              </h2>

              {/* CARROSSEL RESPONSIVO — MOBILE vira slider */}
              <Swiper
                slidesPerView={1.1}
                spaceBetween={20}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-10"
              >
                {items.map((empresa) => (
                  <SwiperSlide key={empresa.id}>
                    <div
                      className="rounded-2xl overflow-hidden relative cursor-pointer bg-black text-white shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0px_0px_25px_rgba(0,255,100,0.5)]"
                    >
                      {/* Imagem */}
                      <img
                        src={empresa.foto}
                        alt={empresa.nome}
                        className="w-full h-72 object-cover"
                      />

                      {/* Overlay degradê */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      {/* Conteúdo */}
                      <div className="absolute bottom-0 p-5 space-y-2">
                        <p className="text-green-400 text-sm">Parceiro oficial</p>
                        <h3 className="text-xl font-semibold">{empresa.nome}</h3>
                        <p className="text-sm text-white/80 line-clamp-3">{empresa.describ}</p>

                        {empresa.pdf && (
                          <a href={empresa.pdf} target="_blank" rel="noopener noreferrer">
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
            </section>
          );
        })}
      </main>

      <Footer />
    </>
  );
}
