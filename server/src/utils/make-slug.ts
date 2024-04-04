export function makeSlug(text: string): string {
  return text
    .normalize('NFD') // normalizar o texto
    .replace(/[\u0300-\u036f]/g, '') // remover acentos
    .toLowerCase() // converter para minúsculas
    .replace(/\s+/g, '-') // substituir espaços por hífens
    .replace(/[^\w\\-]+/g, '') // remover todos os caracteres não palavras
    .replace(/\\-\\-+/g, '-') // substituir múltiplos hífens por um
}
