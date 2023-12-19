<template>
  <div class="template-review-top">
    <div class="review-write-btn">
      <img src="/img/icon/pencil.png" />
      <span>구매후기 작성하기</span>
    </div>
    <div class="template-satisfaction">
      <span>99%</span><span>의 구매자가 만족한 템플릿이에요</span>
    </div>
  </div>
  <div class="template-review-list">
    <div class="template-review-item" v-for="i in 3" :key="i">
      <div class="review-profile">
        <img src="/img/icon/default-profile.png" />
        <span>만족해요 👍🏻</span>
      </div>
      <div class="review-date">2023.11.12</div>
      <div class="review-imgs">
        <div v-for="i in 3" :key="i" />
      </div>
      <div class="reveiw-content">
        <p>
          덕분에 체계적인 일 관리가 가능해졌어요.<br />흩어져있는 자료를
          정리하기에 좋습니다.
        </p>
        <span>댓글 2</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.template-review-top {
  margin-top: 1em;
  position: relative;
}

.review-write-btn {
  background-color: #fafafc;
  padding: 0.7em 1.4em;
  display: flex;
  border-radius: 30px;
  cursor: pointer;
  width: fit-content;
  position: absolute;
  top: 0.5em;
  right: 0;
}

.review-write-btn img {
  width: 17px;
  height: 17px;
  margin-right: 0.5em;
}

.review-write-btn span {
  color: #313440;
  font-weight: 600;
}

.template-satisfaction {
  padding-top: 4em;
}

.template-satisfaction span:first-child {
  font-weight: 800;
  font-size: 1.5rem;
}

.template-satisfaction span:last-child {
  font-size: 1.5rem;
  font-weight: 500;
}

.template-review-list {
  margin-top: 3em;
}

.template-review-item {
  background-color: #fafafc;
  border-radius: 20px;
  padding: 1.8em;
  margin-bottom: 2.5em;
}

.review-profile {
  display: flex;
  align-items: center;
}

.review-profile img {
  width: 35px;
  margin-right: 1em;
}

.review-profile span {
  font-weight: 600;
  font-size: 1.1rem;
}

.review-date {
  font-weight: 500;
  text-align: right;
}

.review-imgs {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}

.review-imgs div {
  width: 200px;
  height: 140px;
  border-radius: 20px;
  background-color: white;
}

.reveiw-content {
  margin-top: 2em;
}

.reveiw-content p {
  font-weight: 500;
  font-size: 1rem;
}
</style>
