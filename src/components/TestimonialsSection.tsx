import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Lucas M.",
    location: "São Paulo, SP",
    rating: 5,
    text: "Impressionante! A fixação é absurda, passo mais de 12 horas e ainda recebo elogios. Melhor custo-benefício que já encontrei.",
    product: "Blue Intense",
  },
  {
    name: "Carolina S.",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Já comprei 3 fragrâncias diferentes e todas são incríveis. A qualidade é de perfume de grife, mas por uma fração do preço.",
    product: "Rose Oud",
  },
  {
    name: "Pedro H.",
    location: "Curitiba, PR",
    rating: 5,
    text: "Cético no início, mas me surpreendi. O envio foi super rápido e o perfume é exatamente como descrito. Virei cliente fiel.",
    product: "Amber Noir",
  },
  {
    name: "Juliana R.",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Meu marido não para de receber elogios desde que começou a usar. A projeção é incrível e dura o dia todo!",
    product: "Blue Intense",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-body text-sm uppercase tracking-widest mb-4 block">
            Prova Social
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes <span className="text-gradient-gold">dizem</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Mais de 2.800 avaliações 5 estrelas de clientes satisfeitos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-2xl p-6 border border-border relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground font-body text-sm leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-display font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-xs font-body">
                  {testimonial.location}
                </p>
                <p className="text-primary text-xs font-body mt-1">
                  Comprou: {testimonial.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "2.847", label: "Avaliações" },
            { value: "4.9/5", label: "Nota Média" },
            { value: "98%", label: "Satisfação" },
            { value: "15k+", label: "Clientes" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
                {stat.value}
              </p>
              <p className="text-muted-foreground font-body text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
