import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/store/cart.store";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow = ({ item }: CartItemRowProps) => {
  const { increment, decrement, removeItem } = useCartStore();
  const { product, quantity } = item;
  const subtotal = product.price_brl * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      decrement(product.id);
    } else {
      removeItem(product.id);
    }
  };

  const handleIncrease = () => {
    increment(product.id);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground font-body">
              {product.brand} • {product.size_ml}ml
            </p>
            {product.inspired_by && (
              <p className="text-xs text-muted-foreground font-body mt-1">
                Inspirado em {product.inspired_by}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-secondary rounded-lg border border-border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-background"
              onClick={handleDecrease}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-foreground font-body font-semibold w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-background"
              onClick={handleIncrease}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-muted-foreground text-xs font-body line-through">
              {formatMoney(product.price_brl)}
            </p>
            <p className="text-foreground font-display text-lg font-bold">
              {formatMoney(subtotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
