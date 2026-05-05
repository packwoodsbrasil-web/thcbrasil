import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Truck, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter((p) => p.category === category);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('/images/hero-background.png')` }} 
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="container relative py-24 md:py-40">
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <span translate="no" className="text-white drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]" style={{ textShadow: '0 0 40px rgba(255,215,0,0.9), 0 0 80px rgba(255,215,0,0.5), 2px 2px 4px rgba(0,0,0,0.9)' }}>
                  THC BRASIL
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white font-medium mb-10 animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                Canetas, Vapes, Blunts, e Comestíveis THC Premium Com Entrega Para Todo o Brasil.
              </p>
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/produtos">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-6 text-lg shadow-xl">
                    Ver Produtos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-secondary uppercase tracking-wide">Navegue por</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Categorias</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => {
                const categoryImages: Record<string, string> = {
                  'Canetas': '/images/category-canetas.webp',
                  'Vapes': '/images/category-vapes.png',
                  'Blunts': '/images/category-blunts.jpg',
                  'Comestíveis': '/images/category-comestiveis.jpg',
                  'Alucinógenos': '/images/category-alucinogenos.png',
                  'Kits': '/images/category-kits.png',
                };
                const bgImage = categoryImages[category];
                
                return (
                  <Link
                    key={category}
                    to={`/produtos?categoria=${category}`}
                    className="group relative h-48 rounded-2xl overflow-hidden"
                  >
                    {bgImage ? (
                      <>
                        <img 
                          src={bgImage} 
                          alt={category}
                          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 transition-opacity group-hover:opacity-90" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform drop-shadow-lg">
                        {category}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-primary uppercase tracking-wide">Catálogo Completo</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Nossos Produtos</h2>
            </div>

            <div className="space-y-12">
              {categories.map((category) => {
                const categoryProducts = productsByCategory[category];
                if (!categoryProducts || categoryProducts.length === 0) return null;

                return (
                  <section key={category}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                      <Link
                        to={`/produtos?categoria=${category}`}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        Ver todos →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryProducts.map((product, index) => (
                        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(index * 0.03, 0.3)}s` }}>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-red-600/10 border border-red-600/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-red-600">Frete Grátis!</h3>
                  <p className="text-sm text-muted-foreground">Enviamos grátis para todo o Brasil</p>
                  <p className="text-xs font-semibold text-red-600 mt-1">📦 Prazo de entrega: 5 a 7 dias úteis</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Pagamento Seguro</h3>
                  <p className="text-sm text-muted-foreground">Stripe & criptografia SSL</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Suporte 24/7</h3>
                  <p className="text-sm text-muted-foreground">Atendimento via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="relative rounded-3xl overflow-hidden bg-sky-400 p-8 md:p-16 text-center text-white">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Receba Novidades Exclusivas
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                  Inscreva-se para receber promoções especiais e lançamentos em primeira mão.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <Button className="bg-white text-secondary hover:bg-white/90 font-semibold px-6">
                    Inscrever
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
