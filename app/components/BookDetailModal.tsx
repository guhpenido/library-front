"use client";

import React from "react";
import { Modal, Box, Typography, Grid, Button, Paper } from "@mui/material";
import { Book } from '../types/book';
import Image from 'next/image';

interface BookDetailsModalProps {
    open: boolean;
    onClose: () => void;
    book?: Book;
}

export default function BookDetailsModal({
    open,
    onClose,
    book,
}: BookDetailsModalProps) {

    const defaultImagePath = "https://firebasestorage.googleapis.com/v0/b/zievolibrary-storage.firebasestorage.app/o/default.jpg?alt=media";
    const imagePath = book?.imagem ? book.imagem : defaultImagePath;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    bgcolor: "white",
                    padding: 4,
                    borderRadius: 2,
                    display: "flex",
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={8}>
                        <Typography variant="h6" gutterBottom>
                            {book?.titulo}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Autor:</strong> {book?.autor}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Editora:</strong> {book?.editora}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Ano de Publicação:</strong> {book?.ano_publicacao}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>ISBN:</strong> {book?.isbn}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Gênero:</strong> {book?.genero}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Descrição:</strong> {book?.descricao}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Paper
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                            }}
                        >
                            <Image
                                src={imagePath}
                                alt={book?.titulo || "No title available"}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "400px",
                                    objectFit: "contain",
                                }}
                                width={300}
                                height={400}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                    }}
                >
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Fechar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
