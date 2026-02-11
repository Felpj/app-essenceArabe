import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { formatMoney, calculateInstallment } from "@/lib/money";
import { Input } from "@/components/ui/input";
import { validateCoupon } from "@/data/mockCoupons";
import { toast } from "@/hooks/use-toast";
import { X, Check } from "lucide-react";

interface CartSummaryProps {
  onCheckout?: () => void;
}

export const CartSummary = ({ onCheckout }: CartSummaryProps) => {
  const {
    items,
    coupon,
    getSubtotal,
    getDiscountTotal,
    getTotalPrice,
    applyCoupon,
    removeCoupon,
  } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountTotal();
  const shipping = 0; // Placeholder: calcular no checkout
  const total = getTotalPrice() + shipping;
  const installment = calculateInstallment(total);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setIsApplying(true);
    const result = validateCoupon(couponCode, subtotal);

    if (result.valid && result.coupon) {
      applyCoupon({
        code: result.coupon.code,
        discountType: result.coupon.discountType,
        value: result.coupon.value,
      });
      toast({
        title: "Cupom aplicado!",
        description: result.coupon.description || "Desconto aplicado com sucesso.",
      });
      setCouponCode("");
    } else {
      toast({
        title: "Cupom inválido",
        description: result.error || "Verifique o código e tente novamente.",
        variant: "destructive",
      });
    }
    setIsApplying(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Cupom removido",
      description: "O cupom foi removido do seu pedido.",
    });
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      window.location.href = "/checkout";
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Resumo do Pedido
      </h2>

      {/* Subtotal */}
      <div className="space-y-3">
        <div className="flex justify-between text-foreground font-body">
          <span>Subtotal</span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>

        {/* Discount */}
        {coupon && discount > 0 && (
          <div className="flex justify-between items-center text-primary font-body">
            <div className="flex items-center gap-2">
              <span>Desconto ({coupon.code})</span>
              <button
                onClick={handleRemoveCoupon}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remover cupom"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <span className="font-semibold">-{formatMoney(discount)}</span>
          </div>
        )}

        {/* Shipping Placeholder */}
        <div className="flex justify-between text-muted-foreground font-body text-sm">
          <span>Frete</span>
          <span>Calcular no checkout</span>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-foreground font-body font-semibold">
            Total estimado
          </span>
          <div className="text-right">
            <p className="text-foreground font-display text-2xl font-bold">
              {formatMoney(total)}
            </p>
            <p className="text-muted-foreground text-xs font-body">
              ou 12x de {formatMoney(installment)}
            </p>
          </div>
        </div>
      </div>

      {/* Cupom */}
      <div className="space-y-2">
        <label className="text-sm font-body text-foreground">
          Cupom de desconto
        </label>
        {coupon ? (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-semibold text-foreground">
                {coupon.code}
              </p>
              <p className="text-xs text-muted-foreground font-body">
                {coupon.discountType === "PERCENT"
                  ? `${coupon.value}% de desconto`
                  : `${formatMoney(coupon.value)} de desconto`}
              </p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remover cupom"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Código do cupom"
              className="bg-secondary border-border"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApplyCoupon();
                }
              }}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyCoupon}
              disabled={isApplying || !couponCode.trim()}
            >
              {isApplying ? "Aplicando..." : "Aplicar"}
            </Button>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <Button
        variant="gold"
        size="lg"
        className="w-full"
        onClick={handleCheckout}
      >
        Finalizar Compra
      </Button>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">✓</span>
          </div>
          <span className="text-xs text-muted-foreground font-body">
            Compra segura
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-xs font-bold">✓</span>
          </div>
          <span className="text-xs text-muted-foreground font-body">
            Envio rápido
          </span>
        </div>
      </div>
    </div>
  );
};
