import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Check, Truck, Shield, ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import TestimonialsSection from "@/components/TestimonialsSection";

// Product images
import productBlue from "@/assets/featured-product.jpg";
import productRose from "@/assets/product-rose.jpg";
import productAmber from "@/assets/product-amber.jpg";
import productPurple from "@/assets/product-purple.jpg";
import productOrange from "@/assets/product-orange.jpg";
import productWhite from "@/assets/product-white.jpg";

const productData: Record<string, {
  id: string;
  name: string;
  inspiration: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  fixation: string;
  projection: string;
  type: string;
  occasions: string[];
  notes: { top: string[]; middle: string[]; base: string[] };
  description: string;
  image: string;
}> = {
  "1": {
    id: "1",
    name: "Blue Intense",
    inspiration: "Sauvage Elixir",
    price: 349,
    originalPrice: 1890,
    rating: 4.9,
    reviews: 1247,
    fixation: "14h+",
    projection: "Moderada a Forte",
    type: "Amadeirado Fresco",
    occasions: ["Dia a dia", "Trabalho", "Encontros", "Festas"],
    notes: {
      top: ["Bergamota", "Toranja", "Pimenta Preta"],
      middle: ["Lavanda", "Gerânio", "Canela"],
      base: ["Baunilha", "Sândalo", "Âmbar"],
    },
    description: "O Blue Intense é nossa fragrância mais versátil. Um amadeirado fresco com abertura cítrica vibrante que evolui para um fundo quente e sensual. Perfeito para homens que querem impressionar em qualquer situação.",
    image: productBlue,
  },
  "2": {
    id: "2",
    name: "Rose Oud",
    inspiration: "Oud Wood",
    price: 389,
    originalPrice: 2100,
    rating: 4.8,
    reviews: 892,
    fixation: "16h+",
    projection: "Forte",
    type: "Oriental Amadeirado",
    occasions: ["Noite", "Eventos formais", "Inverno"],
    notes: {
      top: ["Rosa Búlgara", "Cardamomo"],
      middle: ["Oud", "Sândalo", "Vetiver"],
      base: ["Âmbar", "Almíscar", "Tonka"],
    },
    description: "Rose Oud é uma fragrância sofisticada e intensa que combina a elegância da rosa com a profundidade do oud árabe. Uma assinatura olfativa para ocasiões especiais.",
    image: productRose,
  },
  "3": {
    id: "3",
    name: "Amber Noir",
    inspiration: "Black Orchid",
    price: 369,
    originalPrice: 1950,
    rating: 4.9,
    reviews: 756,
    fixation: "14h+",
    projection: "Moderada a Forte",
    type: "Oriental Floral",
    occasions: ["Noite", "Eventos especiais", "Outono/Inverno"],
    notes: {
      top: ["Trufa", "Ylang-Ylang", "Bergamota"],
      middle: ["Orquídea Negra", "Especiarias", "Frutas"],
      base: ["Chocolate", "Âmbar", "Sândalo"],
    },
    description: "Amber Noir é uma fragrância misteriosa e sedutora. Um oriental floral que combina notas escuras e opulentas para criar uma experiência olfativa inesquecível.",
    image: productAmber,
  },
  "4": {
    id: "4",
    name: "Velvet Musk",
    inspiration: "Aventus",
    price: 399,
    originalPrice: 2300,
    rating: 4.9,
    reviews: 1089,
    fixation: "12h+",
    projection: "Moderada",
    type: "Chipre Frutado",
    occasions: ["Dia a dia", "Trabalho", "Social"],
    notes: {
      top: ["Abacaxi", "Maçã", "Groselha"],
      middle: ["Bétula", "Patchouli", "Rosa"],
      base: ["Almíscar", "Carvalho", "Baunilha"],
    },
    description: "Velvet Musk é a fragrância do sucesso. Notas frutadas vibrantes sobre uma base amadeirada sofisticada. Perfeito para o homem moderno e determinado.",
    image: productPurple,
  },
  "5": {
    id: "5",
    name: "Desert Night",
    inspiration: "Tobacco Vanille",
    price: 359,
    originalPrice: 2050,
    rating: 4.8,
    reviews: 634,
    fixation: "18h+",
    projection: "Forte",
    type: "Oriental Especiado",
    occasions: ["Noite", "Inverno", "Ocasiões especiais"],
    notes: {
      top: ["Tabaco", "Especiarias Orientais"],
      middle: ["Baunilha", "Cacau", "Tonka"],
      base: ["Madeiras secas", "Frutas secas"],
    },
    description: "Desert Night captura a essência de uma noite árabe. Notas ricas de tabaco e baunilha criam uma fragrância viciante e ultra sofisticada.",
    image: productOrange,
  },
  "6": {
    id: "6",
    name: "Crystal White",
    inspiration: "Silver Mountain Water",
    price: 329,
    originalPrice: 1750,
    rating: 4.7,
    reviews: 445,
    fixation: "10h+",
    projection: "Moderada",
    type: "Fresco Aquático",
    occasions: ["Dia a dia", "Verão", "Esportes"],
    notes: {
      top: ["Bergamota", "Mandarina", "Chá Verde"],
      middle: ["Galbanum", "Violeta", "Groselha"],
      base: ["Almíscar", "Sândalo", "Petit Grain"],
    },
    description: "Crystal White é frescor puro. Notas aquáticas e cítricas evocam ar fresco de montanha. Perfeito para dias quentes e momentos de energia.",
    image: productWhite,
  },
};

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = productData[id as string] || productData["1"];
  const savings = product.originalPrice - product.price;
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para coleção
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
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-body font-semibold z-20">
                    -{discount}% OFF
                  </div>
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
              <p className="text-muted-foreground font-body text-lg mb-6">
                Inspirado em {product.inspiration}
              </p>

              {/* Description */}
              <p className="text-foreground/80 font-body leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-sm font-body">
                  {product.type}
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-body">
                  Fixação {product.fixation}
                </span>
                <span className="bg-card text-foreground px-3 py-1.5 rounded-lg text-sm font-body border border-border">
                  Projeção {product.projection}
                </span>
              </div>

              {/* Price Comparison */}
              <div className="bg-card rounded-2xl p-6 border border-border mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <span className="text-muted-foreground text-sm font-body block mb-1">
                      Inspiração Original
                    </span>
                    <span className="text-muted-foreground line-through text-xl font-body">
                      R$ {product.originalPrice.toLocaleString("pt-BR")},00
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-primary text-sm font-body block font-semibold mb-1">
                      Nosso Preço
                    </span>
                    <span className="text-foreground font-display text-4xl font-bold">
                      R$ {product.price},00
                    </span>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg px-4 py-3 text-center">
                  <span className="text-primary font-body font-semibold">
                    Economia de R$ {savings.toLocaleString("pt-BR")},00 ({discount}% OFF)
                  </span>
                </div>
              </div>

              {/* Occasions */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Ocasiões de Uso
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occasion) => (
                    <span
                      key={occasion}
                      className="flex items-center gap-2 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg text-sm font-body"
                    >
                      <Check className="w-4 h-4 text-primary" />
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  Pirâmide Olfativa
                </h3>
                <div className="space-y-3">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <span className="text-primary text-sm font-body font-semibold block mb-1">
                      Notas de Topo
                    </span>
                    <span className="text-foreground font-body">
                      {product.notes.top.join(", ")}
                    </span>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <span className="text-muted-foreground text-sm font-body font-semibold block mb-1">
                      Notas de Coração
                    </span>
                    <span className="text-foreground font-body">
                      {product.notes.middle.join(", ")}
                    </span>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <span className="text-gold-dark text-sm font-body font-semibold block mb-1">
                      Notas de Fundo
                    </span>
                    <span className="text-foreground font-body">
                      {product.notes.base.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-4 bg-card rounded-lg border border-border p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-foreground font-body text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <Button variant="gold" size="xl" className="flex-1 group">
                  <ShoppingBag className="w-5 h-5" />
                  Comprar Agora - R$ {(product.price * quantity).toLocaleString("pt-BR")},00
                </Button>
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
