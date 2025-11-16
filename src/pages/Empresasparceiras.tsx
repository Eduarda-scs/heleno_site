import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import supabase from "@/utility/supabaseClient";

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

  const CARROSSEIS = [
    { id: 1, titulo: "Construtoras Residenciais" },
    { id: 2, titulo: "Construtoras Comerciais" },
    { id: 3, titulo: "Incorporadoras Parceiras" },
    { id: 4, titulo: "Projetos Premium" },
  ];

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {CARROSSEIS.map((car, idx) => {
          const items = empresas.filter((e) => e.carrossel === car.id);
          if (items.length === 0) return null;

          return (
            <section key={idx} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-green-600">
                {car.titulo}
              </h2>

              <Swiper
                slidesPerView={1.1}
                spaceBetween={20}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3.1 },
                }}
                className="pb-10"
              >
                {items.map((empresa) => (
                  <SwiperSlide key={empresa.id}>
                    <div
                      className="
                        rounded-2xl overflow-hidden relative cursor-pointer
                        bg-black text-white shadow-xl
                        transition-all duration-300
                        hover:scale-[1.03]
                        hover:shadow-[0px_0px_25px_rgba(255,223,0,0.7)]
                      "
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

                        <p className="text-sm text-white/80 line-clamp-3">
                          {empresa.describ}
                        </p>

                        {/* Botão PDF */}
                        {empresa.pdf && (
                          <a
                            href={empresa.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              className="
                                mt-3 bg-green-600 hover:bg-green-700
                                rounded-full px-4 py-2 text-sm
                              "
                            >
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
