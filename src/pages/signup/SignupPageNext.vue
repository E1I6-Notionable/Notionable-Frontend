<template>
  <div class="signup-page">
    <img src="/img/logo.png" @click="toHome" />
    <div class="signup-container" v-if="!namePage">
      <p>이메일로 회원가입하기</p>
      <div class="input-container">
        <div>
          <span>이메일</span>
          <span>*</span>
          <div class="email-input">
            <input
              v-model="input.email"
              placeholder="이메일을 입력해주세요."
              type="email"
            />
            <span @click="submitNumber">인증번호 전송</span>
          </div>
        </div>
        <div>
          <span>인증번호 입력</span>
          <span>*</span>
          <div class="email-input">
            <input
              v-model="input.authCode"
              placeholder="인증번호를 입력해주세요"
            />
            <span v-if="!loading" @click="submitAuthCode">확인</span>
            <span v-else><q-spinner-dots color="grey" size="2em" /></span>
          </div>
          <span
            v-if="resultCode !== null"
            :class="resultCode ? 'same' : 'not-same'"
            >{{
              resultCode ? '인증이 완료되었습니다.' : '다시 시도해주세요.'
            }}</span
          >
        </div>
        <div>
          <span>비밀번호</span>
          <span>*</span>
          <div class="password-input">
            <input
              v-model="input.password"
              placeholder="비밀번호를 입력해주세요. (8자리 이상)"
              :type="passwordView"
            /><img
              src="/img/icon/password_icon.png"
              alt="password_icon"
              @click="controlPwView"
            />
          </div>
          <div class="password-input">
            <input
              v-model="input.confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요."
              :type="passwordView"
            /><img
              src="/img/icon/password_icon.png"
              alt="password_icon"
              @click="controlPwView"
            />
          </div>
          <span v-if="samePassword !== 'empty'" :class="`${samePassword}`">{{
            samePassword === 'not-same'
              ? '비밀번호가 일치하지 않습니다.'
              : '비밀번호가 일치합니다.'
          }}</span>
        </div>
        <div>
          <span>핸드폰 번호</span>
          <span>*</span>
          <input
            placeholder="010부터 숫자만 입력해주세요"
            v-model="input.phoneNumber"
          />
        </div>
        <div class="terms-container">
          <div class="terms-checkbox">
            <input
              type="checkbox"
              id="all"
              v-model="terms.all"
              @change="allCheck"
              :checked="terms.first && terms.second && terms.third"
            />
            <label for="all"><p>모두 동의합니다.</p></label>
          </div>
          <hr />
          <div class="terms-checkbox">
            <input type="checkbox" id="first" v-model="terms.first" />
            <label for="first"
              ><p>서비스 이용약관에 동의합니다.</p>
              <span>(필수)</span></label
            >
          </div>
          <div class="terms-checkbox">
            <input type="checkbox" id="second" v-model="terms.second" />
            <label for="second"
              ><p>개인정보 수집/이용에 동의합니다.</p>
              <span>(필수)</span></label
            >
          </div>
          <div class="terms-checkbox">
            <input type="checkbox" id="third" v-model="terms.third" />
            <label for="third">
              <p>마케팅 수신에 동의합니다.</p>
              <span>(필수)</span>
            </label>
          </div>
        </div>
      </div>
      <div :class="next ? 'signup-btn' : 'disable-signup-btn'" @click="toNext">
        <span>회원가입하기</span>
      </div>
    </div>
    <div class="signup-container" v-if="namePage">
      <p>이름 설정</p>
      <p>노셔너블에서 사용하실 이름을 설정해주세요.</p>
      <div class="input-container">
        <div class="name-input">
          <span>이름</span>
          <span>*</span>
          <input v-model="name" placeholder="이름을 입력해주세요." />
        </div>
      </div>
      <div class="signup-btn" @click="signup">
        <span>누르면 가입완료!</span>
      </div>
    </div>
    <div v-if="signupNext">
      <SignUpSuccess :name="name" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import axios from 'src/axios';
import { useRouter } from 'vue-router';
import SignUpSuccess from '../../components/signup/SignUpSuccess.vue';

