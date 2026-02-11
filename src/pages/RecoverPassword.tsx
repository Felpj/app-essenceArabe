import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isValidEmail, isValidPhone, formatPhone } from "@/lib/validators";
import { toast } from "@/hooks/use-toast";

const RecoverPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isEmail = isValidEmail(identifier);
    const isPhone = isValidPhone(identifier.replace(/\D/g, ""));

    if (!isEmail && !isPhone) {
      toast({
        title: "Credencial inválida",
        description: "Use um email ou WhatsApp válido.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock: simular envio
    setTimeout(() => {
      setIsSent(true);
      setIsLoading(false);
      toast({
        title: "Instruções enviadas!",
        description: "Verifique seu email ou WhatsApp.",
      });
    }, 1000);
  };

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.replace(/\D/g, "").length > 0 && !value.includes("@")) {
      setIdentifier(formatPhone(value));
    } else {
      setIdentifier(value);
    }
  };

  if (isSent) {
    return (
      <AuthLayout title="Instruções enviadas" subtitle="">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-2xl">✓</span>
          </div>
          <p className="text-foreground font-body">
            Enviamos as instruções para recuperação de senha para{" "}
            <strong>{identifier}</strong>
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Verifique sua caixa de entrada ou WhatsApp.
          </p>
          <Button variant="gold" size="lg" className="w-full" asChild>
            <Link to="/entrar">Voltar para login</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Digite seu email ou WhatsApp para receber as instruções"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="identifier" className="text-foreground font-body">
            WhatsApp ou Email *
          </Label>
          <Input
            id="identifier"
            type="text"
            value={identifier}
            onChange={handleIdentifierChange}
            className="mt-2 bg-secondary border-border"
            placeholder="seu@email.com ou (11) 99999-9999"
            required
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar instruções"}
        </Button>

        <div className="text-center">
          <Link
            to="/entrar"
            className="text-sm text-primary hover:underline font-body"
          >
            Voltar para login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RecoverPassword;
