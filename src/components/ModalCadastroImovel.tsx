// ModalCadastroImovel.jsx
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
import { X, Plus } from "lucide-react";
import supabase from "@/utility/supabaseClient";
import { createImovel } from "@/components/ImageEvents";

export default function ModalCadastroImovel({ open, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // FORM PRINCIPAL
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
  });

  // LISTAS DO BANCO
  const [caracteristicasBanco, setCaracteristicasBanco] = useState([]);
  const [condominioBanco, setCondominioBanco] = useState([]);

  // SELECIONADAS
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] = useState([]);
  const [condominioSelecionado, setCondominioSelecionado] = useState([]);

  // INPUTS PARA ADICIONAR
  const [novaCaracteristica, setNovaCaracteristica] = useState("");
  const [novoCondominio, setNovoCondominio] = useState("");

  // FOTOS E VÍDEOS
  const [fotos, setFotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setLoading(false);
      setAlert(null);
      setFotos([]);
      setVideos([]);
      setCaracteristicasSelecionadas([]);
      setCondominioSelecionado([]);
    }
  }, [open]);

  // CARREGAR LISTAS DO BANCO
  useEffect(() => {
    if (!open) return;

    async function loadData() {
      const { data } = await supabase
        .from("caract_heleno")
        .select("*")
        .order("id");

      if (data) {
        setCaracteristicasBanco(
          data.filter((i) => i.caracteristica).map((i) => i.caracteristica)
        );
        setCondominioBanco(
          data.filter((i) => i.condominio).map((i) => i.condominio)
        );
      }
    }

    loadData();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ADICIONAR CARACTERÍSTICA
  const adicionarCaracteristica = async () => {
    if (!novaCaracteristica.trim()) return;

    await supabase.from("caract_heleno").insert({
      caracteristica: novaCaracteristica.trim(),
      condominio: null,
    });

    setCaracteristicasBanco((prev) => [...prev, novaCaracteristica.trim()]);
    setNovaCaracteristica("");
  };

  // ADICIONAR CONDOMÍNIO
  const adicionarCondominio = async () => {
    if (!novoCondominio.trim()) return;

    await supabase.from("caract_heleno").insert({
      caracteristica: null,
      condominio: novoCondominio.trim(),
    });

    setCondominioBanco((prev) => [...prev, novoCondominio.trim()]);
    setNovoCondominio("");
  };

  const toggleItem = (item, lista, setLista) => {
    if (lista.includes(item)) setLista(lista.filter((i) => i !== item));
    else setLista([...lista, item]);
  };

  // FOTOS / VÍDEOS
  const handleFiles = (e, tipo) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    if (tipo === "foto") {
      setFotos((prev) => [...prev, ...filesArray]);
    } else {
      setVideos((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveFile = (index, tipo) => {
    if (tipo === "foto") {
      setFotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // ENVIO FINAL
  const handleEnviar = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        caracteristicas: caracteristicasSelecionadas.join(","),
        condominio: condominioSelecionado.join(","),
        fotos,
        videos,
      };

      await createImovel(payload);

      setAlert({ message: "Imóvel cadastrado com sucesso!", success: true });
      onSave();
    } catch {
      setAlert({ message: "Erro ao cadastrar imóvel", success: false });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-screen-2xl w-[95%] h-[90vh] rounded-2xl overflow-hidden p-0 bg-[rgba(24,38,70,0.65)] backdrop-blur-xl border border-[rgba(100,150,255,0.22)] shadow-[0_10px_50px_rgba(0,0,30,0.55)] flex flex-col">
          <DialogHeader className="hidden">
            <DialogTitle>Cadastrar Imóvel</DialogTitle>
          </DialogHeader>

          {/* TOPO */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(120,160,255,0.18)] bg-gradient-to-r from-[rgba(50,80,140,0.45)] to-transparent">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              {step === 1 ? "Cadastrar Imóvel" : "Adicionar Fotos e Vídeos"}
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-md">
              <X className="w-5 h-5 text-blue-200" />
            </button>
          </div>

          {/* CONTEÚDO */}
          <div className="flex-1 overflow-auto p-6 text-black-200">
            {step === 1 ? (

              /* ------------------------- PASSO 1 -------------------------- */
              <div className="space-y-6">

                {/* FORM */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-6 space-y-4">
                    <Input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} />
                    <Input name="nome_anunciante" placeholder="Nome do anunciante" value={form.nome_anunciante} onChange={handleChange} />
                    <Input name="tipo" placeholder="Tipo (Casa, Apto...)" value={form.tipo} onChange={handleChange} />
                    <Input name="negociacao" placeholder="Negociação" value={form.negociacao} onChange={handleChange} />

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

                {/* CARACTERÍSTICAS E CONDOMÍNIO */}
                <div className="border-t border-[rgba(120,160,255,0.15)] pt-4 grid grid-cols-12 gap-4">
                  
                  {/* Características */}
                  <div className="col-span-12 lg:col-span-6">
                    <h4 className="text-sm font-semibold text-blue-100 mb-2">Características</h4>

                    <div className="flex gap-2 mb-3">
                      <Input
                        value={novaCaracteristica}
                        onChange={(e) => setNovaCaracteristica(e.target.value)}
                        placeholder="Nova característica"
                      />
                      <Button onClick={adicionarCaracteristica} className="bg-blue-600 text-white">
                        <Plus size={16} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {caracteristicasBanco.map((c, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer ${
                            caracteristicasSelecionadas.includes(c)
                              ? "bg-blue-600 text-white"
                              : "bg-blue-900/30 text-blue-100"
                          }`}
                          onClick={() =>
                            toggleItem(c, caracteristicasSelecionadas, setCaracteristicasSelecionadas)
                          }
                        >
                          <input type="checkbox" checked={caracteristicasSelecionadas.includes(c)} readOnly />
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>

                  

                </div>
              </div>

            ) : (

              /* ------------------------- PASSO 2 -------------------------- */
              <div className="space-y-6">

                {/* FOTOS */}
                <div>
                  <label className="text-blue-100">Adicionar Fotos</label>
                  <div className="mt-2 flex items-center gap-3">
                    <Input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, "foto")} />
                    <span className="text-sm text-blue-200">Máx. 12 fotos</span>
                  </div>

                  {fotos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                      {fotos.map((file, i) => (
                        <div key={i} className="relative bg-blue-900/20 rounded-md overflow-hidden border border-blue-500/20" style={{ aspectRatio: "1/1" }}>
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveFile(i, "foto")}
                            className="absolute top-2 right-2 bg-blue-900/60 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* VÍDEOS */}
                <div>
                  <label className="text-blue-100">Adicionar Vídeos</label>
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
            <Button
              onClick={() => (step === 1 ? onClose() : setStep(1))}
              variant="secondary"
              className="bg-blue-800/40 text-blue-100 border border-blue-500/30"
            >
              {step === 1 ? "Cancelar" : "Voltar"}
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white"
              onClick={() => (step === 1 ? setStep(2) : handleEnviar())}
            >
              {step === 1 ? "Próximo" : loading ? "Enviando..." : "Enviar Imóvel"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ALERTA */}
      {alert && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-2xl shadow-2xl z-[99999] ${
            alert.success ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          <p className="text-lg font-semibold">{alert.message}</p>
        </div>
      )}
    </>
  );
}
