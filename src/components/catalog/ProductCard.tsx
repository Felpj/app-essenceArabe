import { motion } from "framer-motion";
import { Star, Eye, MessageCircle, Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

const ProductCard = ({ product, onQuickView, index = 0 }: ProductCardProps) => {
  const isOutOfStock = product.availability === "out_of_stock";
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const installment = Math.ceil(product.price_brl / 12);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Olá! Tenho interesse no perfume ${product.name} (${product.brand}) - R$ ${product.price_brl}`;
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div 
        className={cn(
          "bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300",
          "hover:border-primary/50 hover:shadow-gold cursor-pointer",
          isOutOfStock && "opacity-75"
        )}
        onClick={() => onQuickView(product)}
      >
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-dark overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              !isOutOfStock && "group-hover:scale-105"
            )}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_best_seller && (
              <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs font-body font-semibold">
                Mais Vendido
              </span>
            )}
            {product.is_new && (
              <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-xs font-body font-semibold">
                Novo
              </span>
            )}
            {isLowStock && (
              <span className="bg-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-body font-semibold">
                Estoque baixo
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-destructive text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-body font-semibold">
                Esgotado
              </span>
            )}
          </div>

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="gold"
              size="sm"
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
            >
              <Eye className="w-4 h-4" />
              Quick View
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                )}
              />
            ))}
            <span className="text-muted-foreground text-xs font-body ml-1">
              ({product.reviews_count})
            </span>
          </div>

          {/* Brand & Name */}
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          {/* Size */}
          <p className="text-xs text-muted-foreground font-body mb-2">
            {product.size_ml}ml
          </p>

          {/* Inspired By Chip */}
          {product.inspired_by && (
            <div className="mb-3">
              <span className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs font-body">
                Inspirado em {product.inspired_by}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-3">
            <span className="text-foreground font-display text-xl font-bold">
              R$ {product.price_brl}
            </span>
            <p className="text-xs text-muted-foreground font-body">
              ou 12x de R$ {installment}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {isOutOfStock ? (
              <Button
                variant="goldOutline"
                size="sm"
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Could open a modal for "notify me"
                }}
              >
                <Bell className="w-4 h-4" />
                Avise-me
              </Button>
            ) : (
              <>
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full gap-2"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-4 h-4" />
                  Comprar no WhatsApp
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                  >
                    Ver detalhes
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
