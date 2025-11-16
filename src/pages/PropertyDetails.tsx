import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  CheckCircle,
  MessageCircle,
  Play,
} from "lucide-react";
import supabase from "@/utility/supabaseClient";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Buscar imóvel pelo ID
  const fetchProperty = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("heleno_imoveis")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erro ao carregar imóvel:", error);
      setLoading(false);
      return;
    }

    // Converter fotos (JSON string → array)
    let fotosArray = [];
    if (data.images) {
      try {
        fotosArray = JSON.parse(data.images); // [{url, public_id}]
      } catch (e) {
        console.warn("Erro ao converter fotos:", e);
      }
    }

    // Converter videos
    let videosArray = [];
    if (data.videos) {
      try {
        videosArray = JSON.parse(data.videos);
      } catch (e) {
        console.warn("Erro ao converter vídeos:", e);
      }
    }

    // Converter características (string separada por vírgula)
    let caracteristicasArray = [];
    if (data.caracteristicas) {
      caracteristicasArray = data.caracteristicas
        .split(",")
        .map((c: string) => c.trim());
    }

    setProperty({
      ...data,
      fotos: fotosArray,
      videos: videosArray,
      caracteristicas: caracteristicasArray,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (loading || !property) {
    return (
      <div className="min-h-screen flex justify-center items-center text-muted-foreground text-lg">
        Carregando imóvel...
      </div>
    );
  }

  // HERO IMAGE = primeira foto
  const heroImage = property.fotos[0]?.url || "";

  // Galeria combinando fotos + vídeos
  const gallery = [
    ...property.fotos.slice(1).map((f: any) => ({ type: "image", url: f.url })),
    ...property.videos.map((v: any) => ({ type: "video", url: v.url })),
  ];

  const visibleGallery = gallery.slice(0, 4);
  const extraMedia = gallery.length - 4;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/empreendimentos">
              <ArrowLeft className="w-4 h-4" />
              Voltar para Empreendimentos
            </Link>
          </Button>

          {/* HERO */}
          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] mb-8 animate-fade-up">
            <img
              src={heroImage}
              alt={property.titulo}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-6 right-6 bg-secondary text-primary px-4 py-2 rounded-full font-semibold">
              {property.tipo}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* MAIN */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {property.titulo}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-lg">
                    {property.bairro}, {property.cidade}
                  </span>
                </div>

                <p className="text-3xl font-bold text-secondary">
                  R$ {property.valor}
                </p>
              </div>

              {/* INFO RÁPIDA */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg text-center">
                  <Bed className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Quartos</div>
                  <div className="font-semibold">{property.quartos}</div>
                </div>
                <div className="bg-card p-4 rounded-lg text-center">
                  <Bath className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Banheiros</div>
                  <div className="font-semibold">{property.banheiros}</div>
                </div>
                <div className="bg-card p-4 rounded-lg text-center">
                  <Maximize2 className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Área</div>
                  <div className="font-semibold">{property.metros} m²</div>
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Descrição</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {property.descricao}
                </p>
              </div>

              {/* CARACTERÍSTICAS */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Diferenciais</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.caracteristicas.map((car: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                      <span>{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GALERIA */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Galeria</h2>

                <div className="grid grid-cols-2 gap-4">
                  {visibleGallery.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)] transition-all cursor-pointer"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-black flex items-center justify-center">
                          <Play className="w-14 h-14 text-white" />
                        </div>
                      )}

                      {/* +X overlay */}
                      {index === 3 && extraMedia > 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-2xl font-semibold">
                          +{extraMedia} mídias
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card p-8 rounded-xl shadow-[var(--shadow-medium)]">
                <h3 className="text-2xl font-bold mb-4">Interessado?</h3>

                <p className="text-muted-foreground mb-6">
                  Fale diretamente com Heleno!
                </p>

                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a href={`https://wa.me/${property.whatsapp ?? "554792639593"}`} target="_blank">
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </a>
                </Button>

                <Button variant="hero" size="lg" className="w-full mt-4" asChild>
                  <Link to="/contato">Formulário de Contato</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
