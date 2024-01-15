<template>
  <div class="inquiry-history-list" v-for="i in 1" :key="i">
    <div class="inquiry-history">
      <div class="inquiry-history-title">
        <img src="/img/icon/default-profile.png" />
        <span>서은</span>
        <span>님의 답변</span>
      </div>
      <p>안녕하세요! 노션 사용 방법 문의드려요</p>
    </div>
    <i class="fa-solid fa-chevron-right"></i>
  </div>
</template>

<script>
export default {};
</script>

<style>
.inquiry-history-list {
  display: flex;
  border-bottom: 1px solid #e4e5ec;
  align-items: center;
  justify-content: space-between;
  padding: 1.2em 1.5em 1.2em 0;
}

.inquiry-history-title {
  display: flex;
  align-items: center;
}

.inquiry-history-title img {
  width: 28px;
}

.inquiry-history-title span:nth-child(2) {
  font-weight: 800;
  font-size: 1.1rem;
  margin: 0 0.4em;
}

.inquiry-history-title span:last-child {
  font-size: 1.1rem;
  font-weight: 600;
}

.inquiry-history p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0.8em 0 0 0;
}

.inquiry-history-list i {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
