export function getImageUrl(name: string) {
  return new URL(`../../assets/temp/icons/${name}.png`, import.meta.url).href;
}
