# FRONT_CHECKOUT_UI.md — Checkout (UI) — Essence Árabe

> Objetivo: Implementar o checkout “rápido e coisa fina” **somente no Front** (sem backend), com steps claros, validação e um **upsell/order bump**.
> Resultado: fluxo completo do carrinho → checkout → “pedido confirmado (mock)”.
> Persistência: localStorage (rascunho do checkout), para não perder dados.

---

## 0) Requisitos do MVP (UI)

- Checkout com **poucos campos** + UX mobile.
- Sem login obrigatório (guest), mas já prevendo “criar conta depois”.
- Confirmação final exibe “Resumo do pedido + próximo passo no WhatsApp”.

---

## 1) Rotas e Páginas

- `/checkout` (wizard)
- `/checkout/sucesso` (tela final mock)
- (opcional) `/checkout/erro` (para simular falha no pagamento)

---

## 2) Modelo de dados (Front-only)

Criar `src/types/checkout.ts`

### 2.1 CheckoutDraft
- `contact`
  - `fullName: string`
  - `whatsapp: string` (obrigatório)
  - `email?: string`
- `delivery`
  - `cep: string`
  - `addressLine1: string` (rua, número)
  - `addressLine2?: string` (complemento)
  - `neighborhood: string`
  - `city: string`
  - `state: string`
  - `reference?: string`
  - `shippingMethodId: string` (ex: `EXPRESS_24H`, `STANDARD`)
- `payment`
  - `method: 'PIX' | 'CARD' | 'BOLETO' | 'WHATSAPP_PAY'` *(MVP pode ser só PIX + CARD mock)*
  - `card?: { holderName; number; expiry; cvv }` *(mock/mascarado)*
- `orderBump`
  - `enabled: boolean`
  - `offerId?: string`
- `notes?: string` (observações)
- `acceptTerms: boolean`
- `createdAt`, `updatedAt`

### 2.2 OrderPreview (derivado do carrinho)
- `items: CartItem[]`
- `subtotal`
- `discount`
- `shipping`
- `orderBumpValue`
- `total`

---

## 3) Persistência do Checkout

Chave: `EA_CHECKOUT_DRAFT_V1`

Regras:
- salvar a cada mudança (debounce 300–600ms)
- limpar no “sucesso”
- se carrinho ficar vazio → redirecionar para `/carrinho`

---

## 4) Estrutura do Checkout (Wizard)

### 4.1 Steps
1) **Contato**
2) **Entrega**
3) **Pagamento**
4) **Revisão**

> UI: barra de progresso (StepIndicator) + botão voltar sempre visível.

### 4.2 Navegação
- `Next` só habilita se o step atual estiver válido
- `Back` preserva dados
- Deep link opcional: `?step=delivery` (não obrigatório)

---

## 5) Componentes (Front)

### 5.1 CheckoutLayout
Arquivo: `src/components/checkout/CheckoutLayout.tsx`

Layout:
- Coluna esquerda: Step content
- Coluna direita: `OrderSummarySticky` (sempre mostrando total)

Mobile:
- Summary vira accordion fixo no rodapé (“Ver resumo”)

---

### 5.2 StepIndicator
Arquivo: `src/components/checkout/StepIndicator.tsx`

- mostra steps e status (done/current/locked)

---

### 5.3 StepContact
Arquivo: `src/components/checkout/steps/StepContact.tsx`

Campos:
- Nome completo (obrig.)
- WhatsApp (obrig.) máscara BR `+55 (DD) 9XXXX-XXXX`
- Email (opcional)

UX:
- hint: “Vamos enviar atualizações do pedido por WhatsApp”

Validação:
- nome mínimo 3 chars
- whatsapp com 10/11 dígitos (sem máscara)

---

### 5.4 StepDelivery
Arquivo: `src/components/checkout/steps/StepDelivery.tsx`

Campos:
- CEP (obrig.) máscara `00000-000`
- Endereço (rua/número)
- Complemento
- Bairro
- Cidade
- UF (select)
- Referência

Shipping methods (mock):
- `EXPRESS_24H`: “Envio em até 24h (compras até 12h)” + preço
- `STANDARD`: “Padrão” + preço

CEP lookup (UI):
- MVP: botão “Buscar CEP” que só simula preenchimento
- Futuro: integrar ViaCEP

---

### 5.5 StepPayment
Arquivo: `src/components/checkout/steps/StepPayment.tsx`

Métodos:
- PIX (recomendado) — exibe vantagem: “confirmação mais rápida”
- Cartão (mock) — captura dados mascarados (não armazenar completo em localStorage)
- (opcional) “Pagar no WhatsApp” — abre CTA “Falar com atendimento”

Validação:
- PIX: ok sem campos
- Cartão: holderName + number (len), expiry, cvv (len)

**Aviso importante (MVP):**
- Se cartão for mock, mostrar “Pagamento será confirmado manualmente no MVP”.

---

### 5.6 OrderBump (Upsell no checkout)
Arquivo: `src/components/checkout/OrderBump.tsx`

Posição: entre Payment e Review ou dentro do Review.

Formato:
- Card com toggle:
  - “Adicionar **Hidratante/Decant/Refil** com desconto”
  - exibir “+R$ XX,XX” e benefício

