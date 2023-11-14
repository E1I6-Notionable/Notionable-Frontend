<template>
  <div class="signup-page">
    <img src="../../assets/notionable_logo.png" />
    <div class="signup-container">
      <p>3초만에 빠르게 회원가입하세요!</p>
      <div class="kakao-login">
        <span>카카오로 시작하기</span>
      </div>
      <div class="naver-login">
        <span>네이버로 시작하기</span>
      </div>
      <div class="google-login">
        <span>구글로 시작하기</span>
      </div>
      <hr />
      <div class="email-login">
        <router-link to="/signup/next">
          <span>이메일로 가입하기</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
};
</script>

<style scoped>
.signup-page {
  text-align: center;
  width: 560px;
  margin: 5em auto;
}

.signup-page > img {
  width: 180px;
}

.signup-container {
  border: 1px solid #e4e5ec;
  margin-top: 4em;
  border-radius: 12px;
  padding: 0 5em;
}

.signup-container p {
  font-size: 1.7rem;
  font-weight: 600;
  margin: 2em 0 1.5em 0;
}

.kakao-login,
.naver-login,
.google-login,
.email-login {
  padding: 0.9em;
  font-weight: 600;
  border-radius: 8px;
  margin: 0.7em 0;
  cursor: pointer;
}

.kakao-login {
  background-color: #f8e84c;
  color: #433109;
}

.naver-login {
  background-color: #5bc467;
  color: white;
}

.google-login {
  border: 1px solid #e4e5ec;
  color: black;
}

.signup-container hr {
  margin: 2.5em 0;
  border: 0;
  border-top: 1px solid #e4e5ec;
}

.email-login {
  background-color: #081829;
  color: white;
  margin-bottom: 4em;
}

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: white;
}
</style>
