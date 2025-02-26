"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Box } from "@mui/material";
import axios from "axios";
import AddBookModal from "./components/AddBookModal"; 

interface Book {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
  ano_publicacao: number;
  isbn: string;
  genero: string;
  descricao: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);

  const fetchBooks = async (page: number, rowsPerPage: number) => {
    try {
      const response = await axios.get(`/api/books?page=${page + 1}&limit=${rowsPerPage}`);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks(page, rowsPerPage); 
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
    fetchBooks(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchBooks(0, parseInt(event.target.value, 10));
  };

  useEffect(() => {
    fetchBooks(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: 'white' }}>
          Zievo Library
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ color: 'white' }}>
          Gerencie sua coleção de livros de forma fácil e rápida
        </Typography>
      </Box>
      
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Adicionar Livro
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Editora</TableCell>
              <TableCell>Ano de Publicação</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ color: 'white' }}>{book.titulo}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.autor}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.editora}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.ano_publicacao}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.isbn}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.genero}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.descricao}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteBook(book.id)} color="secondary">
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={100}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: 'white' }}
        />
      </Box>

      <AddBookModal open={openModal} onClose={() => setOpenModal(false)} />
    </Container>
  );
}
