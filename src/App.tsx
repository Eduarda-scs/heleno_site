import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import City from "./pages/City";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AboutFG from "./pages/Fgabout";
import Login from "./pages/Login";
import Dashboard from "./page_auth/dashboard";
import ImovelDetalhes from "./page_auth/imoveldetalhes";
import CadastroImoveis from "./page_auth/cadastroimovel";

 
import { AuthProvider, useAuth } from "./authProvider";

const queryClient = new QueryClient();

// === COMPONENTE DE ROTA PRIVADA ===
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* ROTAS LIVRES */}
              <Route path="/" element={<Index />} />
              <Route path="/cidade" element={<City />} />
              <Route path="/fgabout" element={<AboutFG />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/empreendimentos" element={<Properties />} />
              <Route path="empreendimento/:id" element={<PropertyDetails />} />

              {/* EXEMPLO DE ROTA PRIVADA */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    < Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/cadastroimoveis"
                element={
                  <PrivateRoute>
                    <CadastroImoveis />
                  </PrivateRoute>
                }
              />

               <Route
                path="/cadastroimoveis"
                element={
                  <PrivateRoute>
                    <CadastroImoveis />
                  </PrivateRoute>
                }
              />
              <Route
                path="/imoveisdetalhes/:id"
                element={
                  <PrivateRoute>
                    <ImovelDetalhes />
                  </PrivateRoute>
                }
              />

            

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
