import { motion } from "framer-motion";
import { Search, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/products";

interface EmptyStateProps {
  onClearFilters: () => void;
  onCollectionClick: (collectionId: string) => void;
}

const EmptyState = ({ onClearFilters, onCollectionClick }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        Nenhum perfume encontrado
      </h3>
      <p className="text-muted-foreground font-body max-w-md mb-6">
        Tente remover alguns filtros ou buscar por outros termos. 
        Que tal explorar uma de nossas coleções?
      </p>

      <Button variant="gold" onClick={onClearFilters} className="gap-2 mb-8">
        <Filter className="w-4 h-4" />
        Limpar todos os filtros
      </Button>

      <div className="w-full max-w-lg">
        <p className="text-sm text-muted-foreground font-body mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Sugestões de coleções
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {collections.slice(0, 4).map(collection => (
            <Button
              key={collection.id}
              variant="secondary"
              size="sm"
              onClick={() => onCollectionClick(collection.id)}
              className="rounded-full"
            >
              {collection.label}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;
