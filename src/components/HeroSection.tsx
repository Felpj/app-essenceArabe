import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Truck } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-perfume.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6"
            >
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-body font-medium">
                Envio em até 24h para compras antes das 12h
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Perfumes Árabes de{" "}
              <span className="text-gradient-gold">Alta Fixação</span>{" "}
              com Cheiro de Luxo
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Inspirados em fragrâncias de nicho de até R$2.000 por uma{" "}
              <span className="text-primary font-semibold">fração do preço</span>.
              Intensidade e elegância que duram o dia todo.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/produtos">
                <Button variant="hero" className="group w-full sm:w-auto">
                  Ver Coleção
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/produto/1">
                <Button variant="heroOutline" className="w-full sm:w-auto">
                  Perfume Destaque
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-body">+12h de fixação</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-body">⭐ 4.9/5 (2.847 avaliações)</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Glow behind bottle */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
              
              {/* Bottle image */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
                <img 
                  src={heroImage} 
                  alt="Perfume árabe de luxo" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-card border border-primary/30 rounded-xl px-4 py-2 shadow-gold"
              >
                <span className="text-primary font-display font-bold text-lg">-82%</span>
                <span className="text-muted-foreground text-xs block">vs original</span>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-2"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-primary text-sm">★</span>
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">Avaliação média</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
