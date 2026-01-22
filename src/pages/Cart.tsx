import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Truck } from 'lucide-react';

const Cart = () => {
  const { items, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-6">
              Adicione produtos incríveis ao seu carrinho!
            </p>
            <Link to="/produtos">
              <Button size="lg" className="font-semibold">
                Explorar Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Resumo do Pedido</h2>
                
                {/* Free Shipping Highlight */}
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                  <div className="bg-primary rounded-full p-2">
                    <Truck className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Frete Grátis!</p>
                    <p className="text-xs text-muted-foreground">Entrega para todo o Brasil</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                    <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-primary font-bold">GRÁTIS</span>
                  </div>
                </div>

                <div className="border-t border-border my-6" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span className="text-primary">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>

                <Link to="/checkout">
                  <Button size="lg" className="w-full font-semibold shadow-glow">
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/produtos">
                  <Button variant="ghost" className="w-full mt-3">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
