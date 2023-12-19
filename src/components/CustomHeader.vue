<template>
  <header>
    <div class="header-top">
      <router-link to="/">
        <img src="/img/logo_horizontal.png" />
      </router-link>
      <div class="search-container">
        <input placeholder="원하시는 템플릿을 검색해보세요." />
        <img src="/img/icon/search.png" />
      </div>
      <div class="login-btn" v-if="!login">
        <router-link to="login"><span>로그인</span></router-link>
        <router-link to="signup"><span>회원가입</span></router-link>
      </div>
      <div class="user-container" v-if="login">
        <img class="basket-icon" src="/img/icon/basket.png" />
        <span class="basket">장바구니</span>
        <div class="user-btn">
          <img src="/img/icon/default-profile.png" />
          <span>서은</span>
          <span>님</span>
        </div>
        <span class="apply-creator">크리에이터 신청✨</span>
      </div>
    </div>
    <div class="nav">
      <div>
        <router-link to="freetemplate">
          <div :class="{ 'nav-clicked': url.includes('freetemplate') }">
            무료 템플릿
          </div>
        </router-link>
        <router-link to="paytemplate">
          <div :class="{ 'nav-clicked': url.includes('paytemplate') }">
            유료 템플릿
          </div>
        </router-link>
        <router-link to="community">
          <div :class="{ 'nav-clicked': url.includes('community') }">
            커뮤니티
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const login = ref(true);
    const url = window.location.href;

    return {
      login,
      url,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-top {
  display: flex;
  align-items: center;
  padding: 3em 5em;
}

.header-top img {
  width: 180px;
  cursor: pointer;
}

.search-container {
  position: relative;
  margin-left: 4em;
}

.search-container input {
  border: 1.9px solid #cacbd3;
  padding: 0.4em 1.2em;
  border-radius: 11px;
  box-sizing: border-box;
  width: 600px;
  color: #313440;
}

.search-container input::placeholder {
  color: #313440;
}

.search-container input:focus {
  outline: none;
}

.search-container img {
  position: absolute;
  right: 1.2em;
  top: 9px;
  width: 15px;
}

.login-btn {
  margin-left: 10em;
}

.login-btn a:first-child span {
  color: #313440;
  font-weight: 700;
  cursor: pointer;
  margin-right: 2em;
}

.login-btn a:last-child span {
  background-color: #081829;
  color: white;
  font-weight: 700;
  padding: 0.7em 1.2em;
  border-radius: 30px;
  cursor: pointer;
}

.user-container {
  display: flex;
  align-items: center;
  margin-left: 4em;
}

.basket-icon {
  max-width: 14px;
  margin-right: 0.5em;
}

.basket {
  color: #313440;
  font-weight: 700;
  cursor: pointer;
  margin-right: 1.5em;
}

.user-btn {
  border: 1.7px solid #cacbd3;
  border-radius: 30px;
  padding: 0.3em 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1em;
}

.user-btn img {
  width: 25px;
  margin-right: 0.5em;
}

.user-btn span:nth-child(2) {
  color: #313440;
  font-weight: 800;
  margin-right: 0.3em;
}

.user-btn span:last-child {
  color: #313440;
  font-weight: 500;
}

.apply-creator {
  background-color: #081829;
  color: white;
  border-radius: 30px;
  padding: 0.5em 1em;
  font-weight: 600;
  cursor: pointer;
}

.nav {
  border-bottom: 1px solid #e4e5ec;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav > div {
  display: flex;
  width: 1100px;
}

.nav > div div {
  margin-right: 4em;
  padding: 0.5em 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.nav-clicked {
  border-bottom: 2.8px solid black;
}

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
