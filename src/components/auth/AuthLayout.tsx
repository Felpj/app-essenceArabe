import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="font-display text-2xl font-bold text-gradient-gold">
            ESSENCE
          </span>
          <span className="font-display text-2xl font-light text-foreground">
            Arabe
          </span>
        </Link>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-8 shadow-gold"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2 text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground font-body text-center mb-8">
              {subtitle}
            </p>
          )}

          {/* Prova social */}
          <div className="bg-primary/10 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-foreground font-body">
              <strong className="text-primary">+2.500</strong> pedidos entregues
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              Junte-se a milhares de clientes satisfeitos
            </p>
          </div>

          {children}
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground font-body mt-6">
          Ao continuar, você concorda com nossos{" "}
          <Link to="#" className="text-primary hover:underline">
            termos de uso
          </Link>{" "}
          e{" "}
          <Link to="#" className="text-primary hover:underline">
            política de privacidade
          </Link>
        </p>
      </div>
    </div>
  );
};
