import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border/50 animate-fade-in">
      {/* Image */}
      <Link to={`/produto/${product.slug}`} className="flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link to={`/produto/${product.slug}`}>
          <h3 className="font-semibold truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        
        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold text-primary">
              R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                R$ {product.price.toFixed(2).replace('.', ',')} cada
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeItem(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
