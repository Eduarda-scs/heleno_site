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
  X,
} from "lucide-react";
import supabase from "@/utility/supabaseClient";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // BUSCAR IMÓVEL
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

    // ⬇⬇⬇ AJUSTE AQUI: usa a coluna "url" contendo array de imagens em TEXT ⬇⬇⬇
    let fotosArray: any[] = [];
    if (data.url) {
      try {
        const parsed = JSON.parse(data.url);
        fotosArray = parsed.map((url: string) => ({
          type: "image",
          url,
        }));
      } catch (e) {
        console.error("Erro ao parsear coluna URL:", e);
      }
    }
    // ⬆⬆⬆ FIM DO AJUSTE ⬆⬆⬆

    let videosArray: any[] = [];
    if (data.videos) {
      try {
        const parsed = JSON.parse(data.videos);
        videosArray = parsed.map((url: string) => ({
          type: "video",
          url,
        }));
      } catch {}
    }

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

  // ORGANIZAÇÃO
  const heroImage = property.fotos[0]?.url || "";

  const gallery = [
    ...(heroImage ? [{ type: "image", url: heroImage }] : []),
    ...property.fotos.slice(1),
    ...property.videos,
  ];

  const visibleGallery = gallery.slice(0, 4);
  const extraMedia = gallery.length - 4;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextMedia = () => {
    setLightboxIndex((prev) =>
      prev + 1 < gallery.length ? prev + 1 : 0
    );
  };

  const prevMedia = () => {
    setLightboxIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : gallery.length - 1
    );
  };

  const currentMedia = gallery?.[lightboxIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[85vh] overflow-hidden">
        <img
          src={heroImage}
          alt={property.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="absolute top-6 left-6 z-[99999]">
          <Link
            to="/empreendimentos"
            className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-white font-medium hover:bg-black/60 backdrop-blur-md transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Empreendimentos
          </Link>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10">
          <div className="text-white max-w-3xl">
            <span className="px-4 py-1 rounded-full bg-secondary text-primary font-semibold inline-block mb-4">
              {property.tipo}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-xl">
              {property.titulo}
            </h1>

            <div className="flex items-center gap-2 mt-4 text-white/90 text-lg">
              <MapPin className="w-5 h-5 text-secondary" />
              {property.bairro}, {property.cidade}
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* MAIN */}
            <div className="lg:col-span-2 space-y-10">
              <p className="text-4xl font-bold text-secondary">
                R$ {property.valor}
              </p>

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

              {/* CARACTERISTICAS */}
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

                {/* MOBILE */}
                <div className="flex gap-4 overflow-x-auto sm:hidden snap-x snap-mandatory pb-3">
                  {gallery.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="min-w-[80%] h-64 rounded-xl overflow-hidden snap-center cursor-pointer relative"
                      onClick={() => openLightbox(index)}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* DESKTOP */}
                <div className="hidden sm:grid grid-cols-2 gap-4">
                  {visibleGallery.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="relative overflow-hidden rounded-xl cursor-pointer group"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          className="w-full h-64 object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-64 object-cover"
                          muted
                          playsInline
                        />
                      )}

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
            <div>
              <div className="sticky top-28 bg-card p-8 rounded-xl shadow-[var(--shadow-medium)]">
                <h3 className="text-2xl font-bold mb-4">Interessado?</h3>

                <p className="text-muted-foreground mb-6">
                  Fale diretamente com Heleno!
                </p>

                <Button variant="gold" size="lg" className="w-full" asChild>
                  <a
                    href={`https://wa.me/${property.whatsapp ?? "554792639593"}`}
                    target="_blank"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
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

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-10 h-10" />
          </button>

          <button
            className="absolute left-6 text-white"
            onClick={prevMedia}
          >
            <ArrowLeft className="w-10 h-10" />
          </button>

          <div className="max-w-5xl w-full flex items-center justify-center">
            {currentMedia?.type === "image" ? (
              <img
                src={currentMedia?.url ?? ""}
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <video
                src={currentMedia?.url ?? ""}
                controls
                className="w-full max-h-[80vh]"
              />
            )}
          </div>

          <button
            className="absolute right-6 text-white rotate-180"
            onClick={nextMedia}
          >
            <ArrowLeft className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
