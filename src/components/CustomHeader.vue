<template>
  <header>
    <div class="header-top">
      <div class="header-logo">
        <router-link to="/">
          <img src="/img/logo_horizontal.png" />
        </router-link>
        <div class="search-container">
          <input
            :placeholder="`원하시는 ${
              page === 'template'
                ? '템플릿을 검색해보세요.'
                : '검색어를 입력하세요.'
            }`"
            v-model="searchText"
            @keyup.enter="getSearchResult"
          />
          <img src="/img/icon/search.png" @click="getSearchResult" />
        </div>
      </div>
      <div class="login-btn" v-if="!login">
        <router-link to="/login"><span>로그인</span></router-link>
        <router-link to="/signup"><span>회원가입</span></router-link>
      </div>
      <div class="user-container" v-if="login">
        <img @click="toCarts" class="basket-icon" src="/img/icon/basket.png" />
        <span @click="toCarts" class="basket">장바구니</span>
        <div class="user-btn" @click="toMypage">
          <div class="profile-img">
            <img
              :src="
                user.profile === ''
                  ? '/img/icon/default-profile.png'
                  : user.profile
              "
            />
          </div>
          <span>{{ user.name }}</span>
          <span>님</span>
        </div>
        <span class="logout-btn" @click="handleLogout">로그아웃</span>
        <div class="alarm-btn">
          <i class="fa-regular fa-bell"></i>
          <div />
        </div>
      </div>
    </div>
    <div v-if="page !== 'creator'" class="nav">
      <div>
        <router-link to="/template/free/none">
          <div :class="{ 'nav-clicked': params.type === 'free' }">
            무료 템플릿
          </div>
        </router-link>
        <router-link to="/template/paid/none">
          <div :class="{ 'nav-clicked': params.type === 'paid' }">
            유료 템플릿
          </div>
        </router-link>
        <router-link to="/posts/all">
          <div :class="{ 'nav-clicked': url.includes('posts') }">커뮤니티</div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from './../axios';
export default {
  props: {
    page: {
      type: String,
    },
  },
  setup() {
    const login = computed(() => store.state.user.login);
    const url = window.location.href;
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const user = computed(() => store.state.user);
    const searchText = ref('');
    const params = computed(() => route.params);

    const getLoginStatus = () => {
      if (
        localStorage.getItem('accessToken') !== null &&
        localStorage.getItem('refreshToken') !== null
      ) {
        store.dispatch('user/loginUser', {
          ...user.value,
          login: true,
        });
      } else {
        store.dispatch('user/loginUser', {
          ...user.value,
          login: false,
        });
      }
    };

    getLoginStatus();

    const toCarts = () => {
      router.push({
        path: '/carts',
      });
    };

    const toMypage = () => {
      router.push({
        path: '/mypage',
      });
    };

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      store.dispatch('user/loginUser', {
        login: false,
      });
      window.location.replace('/');
    };

    const getSearchResult = async () => {
      router.replace(`/template/none/${searchText.value}`);

      const params = {
        keyword: searchText.value,
      };

      try {
        const res = await axios.get('template/filter', {
          params,
        });
        console.log(res);
        store.dispatch('template/addList', { templateList: res.data.data });
      } catch (err) {
        console.log(err);
      }
    };

    watch(params, () => {
      if (params.value.search === 'none') searchText.value = '';
    });

    return {
      login,
      url,
      toCarts,
      toMypage,
      handleLogout,
      user,
      searchText,
      getSearchResult,
      params,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
}

.header-top {
  display: flex;
  align-items: center;
  padding: 3em 6em;
  justify-content: space-between;
}

.header-logo {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.header-top img {
  width: 180px;
  cursor: pointer;
}

.search-container {
  position: relative;
  margin-left: 4em;
  width: 100%;
}

.search-container input {
  border: 1.9px solid #cacbd3;
  padding: 0.4em 1.2em;
  border-radius: 11px;
  box-sizing: border-box;
  color: #313440;
  width: 100%;
  min-width: 600px;
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
  top: 10px;
  width: 15px;
}

.login-btn {
  margin-left: 10em;
  display: flex;
  flex-wrap: nowrap;
}

.login-btn a:first-child span {
  color: #313440;
  font-weight: 700;
  cursor: pointer;
  margin-right: 2em;
  white-space: nowrap;
}

.login-btn a:last-child span {
  background-color: #081829;
  color: white;
  font-weight: 700;
  padding: 0.7em 1.2em;
  border-radius: 30px;
  cursor: pointer;
  white-space: nowrap;
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
  white-space: nowrap;
}

.user-btn {
  border: 1.7px solid #cacbd3;
  border-radius: 30px;
  padding: 0.3em 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1.5em;
  white-space: nowrap;
}

.profile-img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 0.5em;
  overflow: hidden;
}

.user-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-btn span:nth-child(2) {
  color: #313440;
  font-weight: 800;
  margin-right: 0.3em;
  white-space: nowrap;
}

.user-btn span:last-child {
  color: #313440;
  font-weight: 500;
  white-space: nowrap;
}

.logout-btn {
  color: #313440;
  font-weight: bold;
  cursor: pointer;
  margin-right: 0.8em;
}

.alarm-btn {
  position: relative;
}

.alarm-btn i {
  color: #3a3a3a;
  font-size: 1.1rem;
  cursor: pointer;
}

.alarm-btn div {
  width: 4px;
  height: 4px;
  background-color: #ff4a4a;
  border-radius: 100%;
  position: absolute;
  top: -2px;
  right: -2px;
}

.nav {
  border-bottom: 1px solid #e4e5ec;
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav > div {
  display: flex;
  width: 950px;
}

.nav > div div {
  margin-right: 4em;
  padding: 0.5em 0;
  font-size: 1rem;
  cursor: pointer;
}

.nav-clicked {
  border-bottom: 2.8px solid black;
  font-weight: 600;
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
