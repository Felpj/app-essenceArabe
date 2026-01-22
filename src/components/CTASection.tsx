import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Pronto para experimentar o{" "}
            <span className="text-gradient-gold">luxo acessível</span>?
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-8">
            Descubra fragrâncias que impressionam sem comprometer seu orçamento.
            Satisfação garantida ou seu dinheiro de volta.
          </p>

          <Link to="/produtos">
            <Button variant="hero" className="group mb-12">
              Explorar Coleção Completa
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Compra Segura",
                description: "Pagamento 100% protegido",
              },
              {
                icon: Truck,
                title: "Envio Express",
                description: "Pedidos até 12h no mesmo dia",
              },
              {
                icon: RotateCcw,
                title: "Garantia",
                description: "30 dias para troca",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex flex-col items-center gap-2 p-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {badge.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
