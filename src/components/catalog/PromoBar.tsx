import { motion } from "framer-motion";
import { Truck, Clock, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PromoBar = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-gold text-primary-foreground py-2.5 px-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm font-body font-medium">
        <Truck className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">
          Pedidos até 12h: <strong>envio no mesmo dia</strong>* | Após 12h: despacha amanhã cedo
        </span>
        <span className="sm:hidden text-xs">
          Até 12h: <strong>envio hoje</strong>* | Após: amanhã
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="ml-1 hover:opacity-80 transition-opacity">
              <Info className="w-3.5 h-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="max-w-[280px] text-xs bg-card border-border"
          >
            <p>*Válido para itens em estoque e logística local/expedição. Prazo de entrega varia conforme localização.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </motion.div>
  );
};

export default PromoBar;
