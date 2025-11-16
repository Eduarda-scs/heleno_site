"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import supabase from "@/utility/supabaseClient";
import { useAuth } from "../authProvider";
import { Header } from "@/components/Header";
import logo from "@/assets/logo.png";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("HA_user")
        .select("*")
        .eq("email", form.email)
        .eq("senha", form.password)
        .single();

      if (error || !data) {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem(
        "ha_user",
        JSON.stringify({ id: data.id, nome: data.name, tipo: data.tipo })
      );

      setUser(data);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${data.name}!`,
      });

      setTimeout(() => navigate("/"), 1200);
    } catch (err: any) {
      toast({
        title: "Erro inesperado",
        description: err.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header fixo */}
      <Header />

      <section className="relative w-full min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        {/* Fundo elegante com gradiente premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

        {/* Ornamentos */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40" />

        {/* Card central */}
        <Card className="relative z-10 w-full max-w-md rounded-2xl shadow-[var(--shadow-medium)] border border-border bg-card/80 backdrop-blur-md animate-fade-up">
          <CardHeader className="text-center space-y-3">
            <img
              src={logo}
              alt="H.A Imobiliária"
              className="mx-auto w-20 h-20 object-contain drop-shadow-lg"
            />

            <CardTitle className="text-3xl font-bold text-foreground">
              Acesse sua{" "}
              <span className="text-secondary">Conta</span>
            </CardTitle>

            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Acesso somente para administradores e colaboradores autorizados.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  E-mail
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="rounded-xl pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

                  {/* Toggle mostrar senha */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão */}
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-primary)] transition-all hover:scale-[1.02]"
              >
                {loading ? "Entrando..." : "Entrar"}
                {!loading && <LogIn className="ml-2 h-5 w-5" />}
              </Button>

            
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
