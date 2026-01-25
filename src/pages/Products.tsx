import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  // Group products by category
  const productsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = products.filter(p => p.category === category);
      return acc;
    }, {} as Record<string, typeof products>);
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ categoria: category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Nossos Produtos</h1>
            <p className="text-muted-foreground mt-2">
              Explore nossa coleção premium de produtos exclusivos
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full",
                !selectedCategory && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleCategoryChange(null)}
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full",
                  selectedCategory === category && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Display */}
          {selectedCategory ? (
            // Single category grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            // All categories grouped
            <div className="space-y-12">
              {categories.map((category) => {
                const categoryProducts = productsByCategory[category];
                if (!categoryProducts || categoryProducts.length === 0) return null;
                
                return (
                  <section key={category}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                        className="text-primary hover:text-primary/80"
                      >
                        Ver todos →
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {categoryProducts.map((product, index) => (
                        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.03}s` }}>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
