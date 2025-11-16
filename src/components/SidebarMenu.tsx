import { Link } from "react-router-dom";
import {
  X,
  User,
  Heart,
  Phone,
  HelpCircle,
  LayoutDashboard,
  Building2,
  Users,
  FileSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  nome: string;
  tipo: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const SidebarMenu = ({ open, onClose }: SidebarProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("ha_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao ler usuário:", error);
      }
    }
  }, []);

  const isAdmin = user?.tipo === "adm";

  return (
    <>
      {/* Fundo escurecido */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity"
        />
      )}

      {/* MENU LATERAL */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border shadow-xl z-[55] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-6 flex flex-col gap-4 text-lg font-medium">
          {/* Cabeçalho */}
          <div className="mb-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Bem-vindo(a),</p>
              <p className="text-lg font-semibold text-foreground">
                {user?.nome || "Usuário"}
              </p>
            </div>
            <button onClick={onClose}>
              <X className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
            </button>
          </div>

          <hr className="border-border mb-4" />

          {/* Menu Admin */}
          {isAdmin && (
            <>


              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <LayoutDashboard className="h-5 w-5 text-primary" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/cadastroimoveis"
                onClick={onClose}
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <Building2 className="h-5 w-5 text-primary" />
                <span>Imóveis</span>
              </Link>



            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;
