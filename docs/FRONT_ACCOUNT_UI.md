# FRONT_ACCOUNT_UI.md — Conta do Cliente (UI) — Essence Árabe

> Objetivo: Criar a experiência de **cadastro/login + área do cliente** (somente Front) sem travar o checkout.
> Estratégia: **Guest-first**, com “criar conta depois” (post-purchase) e rotas prontas para integrar API no futuro.

---

## 0) Princípios (MVP)

- Checkout não exige login.
- Cliente pode:
  1) comprar como convidado
  2) depois “criar conta” e **vincular pedidos** via WhatsApp/Email (mock agora).
- Tudo no Front usando `localStorage` como fonte de verdade do MVP.

---

## 1) Rotas e Páginas

### Público
- `/entrar` (login)
- `/criar-conta` (signup)
- `/recuperar-senha` (mock)

### Privado (proteção via estado local)
- `/conta` (dashboard)
- `/conta/pedidos`
- `/conta/pedidos/:orderCode`
- `/conta/enderecos`
- `/conta/cupons` (UI)
- `/conta/indicacoes` (UI)
- `/conta/preferencias` (UI)

> MVP: bloqueio simples com `isAuthenticated` (mock). Futuro: JWT.

---

## 2) Modelo de dados (Front-only)

Criar `src/types/account.ts`

### 2.1 CustomerProfile
- `id: string` (uuid)
- `fullName: string`
- `email?: string`
- `whatsapp: string`
- `createdAt`, `updatedAt`

### 2.2 AuthSession (mock)
- `isAuthenticated: boolean`
- `customerId?: string`
- `token?: string` (futuro)

### 2.3 Address
- `id: string`
- `label: 'Casa' | 'Trabalho' | 'Outro'`
- `cep, addressLine1, addressLine2?, neighborhood, city, state, reference?`
- `isDefault: boolean`

### 2.4 CustomerOrder (espelho do CheckoutSuccess)
- `orderCode: string` (EA-YYYYMMDD-XXXX)
- `status: 'CONFIRMADO' | 'EM_SEPARACAO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO'`
- `total: number`
- `items: { name; qty; price; }[]`
- `createdAt: string`
- `tracking?: { carrier?: string; code?: string; url?: string }`

Persistência:
- `EA_CUSTOMER_PROFILE_V1`
- `EA_AUTH_SESSION_V1`
- `EA_CUSTOMER_ADDRESSES_V1`
- `EA_CUSTOMER_ORDERS_V1`

---

## 3) Componentes (Front)

### 3.1 AuthLayout
Arquivo: `src/components/auth/AuthLayout.tsx`

- card central com logo “Essence Árabe”
- textos curtos + prova social (“+X pedidos entregues”) (mock)

---

### 3.2 LoginForm (UI)
Arquivo: `src/components/auth/LoginForm.tsx`

Campos:
- WhatsApp ou Email
- Senha

MVP (mock):
- “Entrar” cria sessão local.
- Exibir mensagem: “No MVP, o acesso é simplificado.”

CTA secundária:
- “Criar conta”
- “Esqueci minha senha” (vai para `/recuperar-senha`)

---

### 3.3 SignupForm (UI)
Arquivo: `src/components/auth/SignupForm.tsx`

Campos:
- Nome completo
- WhatsApp
- Email (opcional)
- Senha (mínimo 8)
- Confirmar senha

Opção:
- checkbox “Receber novidades no WhatsApp” (preferência)

MVP:
- cria `CustomerProfile` + `AuthSession`

---

### 3.4 ProtectedRoute (mock)
Arquivo: `src/components/auth/ProtectedRoute.tsx`

- se `!isAuthenticated` → redirect `/entrar?next=/conta/...`

---

## 4) Área do Cliente (Dashboard)

### 4.1 AccountHome
Arquivo: `src/pages/account/AccountHome.tsx`

Cards:
- “Meus pedidos”
- “Endereços”
- “Cupons”
- “Indicações”
- “Preferências”

Header:
- saudação + botão “Sair”

---

## 5) Pedidos (UI)

### 5.1 OrdersList
Arquivo: `src/pages/account/OrdersList.tsx`

Lista com:
- orderCode
- data
- status (badge)
- total
- botão “Ver detalhes”

Filtros (MVP):
- status (select)
- busca por orderCode

Estados vazios:
- “Você ainda não tem pedidos. Ver catálogo.”

---

### 5.2 OrderDetails
Arquivo: `src/pages/account/OrderDetails.tsx`

Exibir:
- resumo do pedido
- itens
- endereço (snapshot do checkout — mock)
- status + timeline (mock)
- tracking (se existir)
- botão “Falar no WhatsApp sobre este pedido”
  - mensagem pronta com `orderCode`

---

## 6) Endereços (UI)

### 6.1 Addresses
Arquivo: `src/pages/account/Addresses.tsx`

Funcionalidades:
- listar endereços
- adicionar
- editar
- remover
- marcar como padrão

Form:
- mesmos campos do StepDelivery do checkout

UX:
- botão “Usar este endereço no checkout” (só navega para `/checkout` e pré-preenche draft)

---

## 7) Cupons (UI)

### 7.1 Coupons
Arquivo: `src/pages/account/Coupons.tsx`

