<script setup lang="ts">
import { computed, ref } from 'vue';
import FollowButton from './follow-button.vue';
import dynamic1 from '@/assets/temp/dynamic1.png';
import dynamic2 from '@/assets/temp/dynamic2.png';
import dynamic3 from '@/assets/temp/dynamic3.png';
import share from '@/assets/temp/share.png';
import comments from '@/assets/temp/comments.png';
import points from '@/assets/temp/points.png';
import collection from '@/assets/temp/collection.png';

export interface UserInfo {
  /**
   * 用户头像
   */
  avatar: string;
}

export interface DynamicInfo {
  /**
   * 用户信息
   */
  userInfo?: UserInfo;
}

interface Props {
  /**
   *
   */
  dynamicInfo?: DynamicInfo;
}

const props = withDefaults(defineProps<Props>(), {
  dynamicInfo: () => {
    return {};
  },
});

const userInfo = computed(() => {
  return props.dynamicInfo.userInfo;
});

const followStatus = ref(false);

function changeFollowStatus() {
  followStatus.value = !followStatus.value;
}

interface Image {
  url: string;
}

const images = ref<Image[]>([
  {
    url: dynamic1,
  },
  {
    url: dynamic2,
  },
  {
    url: dynamic3,
  },
  {
    url: dynamic3,
  },
]);

const sliceImages = computed(() => {
  return images.value.slice(0, 3);
});

const exceedContent = computed(() => {
  const content = images.value.length - 3;
  return `+${content}`;
});

</script>

<template>
  <div class="dynamic-card">
    <div class="dynamic-card-header">
      <img
        class="dynamic-card-header-avatar"
        :src="userInfo?.avatar"
        alt=""
      >
      <div class="dynamic-card-header-message">
        <div class="message-name">
          下课了
        </div>
        <div class="message-time">
          03月27日 21:75
        </div>
        <follow-button
          class="follow-button"
          :status="followStatus"
          @change="changeFollowStatus"
        />
      </div>
    </div>
    <div class="dynamic-card-title">
      今天天气好好呀！
    </div>
    <div class="dynamic-card-content">
      阳光明媚，微风习习，温度舒适宜人，真是一个让人心情舒畅的好天气！出门记得带上太阳镜和...
    </div>
    <div class="dynamic-card-images">
      <!-- 图片区 -->
      <img
        v-if="images.length === 1"
        class="dynamic-card-images-item"
        :src="images[0].url || dynamic1"
        alt=""
      >
      <template v-if="images.length > 1">
        <div class="dynamic-card-images-item-more">
          <template
            v-for="(item, index) in sliceImages"
            :key="index"
          >
            <template v-if="index === 2">
              <div class="more-img dynamic-card-images-item-more-max">
                <img
                  :src="item.url"
                  alt=""
                >
                <span class="exceed-content">{{ exceedContent }}</span>
              </div>
            </template>
            <img
              v-else
              class="more-img"
              :src="item.url"
              alt=""
            >
          </template>
        </div>
      </template>
    </div>
    <!-- 互动信息栏 -->
    <div class="dynamic-card-interactive-information">
      <div class="interactive-information">
        <img
          class="template-icon"
          :src="share"
        >2486
      </div>
      <div class="interactive-information">
        <img
          class="template-icon"
          :src="comments"
        >2486
      </div>
      <div class="interactive-information">
        <img
          class="template-icon"
          :src="points"
        >2486
      </div>
      <div class="interactive-information">
        <img
          class="template-icon"
          :src="collection"
        >2486
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-card {
  background-color: #FFFFFF;
  border-radius: 16rem;
  padding: 32rem 24rem 0 24rem;

  &-header {
    height: 100rem;
    display: flex;
    align-items: center;

    &-avatar {
      width: 100rem;
      height: 100rem;
      background-color: bisque;
      border-radius: 100%;
    }

    &-message {
      flex: 1;
      margin-left: 24rem;
      position: relative;

      .message {
        &-name {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 32rem;
          line-height: 48rem;
          color: rgba(0, 0, 0, 0.8);
        }

        &-time {
          margin-top: 8rem;
          font-family: 'Helvetica';
          font-style: normal;
          font-weight: 400;
          font-size: 24rem;
          line-height: 40rem;
          color: rgba(0, 0, 0, 0.4);
        }
      }

      .follow-button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }

    }
  }

  &-title {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 32rem;
    line-height: 48rem;
    margin-top: 8rem;
    margin-bottom: 8rem;
  }

  &-content {
    /* 中文/次要正文/Regular */
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 28rem;
    line-height: 44rem;
    /* 文字&图标色/Font Gy2 60% */
    color: rgba(0, 0, 0, 0.6);
  }

  &-images {
    margin-top: 8rem;

    &-item {
      display: inline-block;
      background-color: aquamarine;
      width: 642rem;
      border-radius: 16rem;

      &-more {
        margin-left: -8rem;

        .more-img {
          margin-left: 8rem;
          border-radius: 8rem;
          overflow: hidden;
          width: 208rem;
          height: 208rem;
        }

        &-max {
          margin-left: 8rem;
          display: inline-block;
          position: relative;

          > img {
            width: 100%;
            height: 100%;
          }

          .exceed-content {
            margin-left: 0;
            font-family: 'Helvetica';
            font-style: normal;
            font-weight: 400;
            font-size: 42rem;
            line-height: 58rem;
            color: #FFFFFF;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.6);
          }
        }
      }
    }
  }

  &-interactive-information {
    margin-top: 24rem;
    padding-bottom: 24rem;
    display: flex;
    justify-content: space-between;
  }

}

.interactive-information {
  display: flex;
  align-items: center;
  .template-icon {
    width: 32rem;
    height: 32rem;
    margin-right: 8rem;
  }
}

</style>
