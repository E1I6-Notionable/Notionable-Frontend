<template>
  <div class="template-list">
    <div class="template-item" v-for="(_, i) in 12" :key="i">
      <div class="template-img" />
      <div class="template-author">
        <span>추천</span>
        <span>서은</span>
      </div>
      <span class="template-title"
        >완벽한 학점 관리를 위한 예복습 노션 템플릿</span
      >
      <div class="template-price">
        <span>📃</span>
        <span>900원</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentCategory: {
      type: String,
    },
    currentPrice: {
      type: String,
    },
  },
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.template-item {
  margin-top: 2em;
  width: 320px;
}

.template-img {
  height: 220px;
  background-color: #e9e9e9;
  border-radius: 12px;
  cursor: pointer;
}

.template-author {
  margin: 1em 0 0.5em 0;
}

.template-author span:first-child {
  background-color: #d6e1f5;
  color: #3168cd;
  padding: 0.2em 0.5em;
  border-radius: 5px;
  font-weight: 600;
  margin-right: 0.5em;
}

.template-author span:last-child {
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
}

.template-price span {
  font-weight: 800;
  font-size: 1.1rem;
  margin-right: 0.4em;
}
</style>
