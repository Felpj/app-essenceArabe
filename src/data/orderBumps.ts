/**
 * Order Bumps (Upsells) mockados para checkout
 */

export interface OrderBump {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  benefit?: string;
}

export const orderBumps: OrderBump[] = [
  {
    id: "DECANT_5ML_KHAMRAH",
    title: "Amostra 5ml - Khamrah",
    description: "Experimente nossa fragrância mais vendida em tamanho de teste",
    price: 29.9,
    benefit: "Perfeito para testar antes de comprar o frasco completo",
  },
  {
    id: "PORTA_PERFUME",
    title: "Porta Perfume Premium",
    description: "Proteja seus perfumes com nosso porta perfume elegante",
    price: 39.9,
    benefit: "Mantém a fragrância preservada por mais tempo",
  },
  {
    id: "KIT_HIDRATANTE",
    title: "Kit Hidratante Corporal",
    description: "Hidratante corporal com fragrância suave",
    price: 49.9,
    benefit: "Compre junto e ganhe 15% de desconto",
  },
];

export function getOrderBumpById(id: string): OrderBump | undefined {
  return orderBumps.find((bump) => bump.id === id);
}
