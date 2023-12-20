<template>
  <div class="pwd-update">
    <CustomInput
      name="현재 비밀번호"
      placeholder="현재 비밀번호를 입력해주세요."
      type="password"
      v-model:value="currentPassword"
      @update-value="updateCurrentPwd"
      :icon="false"
    />
    <CustomInput
      name="변경할 비밀번호"
      placeholder="변경할 비밀번호를 입력해주세요."
      type="password"
      v-model:value="updatePassword"
      @update-value="updateUpdatePwd"
      :icon="false"
    />
    <CustomInput
      name="변경할 비밀번호 확인"
      placeholder="비밀번호를 한번 더 입력해주세요."
      type="password"
      v-model:value="confirmPassword"
      @update-value="updateConfirmPwd"
      :icon="false"
    />
    <div class="pwd-update-btn">
      <button>비밀번호 변경하기</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomInput from '../CustomInput.vue';
export default {
  components: {
    CustomInput,
  },
  setup() {
    const currentPassword = ref('');
    const updatePassword = ref('');
    const confirmPassword = ref('');

    const updateCurrentPwd = currentPwd => {
      currentPassword.value = currentPwd;
    };

    const updateUpdatePwd = updatePwd => {
      updatePassword.value = updatePwd;
    };

    const updateConfirmPwd = confirmPwd => {
      confirmPassword.value = confirmPwd;
    };

    return {
      currentPassword,
      updatePassword,
      confirmPassword,
      updateCurrentPwd,
      updateUpdatePwd,
      updateConfirmPwd,
    };
  },
};
</script>

<style scoped>
.pwd-update-btn {
  display: flex;
  justify-content: center;
  margin-top: 5em;
}

button {
  background-color: #081829;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.9em;
  width: 320px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
