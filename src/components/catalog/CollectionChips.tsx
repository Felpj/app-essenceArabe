import { motion } from "framer-motion";
import { collections } from "@/data/products";
import { cn } from "@/lib/utils";

interface CollectionChipsProps {
  activeCollection: string | null;
  onCollectionChange: (collectionId: string | null) => void;
}

const CollectionChips = ({ activeCollection, onCollectionChange }: CollectionChipsProps) => {
  return (
    <div className="py-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-10 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onCollectionChange(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all flex-shrink-0",
              activeCollection === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            Todos
          </motion.button>
          
          {collections.map((collection, index) => (
            <motion.button
              key={collection.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * (index + 1) }}
              onClick={() => onCollectionChange(
                activeCollection === collection.id ? null : collection.id
              )}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all flex-shrink-0",
                activeCollection === collection.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {collection.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionChips;
