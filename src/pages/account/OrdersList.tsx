import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCustomerStore } from "@/store/customer.store";
import { OrderStatus } from "@/types/account";
import { formatMoney } from "@/lib/money";
import { motion } from "framer-motion";

const statusOptions: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "EM_SEPARACAO", label: "Em Separação" },
  { value: "ENVIADO", label: "Enviado" },
  { value: "ENTREGUE", label: "Entregue" },
  { value: "CANCELADO", label: "Cancelado" },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "CONFIRMADO":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "EM_SEPARACAO":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "ENVIADO":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "ENTREGUE":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "CANCELADO":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const OrdersList = () => {
  const { orders } = useCustomerStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderCode.toLowerCase().includes(searchLower) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchLower)
          )
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders, search, statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para conta
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Meus Pedidos
          </h1>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por código ou produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as OrderStatus | "all")
              }
            >
              <SelectTrigger className="w-full sm:w-[200px] bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card border border-border flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                {orders.length === 0
                  ? "Você ainda não tem pedidos"
                  : "Nenhum pedido encontrado"}
              </h2>
              <p className="text-muted-foreground font-body mb-8">
                {orders.length === 0
                  ? "Que tal explorar nosso catálogo e fazer sua primeira compra?"
                  : "Tente ajustar os filtros de busca."}
              </p>
              {orders.length === 0 && (
                <Button variant="gold" size="lg" asChild>
                  <Link to="/catalogo">Ver Catálogo</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.orderCode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/conta/pedidos/${order.orderCode}`}>
                    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-display text-lg font-semibold text-foreground">
                              {order.orderCode}
                            </h3>
                            <Badge
                              className={`${getStatusColor(order.status)} font-body`}
                            >
                              {order.status.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground font-body mb-2">
                            {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground font-body">
                            {order.items.length} item
                            {order.items.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-2xl font-bold text-foreground">
                            {formatMoney(order.total)}
                          </p>
                          <p className="text-sm text-muted-foreground font-body mt-1">
                            Ver detalhes →
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersList;
