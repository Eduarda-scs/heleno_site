// src/events/ImageEvents.ts
"use client";

export interface ImovelData {
  titulo: string;
  descricao: string;
  cidade: string;
  bairro: string;
  rua: string;
  cep: string;
  numero: string;
  valor: string;
  negociacao: string;
  tipo: string;
  nome_anunciante: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  metros: string;
  caracteristicas: string;
  condominio: string;
  fotos?: File[];
  videos?: File[];
}

// URL da sua API FastAPI
const API_URL = "http://127.0.0.1:4000/imoveis";

/* =====================================
        CRIAR IMÓVEL (POST)
===================================== */
export async function createImovel(data: any) {
  const formData = new FormData();

  // Campos normais
  for (const key of Object.keys(data)) {
    if (key !== "fotos" && key !== "videos") {
      formData.append(key, data[key]);
    }
  }

  // Fotos
  if (data.fotos) {
    data.fotos.forEach((file: File) => {
      formData.append("fotos", file);
    });
  }

  // Vídeos
  if (data.videos) {
    data.videos.forEach((file: File) => {
      formData.append("videos", file);
    });
  }

  const response = await fetch("http://127.0.0.1:4000/imoveis", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar imóvel");
  }

  return await response.json();
}


/* =====================================
        LISTAR TODOS IMÓVEIS (GET)
===================================== */
export const getImoveis = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

/* =====================================
        ATUALIZAR IMÓVEL (PUT)
===================================== */
export const updateImovel = async (id: string, data: Partial<ImovelData>) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =====================================
        DELETAR IMÓVEL (DELETE)
===================================== */
export const removeImovel = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return response.ok;
};
