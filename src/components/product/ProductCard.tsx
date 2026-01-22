import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star, Zap, Truck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    addItem(product);
    navigate('/checkout');
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 border border-border/50">
      {/* Promo Tag Badge */}
      {product.promoTag ? (
        <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold shadow-lg animate-pulse">
          {product.promoTag}
        </div>
      ) : product.originalPrice && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
        </div>
      )}

      {/* Image */}
      <Link to={`/produto/${product.slug}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name */}
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Free Shipping Badge */}
        <div className="flex items-center gap-1 mt-2 text-primary">
          <Truck className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">Frete Grátis</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Carrinho
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={handleBuyNow}
          >
            <Zap className="h-4 w-4 mr-1" />
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
