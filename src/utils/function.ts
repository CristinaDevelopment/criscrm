export function capitalizar(palabras: string) {
  return palabras
    .split(' ')
    .map((palabra) => palabra[0].toUpperCase() + palabra.substring(1))
    .join(' ');
}

export function slug(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\u002F]/g, '')
    .replace(/-/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/-/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '-');
}
