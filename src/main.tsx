import "./index.css";

import { queryClient } from "@shared/lib/queryClient";
import { ScrollManager } from "@shared/ui/ScrollManager";
import { AppProvider } from "@src/shared/context/AppContext/AppContext";
import { ThemeProvider } from "@src/shared/context/ThemeContext/ThemeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <ScrollManager />
            <App />
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
