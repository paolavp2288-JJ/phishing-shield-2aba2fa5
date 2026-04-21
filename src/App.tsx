import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import QueEsPhishing from "./pages/QueEsPhishing";
import TiposDeAtaques from "./pages/TiposDeAtaques";
import ComoProtegerte from "./pages/ComoProtegerte";
import Quiz from "./pages/Quiz";
import Laboratorio from "./pages/Laboratorio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/que-es-phishing" element={<QueEsPhishing />} />
          <Route path="/tipos-de-ataques" element={<TiposDeAtaques />} />
          <Route path="/como-protegerte" element={<ComoProtegerte />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/laboratorio" element={<Laboratorio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
