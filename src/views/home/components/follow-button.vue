<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  status?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  status: false,
});

const emits = defineEmits<{
  (e: 'change'): void;
}>();

const text = computed(() => {
  return props.status ? '已关注' : '+关注';
});

const onClick = () => {
  emits('change');
};

</script>

<template>
  <div
    class="follow-button"
    :class="{
      followed: status
    }"
    @click.stop="onClick"
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.follow-button {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24rem;
  background: #0095F2;
  color: #FFFFFF;
  border-radius: 32rem;
  width: 120rem;
  height: 56rem;
  line-height: 56rem;
  text-align: center;
}

.followed {
  background: rgba(0, 0, 0, 0.2);
}

</style>
