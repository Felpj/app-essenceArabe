import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import SobrePage from "./pages/SobrePage";
import CatalogoPage from "./pages/CatalogoPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoverPassword from "./pages/RecoverPassword";
import AccountHome from "./pages/account/AccountHome";
import OrdersList from "./pages/account/OrdersList";
import OrderDetails from "./pages/account/OrderDetails";
import Addresses from "./pages/account/Addresses";
import Coupons from "./pages/account/Coupons";
import Referrals from "./pages/account/Referrals";
import Preferences from "./pages/account/Preferences";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/p/:slug" element={<ProductPage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/:orderId" element={<OrderSuccess />} />
          <Route path="/sobre" element={<SobrePage />} />

          {/* Auth Routes */}
          <Route path="/entrar" element={<Login />} />
          <Route path="/criar-conta" element={<Signup />} />
          <Route path="/recuperar-senha" element={<RecoverPassword />} />

          {/* Protected Account Routes */}
          <Route
            path="/conta"
            element={
              <ProtectedRoute>
                <AccountHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/pedidos"
            element={
              <ProtectedRoute>
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/pedidos/:orderCode"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/enderecos"
            element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/cupons"
            element={
              <ProtectedRoute>
                <Coupons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/indicacoes"
            element={
              <ProtectedRoute>
                <Referrals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conta/preferencias"
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
