"use client";

import { useEffect, useState } from "react";
import supabase from "@/utility/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2, Eye, XCircle } from "lucide-react";
import ModalCadastroImovel from "@/components/ModalCadastroImovel";
import { useIsMobile } from "@/hooks/use-mobile";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CadastroImoveis() {
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  async function carregarImoveis() {
    const { data, error } = await supabase.from("heleno_imoveis").select("*");
    if (!error) setImoveis(data || []);
  }

  useEffect(() => {
    carregarImoveis();
  }, []);

  const handleSelect = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionados = () => {
    if (selecionados.length === 0)
      return alert("Selecione ao menos um imóvel!");
    setConfirmDelete(true);
  };

  const confirmarExclusao = async () => {
    await supabase.from("HA_IMOVEIS").delete().in("id", selecionados);
    setSelecionados([]);
    carregarImoveis();
    setConfirmDelete(false);
  };

  const handleAbrirDetalhes = (id: number) =>
    navigate(`/imoveisdetalhes/${id}`);

  const imoveisFiltrados = imoveis.filter((i) =>
    i.titulo?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-zinc-700 text-zinc-100">
      {/* HEADER */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-10 lg:py-16 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-zinc-100">Cadastro de</span>{" "}
            <span className="text-emerald-400">Imóveis</span>
          </h1>
          <p className="text-zinc-200 mt-2 text-sm lg:text-base">
            Gerencie anúncios, valores, disponibilidade e detalhes dos imóveis.
          </p>
        </div>

        {/* TOPO */}
        <div
          className={`flex ${
            isMobile ? "flex-col gap-3" : "justify-between items-center"
          } mb-8`}
        >
          <Input
            placeholder="Buscar imóvel..."
            className={`${
              isMobile ? "w-full" : "w-72"
            } bg-zinc-200 text-black border border-zinc-400 placeholder-zinc-600`}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div
            className={`flex ${
              isMobile ? "flex-col gap-2 w-full" : "flex-row gap-2"
            }`}
          >
            <Button
              onClick={() => setShowModal(true)}
              className={`bg-emerald-500 hover:bg-emerald-600 ${
                isMobile && "w-full"
              }`}
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Novo Imóvel
            </Button>

            {selecionados.length > 0 && (
              <Button
                variant="destructive"
                className={isMobile ? "w-full" : ""}
                onClick={handleExcluirSelecionados}
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Excluir ({selecionados.length})
              </Button>
            )}
          </div>
        </div>

        {/* TABELA DESKTOP */}
        {!isMobile && (
          <div className="w-full bg-zinc-600 text-zinc-100 rounded-lg shadow border border-zinc-500">
            <Table>
              <TableHeader className="bg-zinc-500 border-b border-zinc-400">
                <TableRow>
                  <TableHead className="w-12 text-center text-black">Sel.</TableHead>
                  <TableHead className=" text-black">ID</TableHead>
                  <TableHead className=" text-black">Título</TableHead>
                  <TableHead className=" text-black">Negociação</TableHead>
                  <TableHead className=" text-black">Valor</TableHead>
                  <TableHead className=" text-black">Status</TableHead>
                  <TableHead className="text-center text-black">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {imoveisFiltrados.length > 0 ? (
                  imoveisFiltrados.map((imovel) => (
                    <TableRow
                      key={imovel.id}
                      className={`hover:bg-zinc-500/40 transition ${
                        selecionados.includes(imovel.id)
                          ? "bg-zinc-500/60"
                          : ""
                      }`}
                    >
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={selecionados.includes(imovel.id)}
                          onChange={() => handleSelect(imovel.id)}
                          className="accent-emerald-500 h-4 w-4"
                        />
                      </TableCell>

                      <TableCell>{imovel.id}</TableCell>
                      <TableCell className="font-semibold">
                        {imovel.titulo}
                      </TableCell>
                      <TableCell className="capitalize">
                        {imovel.negociacao}
                      </TableCell>
                      <TableCell className="font-medium text-emerald-300">
                        {imovel.valor
                          ? `R$ ${Number(imovel.valor).toLocaleString(
                              "pt-BR",
                              { minimumFractionDigits: 2 }
                            )}`
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            imovel.status
                              ? "bg-emerald-800/30 text-emerald-200"
                              : "bg-red-800/30 text-red-200"
                          }`}
                        >
                          {imovel.status ? "Disponível" : "Vendido"}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-400 text-black"
                          onClick={() => handleAbrirDetalhes(imovel.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-zinc-300"
                    >
                      Nenhum imóvel encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* MOBILE — CARDS */}
        {isMobile && (
          <div className="space-y-4">
            {imoveisFiltrados.length > 0 ? (
              imoveisFiltrados.map((imovel) => (
                <div
                  key={imovel.id}
                  className={`border rounded-xl p-4 shadow-md bg-zinc-600 border-zinc-400 ${
                    selecionados.includes(imovel.id)
                      ? "border-emerald-400"
                      : "border-zinc-400"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg text-zinc-100">
                      {imovel.titulo}
                    </h2>
                    <input
                      type="checkbox"
                      checked={selecionados.includes(imovel.id)}
                      onChange={() => handleSelect(imovel.id)}
                      className="accent-emerald-400"
                    />
                  </div>

                  <p>
                    <strong className="text-zinc-200">Negociação:</strong>{" "}
                    {imovel.negociacao}
                  </p>

                  <p>
                    <strong className="text-zinc-200">Valor:</strong>{" "}
                    {imovel.valor
                      ? `R$ ${Number(imovel.valor).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </p>

                  <p>
                    <strong className="text-zinc-200">Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        imovel.status
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                    >
                      {imovel.status ? "Disponível" : "Vendido"}
                    </span>
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 border-zinc-400 text-zinc-100"
                    onClick={() => handleAbrirDetalhes(imovel.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Ver detalhes
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-200">
                Nenhum imóvel encontrado.
              </p>
            )}
          </div>
        )}

        {/* Modal de Cadastro */}
        <ModalCadastroImovel
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={carregarImoveis}
        />

        {/* Modal de Confirmação */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-zinc-600 border border-zinc-400 text-zinc-100 rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
              <XCircle className="text-red-400 w-12 h-12 mx-auto mb-3" />

              <h2 className="text-xl font-semibold mb-2">
                Confirmar exclusão
              </h2>

              <p className="text-zinc-200 mb-6">
                Tem certeza que deseja excluir os imóveis selecionados?
              </p>

              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  className="border-zinc-400 text-zinc-100"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </Button>

                <Button variant="destructive" onClick={confirmarExclusao}>
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
