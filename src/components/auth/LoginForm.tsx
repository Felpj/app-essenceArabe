import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { isValidEmail, isValidPhone, formatPhone } from "@/lib/validators";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  identifier: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Mock login - no MVP, qualquer credencial funciona
    setTimeout(() => {
      const isEmail = isValidEmail(data.identifier);
      const isPhone = isValidPhone(data.identifier.replace(/\D/g, ""));

      if (!isEmail && !isPhone) {
        toast({
          title: "Credencial inválida",
          description: "Use um email ou WhatsApp válido.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Criar perfil mock
      const profile = {
        id: `customer-${Date.now()}`,
        fullName: "Cliente",
        email: isEmail ? data.identifier : undefined,
        whatsapp: isPhone
          ? formatPhone(data.identifier.replace(/\D/g, ""))
          : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      login(profile);

      toast({
        title: "Login realizado!",
        description: "No MVP, o acesso é simplificado.",
      });

      const next = searchParams.get("next") || "/conta";
      navigate(next);
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Info message */}
      <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
        <p className="text-xs text-foreground font-body">
          <strong>MVP:</strong> No MVP, o acesso é simplificado. Use qualquer
          email ou WhatsApp válido.
        </p>
      </div>

      <div>
        <Label htmlFor="identifier" className="text-foreground font-body">
          WhatsApp ou Email *
        </Label>
        <Input
          id="identifier"
          type="text"
          {...register("identifier")}
          className="mt-2 bg-secondary border-border"
          placeholder="seu@email.com ou (11) 99999-9999"
        />
        {errors.identifier && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.identifier.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="text-foreground font-body">
          Senha *
        </Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="mt-2 bg-secondary border-border"
          placeholder="Sua senha"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/recuperar-senha"
          className="text-sm text-primary hover:underline font-body"
        >
          Esqueci minha senha
        </Link>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-body">
          Não tem uma conta?{" "}
          <Link to="/criar-conta" className="text-primary hover:underline font-body">
            Criar conta
          </Link>
        </p>
      </div>
    </form>
  );
};
