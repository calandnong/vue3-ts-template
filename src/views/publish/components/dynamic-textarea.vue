<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  /**
   * 输入的值
   */
  modelValue?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const dynamicTextarea = ref<HTMLTextAreaElement | null>(null);

interface DynamicTextareaStyle {
  height?: string;
}
const dynamicTextareaStyle = ref<DynamicTextareaStyle>({
});

function initHeight() {
  if (dynamicTextarea.value) {
    dynamicTextarea.value.style.height = 'auto';
  }
}

function resetHeight() {
  if (dynamicTextarea.value) {
    dynamicTextarea.value.style.height = `${dynamicTextarea.value.scrollHeight}px`;
  }
}

function input(payload: Event) {
  const target = payload.target as HTMLTextAreaElement;
  if (target.value) {
    resetHeight();
  }
  else {
    initHeight();
  }
  emits('update:modelValue', target.value);
}

</script>

<template>
  <div class="dynamic-textarea">
    <textarea
      ref="dynamicTextarea"
      :style="dynamicTextareaStyle"
      class="dynamic-textarea_textarea"
      placeholder="想说你就多说点～"
      placeholder-class="dynamic-textarea-placeholder"
      :value="modelValue"
      @input="input"
    />
  </div>
</template>

<style lang="scss" scoped>
.dynamic-textarea {
  display: block;
  width: 100%;
  min-height: 192rem;
  max-height: 384rem;
  overflow-y: scroll;

  &_textarea {
    width: 100%;
    height: auto;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 32rem;
    line-height: 48rem;
    color: rgba(0, 0, 0, 0.6);
    resize: none; /* 禁止用户调整大小 */

    &-placeholder {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 32rem;
      line-height: 48rem;
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
