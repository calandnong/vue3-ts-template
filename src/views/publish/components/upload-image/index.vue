<script setup lang="ts">
import { computed, ref } from 'vue';
import { UploadStatus, generateUniqueId } from './use';
import EuiIcon from '@/components/example-ui/icon/index.vue';

export interface Image {
  /**
   * 图片唯一id
   */
  uid: string;
  /**
   * 图片地址
   */
  url: string;
  /**
   * 图标上传状态
   */
  status: UploadStatus;
  /**
   * 图片上传返回的内容
   */
  response?: unknown;
}

export interface Props {
  /**
   * 输入的值
   */
  modelValue?: Image[];
  /**
   * 最大上传数
   */
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return [];
  },
  max: 9,
});

// const emits = defineEmits<{
//   (e: 'update:modelValue', value: string): void;
// }>();

/**
 * 上传列表
 */
const uploadList = ref<Image[]>([]);

const uploadCount = computed(() => {
  return uploadList.value.length;
});

const isUploadMax = computed(() => {
  return uploadCount.value >= props.max;
});

function select(payload: Event) {
  const target = payload.target as HTMLInputElement;
  if (!target.files?.length) {
    console.log('未选择文件！');
    return;
  }
  const preUploadCount = target.files.length;
  if ((preUploadCount + uploadCount.value) > props.max) {
    console.log('文件已达最大');
    return;
  }
  Array.from(target.files).forEach((file) => {
    console.log(file);
    // 获取本地地址
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      uploadList.value.push({
        uid: generateUniqueId(),
        url: fileReader.result as string,
        status: UploadStatus.UPLOADING,
      });
    };
    fileReader.readAsDataURL(file as Blob);
  // 上传...
  });
  target.value = '';
}

</script>

<template>
  <div class="upload-image">
    <div class="upload-image-body">
      <!-- 输入的已上传的图片 -->

      <!-- 已选上传的图片列表 -->
      <template
        v-for="item in uploadList"
        :key="item.uid"
      >
        <div class="upload-image-item">
          <img
            :src="item.url"
          >
          <!-- 上传中 -->
          <div class="upload-image-item-uploading">
            上传中...
          </div>
        </div>
      </template>
      <div
        v-show="!isUploadMax"
        class="upload-image-select"
      >
        <eui-icon
          class="upload-image-select-icon"
          :name="'image'"
        />
        <span class="insert-tips">添加图片</span>
        <span class="insert-count">（{{ uploadCount }}/9）</span>
        <input
          class="upload-image-select_input"
          type="file"
          multiple
          @change="select"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-image {

  &-body {
    display: flex;
    flex-wrap: wrap;
  }

  @mixin image {
    width: 224rem;
    height: 224rem;
    margin-right: 6rem;
    margin-bottom: 6rem;
    border-radius: 8rem;
    overflow: hidden;
  }

  &-item {
    position: relative;
    @include image;

    >img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-uploading {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      color: #FFFFFF;
      font-size: 24rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &-select {
    @include image;
    position: relative;
    background: #F2F2F2;
    border-radius: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-icon {

    }

    .insert-tips {
      /* 中文/说明文字/Regular */
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 24rem;
      line-height: 40rem;
      /* identical to box height, or 167% */
      text-align: center;
      /* 文字&图标色/Font Gy2 60% */
      color: rgba(0, 0, 0, 0.6);
    }

    .insert-count {
      /* 中文/最小说明文字/Regular */
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 20rem;
      line-height: 36rem;
      /* identical to box height, or 180% */
      text-align: center;
      /* 文字&图标色/Font Gy3 40% */
      color: rgba(0, 0, 0, 0.4);
    }

    &_input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
