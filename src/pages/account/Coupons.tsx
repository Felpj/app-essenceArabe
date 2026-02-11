import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Ticket, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { mockCoupons } from "@/data/mockCoupons";

const Coupons = () => {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado!",
      description: `Cupom ${code} copiado para a área de transferência.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para conta
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Meus Cupons
          </h1>

          {/* Info */}
          <div className="bg-primary/10 rounded-lg border border-primary/20 p-4 mb-8">
            <p className="text-sm text-foreground font-body">
              <strong>Aplicação do cupom:</strong> Os cupons devem ser aplicados
              no carrinho ou durante o checkout.
            </p>
          </div>

          {/* Coupons Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {mockCoupons.map((coupon) => (
              <Card
                key={coupon.code}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-display text-xl font-bold text-foreground mb-2">
                        {coupon.code}
                      </CardTitle>
                      <CardDescription className="font-body">
                        {coupon.description}
                      </CardDescription>
                    </div>
                    <Ticket className="w-8 h-8 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="text-sm text-foreground font-body">
                        Desconto
                      </span>
                      <span className="font-display text-xl font-bold text-primary">
                        {coupon.discountType === "PERCENT"
                          ? `${coupon.value}%`
                          : `R$ ${coupon.value.toFixed(2).replace(".", ",")}`}
                      </span>
                    </div>
                    {coupon.minPurchase && (
                      <p className="text-xs text-muted-foreground font-body">
                        Compra mínima: R${" "}
                        {coupon.minPurchase.toLocaleString("pt-BR")}
                      </p>
                    )}
                    <Button
                      variant="gold"
                      className="w-full"
                      onClick={() => handleCopy(coupon.code)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar código
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How to use */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Como usar
            </h2>
            <ol className="space-y-2 text-sm text-foreground font-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Copie o código do cupom</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Adicione produtos ao carrinho</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>No carrinho ou checkout, cole o código e clique em "Aplicar"</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coupons;
