import { useLocation, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const { orderId, total, items } = location.state || {};

  if (!orderId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
            <Link to="/">
              <Button>Voltar ao início</Button>
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
      
      <main className="flex-1 py-16">
        <div className="container max-w-2xl">
          <div className="text-center animate-fade-in">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pedido Confirmado!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Obrigado por sua compra. Seu pedido foi recebido com sucesso.
            </p>

            {/* Order Details */}
            <div className="bg-card rounded-2xl border border-border p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Número do Pedido</p>
                  <p className="font-bold text-lg">{orderId}</p>
                </div>
              </div>

              {items && items.length > 0 && (
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold mb-4">Itens do Pedido</h3>
                  <div className="space-y-3">
                    {items.map((item: any) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-medium">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Pago</span>
                  <span className="text-primary">R$ {total?.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-muted/50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold mb-2">Próximos passos:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Você receberá um e-mail de confirmação em breve</li>
                <li>• Seu pedido será processado em até 24 horas</li>
                <li>• Acompanhe o status pelo e-mail cadastrado</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/produtos">
                <Button size="lg" className="font-semibold">
                  Continuar Comprando
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline">
                  Voltar ao Início
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
