import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/button";
import featuredProductImage from "@/assets/featured-product.jpg";

const FeaturedProduct = () => {
  const features = [
    "Inspirado em Sauvage Elixir",
    "Fixação de até 14 horas",
    "Projeção moderada a forte",
    "Ideal para todas as ocasiões",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            Destaque da Coleção
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Perfume Carro-Chefe
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px]" />
              <div className="relative z-10 w-full h-full rounded-3xl border border-border overflow-hidden">
                <img 
                  src={featuredProductImage} 
                  alt="Blue Intense - Perfume Destaque" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-body font-semibold z-20">
                Mais Vendido
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center gap-1 justify-center lg:justify-start mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-primary text-primary" />
              ))}
              <span className="text-muted-foreground text-sm font-body ml-2">
                (1.247 avaliações)
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              BLUE INTENSE
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              O perfume mais versátil da nossa coleção. Amadeirado fresco com notas 
              de bergamota, lavanda e baunilha. Perfeito para qualquer ocasião.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground font-body">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price Comparison */}
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-muted-foreground text-sm font-body block">
                    Inspiração Original
                  </span>
                  <span className="text-muted-foreground line-through text-lg font-body">
                    R$ 1.890,00
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-primary text-sm font-body block font-semibold">
                    Nosso Preço
                  </span>
                  <span className="text-foreground font-display text-3xl font-bold">
                    R$ 349,00
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg px-4 py-2 text-center">
                <span className="text-primary font-body font-semibold">
                  Economia de R$ 1.541,00 (82% OFF)
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/produto/1">
                <Button variant="gold" size="xl" className="group w-full sm:w-auto">
                  Comprar Agora
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/produto/1">
                <Button variant="goldOutline" size="xl" className="w-full sm:w-auto">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
