import { ref } from 'vue';

const isNavigationBarShow = ref(false);

export function showTabBar() {
  isNavigationBarShow.value = true;
}

export function hideTabBar() {
  isNavigationBarShow.value = false;
}
