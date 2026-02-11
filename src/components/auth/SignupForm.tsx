import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store/auth.store";
import { isValidEmail, isValidPhone, formatPhone } from "@/lib/validators";
import { toast } from "@/hooks/use-toast";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    whatsapp: z.string().refine(isValidPhone, "WhatsApp inválido"),
    email: z.string().optional(),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    receiveWhatsAppUpdates: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      receiveWhatsAppUpdates: true,
    },
  });

  const receiveUpdates = watch("receiveWhatsAppUpdates");

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("whatsapp", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);

    // Mock signup
    setTimeout(() => {
      const profile = {
        id: `customer-${Date.now()}`,
        fullName: data.fullName,
        email: data.email || undefined,
        whatsapp: formatPhone(data.whatsapp.replace(/\D/g, "")),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      login(profile);

      toast({
        title: "Conta criada!",
        description: "Bem-vindo à Essence Árabe!",
      });

      navigate("/conta");
      setIsLoading(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="fullName" className="text-foreground font-body">
          Nome completo *
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="mt-2 bg-secondary border-border"
          placeholder="Seu nome completo"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="whatsapp" className="text-foreground font-body">
          WhatsApp *
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          {...register("whatsapp")}
          onChange={handleWhatsAppChange}
          className="mt-2 bg-secondary border-border"
          placeholder="(11) 99999-9999"
          maxLength={15}
        />
        {errors.whatsapp && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground font-body">
          Email (opcional)
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2 bg-secondary border-border"
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.email.message}
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
          placeholder="Mínimo 8 caracteres"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-foreground font-body">
          Confirmar senha *
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="mt-2 bg-secondary border-border"
          placeholder="Digite a senha novamente"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-destructive font-body">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="whatsapp-updates"
          checked={receiveUpdates}
          onCheckedChange={(checked) =>
            setValue("receiveWhatsAppUpdates", checked === true)
          }
        />
        <Label
          htmlFor="whatsapp-updates"
          className="text-sm text-foreground font-body cursor-pointer"
        >
          Receber novidades no WhatsApp
        </Label>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground font-body">
          Já tem uma conta?{" "}
          <Link to="/entrar" className="text-primary hover:underline font-body">
            Entrar
          </Link>
        </p>
      </div>
    </form>
  );
};
