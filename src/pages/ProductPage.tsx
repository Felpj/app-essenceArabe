import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Check, Truck, Shield, ArrowLeft, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import TestimonialsSection from "@/components/TestimonialsSection";
import { UpsellShelf } from "@/components/upsell/UpsellShelf";
import { getProductBySlug, getProductById, products } from "@/data/products";
import { formatMoney, calculateInstallment } from "@/lib/money";


const ProductPage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Try to find product by slug first, then by id
  const product = slug
    ? getProductBySlug(slug)
    : id
    ? getProductById(id)
    : products[0];

  if (!product) {
    navigate("/catalogo");
    return null;
  }

  const isOutOfStock = product.availability === "out_of_stock";
  const installment = calculateInstallment(product.price_brl);

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
            Voltar para catálogo
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="relative aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px]" />
                  <div className="relative z-10 w-full h-full rounded-3xl border border-border overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.is_best_seller && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-body font-semibold z-20">
                      Mais Vendido
                    </div>
                  )}
                  {product.is_new && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-body font-semibold z-20">
                      Novo
                    </div>
                  )}
                  {isOutOfStock && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg text-sm font-body font-semibold z-20">
                      Esgotado
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm font-body">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground font-body text-sm uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              {product.inspired_by && (
                <p className="text-muted-foreground font-body text-lg mb-6">
                  Inspirado em {product.inspired_by}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-sm font-body">
                  {product.audience}
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-body">
                  {product.size_ml}ml
                </span>
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-card text-foreground px-3 py-1.5 rounded-lg text-sm font-body border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="bg-card rounded-2xl p-6 border border-border mb-8">
                <div className="text-center mb-4">
                  <span className="text-primary text-sm font-body block font-semibold mb-1">
                    Preço
                  </span>
                  <span className="text-foreground font-display text-4xl font-bold">
                    {formatMoney(product.price_brl)}
                  </span>
                  <p className="text-muted-foreground text-sm font-body mt-2">
                    ou 12x de {formatMoney(installment)}
                  </p>
                </div>
              </div>


              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-4 bg-card rounded-lg border border-border p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-foreground font-body text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors disabled:opacity-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1">
                  <AddToCartButton
                    product={product}
                    quantity={quantity}
                    variant="gold"
                    size="xl"
                    className="w-full"
                    disabled={isOutOfStock}
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                  <Truck className="w-6 h-6 text-primary" />
                  <div>
                    <span className="text-foreground font-body text-sm font-semibold block">
                      Envio Rápido
                    </span>
                    <span className="text-muted-foreground text-xs font-body">
                      Até 12h = mesmo dia
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <span className="text-foreground font-body text-sm font-semibold block">
                      Garantia
                    </span>
                    <span className="text-muted-foreground text-xs font-body">
                      30 dias para troca
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <TestimonialsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
