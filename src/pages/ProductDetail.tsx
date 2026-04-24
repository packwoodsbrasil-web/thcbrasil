import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getProductBySlug, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Minus, Plus, ChevronLeft, Check, Zap } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const prevSlugRef = useRef<string | undefined>();

  useEffect(() => {
    // Only scroll to top when navigating to a new product (not on back navigation)
    if (prevSlugRef.current !== slug && prevSlugRef.current !== undefined) {
      window.scrollTo(0, 0);
    }
    prevSlugRef.current = slug;
  }, [slug]);
  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity);
      navigate('/checkout');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Link to="/produtos">
              <Button>Ver todos os produtos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const imageFitClass = product.imageFit === 'contain' ? 'object-contain p-6 bg-muted/30' : 'object-cover';

  // Guardrail: if any client/device ends up showing a wrong word, normalize it here.
  const safeDetails = product.details.map((detail) =>
    detail.replace(/\bidiotismo\b/gi, 'Efeito relaxante')
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Breadcrumb */}
          <button 
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/produtos');
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar para produtos
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full ${imageFitClass}`}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="animate-fade-in">
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                {product.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} avaliações)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-6">
                <span className="text-4xl font-bold text-primary">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mt-4">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Em estoque</span>
              </div>

              {/* Quantity & Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-2 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 font-semibold"
                    onClick={() => addItem(product, quantity)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 font-semibold shadow-glow"
                    onClick={handleBuyNow}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Comprar Agora
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-4">Descrição</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Details List */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Mais Informações</h3>
                <ul className="space-y-2">
                  {safeDetails.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Comentários ({product.reviews.length})</h2>
            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-muted/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">{review.author.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Não há avaliações ainda.</p>
            )}
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-border">
              <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
