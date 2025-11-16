"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "@/utility/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export default function ImovelDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imovel, setImovel] = useState<any>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<any>({});
  const [midias, setMidias] = useState<(string | File)[]>([]);
  const [videos, setVideos] = useState<(string | File)[]>([]);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // --- CARREGAR DO SUPABASE ---
  async function carregarImovel() {
    const { data, error } = await supabase
      .from("heleno_imoveis")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setImovel(data);

      setForm({
        titulo: data.titulo ?? "",
        descricao: data.descricao ?? "",
        cidade: data.cidade ?? "",
        bairro: data.bairro ?? "",
        rua: data.rua ?? "",
        numero: data.numero ?? "",
        cep: data.cep ?? "",
        valor: data.valor ?? "",
        negociacao: data.negociacao ?? "",
        tipo: data.tipo ?? "",
        nome_anunciante: data.nome_anunciante ?? "",
        quartos: data.quartos ?? "",
        banheiros: data.banheiros ?? "",
        vagas: data.vagas ?? "",
        metros: data.metros ?? "",
        caracteristicas:
          typeof data.caracteristicas === "string"
            ? data.caracteristicas
            : Array.isArray(data.caracteristicas)
            ? data.caracteristicas.join(", ")
            : "",
        Condominio:
          typeof data.Condominio === "string"
            ? data.Condominio
            : Array.isArray(data.Condominio)
            ? data.Condominio.join(", ")
            : "",
      });

      let urls: string[] = [];
      try {
        if (data.images) {
          if (typeof data.images === "string") {
            urls = JSON.parse(data.images).map((i: any) => i.url);
          } else if (Array.isArray(data.images)) {
            urls = data.images.map((i: any) => i.url || i);
          }
        }
      } catch {
        urls = [];
      }

      let vids: string[] = [];
      try {
        if (data.videos) {
          if (typeof data.videos === "string") {
            vids = JSON.parse(data.videos).map((i: any) => i.url);
          } else if (Array.isArray(data.videos)) {
            vids = data.videos.map((i: any) => i.url || i);
          }
        }
      } catch {}

      setMidias(urls);
      setVideos(vids);
    }
  }

  useEffect(() => {
    if (id) carregarImovel();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  // --- EXCLUIR ---
  const handleExcluir = async () => {
    const { error } = await supabase
      .from("heleno_imoveis")
      .delete()
      .eq("id", id);

    if (!error) {
      setShowExcluirModal(false);
      alert("Imóvel excluído com sucesso.");
      navigate("/Cadastroimoveis");
    } else {
      alert("Erro ao excluir.");
    }
  };

  // --- ATUALIZAR VIA WEBHOOK ---
  const handleAtualizar = async () => {
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("funcao", "atualizar_imovel");
      formData.append("id", String(id));

      Object.entries(form).forEach(([k, v]) => {
        formData.append(k, String(v));
      });

      midias.forEach((m) => {
        if (m instanceof File) formData.append("midia", m);
        else formData.append("midia_url", m);
      });

      videos.forEach((v) => {
        if (v instanceof File) formData.append("video", v);
        else formData.append("video_url", v);
      });

      const resp = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (resp.ok) {
        alert("Imóvel atualizado!");
        setEditando(false);
        carregarImovel();
      } else {
        alert("Erro ao enviar dados.");
      }
    } catch {
      alert("Erro ao enviar.");
    }

    setSaving(false);
  };

  // --- 🔥 CORRIGIDO: TIPO EXPLÍCITO EM MIDIAS ---
  const handleAddMidia = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setMidias((prev: (string | File)[]) => [...prev, ...files]);
    }
  };

  // --- 🔥 CORRIGIDO: TIPO EXPLÍCITO EM VIDEOS ---
  const handleAddVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files) as File[];
      setVideos((prev: (string | File)[]) => [...prev, ...files]);
    }
  };

  const handleRemoveMidia = (i: number) =>
    setMidias((prev) => prev.filter((_, idx) => idx !== i));

  const handleRemoveVideo = (i: number) =>
    setVideos((prev) => prev.filter((_, idx) => idx !== i));

  if (!imovel)
    return (
      <div className="pt-24 container mx-auto px-4">
        <p>Carregando...</p>
      </div>
    );

  const camposNumericos = ["valor", "cep", "quartos", "banheiros", "metros", "vagas"];
  const camposTexto = [
    "titulo",
    "descricao",
    "cidade",
    "bairro",
    "rua",
    "numero",
    "tipo",
    "negociacao",
    "nome_anunciante",
    "Condominio",
  ];

  return (
    <main className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            Detalhes do <span className="text-yellow-600">Imóvel</span>
          </h1>
        </header>

        <div className="flex justify-end gap-3 mb-6">
          {!editando ? (
            <>
              <Button onClick={() => setEditando(true)}>Atualizar</Button>
              <Button variant="destructive" onClick={() => setShowExcluirModal(true)}>
                Excluir
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditando(false);
                  carregarImovel();
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleAtualizar} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </>
          )}
        </div>

        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>{imovel.titulo}</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {!editando ? (
              <>
                <div>
                  {camposTexto.map((c) => (
                    <p key={c}>
                      <b>{c}: </b> {imovel[c] ?? "-"}
                    </p>
                  ))}
                  <p className="mt-4">
                    <b>Características:</b> {imovel.caracteristicas}
                  </p>
                </div>

                <div>
                  {camposNumericos.map((c) => (
                    <p key={c}>
                      <b>{c}: </b> {imovel[c] ?? "-"}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  {camposTexto.map((c) => (
                    <Input
                      key={c}
                      name={c}
                      value={form[c]}
                      onChange={handleChange}
                      placeholder={c}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  {camposNumericos.map((c) => (
                    <Input
                      key={c}
                      name={c}
                      value={form[c]}
                      onChange={handleChange}
                      type="number"
                      placeholder={c}
                    />
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* --- FOTOS --- */}
        <Card className="mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Fotos</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {midias.map((m, i) => {
              const url = m instanceof File ? URL.createObjectURL(m) : m;
              return (
                <div key={i} className="relative">
                  <img src={url} className="w-full h-40 object-cover rounded" />
                  {editando && (
                    <button
                      onClick={() => handleRemoveMidia(i)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {editando && (
            <div className="mt-3">
              <input type="file" multiple onChange={handleAddMidia} />
            </div>
          )}
        </Card>

        {/* --- VIDEOS --- */}
        <Card className="mt-6 p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Vídeos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v, i) => {
              const url = v instanceof File ? URL.createObjectURL(v) : v;
              return (
                <div key={i} className="relative">
                  <video src={url} controls className="w-full h-60 object-cover rounded" />
                  {editando && (
                    <button
                      onClick={() => handleRemoveVideo(i)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {editando && (
            <div className="mt-3">
              <input type="file" accept="video/*" multiple onChange={handleAddVideo} />
            </div>
          )}
        </Card>

        {/* --- MODAL --- */}
        <Dialog open={showExcluirModal} onOpenChange={setShowExcluirModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir imóvel?</DialogTitle>
            </DialogHeader>
            <p className="text-center pt-2">Essa ação é irreversível.</p>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setShowExcluirModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleExcluir}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
