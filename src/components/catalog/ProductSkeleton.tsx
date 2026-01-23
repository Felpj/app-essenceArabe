import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Image */}
      <Skeleton className="aspect-square w-full" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded" />
          ))}
        </div>
        
        {/* Brand */}
        <Skeleton className="h-3 w-20" />
        
        {/* Name */}
        <Skeleton className="h-5 w-3/4" />
        
        {/* Size */}
        <Skeleton className="h-3 w-12" />
        
        {/* Chip */}
        <Skeleton className="h-6 w-32 rounded" />
        
        {/* Price */}
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-28" />
        
        {/* Buttons */}
        <div className="pt-2 space-y-2">
          <Skeleton className="h-9 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
