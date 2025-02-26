import type { NextApiRequest, NextApiResponse } from "next";

let books = [
  { id: 1, title: "Livro 1", author: "Autor 1" },
  { id: 2, title: "Livro 2", author: "Autor 2" },
  // Adicione mais livros para teste
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { page = 1, limit = 5 } = req.query;
    const paginatedBooks = books.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
    return res.status(200).json({ books: paginatedBooks });
  }

  if (req.method === "POST") {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    return res.status(201).json(newBook);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    books = books.filter((book) => book.id !== Number(id));
    return res.status(204).end();
  }

  res.status(405).end();  // Método não permitido
}
