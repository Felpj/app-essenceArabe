import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartEmptyStateProps {
  onContinueShopping?: () => void;
}

export const CartEmptyState = ({ onContinueShopping }: CartEmptyStateProps) => {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card border border-border flex items-center justify-center">
        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-4">
        Seu carrinho está vazio
      </h1>
      <p className="text-muted-foreground font-body mb-8">
        Que tal adicionar alguns perfumes incríveis ao seu carrinho?
      </p>
      {onContinueShopping ? (
        <Button variant="gold" size="lg" onClick={onContinueShopping}>
          Ver Catálogo
        </Button>
      ) : (
        <Button variant="gold" size="lg" asChild>
          <Link to="/catalogo">Ver Catálogo</Link>
        </Button>
      )}
    </div>
  );
};
