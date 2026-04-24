import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Truck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.webp';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/contato', label: 'Contato' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <>
      {/* Free Shipping Banner - Red Line */}
      <div className="bg-red-600 text-white py-2.5 text-center">
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-sm font-bold tracking-wide">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 animate-pulse" />
            <span>🔥 FRETE GRÁTIS para todo o Brasil! 🔥</span>
            <Truck className="h-4 w-4 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-medium">| Entrega em 5 a 7 dias úteis 📦</span>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="THC Brasil Logo" className="h-10 sm:h-12 w-auto object-contain" />
          <span translate="no" className="font-bold text-base sm:text-xl bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
            THC BRASIL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Link to="/carrinho">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      </header>
    </>
  );
}
