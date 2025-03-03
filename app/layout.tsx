"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { ReactNode } from 'react';
import Head from 'next/head';

// Layout principal do site
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Head>
            <title>Zievo Library</title>
          </Head>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
