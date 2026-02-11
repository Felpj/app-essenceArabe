/**
 * Helpers para WhatsApp (templates de mensagens)
 */

export interface WhatsAppTemplate {
  type: "CART_ABANDONED" | "POST_PURCHASE" | "CUSTOM";
  message: string;
  phone?: string;
}

const WHATSAPP_NUMBER = "5511999999999"; // Substituir pelo número real

export function generateWhatsAppLink(
  message: string,
  phone: string = WHATSAPP_NUMBER
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodedMessage}`;
}

export function getCartAbandonedMessage(cartItems: string[]): string {
  const itemsText = cartItems.slice(0, 3).join(", ");
  return `Oi! Vi que você quase finalizou seu pedido com ${itemsText}${cartItems.length > 3 ? " e mais itens" : ""}. Quer que eu gere um cupom especial para você? 🎁`;
}

export function getPostPurchaseUpsellMessage(orderCode: string): string {
  return `Seu pedido ${orderCode} foi confirmado ✅ Quer aproveitar uma oferta complementar com desconto hoje? Temos uma promoção especial para você! 🎉`;
}

export function getCustomUpsellMessage(productName: string, discount: string): string {
  return `Oi! Que tal adicionar ${productName} ao seu pedido com ${discount} de desconto? É uma oferta exclusiva! 💎`;
}

export function openWhatsApp(template: WhatsAppTemplate) {
  let message = template.message;

  if (template.type === "CART_ABANDONED") {
    // Seria necessário passar os itens do carrinho
    message = getCartAbandonedMessage([]);
  } else if (template.type === "POST_PURCHASE") {
    // Seria necessário passar o orderCode
    message = getPostPurchaseUpsellMessage("");
  }

  const url = generateWhatsAppLink(message, template.phone);
  window.open(url, "_blank");
}