Regras MVP:
- só 1 bump ativo
- ao marcar, soma no total

Dados mock: `src/data/orderBumps.ts`
Ex:
- `DECANT_5ML_KHAMRAH` (R$ 39)
- `PORTA_PERFUME` (R$ 29)

---

### 5.7 OrderSummarySticky
Arquivo: `src/components/checkout/OrderSummarySticky.tsx`

Mostra:
- itens (compacto)
- subtotal, cupom (do carrinho), frete, bump, total
- “Editar carrinho” → `/carrinho`

---

### 5.8 StepReview
Arquivo: `src/components/checkout/steps/StepReview.tsx`

Resumo final:
- contato
- entrega
- método pagamento
- lista itens
- bump (se ativo)
- total
- checkbox: “Concordo com os termos”
- botão final: “Confirmar pedido”

---

## 6) Confirmação (Sucesso) — UI

Página: `src/pages/CheckoutSuccess.tsx`

- “Pedido confirmado 🎉”
- gera um `orderCode` mock: `EA-YYYYMMDD-XXXX`
- CTA 1: “Acompanhar pelo WhatsApp”
  - link com mensagem pronta (copiar/abrir):
    - “Oi! Meu pedido {orderCode} foi confirmado. Pode me atualizar o status?”
- CTA 2: “Continuar comprando”

---

## 7) Validações e Erros (UI)

- Exibir erros abaixo dos inputs
- No `Confirmar pedido`, se inválido:
  - scroll para o primeiro erro
  - highlight do campo
- Se carrinho vazio em qualquer step → redirect `/carrinho`

---

## 8) Acessibilidade e Polimento

- Inputs com labels reais (não só placeholder)
- Teclado mobile:
  - WhatsApp: input type tel
  - CEP: tel
- Botões grandes, foco visível
- “Salvar automaticamente” (texto pequeno no topo)

---

## 9) Checklist (DoD)

- [x] `/checkout` wizard completo com 4 steps
  - [x] Step 1: Contato (nome, email, WhatsApp)
  - [x] Step 2: Entrega (CEP, endereço, método de frete)
  - [x] Step 3: Pagamento (PIX/Cartão + Order Bump)
  - [x] Step 4: Revisão (resumo completo + termos)
- [x] `CheckoutDraft` persistido no localStorage
  - [x] Chave: `EA_CHECKOUT_DRAFT_V1`
  - [x] Salva automaticamente a cada mudança
  - [x] Carrega dados salvos ao reabrir checkout
  - [x] Limpa após confirmação do pedido
- [x] Summary sticky funciona e atualiza total
  - [x] Desktop: coluna direita fixa
  - [x] Mobile: accordion no rodapé
  - [x] Mostra itens, subtotal, desconto, frete, upsell, total
  - [x] Link "Editar carrinho"
- [x] Order bump soma no total
  - [x] Implementado no PaymentStep
  - [x] Soma corretamente no cálculo final
- [x] Validações básicas em todos steps
  - [x] Contato: nome (min 2), email válido, WhatsApp válido
  - [x] Entrega: CEP válido, campos obrigatórios
  - [x] Pagamento: validação de cartão (se selecionado)
  - [x] Revisão: checkbox de termos obrigatório
- [x] `/pedido/:orderId` gera orderCode mock e CTA WhatsApp
  - [x] Formato: `EA-YYYYMMDD-XXXX`
  - [x] CTA "Acompanhar pelo WhatsApp" com mensagem pré-formatada
  - [x] Link abre WhatsApp com mensagem do pedido
- [x] Não armazena dados sensíveis de cartão em localStorage
  - [x] Dados de cartão não são persistidos (apenas método de pagamento)
  - [x] Aviso no PaymentStep sobre pagamento mock

---

## 10) Status de Implementação

**Data de conclusão:** Janeiro 2025

### ✅ Implementado

- **Tipos:** `src/types/checkout.ts` com CheckoutDraft e OrderPreview
- **Persistência:** Hook `useCheckoutDraft` com localStorage `EA_CHECKOUT_DRAFT_V1`
- **Componentes:**
  - `CheckoutSteps` - Indicador de progresso
  - `ContactStep` - Formulário de contato com validações
  - `ShippingStep` - Endereço e método de entrega
  - `PaymentStep` - PIX/Cartão + Order Bump
  - `OrderReview` - Revisão final com checkbox de termos
  - `OrderSummarySticky` - Resumo fixo (desktop) / accordion (mobile)
- **Páginas:**
  - `Checkout.tsx` - Wizard completo com layout de 2 colunas
  - `OrderSuccess.tsx` - Página de sucesso com orderCode e CTA WhatsApp
- **Funcionalidades:**
  - Auto-save do draft a cada mudança
  - Validações em todos os steps
  - Order bump funcional
  - Checkbox de termos obrigatório
  - Geração de orderCode no formato EA-YYYYMMDD-XXXX

### 📝 Observações

- Todos os dados são salvos localmente (sem backend)
- Dados de cartão não são persistidos (apenas método de pagamento)
- Order bump está integrado no PaymentStep
- Layout responsivo com summary fixo no mobile

---

## 11) Próximo .md

`FRONT_ACCOUNT_UI.md` — Cadastro/Login (UI), área do cliente (pedidos, endereços), e integração futura com o backend.
