import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Package, Truck, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCustomerStore } from "@/store/customer.store";
import { formatMoney } from "@/lib/money";
import { OrderStatus } from "@/types/account";

const getStatusColor = (status: string) => {
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

const OrderDetails = () => {
  const { orderCode } = useParams();
  const { orders } = useCustomerStore();

  const order = orders.find((o) => o.orderCode === orderCode);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Pedido não encontrado
            </h1>
            <p className="text-muted-foreground font-body mb-8">
              O pedido {orderCode} não foi encontrado.
            </p>
            <Button variant="gold" asChild>
              <Link to="/conta/pedidos">Voltar para pedidos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = `Oi! Gostaria de informações sobre meu pedido ${order.orderCode}.`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  const timelineSteps = [
    {
      status: "CONFIRMADO" as const,
      label: "Pedido Confirmado",
      icon: CheckCircle,
      completed: true,
    },
    {
      status: "EM_SEPARACAO" as const,
      label: "Em Separação",
      icon: Package,
      completed: ["EM_SEPARACAO", "ENVIADO", "ENTREGUE"].includes(order.status),
    },
    {
      status: "ENVIADO" as const,
      label: "Enviado",
      icon: Truck,
      completed: ["ENVIADO", "ENTREGUE"].includes(order.status),
    },
    {
      status: "ENTREGUE" as const,
      label: "Entregue",
      icon: CheckCircle,
      completed: order.status === "ENTREGUE",
    },
  ];

  const currentStepIndex = timelineSteps.findIndex(
    (step) => step.status === order.status
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <Link
            to="/conta/pedidos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para pedidos
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                Pedido {order.orderCode}
              </h1>
              <p className="text-muted-foreground font-body">
                Realizado em{" "}
                {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <Badge
              className={`${getStatusColor(order.status)} font-body text-base px-4 py-2`}
            >
              {order.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Timeline */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-foreground mb-6">
              Acompanhamento do Pedido
            </h2>
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isCurrent = index === currentStepIndex;
                const isCompleted = step.completed;

                return (
                  <div key={step.status} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p
                        className={`font-body font-semibold ${
                          isCompleted || isCurrent
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-muted-foreground font-body mt-1">
                          Status atual
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-foreground mb-6">
              Itens do Pedido
            </h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-secondary rounded-lg"
                >
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-body font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Quantidade: {item.qty}
                    </p>
                  </div>
                  <p className="font-display font-bold text-foreground">
                    {formatMoney(item.price * item.qty)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Contact */}
            {order.contact && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Dados de Contato
                </h3>
                <div className="space-y-2 text-sm font-body">
                  <p className="text-foreground">
                    <strong>Nome:</strong> {order.contact.fullName}
                  </p>
                  <p className="text-foreground">
                    <strong>WhatsApp:</strong> {order.contact.whatsapp}
                  </p>
                  {order.contact.email && (
                    <p className="text-foreground">
                      <strong>Email:</strong> {order.contact.email}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Delivery */}
            {order.delivery && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Endereço de Entrega
                </h3>
                <div className="space-y-2 text-sm font-body text-foreground">
                  <p>
                    {order.delivery.addressLine1}
                    {order.delivery.addressLine2 &&
                      ` - ${order.delivery.addressLine2}`}
                  </p>
                  <p>
                    {order.delivery.neighborhood}, {order.delivery.city} -{" "}
                    {order.delivery.state}
                  </p>
                  <p>CEP: {order.delivery.cep}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tracking */}
          {order.tracking && (
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <h3 className="font-display font-semibold text-foreground mb-4">
                Rastreamento
              </h3>
              <div className="space-y-2 text-sm font-body">
                {order.tracking.carrier && (
                  <p className="text-foreground">
                    <strong>Transportadora:</strong> {order.tracking.carrier}
                  </p>
                )}
                {order.tracking.code && (
                  <p className="text-foreground">
                    <strong>Código:</strong> {order.tracking.code}
                  </p>
                )}
                {order.tracking.url && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={order.tracking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rastrear pedido
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="font-display text-xl font-semibold text-foreground">
                Total
              </span>
              <span className="font-display text-3xl font-bold text-foreground">
                {formatMoney(order.total)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gold" size="lg" onClick={handleWhatsAppClick}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp sobre este pedido
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/conta/pedidos">Voltar para pedidos</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;
