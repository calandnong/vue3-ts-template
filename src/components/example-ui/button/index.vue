<script setup lang="ts">
export interface Props {
  text?: string;
  type?: 'normal' | 'disable';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  text: '',
  type: 'normal',
  disabled: false,
});

const emits = defineEmits<{
  (e: 'click'): void;
}>();

function onClick() {
  emits('click');
}

</script>

<template>
  <button
    class="eui-button"
    :class="[`eui-button-type_${type}`, {
      'eui-button-status_disabled': disabled
    }]"
    v-bind="{
      'disabled': disabled
    }"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 0; /* 去除内边距 */
  margin: 0; /* 去除外边距 */
  background-color: transparent; /* 去除背景色 */
  border: none; /* 去除边框 */
  outline: none; /* 去除聚焦时的描边 */
  cursor: pointer; /* 鼠标悬停时变为手型 */
}
.eui-button {
  width: 290rem;
  height: 88rem;

  /* 副标题 */
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 36rem;
  line-height: 50rem;
  text-align: center;
  border-radius: 20rem;

  &-type_normal {
    color: #FFFFFF;
    background: #164894;
  }

  &-status_disabled {
    color: #FFFFFF;
    background: #8D96A5;
  }
}

</style>
