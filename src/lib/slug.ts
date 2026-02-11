/**
 * Gera slug a partir de string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Gera slug para produto (nome + marca)
 */
export function generateProductSlug(name: string, brand: string): string {
  return generateSlug(`${name}-${brand}`);
}
