import axios from "axios";

const API_BASE_URL = "https://zievolibrary-back-production.up.railway.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchBooks = async (
  page = 0,
  rowsPerPage = 5,
  notify: (message: string, severity: "success" | "error" | "info") => void
) => {
  try {
    notify("Buscando livros...", "info");
    const response = await api.get(
      `/livros?page=${page + 1}&limit=${rowsPerPage}`
    );

    if (response.data.data.length > 0) {
      notify("Livros carregados com sucesso!", "success");
    } else {
      notify("Nenhum livro encontrado.", "info");
    }

    return response.data.data || [];
  } catch (error) {
    notify("Erro ao buscar livros!", "error");
    console.error("Erro ao buscar livros:", error);
    return [];
  }
};

export const deleteBook = async (
  id: number,
  notify: (message: string, severity: "success" | "error") => void
) => {
  try {
    await api.delete(`/delete/${id}`);
    notify("Livro deletado com sucesso!", "success");
  } catch (error) {
    notify("Erro ao deletar livro!", "error");
    console.error("Erro ao deletar livro:", error);
  }
};

export const addBook = async (
  bookData: FormData, 
  notify: (message: string, severity: "success" | "error" | "info") => void
) => {
  try {
    // Enviar dados do livro para a API via POST
    console.log(bookData);
    const response = await api.post("/create", bookData);
    notify("Livro adicionado com sucesso!", "success");
    return response.data;
  } catch (error) {
    notify("Erro ao adicionar livro!", "error");
    console.error("Erro ao adicionar livro:", error);
    throw error; // Lança erro para o componente saber
  }
};

export const editBook = async (
  bookId: number,
  updatedData: FormData, 
  notify: (message: string, severity: "success" | "error" | "info") => void
) => {
  try {
    const response = await api.put(`/update/${bookId}`, updatedData);
    notify("Livro editado com sucesso!", "success");
    return response.data;
  } catch (error) {
    notify("Erro ao editar livro!", "error");
    console.error("Erro ao editar livro:", error);
    throw error; 
  }
};

export default api;
