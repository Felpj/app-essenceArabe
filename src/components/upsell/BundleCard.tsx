import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpsellOffer } from "@/types/upsell";
import { useCartStore } from "@/store/cart.store";
import { formatMoney } from "@/lib/money";
import { trackUpsellEvent } from "@/lib/upsellTracking";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface BundleCardProps {
  offer: UpsellOffer;
  context: "CART" | "PDP";
  cartTotal: number;
}

export const BundleCard = ({ offer, context, cartTotal }: BundleCardProps) => {
  const { addItem, items } = useCartStore();

  // Track impression
  useEffect(() => {
    trackUpsellEvent(offer.id, "IMPRESSION", context, cartTotal);
  }, [offer.id, context, cartTotal]);

  const handleAddBundle = () => {
    // Calcula economia
    const bundleProducts = offer.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);

    const totalPrice = bundleProducts.reduce(
      (sum, p) => sum + (p?.price_brl || 0),
      0
    );
    const savings = totalPrice - (offer.fixedBundlePrice || 0);

    // Adiciona todos os produtos do bundle
    bundleProducts.forEach((product) => {
      if (product) {
        addItem(product, 1);
      }
    });

    trackUpsellEvent(offer.id, "ACCEPT", context, cartTotal);
    toast({
      title: "Kit adicionado!",
      description: `Você economizou ${formatMoney(savings)} com este combo!`,
    });
  };

  const bundleProducts = offer.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const totalPrice = bundleProducts.reduce(
    (sum, p) => sum + (p?.price_brl || 0),
    0
  );
  const savings = totalPrice - (offer.fixedBundlePrice || 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      {offer.ui.badge && (
        <Badge className="mb-3 bg-primary text-primary-foreground font-body">
          {offer.ui.badge}
        </Badge>
      )}
      <h3 className="font-display text-xl font-bold text-foreground mb-2">
        {offer.title}
      </h3>
      {offer.subtitle && (
        <p className="text-sm text-muted-foreground font-body mb-4">
          {offer.subtitle}
        </p>
      )}

      {/* Products in bundle */}
      <div className="flex gap-2 mb-4">
        {bundleProducts.slice(0, 3).map((product) => (
          <div
            key={product?.id}
            className="w-16 h-16 rounded-lg overflow-hidden border border-border"
          >
            <img
              src={product?.image || ""}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {bundleProducts.length > 3 && (
          <div className="w-16 h-16 rounded-lg border border-border flex items-center justify-center bg-secondary">
            <span className="text-xs text-muted-foreground font-body">
              +{bundleProducts.length - 3}
            </span>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {totalPrice > (offer.fixedBundlePrice || 0) && (
            <p className="text-sm text-muted-foreground line-through font-body">
              {formatMoney(totalPrice)}
            </p>
          )}
          <p className="font-display text-2xl font-bold text-foreground">
            {formatMoney(offer.fixedBundlePrice || 0)}
          </p>
        </div>
        {savings > 0 && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-body">
            Economize {formatMoney(savings)}
          </Badge>
        )}
      </div>

      {offer.ui.description && (
        <p className="text-xs text-muted-foreground font-body mb-4">
          {offer.ui.description}
        </p>
      )}

      <Button
        variant="gold"
        className="w-full"
        onClick={handleAddBundle}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        {offer.ui.ctaText}
      </Button>
    </div>
  );
};
