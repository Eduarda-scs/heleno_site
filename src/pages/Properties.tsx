import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import heroBalneario from "@/assets/hero-balneario.jpg";
import supabase from "@/utility/supabaseClient";

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

    // Converter coluna fotos que está como texto
    const parsed = data.map((item) => {
      let firstImage = "";

      try {
        const fotosArray = JSON.parse(item.images);
        firstImage = fotosArray[0]?.url || "";
      } catch (e) {
        console.warn("Erro ao converter fotos:", e);
      }

      return {
        id: item.id,
        title: item.titulo,
        location: item.bairro,
        type: item.tipo,
        image: firstImage,
        categories: [item.tipo], // usado nos filtros
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBalneario})` }}
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

      {/* Filtros */}
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

      {/* Lista de Propriedades */}
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <div
                    key={property.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>

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
