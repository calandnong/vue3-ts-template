import type { Ref } from 'vue';

export function getDomFile(refDom: Ref<any>): File[] {
  return refDom.value.files;
}
