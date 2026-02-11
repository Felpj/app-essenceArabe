import { Link } from "react-router-dom";
import { LogOut, Package, MapPin, Ticket, Users, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "@/store/customer.store";
import { motion } from "framer-motion";

const AccountHome = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuthStore();
  const { orders } = useCustomerStore();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  const recentOrders = orders.slice(0, 3);
  const totalOrders = orders.length;

  const menuItems = [
    {
      title: "Meus Pedidos",
      description: `${totalOrders} pedido${totalOrders !== 1 ? "s" : ""}`,
      icon: Package,
      href: "/conta/pedidos",
      color: "text-primary",
    },
    {
      title: "Endereços",
      description: "Gerenciar endereços de entrega",
      icon: MapPin,
      href: "/conta/enderecos",
      color: "text-blue-400",
    },
    {
      title: "Cupons",
      description: "Cupons disponíveis",
      icon: Ticket,
      href: "/conta/cupons",
      color: "text-green-400",
    },
    {
      title: "Indicações",
      description: "Indique e ganhe",
      icon: Users,
      href: "/conta/indicacoes",
      color: "text-purple-400",
    },
    {
      title: "Preferências",
      description: "Configurações da conta",
      icon: Settings,
      href: "/conta/preferencias",
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Olá, {profile?.fullName || "Cliente"}!
              </h1>
              <p className="text-muted-foreground font-body">
                Bem-vindo à sua área do cliente
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Recent Orders */}
          {recentOrders.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Pedidos Recentes
                </h2>
                <Link
                  to="/conta/pedidos"
                  className="text-sm text-primary hover:underline font-body"
                >
                  Ver todos
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.orderCode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card border-border cursor-pointer hover:border-primary/50 transition-colors">
                      <Link to={`/conta/pedidos/${order.orderCode}`}>
                        <CardHeader>
                          <CardTitle className="text-base font-body">
                            {order.orderCode}
                          </CardTitle>
                          <CardDescription className="font-body">
                            {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground font-body">
                              {order.status}
                            </span>
                            <span className="font-display font-bold text-foreground">
                              R$ {order.total.toFixed(2).replace(".", ",")}
                            </span>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Menu Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer h-full">
                    <Link to={item.href}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${item.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg font-body">
                              {item.title}
                            </CardTitle>
                            <CardDescription className="font-body">
                              {item.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountHome;
