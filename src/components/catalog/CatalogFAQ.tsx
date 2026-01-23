import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona a fixação dos perfumes árabes?",
    answer: "Nossos perfumes árabes são conhecidos pela alta concentração de óleos essenciais, resultando em fixações que variam de 8h a 18h+ dependendo da fragrância. Cada produto tem a fixação estimada indicada na descrição."
  },
  {
    question: "O que significa 'inspirado em'?",
    answer: "Significa que a fragrância foi desenvolvida com notas olfativas semelhantes a perfumes de nicho famosos, oferecendo uma experiência similar por uma fração do preço. São perfumes originais de marcas árabes renomadas."
  },
  {
    question: "Qual a política de trocas?",
    answer: "Aceitamos trocas em até 7 dias após o recebimento, desde que o produto esteja lacrado. Em caso de defeito, a troca é garantida em até 30 dias."
  },
  {
    question: "Como funciona o envio?",
    answer: "Pedidos realizados até 12h são despachados no mesmo dia (dias úteis). Após 12h, o envio é feito no próximo dia útil pela manhã. Trabalhamos com transportadoras de confiança e rastreio completo."
  }
];

const CatalogFAQ = () => {
  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Dúvidas Frequentes
          </h2>
          <p className="text-muted-foreground font-body">
            Tudo o que você precisa saber
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-display text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogFAQ;
