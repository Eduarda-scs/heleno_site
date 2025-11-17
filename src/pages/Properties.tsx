import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import heroEmpreendimentos from "@/assets/empreendimentos.jpg"; 
import supabase from "@/utility/supabaseClient";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const filters = ["Todos", "Na Planta", "Prontos", "Luxo", "Frente Mar"];

const Properties = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar do Supabase
  const loadProperties = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("heleno_imoveis")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Erro ao buscar imóveis:", error);
      setLoading(false);
      return;
    }

    // Converter coluna 'url' (que já é array)
    const parsed = data.map((item) => {
      let urls = [];

      try {
        // Caso a coluna venha como objeto
        if (typeof item.url === "object" && item.url !== null) {
          urls = Object.values(item.url);
        }

        // Caso venha como string JSON
        else if (typeof item.url === "string") {
          const parsed = JSON.parse(item.url);
          urls = Array.isArray(parsed) ? parsed : Object.values(parsed);
        }
      } catch {
        urls = [];
      }

      const firstImage = urls[0] || "";
      
      

      return {
        id: item.id,
        title: item.titulo,
        location: item.bairro,
        type: item.tipo,
        image: firstImage,   // primeira URL ✔
        categories: [item.tipo],
      };
    });
  



    setProperties(parsed);
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const filteredProperties =
    activeFilter === "Todos"
      ? properties
      : properties.filter((property) =>
          property.categories.includes(activeFilter)
        );

  // Função para dividir em blocos de 30
  const chunk = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  const carrosseis = chunk(filteredProperties, 30);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroEmpreendimentos})` }}
        />
        <div className="absolute inset-0 bg-primary/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossos <span className="text-secondary">Empreendimentos</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Encontre o imóvel perfeito para você em Balneário Camboriú
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="py-8 bg-luxury-bg border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "gold" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className="transition-all duration-300"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* LISTA EM CARROSSEIS */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <p className="text-center text-muted-foreground text-xl">
              Carregando imóveis...
            </p>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground text-center">
                  Exibindo{" "}
                  <span className="font-semibold text-secondary">
                    {filteredProperties.length}
                  </span>{" "}
                  empreendimentos
                </p>
              </div>

              {carrosseis.map((bloco, i) => (
                <div key={i} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4 text-secondary">
                    Carrossel {i + 1}
                  </h2>

                  <Swiper
                    slidesPerView={1.1}
                    spaceBetween={20}
                    breakpoints={{
                      640: { slidesPerView: 2.2 },
                      1024: { slidesPerView: 3.2 },
                      1400: { slidesPerView: 4.1 },
                    }}
                    className="pb-10"
                  >
                    {bloco.map((property) => (
                      <SwiperSlide key={property.id}>
                        <PropertyCard {...property} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ))}

              {filteredProperties.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">
                    Nenhum empreendimento encontrado com este filtro.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
