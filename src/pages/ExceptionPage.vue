<template>
  <div class="not-found">
    <img src="/img/logo_horizontal.png" />
    <q-spinner-dots color="primary" size="4em" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from '../axios';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const url = window.location.href;
    const route = useRoute();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

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

    const submitEmail = async () => {
      const templateId = route.params.id;

      try {
        const res = await axios.get(`template/url-mail/${templateId}`, config);
        console.log(res);
        if (res.data.code === 200) {
          router.replace('/mypage');
        }
      } catch (err) {
        console.log(err);
      }
    };

    const confirmPayments = () => {
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
                templateId: route.params.id,
              },
              config,
            );
            console.log(res);
            if (res.data.code === 200) {
              submitEmail();
            }
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
.not-found {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;
}

.not-found img {
  margin-bottom: 2em;
}
</style>
