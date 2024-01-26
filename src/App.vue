<template>
  <router-view />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from './axios';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const url = window.location.href;
    const route = useRoute();

    const sendCode = socialType => {
      router
        .isReady()
        .then(async () => {
          try {
            const res = await axios.post('login/oauth2/social', {
              code: route.query.code,
              socialType,
            });
            console.log(res);
            if (res.data.code === 200) {
              localStorage.setItem(
                'accessToken',
                res.data.data.jwtDto.accessToken,
              );
              localStorage.setItem(
                'refreshToken',
                res.data.data.jwtDto.refreshToken,
              );
              store.dispatch('user/loginUser', {
                login: true,
                name: res.data.data.nickName,
                phoneNumber: res.data.data.phoneNumber,
                email: res.data.data.email,
                profile: res.data.data.profile,
              });
              router.replace('/');
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log('router isReady error', err);
        });
    };

    if (url.includes('kakao')) {
      sendCode('kakao');
    } else if (url.includes('naver')) {
      sendCode('naver');
    } else if (url.includes('google')) {
      sendCode('google');
    }
  },
};
</script>

<style>
body {
  font-family: 'SUIT-Medium', 'sans-serif';
}
</style>
