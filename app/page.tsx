"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
  TextField,
} from "@mui/material";
import AddBookModal from "./components/AddBookModal";
import EditBookModal from "./components/EditBookModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import BookDetailModal from "./components/BookDetailModal";
import "./globals.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchBooks, deleteBook } from "./api/api";
import EditIcon from "@mui/icons-material/Edit";
import { Snackbar, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Book } from "./types/book";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedBookDetail, setSelectedBookDetail] = useState<Book | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });

  const notify = (message: string, severity: "success" | "error" | "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const loadBooks = async (page = 0, rowsPerPage = 5) => {
    const data = await fetchBooks(page, rowsPerPage, notify);
    setBooks(data);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (book: Book) => {
    setBookToDelete(book);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete.id, notify);
      loadBooks(page, rowsPerPage);
    }
    setOpenConfirmModal(false);
    setBookToDelete(null);
  };

  const handleBookDetail = (book: Book) => {
    setSelectedBookDetail(book);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedBookDetail(null);
  };

  useEffect(() => {
    loadBooks(page, rowsPerPage);
  }, [page, rowsPerPage, loadBooks]);

  const filteredBooks =
    books?.filter((book) =>
      book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <Container>
      <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
      </Snackbar>
      <Box my={4}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ color: "white" }}
      >
        Zievo Library
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        component="p"
        sx={{ color: "white" }}
      >
        Gerencie sua coleção de livros de forma fácil e rápida
      </Typography>
      </Box>

      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      p={2}
      sx={{ backgroundColor: "rgb(255, 255, 255)", borderRadius: 2 }}
      >
      <TextField
        label="Buscar por título"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ backgroundColor: "white", borderRadius: 1 }}
      />
      <Button
        variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          sx={{ ml: 2, py: 1.5, px: 3 }}
        >
          Adicionar Livro
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Visualizar</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Editora</TableCell>
              <TableCell>Ano de Publicação</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((livro) => (
              <TableRow key={livro.id}>
                <TableCell>
                  <Button onClick={() => handleBookDetail(livro)} color="info">
                    <VisibilityIcon />
                  </Button>
                </TableCell>
                <TableCell>{livro.titulo || ""}</TableCell>
                <TableCell>{livro.autor || ""}</TableCell>
                <TableCell>{livro.editora || ""}</TableCell>
                <TableCell>{livro.ano_publicacao || ""}</TableCell>
                <TableCell>{livro.isbn || ""}</TableCell>
                <TableCell>{livro.genero || ""}</TableCell>
                <TableCell>{livro.descricao || ""}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center">
                    <Button
                      onClick={() => handleEditBook(livro)}
                      color="primary"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(livro)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
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
          sx={{ color: "white" }}
        />
      </Box>

      <AddBookModal open={openModal} onClose={() => setOpenModal(false)} notify={notify} />
      <ConfirmDeleteModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        bookTitle={bookToDelete?.titulo}
      />
      {selectedBookDetail && (
        <BookDetailModal
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          book={selectedBookDetail}
        />
      )}
      {selectedBook && (
        <EditBookModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          book={selectedBook}
          notify={notify}
        />
      )}
    </Container>
  );
}
