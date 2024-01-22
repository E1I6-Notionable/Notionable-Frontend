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

    const confirmPayments = () => {
      const arrayUrl = [...url];
      const templateId = arrayUrl[30];

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:9000',
          'Access-Control-Allow-Credentials': true,
        },
      };

      router
        .isReady()
        .then(async () => {
          try {
            const res = await axios.post(
              'payments/confirm',
              {
                orderId: route.query.orderId,
                amount: route.query.amount,
                paymentKey: route.query.paymentKey,
                templateId: templateId,
              },
              config,
            );
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    if (url.includes('kakao')) {
      sendCode('kakao');
    } else if (url.includes('naver')) {
      sendCode('naver');
    } else if (url.includes('google')) {
      sendCode('google');
    } else if (url.includes('paymentType')) {
      confirmPayments();
    }
  },
};
</script>

<style>
body {
  font-family: 'SUIT-Regular', 'sans-serif';
}
</style>
