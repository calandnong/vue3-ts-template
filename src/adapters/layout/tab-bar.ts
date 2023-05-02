import { ref } from 'vue';

const isTabBarShow = ref(false);

export function showTabBar() {
  isTabBarShow.value = true;
}

export function hideTabBar() {
  isTabBarShow.value = false;
}
