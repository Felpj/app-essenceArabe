# FRONT_CART.md — Carrinho (UI + Estado) — Essence Árabe

> Objetivo: Implementar o carrinho completo no Front com UX “coisa fina”.
> Escopo: **Somente interface + estado local** (sem API).
> Resultado: usuário consegue adicionar/remover/alterar quantidade, ver resumo e ir ao checkout.
> Persistência: localStorage.

---

## 0) Decisões de UX (MVP)

- Carrinho deve existir em qualquer página (ícone no Header com contador).
- “Adicionar ao carrinho” dá feedback instantâneo (toast ou mini-notificação).
- Ao adicionar do PDP:
  - mantém usuário na página e abre mini confirmação (toast) **ou**
  - abre “Cart Drawer” (opcional).
- Carrinho deve persistir ao recarregar página (localStorage).

---

## 1) Estado do Carrinho (store)

### 1.1 Sugestão: Zustand
Criar em `src/store/cart.store.ts`

**State:**
- `items: CartItem[]`
- `coupon?: { code: string; discountType: 'PERCENT'|'AMOUNT'; value: number } | null`
- `shippingSelection?: { id: string; label: string; price: number } | null` *(por enquanto, opcional)*
- `ui: { isCartDrawerOpen: boolean }` *(opcional)*

**CartItem:**
- `productId: string`
- `variantId?: string | null`
- `slug: string`
- `title: string`
- `brand?: string`
- `image: string`
- `price: number` (em centavos ou number BRL)
- `qty: number`
- `tags?: string[]` (ex: `["mais_vendido"]`)
- `inspiredBy?: string`

**Actions:**
- `addItem(payload, qty = 1)`
- `removeItem(key)`
- `setQty(key, qty)`
- `increment(key)`
- `decrement(key)` (mín 1)
- `clearCart()`
- `applyCoupon(code)` (UI fake, valida com mock)
- `removeCoupon()`
- `toggleCartDrawer(open?: boolean)` *(opcional)*
- `rehydrate()` (carrega do localStorage na inicialização)

**Selectors/Derived:**
- `itemsCount` (soma qty)
- `subtotal`
- `discountTotal` (se cupom aplicado)
- `total` (subtotal - desconto + frete se existir)

---

## 2) Persistência (localStorage)

### 2.1 Chave
- `EA_CART_V1`

### 2.2 Regras
- salvar `items + coupon` (e shipping opcional) a cada mudança
- rehidratar no `App.tsx` ou no `cart.store.ts` (on create)

---

## 3) Componentes a Implementar

### 3.1 Header Cart Badge
Arquivo: `src/components/layout/Header.tsx`

- Ícone de carrinho
- Badge com `itemsCount`
- Clique leva para `/carrinho` (MVP)
- Opcional: abre `CartDrawer`

---

### 3.2 AddToCartButton (reutilizável)
Arquivo: `src/components/commerce/AddToCartButton.tsx`

Props:
- `product` (payload já pronto com id/slug/title/image/price etc)
- `variantId?`
- `qty?` default 1
- `onAdded?()` callback para abrir drawer/toast

Comportamento:
- chama `cart.addItem`
- dispara feedback visual (toast)

---

### 3.3 CartItemRow
Arquivo: `src/components/commerce/CartItemRow.tsx`

UI:
- imagem
- título + “Inspirado em …” (texto menor)
- preço unitário
- stepper qty (+/-)
- subtotal do item
- remover (ícone lixeira)

Regras:
- `decrement` não deixa zerar (mín 1)
- stepper deve ser grande e clicável no mobile

---

### 3.4 CartSummary
Arquivo: `src/components/commerce/CartSummary.tsx`

Campos:
- Subtotal
- Cupom (input + botão “Aplicar”)
- Desconto (se existir)
- Frete: “calculado no checkout” (placeholder)
- Total estimado
- CTA:
  - “Finalizar compra” → `/checkout`
  - se carrinho vazio → botão desativado e copy “Seu carrinho está vazio”

---

### 3.5 CartEmptyState
Arquivo: `src/components/commerce/CartEmptyState.tsx`

UI:
- mensagem
- CTA “Ver catálogo”
- recomendação de 3 produtos (mock) (opcional)

---

### 3.6 Cart Page
Arquivo: `src/pages/Cart.tsx`

Layout:
- Coluna esquerda: lista itens
- Coluna direita: `CartSummary`
- Responsivo:
  - no mobile: resumo fixo no final (sticky) ou abaixo da lista

Estados:
- se `items.length === 0` → mostrar `CartEmptyState`

---

## 4) Chave do Item (dedupe)

Precisamos de uma key estável para agrupar itens iguais.

**Regra:**
- `key = productId + ':' + (variantId ?? 'default')`

Ao adicionar item:
- se key existe → incrementa qty
- se não existe → adiciona novo item

---

## 5) Cupom (UI fake)

Arquivo: `src/data/mockCoupons.ts`

Exemplos:
- `BEMVINDO10` → 10% off
- `FRETEGRATIS` → placeholder (não aplicar no MVP se quiser)
- `PIX5` → R$ 5 off (se pagamento pix futuramente)

Regras MVP:
- validar uppercase
- se inválido: mostrar erro no input
- se válido: mostrar badge “Cupom aplicado”

---

## 6) Testes rápidos (Vitest opcional)

- `addItem` agrupa itens iguais por key
- `increment/decrement` respeita mínimo
- `subtotal` correto
- cupom percentual funciona

---

## 7) Checklist (DoD)

- [x] Cart store com Zustand
  - [x] Estado com items e coupon
  - [x] Métodos addItem, removeItem, updateQuantity
  - [x] Métodos increment e decrement
  - [x] Métodos applyCoupon e removeCoupon
  - [x] Selectors: getTotalItems, getSubtotal, getDiscountTotal, getTotalPrice
- [x] Persistência localStorage funcionando
  - [x] Chave: `EA_CART_V1`
  - [x] Persiste items e coupon
- [x] AddToCartButton adiciona item e atualiza badge no header
  - [x] Integrado em ProductCard e ProductPage
  - [x] Toast de feedback ao adicionar
- [x] Página `/carrinho` lista itens + permite editar qty/remover
  - [x] CartItemRow com stepper (+/-)
  - [x] Botão remover funcional
  - [x] Layout responsivo
- [x] CartSummary calcula subtotal/total e aplica cupom mock
  - [x] Input de cupom funcional
  - [x] Validação de cupom (mockCoupons.ts)
  - [x] Exibição de desconto aplicado
  - [x] Remoção de cupom
- [x] Carrinho vazio tem empty state com CTA
  - [x] Componente CartEmptyState separado
  - [x] CTA para catálogo

---

## 8) Status de Implementação

**Data de conclusão:** Janeiro 2025

### ✅ Implementado

- **Store:** Zustand com persistência `EA_CART_V1`
- **Cupons:** Sistema de cupons mock com validação
- **Componentes:** CartItemRow, CartSummary, CartEmptyState, AddToCartButton
- **Funcionalidades:** increment/decrement, aplicação/remoção de cupom
- **Persistência:** localStorage com items e coupon

### 📝 Observações

- Cupons são validados localmente (sem backend)
- Cupons disponíveis: BEMVINDO10, FRETEGRATIS, PIX5, PRIMEIRA20
- Desconto calculado corretamente (percentual ou valor fixo)
- Carrinho persiste entre sessões

---

## 9) Próximo .md

`FRONT_CHECKOUT_UI.md` — Checkout multi-step (Contato → Entrega → Pagamento → Revisão), com validações e bump de upsell (UI). ✅ **JÁ IMPLEMENTADO**
