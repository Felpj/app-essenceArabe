import { Progress } from "@/components/ui/progress";
import { Truck } from "lucide-react";
import { upsellConfig } from "@/data/upsellOffers";
import { formatMoney } from "@/lib/money";

interface FreeShippingProgressProps {
  cartTotal: number;
}

export const FreeShippingProgress = ({
  cartTotal,
}: FreeShippingProgressProps) => {
  const threshold = upsellConfig.freeShippingThreshold;
  const remaining = Math.max(0, threshold - cartTotal);
  const progress = Math.min(100, (cartTotal / threshold) * 100);
  const hasFreeShipping = cartTotal >= threshold;

  if (hasFreeShipping) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-400 font-body">
          <Truck className="w-5 h-5" />
          <span className="font-semibold">Parabéns! Você ganhou frete grátis!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          <span className="text-sm font-body text-foreground">
            Faltam <strong className="text-primary">{formatMoney(remaining)}</strong> para frete grátis
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-body">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground font-body mt-2">
        Adicione mais produtos e ganhe frete grátis em compras acima de {formatMoney(threshold)}
      </p>
    </div>
  );
};
