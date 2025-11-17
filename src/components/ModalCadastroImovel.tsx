import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { createImovel } from "@/components/ImageEvents";

interface ModalCadastroImovelProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalCadastroImovel({
  open,
  onClose,
  onSave,
}: ModalCadastroImovelProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; success: boolean } | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    cidade: "",
    bairro: "",
    rua: "",
    cep: "",
    numero: "",
    valor: "",
    negociacao: "",
    tipo: "",
    nome_anunciante: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    metros: "",
    caracteristicas: "",
    condominio: "",
  });

  const [fotos, setFotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setLoading(false);
      setAlert(null);
      setFotos([]);
      setVideos([]);
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>, tipo: "foto" | "video") => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (tipo === "foto") {
        setFotos((prev) => [...prev, ...filesArray]);
      } else {
        setVideos((prev) => [...prev, ...filesArray]);
      }
    }
  };

  const handleRemoveFile = (index: number, tipo: "foto" | "video") => {
    if (tipo === "foto") {
      setFotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEnviar = async () => {
    setLoading(true);
    try {
      const payload = {
        titulo: form.titulo,
        descricao: form.descricao,
        cidade: form.cidade,
        bairro: form.bairro,
        rua: form.rua,
        cep: form.cep,
        numero: form.numero,
        valor: form.valor,
        negociacao: form.negociacao,
        tipo: form.tipo,
        nome_anunciante: form.nome_anunciante,
        quartos: form.quartos,
        banheiros: form.banheiros,
        vagas: form.vagas,
        metros: form.metros,
        caracteristicas: JSON.stringify(form.caracteristicas.split(",").map(c => c.trim())),
        condominio: form.condominio,
        fotos,
        videos,
      };

      await createImovel(payload);

      setFotos([]);
      setVideos([]);
      setStep(1);
      setAlert({ message: "Imóvel cadastrado com sucesso!", success: true });
      onSave();
    } catch (err) {
      console.error(err);
      setAlert({ message: "Erro ao enviar imóvel. Tente novamente.", success: false });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="
            max-w-screen-2xl w-[95%] h-[90vh] rounded-2xl overflow-hidden p-0
            bg-[rgba(24,38,70,0.65)] backdrop-blur-xl
            border border-[rgba(100,150,255,0.22)]
            shadow-[0_10px_50px_rgba(0,0,30,0.55)]
            flex flex-col
          "
        >

          {/* 🔥 FIX RADIX — OBRIGATÓRIO */}
          <DialogHeader className="hidden">
            <DialogTitle>Cadastrar Imóvel</DialogTitle>
          </DialogHeader>

          {/* HEADER AZUL LUXO */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(120,160,255,0.18)] bg-gradient-to-r from-[rgba(50,80,140,0.45)] to-transparent">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {step === 1 ? "Cadastrar Imóvel" : "Adicionar Fotos e Vídeos"}
              </h3>
              <p className="text-sm text-blue-200 mt-0.5">Preencha as informações</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-blue-300 font-medium">{step}/2</span>
              <button
                aria-label="Fechar"
                onClick={onClose}
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 text-blue-200" />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-auto p-6 text-black-200">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6 space-y-4">
                    <Input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
                    <Input name="nome_anunciante" placeholder="Nome do anunciante" value={form.nome_anunciante} onChange={handleChange} />
                    <Input name="tipo" placeholder="Tipo (Casa, Apto...)" value={form.tipo} onChange={handleChange} />
                    <Input name="negociacao" placeholder="Negociação (Venda, Aluguel...)" value={form.negociacao} onChange={handleChange} />

                    <div className="grid grid-cols-3 gap-2">
                      <Input name="quartos" placeholder="Quartos" type="number" value={form.quartos} onChange={handleChange} />
                      <Input name="banheiros" placeholder="Banheiros" type="number" value={form.banheiros} onChange={handleChange} />
                      <Input name="vagas" placeholder="Vagas" type="number" value={form.vagas} onChange={handleChange} />
                    </div>

                    <Input name="metros" placeholder="Metros quadrados" type="number" value={form.metros} onChange={handleChange} />
                  </div>

                  <div className="col-span-12 lg:col-span-6 space-y-4">
                    <Textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} rows={6} />

                    <div className="grid grid-cols-2 gap-2">
                      <Input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
                      <Input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Input name="rua" placeholder="Rua" value={form.rua} onChange={handleChange} />
                      <Input name="numero" placeholder="Número" type="number" value={form.numero} onChange={handleChange} />
                      <Input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
                    </div>

                    <Input name="valor" placeholder="Valor (R$)" type="number" value={form.valor} onChange={handleChange} />
                  </div>
                </div>

                <div className="border-t border-[rgba(120,160,255,0.15)] pt-4 grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6">
                    <h4 className="text-sm font-semibold text-blue-100 mb-2">Características</h4>
                    <Textarea name="caracteristicas" placeholder="Piscina, Churrasqueira..." value={form.caracteristicas} onChange={handleChange} rows={3} />
                  </div>

                  <div className="col-span-12 lg:col-span-6">
                    <h4 className="text-sm font-semibold text-blue-100 mb-2">Condomínio</h4>
                    <Textarea name="condominio" placeholder="Academia, Salão de festas..." value={form.condominio} onChange={handleChange} rows={3} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label className="text-blue-100">Adicionar Fotos</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, "foto")} />
                    <span className="text-sm text-blue-200">Máx. 12 fotos</span>
                  </div>

                  {fotos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
                      {fotos.map((file, i) => (
                        <div
                          key={i}
                          className="relative bg-blue-900/20 rounded-md overflow-hidden border border-blue-500/20"
                          style={{ aspectRatio: "1 / 1" }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`foto-${i}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleRemoveFile(i, "foto")}
                            className="absolute top-2 right-2 bg-blue-900/70 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-blue-100">Adicionar Vídeos</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Input type="file" accept="video/*" multiple onChange={(e) => handleFiles(e, "video")} />
                    <span className="text-sm text-blue-200">MP4, WEBM</span>
                  </div>

                  {videos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {videos.map((file, i) => (
                        <div key={i} className="relative bg-blue-900/20 rounded-md overflow-hidden border border-blue-500/20">
                          <video controls className="w-full h-48 object-cover">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                          </video>
                          <button
                            onClick={() => handleRemoveFile(i, "video")}
                            className="absolute top-2 right-2 bg-blue-900/70 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-[rgba(120,160,255,0.18)] bg-gradient-to-r from-transparent to-[rgba(50,80,140,0.35)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  if (step === 1) onClose();
                  else setStep(step - 1);
                }}
                className="bg-blue-800/40 text-blue-100 border border-blue-500/30"
              >
                {step === 1 ? "Cancelar" : "Voltar"}
              </Button>

              {step === 1 ? (
                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40" onClick={() => setStep(2)}>
                  Próximo
                </Button>
              ) : (
                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40" onClick={handleEnviar} disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Imóvel"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ALERT */}
      {alert && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl shadow-2xl z-[9999] ${
            alert.success ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          <p className="text-lg font-semibold">{alert.message}</p>
        </div>
      )}
    </>
  );
}
