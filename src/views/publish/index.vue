<script setup lang="ts">
import { computed, ref } from 'vue';
import DynamicTextarea from './components/dynamic-textarea.vue';
import type { UploadMethod, FormatFile, DeleteMethod } from './components/upload-image/index.vue';
import UploadImage from './components/upload-image/index.vue';
import EuiButton from '@/components/example-ui/button/index.vue';
import { onPageScroll } from '@/adapters/page-events';
import { publishUploadFile } from '@/api/upload';

console.log('重新渲染publish');

onPageScroll(() => {
  console.log('滚动了publish');
});

interface Dynamic {
  title: string;
  content: string;
}

const dynamic = ref<Dynamic>({
  title: '',
  content: '',
});

const isPublishButtonDisabled = computed(() => {
  if (!dynamic.value.title) {
    return true;
  }
  if (!dynamic.value.content) {
    return true;
  }
  return false;
});

const upload: UploadMethod = (file) => {
  return publishUploadFile({
    data: file,
  }).then((res) => {
    if (res.code === 200) {
      return {
        url: res.data.url,
        meta: res.data,
      };
    }
    return Promise.reject(new Error('错误了'));
  });
};

const deleteMethod: DeleteMethod = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

interface ImageListItem {
  imgUrl: string;
  id: string;
  message: string;
}

// 例如这里是后端返回的图片列表
const list: ImageListItem[] = [{
  id: '111',
  imgUrl: 'http://admin.con',
  message: '其他信息',
}];

const formatList = ref<FormatFile[]>([]);

setTimeout(() => {
  formatList.value = list.map((item) => {
    return {
      url: item.imgUrl,
      meta: item,
    };
  });
}, 1000);

</script>

<template>
  <div class="publish">
    <div class="dynamic-publish">
      <input
        v-model="dynamic.title"
        class="dynamic-title"
        type="text"
        placeholder-class="dynamic-title-placeholder"
        placeholder="请输入标题（必填）"
      >
      <div class="line" />
      <dynamic-textarea
        v-model="dynamic.content"
        class="dynamic-textarea"
      />
      <upload-image
        v-model="formatList"
        :config="{
          upload: upload,
          delete: deleteMethod
        }"
        class="dynamic-upload-image"
      />
    </div>
    <div class="publish-footer">
      <eui-button
        class="publish-button"
        :disabled="isPublishButtonDisabled"
      >
        立即发布
      </eui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.publish {
  height: 100%;
  position: relative;

  .dynamic {
    &-publish {
      padding: 24rem 30rem;
      background-color: #FFFFFF;
    }

    &-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 52rem;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 36rem;
      line-height: 52rem;
      margin-bottom: 16rem;
      color: rgba(0, 0, 0, 0.8);

      &-placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }

    &-textarea {
      margin-top: 24rem;
    }

    &-upload-image {
      margin-top: 40rem;
    }
  }

  &-footer {

  }

  &-button {
    display: block;
    margin: 200rem auto auto auto;
  }
}

.line {
  height: 0px;
  /* 功能色/中性色/Gray3-分割线 */
  border: 1rem solid #E7E7E7;
  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
}

</style>
