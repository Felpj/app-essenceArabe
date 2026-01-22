import { motion } from "framer-motion";
import { Clock, Sparkles, Wallet, Truck } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Alta Fixação",
    description: "Mais de 12 horas de duração na pele. Fragrâncias que acompanham você o dia todo.",
  },
  {
    icon: Sparkles,
    title: "Intensidade Marcante",
    description: "Perfumes concentrados com projeção impressionante. Receba elogios por onde passar.",
  },
  {
    icon: Wallet,
    title: "Custo-Benefício",
    description: "Fragrâncias premium por uma fração do preço. Luxo acessível para todos.",
  },
  {
    icon: Truck,
    title: "Envio Rápido",
    description: "Compras realizadas até 12h são enviadas no mesmo dia. Entrega expressa.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que escolher nossos <span className="text-gradient-gold">perfumes</span>?
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Qualidade excepcional que você sente desde a primeira borrifada
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-background rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
