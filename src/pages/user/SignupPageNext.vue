<template>
  <div class="signup-page">
    <img src="../../assets/notionable_logo.png" />
    <div class="signup-container" v-if="!next">
      <p>노셔너블에서 어떤 서비스를 <br />이용하고 싶으세요?</p>
      <p>
        원하는 회원가입 유형을 선택하세요. <br />
        구매자로 가입 후에도 판매자 등록이 가능합니다.
      </p>
      <div class="signup-category-container">
        <div class="signup-category">
          <span>템플릿을 구매하고 싶다면</span>
          <div @click="category = 'buyer'">
            <span>구매자로 가입</span>
          </div>
        </div>
        <div class="signup-category">
          <span>템플릿을 판매하고 싶다면</span>
          <div @click="category = 'seller'">
            <span>판매자로 가입</span>
          </div>
        </div>
      </div>
      <span class="next-btn" v-if="category !== ''" @click="next = true"
        >▶️</span
      >
    </div>
    <div class="signup-container" v-if="next">
      <p>딱 이것만 체크하면 가입완료!</p>
      <div class="input-container">
        <div class="email-input-container">
          <span>이메일</span>
          <span>*</span>
          <input placeholder="이메일을 입력해주세요." type="email" />
        </div>
        <div class="password-input-container">
          <span>비밀번호</span>
          <span>*</span>
          <div class="password-input">
            <input
              placeholder="비밀번호를 입력해주세요. (8자리 이상)"
              type="password"
            /><span>👁️</span>
          </div>
          <div class="password-input">
            <input
              placeholder="비밀번호를 한번 더 입력해 주세요."
              type="password"
            /><span>👁️</span>
          </div>
          <span class="password-cofirm">비밀번호가 일치하지 않습니다.</span>
        </div>
        <div class="terms-container">
          <p>모두 동의합니다.</p>
          <hr />
          <p>서비스 이용약관에 동의합니다.</p>
          <span>(필수)</span>
          <p>개인정보 수집/이용에 동의합니다.</p>
          <span>(필수)</span>
        </div>
        <div class="signup-btn">
          <span>누르면 가입완료!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPageNext',
  data() {
    return {
      category: '',
      next: false,
      password: '',
    };
  },
};
</script>

<style scoped>
.signup-page {
  text-align: center;
  width: 560px;
  margin: 5em auto;
}

.signup-page img {
  width: 180px;
}

.signup-container {
  border: 1px solid #e4e5ec;
  margin-top: 3em;
  border-radius: 12px;
  padding: 0 5em;
  position: relative;
}

.signup-container > p:first-child {
  font-size: 1.7rem;
  font-weight: 600;
  margin: 2em 0 1em 0;
  text-align: left;
  line-height: 1.5em;
}

.signup-container p:nth-child(2) {
  color: #737584;
  text-align: left;
}

.signup-category-container {
  margin: 3em 0 4em 0;
  text-align: left;
}

.signup-category > span:first-child {
  color: #313440;
  font-weight: 700;
}

.signup-category > div {
  border: 1px solid #e4e5ec;
  padding: 0.6em 1em;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  margin: 0.6em 0 1.5em 0;
}

.signup-category > div > span {
  font-weight: 500;
  font-size: 0.95rem;
  color: #313440;
}

.next-btn {
  position: absolute;
  top: 50%;
  right: -30px;
  cursor: pointer;
}

.email-input-container,
.password-input-container {
  text-align: left;
  margin-top: 1.5em;
}

.email-input-container > span:first-child,
.password-input-container > span:first-child {
  color: #313440;
  font-size: 0.8rem;
  font-weight: 500;
}

.email-input-container > span:nth-child(2),
.password-input-container > span:nth-child(2) {
  color: #f41f00;
  font-size: 0.8rem;
  font-weight: bold;
  font-weight: 500;
}

input {
  border: 1px solid #e4e5ec;
  padding: 0.8em 0.9em;
  border-radius: 6px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 0.9rem;
  margin: 0.4em 0 0 0;
}

input::placeholder {
  color: #cacbd3;
}

input:focus {
  outline: none;
}

.password-input {
  position: relative;
  height: fit-content;
}

.password-input > span {
  position: absolute;
  right: 15px;
  top: 10px;
}

.password-cofirm {
  font-size: 0.7rem;
  color: #f41f00;
  margin: 0 1em;
}

.terms-container {
  border: 1px solid #e4e5ec;
  border-radius: 6px;
  padding: 1em 2em;
  text-align: left;
  margin-top: 2em;
}

.terms-container > p {
  color: #313440;
  font-size: 0.9rem;
  display: inline-block;
  margin: 0;
  font-weight: 500;
}

.terms-container > p:not(:first-of-type) {
  margin: 0.3em 0;
}

.terms-container hr {
  border: 0;
  margin: 1em 0;
  border-top: 1px solid #e4e5ec;
}

.terms-container > span {
  font-size: 0.9rem;
  color: #f41f00;
  margin-left: 0.3em;
  font-weight: 500;
}

.signup-btn {
  background-color: #313440;
  color: white;
  padding: 0.9em;
  font-weight: 600;
  border-radius: 8px;
  margin: 2em 0 4em 0;
  cursor: pointer;
}
</style>
