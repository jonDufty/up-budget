export function capitaliseApiString(text: string): string {
  const words = text.split('-');
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export function convertToApiString(text: string): string {
  const words = text.split(' ').map((w) => w.toLowerCase());
  return words.join('-');
}
