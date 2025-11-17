import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/authProvider";
import Sidebar from "@/components/SidebarMenu";
import logo from "@/assets/logo.png";


const navigation = [
  { name: "Início", href: "/" },
  { name: "A Cidade", href: "/cidade" },
  { name: "Empreendimentos", href: "/empreendimentos" },
  { name: "FG Empreendimentos", href: "/fgabout" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-[var(--shadow-medium)]"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* === BOTÃO SIDEBAR À ESQUERDA === */}
            {user && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden md:flex text-primary-foreground hover:text-secondary transition-colors"
              >
                <Menu size={30} />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <img 
                src={logo}// coloque o caminho da sua logo aqui
                alt="Heleno Alves" 
                className="h-10 w-auto"  // ajuste o tamanho como quiser
              />
            </Link>
            {/* MENU DESKTOP */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    location.pathname === item.href
                      ? "text-secondary"
                      : "text-primary-foreground hover:text-secondary"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300",
                      location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}

              {/* LOGIN OU SAIR */}
              {!user ? (
                <Button variant="gold" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              ) : (
                <Button variant="gold" size="sm" onClick={logout}>
                  Sair
                </Button>
              )}
            </div>

            {/* BOTÃO MOBILE */}
            <button
              className="md:hidden text-primary-foreground hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MENU MOBILE COM OVERLAY */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay escuro */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu mobile */}
          <div className="fixed top-0 left-0 w-full bg-[#1a1a1a] z-50 py-6 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium px-4 py-2 rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-secondary bg-primary-foreground/10"
                      : "text-primary-foreground hover:text-secondary hover:bg-primary-foreground/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* LOGIN OU SAIR NO MOBILE */}
              {!user ? (
                <Button variant="gold" size="sm" className="mt-4" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              ) : (
                <Button variant="gold" size="sm" className="mt-4" onClick={logout}>
                  Sair
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {/* SIDEBAR PARA USUÁRIOS LOGADOS */}
      {user && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
    </>
  );
};