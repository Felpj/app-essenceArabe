# FRONT_PRODUCT_DETAILS_UPGRADE.md — Produto (PDP) com “Inspiração” — Essence Árabe

> Objetivo: Dar um **up** na página de detalhes do produto (PDP — Product Detail Page) com **inspiração do perfume**, narrativa, confiança e conversão.  
> Escopo: **Somente interface** (UI/UX) + mocks. Integrações reais depois.

---

## 1) Estrutura da Página (PDP)

Rota:
- `/produto/:slug`

Layout (mobile-first):
1. **Hero do produto** (imagens + nome + preço + CTA)
2. **Inspiração & DNA olfativo** (o “coração” da página)
3. **Notas olfativas** (topo/meio/fundo) + pirâmide visual
4. **Perfil / Ocasiões / Performance** (durabilidade, projeção, clima)
5. **Comparativo** (“parecido com…”, “vibe…”, “para quem curte…”)
6. **Reviews** (UGC) + fotos
7. **FAQ rápido** (fixação? original? troca? envio 24h?)
8. **Cross-sell / Você também vai curtir**
9. **Rodapé de confiança** + WhatsApp

---

## 2) Componentes essenciais (UI)

### 2.1 ProductHero
Arquivo: `src/components/pdp/ProductHero.tsx`
- Carrossel de imagens (zoom)
- Nome, marca (Lattafa), volume (ex: 100ml)
- Badges:
  - “Envio em até 24h”
  - “Mais vendido”
  - “Perfume árabe”
- Preço:
  - à vista
  - parcelado (UI pronto; cálculo real depois)
- CTA principal:
  - `Comprar agora`
- CTA secundário:
  - `Adicionar ao carrinho`
- Microcopy:
  - “Estoque do fornecedor • Postagem rápida”

---

### 2.2 InspirationBlock (Bloco de Inspiração)
Arquivo: `src/components/pdp/InspirationBlock.tsx`

**Conteúdo (estrutura padrão):**
- Título: `Inspirado em: {referencia}` (ex: “Angels’ Share (vibe)”)
- Subtítulo: “Mesma assinatura gourmand, especiada e licorosa”
- Texto narrativo curto (3–5 linhas) “história/sensação”
- Chips:
  - `Doce`
  - `Especiado`
  - `Ambarado`
  - `Gourmand`
- “Para quem é”:
  - 3 bullets (ex: “quer ser notado”, “ama perfumes doces”, “noite/rolês”)

**Aviso (compliance/ética):**
- “Inspiração olfativa. Não somos afiliados às marcas citadas.”

---

### 2.3 NotesPyramid (Notas olfativas + pirâmide)
Arquivo: `src/components/pdp/NotesPyramid.tsx`
- Seções:
  - **Saída (Top notes)**
  - **Coração (Middle notes)**
  - **Fundo (Base notes)**
- Visual de pirâmide (3 camadas)
- Tooltip por nota (descrição simples)
- “Acordes principais” (chips)

> MVP: notas vêm do mock `product.inspiration.notes`.

---

### 2.4 PerformancePanel
Arquivo: `src/components/pdp/PerformancePanel.tsx`
Sliders/ratings (UI):
- Fixação: `0–10`
- Projeção: `0–10`
- Rastro (sillage): `0–10`
- Melhor clima: chips (`frio`, `meia-estação`, `calor`)
- Ocasiões: chips (`noite`, `encontro`, `festa`, `trabalho`, `dia a dia`)

---

### 2.5 “Vibe/Similaridade” (ComparativeCards)
Arquivo: `src/components/pdp/ComparativeCards.tsx`
Cards:
- “Se você gosta de X, vai amar esse”
- “Mais doce / mais amadeirado / mais especiado que X”
- “Alternativa custo-benefício”

Regras:
- Nunca afirmar “é igual”; usar “vibe”, “assinatura”, “lembra”.

---

### 2.6 Social Proof (Reviews)
Arquivo: `src/components/pdp/Reviews.tsx`
- Nota média
- Distribuição por estrelas
- Fotos dos clientes (grid)
- Ordenação: “mais úteis”, “mais recentes”
- CTA: “Enviar review” (UI; futuro autenticação)

MVP:
- 8–12 reviews mock por produto top.

---

### 2.7 PDP TrustBar
Arquivo: `src/components/pdp/TrustBar.tsx`
- Envio 24h
- Troca fácil
- Suporte WhatsApp
- Pagamento seguro

---

### 2.8 Sticky Buy Bar (mobile)
Arquivo: `src/components/pdp/StickyBuyBar.tsx`
- Preço + CTA “Comprar agora”
- Mostrar variação selecionada (se houver)

---

## 3) Conteúdo “Inspiração” (modelo canônico)

### 3.1 Estrutura de dados (mock)
Arquivo: `src/mocks/products.ts`

Exemplo:
```ts
type Inspiration = {
  inspiredBy?: {
    name: string;        // "Angels' Share"
    brand?: string;      // "Kilian"
    mode: "vibe" | "dupe" | "inspired"; // default: "vibe"
    disclaimer: string;  // texto fixo
  };
  story: string;         // narrativa curta
  accords: string[];     // ["Gourmand", "Canela", "Baunilha", ...]
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  profile: {
    sweetness: number;   // 0-10
    freshness: number;
    woods: number;
    spices: number;
    longevity: number;
    projection: number;
  };
  occasions: string[];
  season: string[];
};
