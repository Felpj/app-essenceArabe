# FRONT_MVP_BASE.md — Essence Árabe (Interface Only)

> Objetivo: Montar a base do Front (interface) do e-commerce Essence Árabe com foco em conversão.
> Escopo: **Somente UI/UX** (sem integrações reais de API), com dados mockados.
> Stack alvo: Vite + React + TypeScript + Tailwind (já iniciado), React Router.

---

## 0) Princípios (UI/UX)

- **Compra rápida**: o usuário deve chegar no checkout em poucos cliques.
- **Consistência visual**: preto + dourado, luxo, contraste alto, tipografia clara.
- **Escalável**: componentes reutilizáveis, layout modular, tokens de design.
- **Sem travar fluxo**: sem login obrigatório para navegar/colocar no carrinho.
- **Mobile-first**: priorizar celular (principal canal de conversão).

---

## 1) Páginas MVP (Interface)

### 1.1 Rotas (React Router)
- `/` Home
- `/catalogo` Catálogo (listagem)
- `/p/:slug` Página de Produto (PDP)
- `/carrinho` Carrinho
- `/checkout` Checkout (UI multi-step)
- `/pedido/:orderId` Obrigado/Resumo (mock)
- `/sobre` Sobre

> Observação: mesmo sem backend, vamos simular com `mockProducts` e `mockOrders`.

---

## 2) Estrutura de Pastas (sugestão)

Dentro de `src/`:

- `pages/`
  - `Home.tsx`
  - `Catalog.tsx`
  - `Product.tsx`
  - `Cart.tsx`
  - `Checkout.tsx`
  - `OrderSuccess.tsx`
  - `About.tsx`

- `components/`
  - `layout/`
    - `Header.tsx`
    - `Footer.tsx`
    - `Container.tsx`
  - `ui/`
    - `Button.tsx`
    - `Badge.tsx`
    - `Card.tsx`
    - `Input.tsx`
    - `Select.tsx`
    - `Modal.tsx`
    - `Toast.tsx` (opcional)
  - `commerce/`
    - `ProductCard.tsx`
    - `ProductGallery.tsx`
    - `PriceBlock.tsx`
    - `AddToCartButton.tsx`
    - `CartDrawer.tsx` (opcional)
    - `CartItemRow.tsx`
    - `CartSummary.tsx`
  - `checkout/`
    - `CheckoutSteps.tsx`
    - `ContactStep.tsx`
    - `ShippingStep.tsx`
    - `PaymentStep.tsx`
    - `UpsellBump.tsx` (placeholder UI)
    - `OrderReview.tsx`

- `data/`
  - `mockProducts.ts`
  - `mockTestimonials.ts`
  - `mockFaq.ts`

- `lib/`
  - `cn.ts` (className merge)
  - `money.ts` (format BRL)
  - `slug.ts`
  - `validators.ts` (CPF/CEP/email/phone — apenas UI)

- `store/` (opcional, UI state)
  - `cart.store.ts` (Zustand recomendado)
  - `ui.store.ts` (modal/toast)

- `styles/`
  - `tokens.css` (variáveis de cor/sombra/glow)
  - `globals.css`

---

## 3) Design System (tokens)

### 3.1 Paleta (Tailwind + CSS variables)
- Background: `#0B0B0C` (preto elegante)
- Surface: `#111113` / `#151518`
- Gold: `#C8A24A` (dourado principal)
- Gold soft: `#E3C77A`
- Text primary: `#F3F3F3`
- Text muted: `#B6B6B6`
- Border: `rgba(200,162,74,0.25)`

### 3.2 Componentes UI base (obrigatórios)
- `Button`
  - variants: `primary(gold)`, `outline(gold)`, `ghost`
  - sizes: `sm`, `md`, `lg`
- `Input`
  - com foco dourado e placeholder suave
- `Card`
  - borda dourada sutil + sombra suave
- `Badge`
  - “Mais vendido”, “Alta fixação”, “Envio 24h”
- `Modal` (opcional para preview/upsell)
- `Toast` (opcional para “adicionado ao carrinho”)

> Definição: nenhum componente deve depender de API.

---

## 4) Componentes de Layout (MVP)

### 4.1 Header
- Logo “ESSENCE Árabe” (texto ou imagem)
- Links: Início | Catálogo | Sobre
- Ícones: Busca (pode ser somente UI), Carrinho com contador

### 4.2 Footer
- Atendimento WhatsApp (CTA)
- Políticas (links estáticos)
- Redes sociais (placeholder)

### 4.3 Container
- largura max, padding responsivo

---

## 5) Catálogo & Produto (UI)

### 5.1 ProductCard (Catálogo)
- imagem (mock)
- nome
- inspirado em (texto)
- preço
- CTA: “Ver detalhes”

### 5.2 PDP (Página do produto)
- Gallery
- Nome + notas olfativas (mock)
- “Inspirado em …”
- Prova social (mock)
- CTA: “Comprar agora” + “Adicionar ao carrinho”
- Info chips:
  - “Envio em até 24h”
  - “Alta fixação”
  - “Cheiro de luxo”

---

## 6) Carrinho (UI)

### 6.1 CartItemRow
- imagem pequena
- nome
- qty stepper (+/-)
- subtotal item
- remover

