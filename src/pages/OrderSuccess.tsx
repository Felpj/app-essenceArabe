import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PostPurchaseOfferModal } from "@/components/upsell/PostPurchaseOfferModal";
import { getEligibleOffers } from "@/data/upsellOffers";
import { useCartStore } from "@/store/cart.store";

/**
 * Gera orderCode no formato EA-YYYYMMDD-XXXX
 */
function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `EA-${year}${month}${day}-${random}`;
}

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { getSubtotal } = useCartStore();
  const orderCode = orderId || generateOrderCode();
  const [showPostPurchaseOffer, setShowPostPurchaseOffer] = useState(false);

  // Busca oferta pós-compra
  const postPurchaseOffers = getEligibleOffers("THANK_YOU", getSubtotal(), []).filter(
    (o) => o.type === "POST_PURCHASE"
  );
  const postPurchaseOffer = postPurchaseOffers[0] || null;

  // Mostra modal após 2 segundos
  useEffect(() => {
    if (postPurchaseOffer) {
      const timer = setTimeout(() => {
        setShowPostPurchaseOffer(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [postPurchaseOffer]);

  const whatsappMessage = `Oi! Meu pedido ${orderCode} foi confirmado. Pode me atualizar o status?`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pedido Confirmado!
            </h1>

            {/* Order ID */}
            <p className="text-muted-foreground font-body mb-2">
              Seu pedido foi recebido com sucesso
            </p>
            <p className="text-primary font-body font-semibold text-lg mb-8">
              Número do pedido: {orderCode}
            </p>

            {/* Info Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Package className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      O que acontece agora?
                    </h3>
                    <p className="text-muted-foreground font-body text-sm">
                      Você receberá um email de confirmação com os detalhes do
                      seu pedido. Enviaremos em até 24h após a confirmação do
                      pagamento.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Próximos passos:
                  </h3>
                  <ul className="space-y-2 text-muted-foreground font-body text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        Aguarde a confirmação do pagamento (PIX: imediato |
                        Cartão: até 2 dias úteis)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        Você receberá o código de rastreamento por email e
                        WhatsApp
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>
                        Acompanhe seu pedido através do número {orderCode}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" onClick={handleWhatsAppClick}>
                <MessageCircle className="w-5 h-5" />
                Acompanhar pelo WhatsApp
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/catalogo">
                  <ShoppingBag className="w-5 h-5" />
                  Continuar Comprando
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/">
                  <Home className="w-5 h-5" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Post Purchase Offer Modal */}
      {postPurchaseOffer && (
        <PostPurchaseOfferModal
          offer={postPurchaseOffer}
          orderCode={orderCode}
          isOpen={showPostPurchaseOffer}
          onClose={() => setShowPostPurchaseOffer(false)}
        />
      )}
    </div>
  );
};

export default OrderSuccess;
