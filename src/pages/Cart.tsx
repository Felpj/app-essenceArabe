import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartItemRow } from "@/components/commerce/CartItemRow";
import { CartSummary } from "@/components/commerce/CartSummary";
import { CartEmptyState } from "@/components/commerce/CartEmptyState";
import { FreeShippingProgress } from "@/components/upsell/FreeShippingProgress";
import { OrderBumpCard } from "@/components/upsell/OrderBumpCard";
import { BundleCard } from "@/components/upsell/BundleCard";
import { UpsellShelf } from "@/components/upsell/UpsellShelf";
import { useCartStore } from "@/store/cart.store";
import { getEligibleOffers } from "@/data/upsellOffers";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, getSubtotal } = useCartStore();
  const cartTotal = getSubtotal();
  const cartProductIds = items.map((item) => item.product.id);

  // Busca ofertas elegíveis
  const orderBumps = getEligibleOffers("CART", cartTotal, cartProductIds).filter(
    (o) => o.type === "ORDER_BUMP"
  );
  const bundles = getEligibleOffers("CART", cartTotal, cartProductIds).filter(
    (o) => o.type === "BUNDLE"
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuar comprando
            </Link>

            <CartEmptyState />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Carrinho de Compras
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Free Shipping Progress */}
                  <FreeShippingProgress cartTotal={cartTotal} />

                  {/* Cart Items */}
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CartItemRow item={item} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Order Bumps */}
                  {orderBumps.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Adicione ao seu pedido
                      </h2>
                      {orderBumps.map((offer) => (
                        <OrderBumpCard
                          key={offer.id}
                          offer={offer}
                          context="CART"
                          cartTotal={cartTotal}
                        />
                      ))}
                    </div>
                  )}

                  {/* Bundles */}
                  {bundles.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="font-display text-xl font-semibold text-foreground">
                        Kits Especiais
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {bundles.map((offer) => (
                          <BundleCard
                            key={offer.id}
                            offer={offer}
                            context="CART"
                            cartTotal={cartTotal}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upsell Shelf */}
                  <UpsellShelf context="CART" />
                </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
