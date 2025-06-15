
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EncodeDecode from "./components/EncodeDecode";
import TranslateText from "./components/TranslateText";
import CompareFiles from "./components/CompareFiles";
import QAModel from "./components/QAModel";
import Summarize from "./components/Summarize";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compare" element={<CompareFiles />} />
            <Route path="/encode-decode" element={<EncodeDecode />} />
            <Route path="/translate" element={<TranslateText />} />
            <Route path="/qa" element={<QAModel />} />
            <Route path="/summarize" element={<Summarize />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
