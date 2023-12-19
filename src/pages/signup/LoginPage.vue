<template>
  <div class="signup-page">
    <img src="/img/logo.png" @click="toHome" />
    <div class="signup-container">
      <p>
        3초만에 빠르게 {{ page === 'login' ? '로그인' : '회원가입' }}하세요!
      </p>
      <div class="kakao-login">
        <img src="/img/social_logo/kakao_logo.png" />
        <span>카카오로 {{ page === 'login' ? '로그인하기' : '시작하기' }}</span>
      </div>
      <div class="naver-login">
        <img src="/img/social_logo/naver_logo.png" />
        <span>네이버로 {{ page === 'login' ? '로그인하기' : '시작하기' }}</span>
      </div>
      <div class="google-login">
        <img src="/img/social_logo/google_logo.png" />
        <span>구글로 {{ page === 'login' ? '로그인하기' : '시작하기' }}</span>
      </div>
      <hr />
      <router-link :to="`/${page}/next`">
        <div class="email-login">
          <span>이메일로 {{ page === 'login' ? '로그인' : '가입' }}하기</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SignupPage',
  setup() {
    const page = ref('');
    const router = useRouter();

    if (window.location.href.includes('login')) {
      page.value = 'login';
    } else {
      page.value = 'signup';
    }

    const toHome = () => {
      router.push({ name: 'Home' });
    };

    return {
      page,
      toHome,
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

.signup-page > img {
  width: 180px;
  cursor: pointer;
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

.signup-container > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-container > div > img {
  margin-right: 0.5em;
}

.kakao-login > img,
.google-login > img {
  width: 20px;
}

.naver-login > img {
  width: 18px;
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
