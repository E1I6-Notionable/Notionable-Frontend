<template>
  <div class="signup-page">
    <div class="q-flex-column q-items-center">
      <img src="/logo.png" style="width: 180px" />
    </div>
    <div class="container">
      <p class="container-title">비밀번호 찾기</p>
      <p class="container-content">
        가입 시 등록하신 이메일 주소를 입력해 주세요.<br />
        비밀번호 재설정 링크를 보내드립니다.
      </p>
      <q-space />
      <div style="display: flex; margin-top: 50px">
        <div class="q-my-xs text-h7 text-weight-bold">이메일</div>
        <div class="text-h7" style="color: red">*</div>
      </div>
      <div>
        <q-input
          type="textfield"
          label="이메일을 입력하세요"
          class="bg-white"
          outlined
        >
        </q-input>
      </div>
      <div
        class="q-mt-lg q-flex-column q-items-center"
        style="margin-bottom: 7rem"
      >
        <q-btn
          padding="13px 115px"
          unelevated
          color="primary"
          text-color="white"
          class="q-mt-lg full-width q-btn-rounded"
          style="border-radius: 10px"
        >
          <span>비밀번호 재설정 링크 받기</span>
        </q-btn>
        <q-space />
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
