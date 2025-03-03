"use client";

import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book } from "../types/book";
import {editBook} from "../api/api";

interface EditBookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book;
  onEdit: () => void;
  notify: (message: string, severity: "success" | "error" | "info") => void;
}

const schema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  editora: z.string().min(1, "Editora é obrigatória"),
  ano_publicacao: z.string().min(1, "Ano de publicação é obrigatório"),
  isbn: z.string().min(1, "ISBN é obrigatório"),
  genero: z.string().min(1, "Gênero é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  imagem: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditBookModal({
  open,
  onClose,
  book,
  onEdit,
  notify,
}: EditBookModalProps) {
  const [image, setImage] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...book,
      ano_publicacao:
        typeof book.ano_publicacao === "string"
          ? book.ano_publicacao
          : String(book.ano_publicacao),
      imagem: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof FormData];

      if (value !== undefined) {
        if (key === "ano_publicacao") {
          formData.append(key, String(parseInt(value as string)));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (image) {
      formData.append("imagem", image);
    }

    try {
      await editBook(book.id, formData, notify);
      onClose();
    } catch (error) {
      console.error("Erro ao editar livro:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Editar Livro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="titulo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Título"
                    fullWidth
                    error={!!errors.titulo}
                    helperText={errors.titulo?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="editora"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Editora"
                    fullWidth
                    error={!!errors.editora}
                    helperText={errors.editora?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="isbn"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ISBN"
                    fullWidth
                    error={!!errors.isbn}
                    helperText={errors.isbn?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição"
                    fullWidth
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="autor"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Autor"
                    fullWidth
                    error={!!errors.autor}
                    helperText={errors.autor?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="ano_publicacao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ano de Publicação"
                    type="number"
                    fullWidth
                    error={!!errors.ano_publicacao}
                    helperText={errors.ano_publicacao?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Gênero"
                    fullWidth
                    error={!!errors.genero}
                    helperText={errors.genero?.message}
                    margin="normal"
                  />
                )}
              />
              <Box sx={{ marginTop: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {image && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1 }}
                  >
                    Imagem selecionada: {image.name}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" type="submit">
              Salvar Alterações
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
