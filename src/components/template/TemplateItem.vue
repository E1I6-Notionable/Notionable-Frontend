<template>
  <div class="template-item">
    <img
      class="template-img"
      :src="template.thumbnail"
      @click="toTemplatePage(template.templateId)"
    />
    <div class="template-author">
      <span class="template-recommend">추천</span>
      <span class="template-author">{{ template.nickName }}</span>
    </div>
    <span class="template-title" @click="toTemplatePage(template.templateId)">{{
      template.title
    }}</span>
    <div class="template-price">
      <img src="/img/icon/price-receipt.png" />
      <span>{{ template.price ? `${template.price}원` : '무료' }}</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    template: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const toTemplatePage = id => {
      router.push(`template/${id}`);
    };

    return {
      toTemplatePage,
    };
  },
};
</script>

<style>
.template-item {
  margin-top: 2em;
  width: calc(100% / 3);
  padding: 0 1em;
}

.template-img {
  height: 220px;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  object-fit: cover;
}

.template-author {
  margin: 1em 0 0.5em 0;
}

.template-recommend {
  background-color: #d6e1f5;
  color: #3168cd;
  padding: 0.2em 0.5em;
  border-radius: 5px;
  font-weight: 600;
  margin-right: 0.5em;
}

.template-author {
  color: #7b7b7b;
  font-weight: 500;
}

.template-title {
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
}

.template-price {
  margin-top: 0.8em;
  display: flex;
  align-items: flex-start;
}

.template-price img {
  width: 22px;
  margin-right: 0.3em;
}

.template-price span {
  font-weight: 800;
  font-size: 1.1rem;
  margin-right: 0.4em;
}
</style>
