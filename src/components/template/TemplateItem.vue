<template>
  <div class="template-item">
    <div class="template-img" />
    <div class="template-author">
      <span>추천</span>
      <span>서은</span>
    </div>
    <span class="template-title"
      >완벽한 학점 관리를 위한 예복습 노션 템플릿</span
    >
    <div class="template-price">
      <img src="/img/icon/price-receipt.png" />
      <span>900원</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
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
