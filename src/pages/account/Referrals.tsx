import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Users, Gift, Share2, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "@/hooks/use-toast";

const Referrals = () => {
  const { profile } = useAuthStore();
  const referralLink = `https://essencearabe.com/ref/${profile?.id || "guest"}`;
  const referralCode = profile?.id ? `REF-${profile.id.slice(-6).toUpperCase()}` : "REF-GUEST";

  // Mock stats
  const stats = {
    clicks: 42,
    signups: 8,
    orders: 3,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado!",
      description: "O link de indicação foi copiado para a área de transferência.",
    });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Código copiado!",
      description: "O código de indicação foi copiado.",
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
            Indique e Ganhe
          </h1>

          {/* Referral Link Card */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                <Share2 className="w-6 h-6 text-primary" />
                Seu Link de Indicação
              </CardTitle>
              <CardDescription className="font-body">
                Compartilhe este link e ganhe benefícios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-secondary border-border font-mono text-sm"
                />
                <Button variant="gold" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  value={referralCode}
                  readOnly
                  className="bg-secondary border-border font-mono text-sm"
                />
                <Button variant="outline" onClick={handleCopyCode}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar código
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Cliques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  {stats.clicks}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Cadastros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  {stats.signups}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  {stats.orders}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-xl font-semibold text-foreground">
                Como Funciona
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground mb-1">
                      Você ganha R$ 10 de desconto
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Para cada amigo que fizer o primeiro pedido usando seu link
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground mb-1">
                      Seu amigo ganha frete grátis
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      No primeiro pedido usando seu código de indicação
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground mb-1">
                      Sem limite de indicações
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Indique quantos amigos quiser e acumule descontos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Referrals;
