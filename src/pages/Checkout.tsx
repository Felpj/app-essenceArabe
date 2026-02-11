import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { ContactStep, ContactFormData } from "@/components/checkout/ContactStep";
import { ShippingStep, ShippingFormData } from "@/components/checkout/ShippingStep";
import { PaymentStep, PaymentFormData } from "@/components/checkout/PaymentStep";
import { OrderReview } from "@/components/checkout/OrderReview";
import { OrderSummarySticky } from "@/components/checkout/OrderSummarySticky";
import { OrderBumpCard } from "@/components/upsell/OrderBumpCard";
import { useCartStore } from "@/store/cart.store";
import { useCheckoutDraft } from "@/hooks/use-checkout-draft";
import { getEligibleOffers } from "@/data/upsellOffers";

const steps = [
  { id: "contact", label: "Contato", number: 1 },
  { id: "shipping", label: "Entrega", number: 2 },
  { id: "payment", label: "Pagamento", number: 3 },
  { id: "review", label: "Revisão", number: 4 },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, getSubtotal } = useCartStore();
  const { draft, updateDraft, clearDraft } = useCheckoutDraft();
  const cartTotal = getSubtotal();
  const cartProductIds = items.map((item) => item.product.id);

  // Busca order bumps elegíveis para checkout
  const orderBumps = getEligibleOffers("CHECKOUT", cartTotal, cartProductIds).filter(
    (o) => o.type === "ORDER_BUMP"
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [contactData, setContactData] = useState<ContactFormData | null>(
    draft?.contact
      ? {
          name: draft.contact.fullName,
          email: draft.contact.email || "",
          phone: draft.contact.whatsapp,
          wantsWhatsAppUpdates: draft.contact.wantsWhatsAppUpdates || false,
        }
      : null
  );
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    draft?.delivery
      ? {
          cep: draft.delivery.cep,
          address: draft.delivery.addressLine1,
          number: "",
          complement: draft.delivery.addressLine2 || "",
          neighborhood: draft.delivery.neighborhood,
          city: draft.delivery.city,
          state: draft.delivery.state,
          shippingMethod:
            draft.delivery.shippingMethodId === "EXPRESS_24H"
              ? "express"
              : "normal",
        }
      : null
  );
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(
    draft?.payment
      ? {
          method: draft.payment.method.toLowerCase() as "pix" | "card",
          addUpsell: draft.orderBump?.enabled || false,
        }
      : null
  );
  const [acceptTerms, setAcceptTerms] = useState(draft?.acceptTerms || false);

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  const handleContactSubmit = (data: ContactFormData) => {
    setContactData(data);
    setCurrentStep(1);
  };

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
    setCurrentStep(3);
  };

  // Save draft on data changes
  useEffect(() => {
    if (contactData || shippingData || paymentData) {
      updateDraft({
        contact: contactData
          ? {
              fullName: contactData.name,
              whatsapp: contactData.phone,
              email: contactData.email,
              wantsWhatsAppUpdates: contactData.wantsWhatsAppUpdates,
            }
          : undefined,
        delivery: shippingData
          ? {
              cep: shippingData.cep,
              addressLine1: shippingData.address,
              addressLine2: shippingData.complement,
              neighborhood: shippingData.neighborhood,
              city: shippingData.city,
              state: shippingData.state,
              shippingMethodId:
                shippingData.shippingMethod === "express"
                  ? "EXPRESS_24H"
                  : "STANDARD",
            }
          : undefined,
        payment: paymentData
          ? {
              method: paymentData.method.toUpperCase() as "PIX" | "CARD",
            }
          : undefined,
        orderBump: paymentData
          ? {
              enabled: paymentData.addUpsell || false,
            }
          : undefined,
        acceptTerms,
      });
    }
  }, [contactData, shippingData, paymentData, acceptTerms, updateDraft]);

  const handleFinalSubmit = () => {
    if (!acceptTerms) {
      // Scroll to terms checkbox
      const termsCheckbox = document.getElementById("accept-terms");
      if (termsCheckbox) {
        termsCheckbox.scrollIntoView({ behavior: "smooth", block: "center" });
        termsCheckbox.focus();
      }
      return;
    }

    // Generate mock order ID
    const orderId = `EA-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(
      Date.now()
    ).slice(-4)}`;

    // Clear cart and draft
    clearCart();
    clearDraft();

    // Navigate to success page
    navigate(`/pedido/${orderId}`);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/carrinho");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactStep
            data={contactData || undefined}
            onSubmit={handleContactSubmit}
          />
        );
      case 1:
        return (
          <ShippingStep
            data={shippingData || undefined}
            onSubmit={handleShippingSubmit}
          />
        );
      case 2:
        return (
          <PaymentStep
            data={paymentData || undefined}
            onSubmit={handlePaymentSubmit}
          />
        );
      case 3:
        return (
          contactData &&
          shippingData &&
          paymentData && (
            <>
              <OrderReview
                contact={contactData}
                shipping={shippingData}
                payment={paymentData}
                onAcceptTerms={setAcceptTerms}
              />
              {/* Order Bump */}
              {orderBumps.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Adicione ao seu pedido
                  </h3>
                  {orderBumps.map((offer) => (
                    <OrderBumpCard
                      key={offer.id}
                      offer={offer}
                      context="CHECKOUT"
                      cartTotal={cartTotal}
                    />
                  ))}
                </div>
              )}
            </>
          )
        );
      default:
        return null;
    }
  };

  const handleStepSubmit = () => {
    const form = document.querySelector("form");
    if (form) {
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto mb-8">
            <Link
              to="/carrinho"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao carrinho
            </Link>
          </div>

          {/* Auto-save indicator */}
          <div className="max-w-7xl mx-auto mb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
              <Save className="w-3 h-3" />
              <span>Salvando automaticamente...</span>
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Left Column - Steps */}
            <div className="lg:col-span-2">
              <h1 className="font-display text-4xl font-bold text-foreground mb-8">
                Checkout
              </h1>

              {/* Steps Indicator */}
              <CheckoutSteps currentStep={currentStep} steps={steps} />

              {/* Step Content */}
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-6">
                {renderStepContent()}
              </div>

              {/* Mobile Order Summary (Above navigation buttons) */}
              <div className="lg:hidden mb-6">
                <OrderSummarySticky
                  shipping={
                    shippingData?.shippingMethod === "express" ? 15 : 10
                  }
                  orderBumpValue={paymentData?.addUpsell ? 29.9 : 0}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button variant="outline" onClick={handleBack}>
                  {currentStep === 0 ? "Voltar" : "Anterior"}
                </Button>

                {currentStep < 3 ? (
                  <Button variant="gold" onClick={handleStepSubmit}>
                    Continuar
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleFinalSubmit}
                    disabled={!acceptTerms}
                  >
                    Confirmar Pedido
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary (Desktop) */}
            <div className="lg:col-span-1">
              <OrderSummarySticky
                shipping={
                  shippingData?.shippingMethod === "express" ? 15 : 10
                }
                orderBumpValue={paymentData?.addUpsell ? 29.9 : 0}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