MVP:
- lista de cupons mock:
  - `PRIMEIRACOMPRA10` (10% off)
  - `FRETEGRATIS` (condicional)
- botão “Copiar código”
- aviso: “Aplicação do cupom ocorre no carrinho/checkout” (UI)

> Futuro: API + validação + regras por categoria/sku.

---

## 8) Indicações (UI)

### 8.1 Referrals
Arquivo: `src/pages/account/Referrals.tsx`

Conteúdo:
- “Seu link de indicação” (mock)
- botão “Copiar link”
- contador mock:
  - cliques
  - cadastros
  - pedidos

Regras MVP (só UI):
- explicar benefícios:
  - “Você ganha R$X de desconto”
  - “Seu amigo ganha frete grátis”

---

## 9) Preferências (UI)

### 9.1 Preferences
Arquivo: `src/pages/account/Preferences.tsx`

Preferências:
- receber novidades no WhatsApp (toggle)
- receber email (toggle)
- categorias favoritas (chips): “Doce”, “Amadeirado”, “Fresco”, “Árabe intenso”
- “Salvar” (persist local)

---

## 10) Integração futura (sem implementar agora)

### 10.1 Contratos esperados (placeholders)
- `POST /auth/login`
- `POST /auth/signup`
- `GET /me`
- `GET /me/orders`
- `GET /me/orders/:id`
- `CRUD /me/addresses`
- `GET /me/coupons`
- `GET /me/referrals`

### 10.2 Migração do localStorage para API
- criar camada `src/lib/api/*`
- manter interface dos hooks:
  - `useAuth()`
  - `useCustomer()`
  - `useOrders()`
  - `useAddresses()`

---

## 11) Checklist (DoD)

- [x] Login UI + session mock
  - [x] LoginForm com validação de email/WhatsApp
  - [x] AuthLayout com prova social
  - [x] Sessão mockada no localStorage
- [x] Signup UI + profile mock
  - [x] SignupForm com validações
  - [x] Criação de perfil mock
  - [x] Checkbox de preferências
- [x] ProtectedRoute funcionando
  - [x] Redireciona para login se não autenticado
  - [x] Preserva URL de destino (next param)
- [x] Dashboard `/conta`
  - [x] Cards de navegação
  - [x] Pedidos recentes
  - [x] Botão de logout
- [x] Lista de pedidos + detalhes (mock)
  - [x] OrdersList com filtros (status, busca)
  - [x] OrderDetails com timeline e informações completas
  - [x] CTA WhatsApp para suporte
- [x] Endereços CRUD (local)
  - [x] Listar endereços
  - [x] Adicionar/editar/remover
  - [x] Marcar como padrão
  - [x] Botão "Usar no checkout"
- [x] Cupons (UI) + copiar
  - [x] Lista de cupons mockados
  - [x] Botão copiar código
  - [x] Instruções de uso
- [x] Indicações (UI) + copiar link
  - [x] Link e código de indicação
  - [x] Estatísticas mockadas
  - [x] Explicação de benefícios
- [x] Preferências (UI) + persistência
  - [x] Toggles de notificações
  - [x] Seleção de categorias favoritas
  - [x] Persistência no localStorage

---

## 12) Status de Implementação

**Data de conclusão:** Janeiro 2025

### ✅ Implementado

- **Tipos:** `src/types/account.ts` com CustomerProfile, AuthSession, Address, CustomerOrder, CustomerPreferences
- **Stores:**
  - `auth.store.ts` - Autenticação e perfil do cliente
  - `customer.store.ts` - Endereços, pedidos e preferências
- **Componentes de Auth:**
  - `AuthLayout` - Layout centralizado com logo e prova social
  - `LoginForm` - Formulário de login com validação
  - `SignupForm` - Formulário de cadastro completo
  - `ProtectedRoute` - Rota protegida com redirecionamento
- **Páginas de Auth:**
  - `Login.tsx` - Página de login
  - `Signup.tsx` - Página de cadastro
  - `RecoverPassword.tsx` - Recuperação de senha (mock)
- **Páginas da Área do Cliente:**
  - `AccountHome.tsx` - Dashboard com cards e pedidos recentes
  - `OrdersList.tsx` - Lista de pedidos com filtros
  - `OrderDetails.tsx` - Detalhes do pedido com timeline
  - `Addresses.tsx` - CRUD completo de endereços
  - `Coupons.tsx` - Lista de cupons com cópia de código
  - `Referrals.tsx` - Sistema de indicações com link e estatísticas
  - `Preferences.tsx` - Preferências de notificações e categorias
- **Rotas:** Todas as rotas adicionadas no `App.tsx` com proteção

### 📝 Observações

- Autenticação é mockada (qualquer credencial válida funciona no MVP)
- Todos os dados são persistidos no localStorage
- Endereços podem ser pré-preenchidos no checkout
- Sistema de indicações gera link único baseado no ID do cliente
- Preferências incluem notificações e categorias favoritas

---

## 13) Próximo .md

`FRONT_UPSELL_UI.md` — Upsell/Cross-sell no catálogo, PDP e pós-compra (order bump, bundles, "compre junto", progress bar de frete, etc.).
