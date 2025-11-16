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

import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

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
    <>
      {/* 🔹 HEADER */}
      <Header />

      {/* 🔹 CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto px-4 py-10 lg:py-16 animate-fade-in">
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-primary-foreground">Cadastro de</span>{" "}
            <span className="text-secondary">Imóveis</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm lg:text-base">
            Gerencie anúncios, valores, disponibilidade e detalhes dos imóveis.
          </p>
        </div>

        {/* 🔹 TOPO */}
        <div
          className={`flex ${
            isMobile ? "flex-col gap-3" : "justify-between items-center"
          } mb-8`}
        >
          <Input
            placeholder="Buscar imóvel..."
            className={`${
              isMobile ? "w-full" : "w-72"
            } bg-muted/40 backdrop-blur-sm`}
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
              variant="gold"
              className={isMobile ? "w-full" : ""}
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

        {/* 🔹 TABELA DESKTOP */}
        {!isMobile && (
          <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-12 text-center">Sel.</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Negociação</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {imoveisFiltrados.length > 0 ? (
                  imoveisFiltrados.map((imovel) => (
                    <TableRow
                      key={imovel.id}
                      className={`hover:bg-muted/40 transition ${
                        selecionados.includes(imovel.id)
                          ? "bg-muted/60"
                          : ""
                      }`}
                    >
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={selecionados.includes(imovel.id)}
                          onChange={() => handleSelect(imovel.id)}
                          className="accent-secondary h-4 w-4"
                        />
                      </TableCell>

                      <TableCell>{imovel.id}</TableCell>
                      <TableCell className="font-semibold">
                        {imovel.titulo}
                      </TableCell>
                      <TableCell className="capitalize">
                        {imovel.negociacao}
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
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
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {imovel.status ? "Disponível" : "Vendido"}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
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
                      className="text-center py-6 text-muted-foreground"
                    >
                      Nenhum imóvel encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* 🔹 MOBILE — CARDS */}
        {isMobile && (
          <div className="space-y-4">
            {imoveisFiltrados.length > 0 ? (
              imoveisFiltrados.map((imovel) => (
                <div
                  key={imovel.id}
                  className={`border rounded-xl p-4 shadow-md bg-card ${
                    selecionados.includes(imovel.id)
                      ? "border-secondary"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">
                      {imovel.titulo}
                    </h2>
                    <input
                      type="checkbox"
                      checked={selecionados.includes(imovel.id)}
                      onChange={() => handleSelect(imovel.id)}
                      className="accent-secondary"
                    />
                  </div>

                  <p>
                    <strong>Negociação:</strong> {imovel.negociacao}
                  </p>
                  <p>
                    <strong>Valor:</strong>{" "}
                    {imovel.valor
                      ? `R$ ${Number(imovel.valor).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}`
                      : "-"}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        imovel.status
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {imovel.status ? "Disponível" : "Vendido"}
                    </span>
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => handleAbrirDetalhes(imovel.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Ver detalhes
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                Nenhum imóvel encontrado.
              </p>
            )}
          </div>
        )}

        {/* 🔹 Modal de Cadastro */}
        <ModalCadastroImovel
          open={showModal}
          onClose={() => setShowModal(false)}
          onSave={carregarImoveis}
        />

        {/* 🔹 Modal de Confirmação */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center">
              <XCircle className="text-red-500 w-12 h-12 mx-auto mb-3" />

              <h2 className="text-xl font-semibold mb-2">
                Confirmar exclusão
              </h2>

              <p className="text-muted-foreground mb-6">
                Tem certeza que deseja excluir os imóveis selecionados?
              </p>

              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
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

      {/* 🔹 FOOTER */}
      <Footer />
    </>
  );
}
