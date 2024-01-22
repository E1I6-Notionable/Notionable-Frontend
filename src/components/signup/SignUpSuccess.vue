<template>
  <div class="signup-page justify-items-center">
    <div class="justify-items-center" style="margin-left: 60px">
      <p class="container-title" style="margin-top: 4em; margin-bottom: 15px">
        {{ name }}님!<br />
        노셔너블 가입을 환영합니다.
      </p>
      <p
        class="container-content"
        style="font-size: 21px; font-weight: 500; margin-bottom: 5px"
      >
        지금 바로 노셔너블에서 노션 템플릿을 이용해보세요!
      </p>
    </div>
    <div class="q-pb-md q-items-center">
      <img style="width: 600px" src="/img/signup_success.png" />
    </div>
    <div class="q-mt-lg q-flex-column q-items-center" style="margin-left: 20px">
      <q-btn
        padding="13px 115px"
        unelevated
        color="primary"
        text-color="white"
        class="q-mt-lg q-btn-rounded"
        style="
          border-radius: 10px;
          width: 480px;
          height: 50px;
          margin-left: 14px;
        "
        @click="goToMainPage"
      >
        <span>메인 페이지로 돌아가기</span>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
  },
  setup() {
    const goToMainPage = () => {
      const mainPagePath = '/main'; // 메인페이지 예시: /main

      $router.push(mainPagePath);
    };

    return { goToMainPage };
  },
};
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';
@import 'src/css/login-style.scss';

.q-flex-column {
  display: flex;
  flex-direction: column;
}

.q-items-center {
  align-items: center;
}
</style>