### 6.2 CartSummary
- subtotal
- frete (placeholder: “calcular no checkout”)
- cupom (input, UI somente)
- total estimado
- CTA: “Finalizar compra”

> UX: ao clicar finalizar, vai para `/checkout`.

---

## 7) Checkout (UI multi-step)

> **Somente interface** — sem gateway real.

### 7.1 Steps
1) Contato
2) Entrega
3) Pagamento
4) Revisão

### 7.2 Contato
- Nome
- Email
- WhatsApp (com máscara)
- Checkbox “Quero receber atualizações no WhatsApp” (UI)

### 7.3 Entrega
- CEP + “Buscar” (UI fake)
- Endereço completo
- Opções de frete (cards)
  - “Expresso 24/48h”
  - “Normal”
- Observação: “Envio em até 24h após confirmação” (copy)

### 7.4 Pagamento (UI)
- Pix (default)
- Cartão (UI)
- Bump (placeholder):
  - card “Adicionar amostra 5ml por R$ XX”
  - checkbox

### 7.5 Revisão
- resumo itens + frete + total
- botão final “Confirmar pedido” (vai para `/pedido/:id` mock)

---

## 8) Conteúdo Mock (para UI parecer real)

### 8.1 mockProducts.ts
Cada produto deve conter:
- id
- slug
- title
- brand (Lattafa, Armaf…)
- inspiredBy (texto)
- price
- images[]
- notes: top/heart/base (texto)
- tags: `['mais_vendido','fixacao_12h','envio_24h']`
- rating + reviewsCount (mock)

### 8.2 mockTestimonials.ts
- nome, cidade, texto, produto

### 8.3 mockFaq.ts
- perguntas sobre originalidade, envio, troca, pagamento

---

## 9) Checklist de Entrega (UI)

- [x] Rotas funcionando
  - [x] `/` Home
  - [x] `/catalogo` Catálogo
  - [x] `/p/:slug` Página de Produto (PDP)
  - [x] `/carrinho` Carrinho
  - [x] `/checkout` Checkout multi-step
  - [x] `/pedido/:orderId` Página de sucesso
  - [x] `/sobre` Sobre
- [x] Header/Footer prontos
  - [x] Header com logo, navegação e contador de carrinho funcional
  - [x] Footer com links e informações
- [x] Catálogo com grid responsivo
  - [x] Filtros e ordenação
  - [x] ProductCard com integração ao carrinho
  - [x] Quick View modal
- [x] PDP completa com CTA
  - [x] Integração com dados reais de `products.ts`
  - [x] Suporte a slug (`/p/:slug`)
  - [x] Botão "Adicionar ao carrinho" funcional
  - [x] Controle de quantidade
- [x] Carrinho funcional (estado local)
  - [x] Store Zustand com persistência
  - [x] CartItemRow com controles de quantidade
  - [x] CartSummary com resumo e CTA para checkout
  - [x] Estado vazio quando carrinho está vazio
- [x] Checkout multi-step (form UI)
  - [x] CheckoutSteps (indicador de progresso)
  - [x] ContactStep (contato com validações)
  - [x] ShippingStep (endereço e método de entrega)
  - [x] PaymentStep (PIX/Cartão + Upsell bump)
  - [x] OrderReview (revisão final)
- [x] Página de sucesso (mock order)
  - [x] OrderSuccess com número de pedido mock
  - [x] Informações sobre próximos passos
  - [x] CTAs para continuar comprando
- [x] Design consistente (tokens + componentes)
  - [x] Tokens CSS (cores dourado/preto)
  - [x] Componentes shadcn/ui
  - [x] Utilitários (money.ts, slug.ts, validators.ts)
  - [x] Animações com Framer Motion

---

## 10) Status de Implementação

**Data de conclusão:** Janeiro 2025

### ✅ Implementado

- **Store de Estado:** Zustand com persistência no localStorage
- **Utilitários:** money.ts, slug.ts, validators.ts
- **Componentes Commerce:** AddToCartButton, CartItemRow, CartSummary
- **Componentes Checkout:** CheckoutSteps, ContactStep, ShippingStep, PaymentStep, OrderReview
- **Páginas:** Cart, Checkout, OrderSuccess
- **Integrações:** Header com contador funcional, ProductCard e ProductPage integrados
- **Rotas:** Todas as rotas MVP configuradas e funcionais

### 📝 Observações

- Todos os componentes são **UI only** (sem integração real de API)
- Dados mockados em `src/data/products.ts`
- Validações de formulário implementadas com Zod + React Hook Form
- Carrinho persiste no localStorage
- Checkout gera orderId mock para página de sucesso

---

## 11) Próximo .md (sequência sugerida)

1) ✅ `FRONT_MVP_BASE.md` (este) - **CONCLUÍDO**
2) `FRONT_CATALOG_PDP.md` (componentes + detalhes de UI)
3) `FRONT_CART.md` (estado do carrinho + persistência) - **PARCIALMENTE IMPLEMENTADO**
4) `FRONT_CHECKOUT_UI.md` (checkout multi-step + validações) - **PARCIALMENTE IMPLEMENTADO**
5) `FRONT_UPSELL_UI.md` (order bump + regras visuais) - **IMPLEMENTADO NO PaymentStep**
