import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";
import { RecentOrdersPopup } from "@/components/RecentOrdersPopup";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produto/:slug" element={<ProductDetail />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmacao" element={<Confirmation />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            <RecentOrdersPopup />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
