<template>
  <CustomHeader page="creator" />
  <div class="creator-apply-container" v-if="!toCreator">
    <div class="creator-apply">
      <h1>크리에이터 신청하기</h1>
      <div>
        <p>Notionable에 크리에이터 등록하고</p>
        <p>수익을 창출해보세요!</p>
      </div>
      <button @click="clickCreator">크리에이터 신청 바로가기</button>
    </div>
    <div class="creator-img"><img src="/img/apply-creator.png" /></div>
  </div>
  <div v-else class="creator-form-container">
    <h1>크리에이터 신청하기</h1>
    <div class="creator-form">
      <div class="drop-down">
        <span>입점형태</span>
        <div>
          <span>개인사업자</span>
          <span>▾</span>
        </div>
      </div>
      <div class="drop-down">
        <span>은행</span>
        <div>
          <span>KB국민은행</span>
          <span>▾</span>
        </div>
      </div>
      <div class="account-number">
        <span>계좌번호</span>
        <input placeholder="계좌번호를 입력해주세요." />
      </div>
      <div class="file-upload">
        <span>통장 사본</span>
        <div>
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
          <span>파일 업로드하기(PDF)</span>
        </div>
      </div>
      <div class="file-upload">
        <span>신분증 사본</span>
        <div>
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
          <span>파일 업로드하기(PDF)</span>
        </div>
      </div>
      <div class="creator-btn">
        <button>크리에이터 등록하기</button>
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import { ref } from 'vue';

export default {
  components: {
    CustomHeader,
    CustomFooter,
  },
  setup() {
    const toCreator = ref(false);
    const clickCreator = () => {
      toCreator.value = true;
    };

    return {
      toCreator,
      clickCreator,
    };
  },
};
</script>

<style scoped>
.creator-apply-container {
  display: flex;
  justify-content: center;
  margin: 5em 0;
  min-height: 50vh;
}

.creator-apply {
  margin-right: 4em;
}

.creator-apply > div {
  margin: 2em 0 4em 0;
}

.creator-apply > h1 {
  font-size: 2.3rem;
  font-weight: 800;
  margin: 0;
}

.creator-apply p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

button {
  background-color: #081829;
  color: white;
  border: 0;
  padding: 1em;
  font-weight: 700;
  font-size: 1rem;
  width: 360px;
  border-radius: 10px;
  cursor: pointer;
}

.creator-img img {
  width: 500px;
}

/* 크리에이터 신청 폼 */
.creator-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
}

.creator-form-container h1 {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
}

.creator-form {
  background-color: #fafafc;
  width: 560px;
  padding: 2.5em 3.2em;
  border-radius: 20px;
}

.creator-form > div > span:first-child {
  color: #313440;
  font-weight: 600;
  font-size: 0.9rem;
}

.drop-down > div {
  background-color: white;
  border: 1px solid #e4e5ec;
  width: fit-content;
  padding: 0.5em 0.8em;
  border-radius: 6px;
  margin: 0.5em 0 2.5em 0;
  cursor: pointer;
}

.drop-down > div span:first-child {
  font-weight: 500;
  margin-right: 0.5em;
}

.account-number {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5em;
}

.account-number input {
  box-sizing: border-box;
  border: 1px solid #e4e5ec;
  padding: 0.6em 0.8em;
  border-radius: 6px;
  margin: 0.5em 0;
}

.account-number input::placeholder {
  color: #cacbd3;
  font-weight: 500;
}

.account-number input:focus {
  outline: none;
}

.file-upload div {
  background-color: white;
  padding: 0.8em;
  margin: 0.5em 0 2.5em 0;
  border-radius: 6px;
  color: #737584;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.file-upload div i {
  margin-right: 0.5em;
}

.creator-btn {
  display: flex;
  justify-content: center;
}
</style>
