import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: "default" | "gold" | "outline";
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
}

export const AddToCartButton = ({
  product,
  quantity = 1,
  variant = "gold",
  size = "default",
  className,
  disabled = false,
}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const isOutOfStock = product.availability === "out_of_stock";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isOutOfStock || disabled) return;

    addItem(product, quantity);
    
    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isOutOfStock || disabled}
    >
      <ShoppingBag className="w-4 h-4" />
      {isOutOfStock ? "Esgotado" : "Adicionar ao carrinho"}
    </Button>
  );
};
