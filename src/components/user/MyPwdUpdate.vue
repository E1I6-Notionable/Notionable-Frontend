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
    <span class="pwd-confirm" v-if="!samePwd"
      >비밀번호가 일치하지 않습니다.</span
    >
    <div class="pwd-update-btn">
      <button :disabled="disabled" @click="changePassword">
        비밀번호 변경하기
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import CustomInput from '../CustomInput.vue';
import axios from '../../axios';
export default {
  components: {
    CustomInput,
  },
  setup() {
    const currentPassword = ref('');
    const updatePassword = ref('');
    const confirmPassword = ref('');
    const samePwd = computed(() => {
      return updatePassword.value === confirmPassword.value;
    });
    const disabled = computed(() => {
      if (
        !samePwd.value ||
        currentPassword.value === '' ||
        updatePassword.value === '' ||
        confirmPassword.value === ''
      ) {
        return true;
      } else return false;
    });

    const updateCurrentPwd = currentPwd => {
      currentPassword.value = currentPwd;
    };

    const updateUpdatePwd = updatePwd => {
      updatePassword.value = updatePwd;
    };

    const updateConfirmPwd = confirmPwd => {
      confirmPassword.value = confirmPwd;
    };

    const changePassword = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:9000',
          'Access-Control-Allow-Credentials': true,
        },
      };

      try {
        const res = await axios.post(
          'change-password',
          {
            originPassword: currentPassword.value,
            newPassword: updatePassword.value,
            newPasswordCheck: confirmPassword.value,
          },
          config,
        );
        console.log(res);
        if (res.data.code === 200) alert('비밀번호가 변경되었습니다.');
      } catch (err) {
        console.log(err);
      }
    };

    return {
      currentPassword,
      updatePassword,
      confirmPassword,
      updateCurrentPwd,
      updateUpdatePwd,
      updateConfirmPwd,
      samePwd,
      disabled,
      changePassword,
    };
  },
};
</script>

<style scoped>
.pwd-confirm {
  display: inline-block;
  margin: 0.3em 0 0 1em;
  color: #f41f00;
}

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
