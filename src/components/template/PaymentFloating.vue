<template>
  <div class="template-floating">
    <div class="template-author">
      <img src="/img/icon/default-profile.png" />
      <span>횬닝</span>
    </div>
    <p>프로 일잘러의 노션</p>
    <span>900원</span>
    <div class="template-floating-btn">
      <div><span>문의하기</span></div>
      <div><span>공유하기</span></div>
    </div>
    <div class="pay-btn">결제하기</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.template-floating {
  position: fixed;
  min-width: 220px;
}

.template-author {
  display: flex;
  align-items: center;
}

.template-author span {
  font-weight: 500;
  display: block;
  margin: 0 0 -0.3em 0.5em;
}

.template-floating p {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.3em 0;
}

.template-floating > span {
  background-color: #ffed46;
  color: #081829;
  padding: 0.2em 0.6em;
  font-weight: 700;
  border-radius: 20px;
}

.template-floating-btn {
  display: flex;
  margin: 1.5em 0;
}

.template-floating-btn div:first-child {
  padding-right: 1em;
  border-right: 1px solid black;
  height: 18px;
}

.template-floating-btn div:last-child {
  padding-left: 1em;
}

.template-floating-btn span {
  cursor: pointer;
  display: block;
  font-weight: 600;
}

.pay-btn {
  background-color: #081829;
  color: white;
  padding: 0.8em;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
</style>
