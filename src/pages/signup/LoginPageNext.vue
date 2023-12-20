<template>
  <div class="signup-page">
    <img src="/img/logo.png" @click="toHome" />
    <div class="signup-container">
      <p>이메일로 로그인하기</p>
      <div class="input-container">
        <CustomInput
          name="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          v-model:value="emailText"
          @update-value="updateEmail"
          :icon="false"
        />
        <CustomInput
          name="비밀번호"
          placeholder="비밀번호를 입력해주세요. (8자리 이상)"
          type="password"
          v-model:value="passwordText"
          @update-value="updatePassword"
          :icon="true"
        />
      </div>
      <div class="signup-btn" @click="login">
        <span>로그인하기</span>
      </div>
      <div class="find-btn">
        <div>
          <router-link to="/findpassword">
            <span>비밀번호 찾기</span>
          </router-link>
        </div>
        <div>
          <router-link to="/signup">
            <span>회원가입 하기</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'src/axios';
import { useRouter } from 'vue-router';
import CustomInput from 'src/components/CustomInput.vue';
export default {
  name: 'SignupPageNext',
  components: {
    CustomInput,
  },
  setup() {
    const emailText = ref('');
    const passwordText = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const res = await axios.post('login/email', {
          email: emailText.value,
          password: passwordText.value,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    const toHome = () => {
      router.push({ name: 'Home' });
    };

    const updateEmail = email => {
      emailText.value = email;
    };

    const updatePassword = password => {
      passwordText.value = password;
    };

    return {
      emailText,
      passwordText,
      login,
      toHome,
      updateEmail,
      updatePassword,
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

.signup-page img {
  width: 180px;
  cursor: pointer;
}

.signup-container {
  border: 1px solid #e4e5ec;
  margin-top: 2em;
  border-radius: 12px;
  padding: 0 5em;
  position: relative;
}

.signup-container > p:first-child {
  font-size: 1.7rem;
  font-weight: 600;
  margin: 2em 0 1em 0;
  text-align: left;
  line-height: 1.5em;
}

.signup-container p:nth-child(2) {
  color: #737584;
  text-align: left;
  font-size: 1.1rem;
}

.signup-btn {
  background-color: #081829;
  color: white;
  padding: 0.9em;
  font-weight: 600;
  border-radius: 8px;
  margin: 2em 0 0 0;
  cursor: pointer;
}

.find-btn {
  margin: 1em 0 4em 0;
  display: flex;
  justify-content: center;
}

.find-btn > div:first-child {
  border-right: 1px solid #c2c2c2;
  padding-right: 2.5em;
}

.find-btn > div:last-child {
  padding-left: 2.5em;
}

.find-btn > div span {
  color: #081829;
  cursor: pointer;
  font-weight: 500;
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