export default {
  name: 'SignupPageNext',
  components: {
    SignUpSuccess,
  },
  setup() {
    const router = useRouter();
    const input = ref({
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      authCode: '',
    });
    const terms = ref({
      all: false,
      first: false,
      second: false,
      third: false,
    });
    const passwordView = ref('password');
    const samePassword = computed(() => {
      if (!input.value.password && !input.value.confirmPassword) {
        return 'empty';
      }
      if (input.value.password !== input.value.confirmPassword) {
        return 'not-same';
      } else {
        return 'same';
      }
    });
    const resultCode = ref(null);
    const next = computed(() => {
      if (
        input.value.email &&
        samePassword.value === 'same' &&
        terms.value.first &&
        terms.value.second &&
        terms.value.third &&
        resultCode.value
      ) {
        return true;
      } else return false;
    });
    const namePage = ref(false);
    const name = ref('');
    let code;
    const loading = ref(false);
    const signupNext = ref(false);

    const controlPwView = () => {
      if (passwordView.value === 'password') {
        passwordView.value = 'text';
      } else {
        passwordView.value = 'password';
      }
    };

    const submitNumber = async () => {
      loading.value = true;
      try {
        const res = await axios.post('auth/email', {
          email: input.value.email,
        });
        loading.value = false;
        console.log(res);
        code = res.data.data;
      } catch (err) {
        console.log(err);
        loading.value = false;
        alert('다시 시도해주세요.');
      }
    };

    const submitAuthCode = () => {
      if (input.value.authCode === code) resultCode.value = true;
      else resultCode.value = false;
    };

    const allCheck = () => {
      terms.value.first = terms.value.all;
      terms.value.second = terms.value.all;
      terms.value.third = terms.value.all;
    };

    const toNext = () => {
      if (next.value) {
        namePage.value = true;
      }
    };

    const signup = async () => {
      try {
        const res = await axios.post('signup/complete', {
          email: input.value.email,
          password: input.value.password,
          userType: 0,
          nickName: name.value,
          phoneNumber: input.value.phoneNumber,
        });
        console.log(res);
        signupNext.value = true;
      } catch (err) {
        console.log(err);
      }
    };

    const toHome = () => {
      router.push({ name: 'Home' });
    };

    return {
      input,
      submitNumber,
      passwordView,
      controlPwView,
      samePassword,
      terms,
      allCheck,
      submitAuthCode,
      resultCode,
      next,
      toNext,
      namePage,
      name,
      signup,
      toHome,
      loading,
      signupNext,
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

.input-container > div:not(:last-of-type) {
  margin-top: 1.5em;
}

.input-container > div {
  text-align: left;
}

.input-container > div > span:first-child {
  color: #313440;
  font-size: 0.9rem;
  font-weight: 500;
}

.input-container > div > span:nth-child(2) {
  color: #f41f00;
  font-size: 0.9rem;
  font-weight: bold;
  font-weight: 500;
}

input {
  border: 1px solid #e4e5ec;
  padding: 0.8em 0.9em;
  border-radius: 6px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 0.9rem;
  margin: 0.4em 0 0 0;
}

input::placeholder {
  color: #cacbd3;
}

input:focus {
  outline: none;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.password-input,
.email-input {
  position: relative;
  height: fit-content;
}

.password-input img {
  width: 17px;
  position: absolute;
  right: 15px;
  top: 30%;
  cursor: pointer;
}

.email-input > span {
  position: absolute;
  right: 15px;
  top: 30%;
}

.email-input > span {
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
}

.not-same {
  font-size: 0.7rem;
  color: #f41f00;
  margin: 0 1em;
}

.same {
  font-size: 0.7rem;
  color: #00ab1b;
  margin: 0 1em;
}

.terms-container {
  border: 1px solid #e4e5ec;
  border-radius: 6px;
  padding: 1em 2em;
  text-align: left;
  margin-top: 2.5em;
}

.terms-checkbox input {
  display: none;
}

.terms-checkbox input + label {
  cursor: pointer;
}

.terms-checkbox input + label:before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #e4e5ec;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 0.5em;
}

.terms-checkbox input:checked + label:before {
  background-color: #081829;
  border: 2px solid #081829;
  background-image: url('/img/icon/check.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 8px;
}

.terms-checkbox p {
  color: #313440;
  font-size: 0.9rem;
  display: inline-block;
  margin: 0.2em 0;
  font-weight: 500;
}

.terms-container hr {
  border: 0;
  margin-bottom: 1em;
  border-top: 1px solid #e4e5ec;
}

.terms-checkbox span {
  font-size: 0.9rem;
  color: #f41f00;
  margin-left: 0.3em;
  font-weight: 500;
}

.name-input {
  margin: 3em 0;
}

.signup-btn {
  background-color: #081829;
  cursor: pointer;
}

.disable-signup-btn {
  background-color: #081829be;
}

.signup-btn,
.disable-signup-btn {
  color: white;
  padding: 0.9em;
  font-weight: 600;
  border-radius: 8px;
  margin: 2em 0 4em 0;
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
