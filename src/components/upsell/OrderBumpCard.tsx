import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { UpsellOffer } from "@/types/upsell";
import { useCartStore } from "@/store/cart.store";
import { formatMoney } from "@/lib/money";
import { trackUpsellEvent } from "@/lib/upsellTracking";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";

interface OrderBumpCardProps {
  offer: UpsellOffer;
  context: "CART" | "CHECKOUT";
  cartTotal: number;
}

export const OrderBumpCard = ({
  offer,
  context,
  cartTotal,
}: OrderBumpCardProps) => {
  const { addItem, items } = useCartStore();
  const [isChecked, setIsChecked] = useState(false);

  // Verifica se o produto já está no carrinho
  useEffect(() => {
    const productInCart = offer.productIds.some((productId) =>
      items.some((item) => item.product.id === productId)
    );
    setIsChecked(productInCart);
  }, [items, offer.productIds]);

  // Track impression
  useEffect(() => {
    trackUpsellEvent(offer.id, "IMPRESSION", context, cartTotal);
  }, [offer.id, context, cartTotal]);

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);

    if (checked) {
      // Adiciona o primeiro produto da oferta
      const productId = offer.productIds[0];
      const product = products.find((p) => p.id === productId);

      if (product) {
        // Calcula preço com desconto
        let finalPrice = product.price_brl;
        if (offer.discountType === "PERCENT" && offer.discountValue) {
          finalPrice = product.price_brl * (1 - offer.discountValue / 100);
        } else if (offer.discountType === "FIXED" && offer.discountValue) {
          finalPrice = product.price_brl - offer.discountValue;
        }

        // Adiciona ao carrinho (mock: adiciona o produto original, desconto seria aplicado no checkout)
        addItem(product, 1);
        trackUpsellEvent(offer.id, "ACCEPT", context, cartTotal);
        toast({
          title: "Item adicionado!",
          description: offer.ui.description || "Item adicionado ao seu pedido",
        });
      }
    } else {
      // Remove o produto
      const productId = offer.productIds[0];
      const product = products.find((p) => p.id === productId);
      if (product) {
        trackUpsellEvent(offer.id, "DECLINE", context, cartTotal);
      }
    }
  };

  // Calcula preço com desconto
  const product = products.find((p) => p.id === offer.productIds[0]);
  if (!product) return null;

  let originalPrice = product.price_brl;
  let discountedPrice = product.price_brl;

  if (offer.discountType === "PERCENT" && offer.discountValue) {
    discountedPrice = product.price_brl * (1 - offer.discountValue / 100);
  } else if (offer.discountType === "FIXED" && offer.discountValue) {
    discountedPrice = product.price_brl - offer.discountValue;
  }

  return (
    <div className="bg-card border-2 border-primary/30 rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        {offer.ui.image && (
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0">
            <img
              src={offer.ui.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          {offer.ui.badge && (
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded mb-2 font-body">
              {offer.ui.badge}
            </span>
          )}
          <h3 className="font-display font-semibold text-foreground mb-1">
            {offer.title}
          </h3>
          {offer.subtitle && (
            <p className="text-sm text-muted-foreground font-body mb-2">
              {offer.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 mb-2">
            {originalPrice > discountedPrice && (
              <span className="text-sm text-muted-foreground line-through font-body">
                {formatMoney(originalPrice)}
              </span>
            )}
            <span className="font-display font-bold text-primary text-lg">
              {formatMoney(discountedPrice)}
            </span>
          </div>
          {offer.ui.description && (
            <p className="text-xs text-muted-foreground font-body mb-3">
              {offer.ui.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`bump-${offer.id}`}
              checked={isChecked}
              onCheckedChange={handleToggle}
              className="w-5 h-5"
            />
            <label
              htmlFor={`bump-${offer.id}`}
              className="text-sm font-body text-foreground cursor-pointer flex items-center gap-2"
            >
              <span>{offer.ui.ctaText}</span>
              {isChecked && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
