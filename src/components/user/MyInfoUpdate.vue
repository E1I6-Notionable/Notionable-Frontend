<template>
  <div class="profile">
    <img src="/img/icon/default-profile.png" />
    <div class="profile-info">
      <div class="profile-title">
        <h4>{{ userInfo.nickName }}</h4>
        <span>구매자</span>
      </div>
      <div class="picture-btn">
        <i class="fa-solid fa-camera"></i>
        <span>사진 변경</span>
      </div>
    </div>
  </div>
  <div class="update-input">
    <CustomInput
      name="닉네임"
      placeholder="닉네임을 입력해주세요."
      type="text"
      v-model:value="nameText"
      @update-value="updateName"
      :icon="false"
    />
    <CustomInput
      name="이메일"
      placeholder="이메일을 입력해주세요."
      type="email"
      v-model:value="emailText"
      @update-value="updateEmail"
      :icon="false"
    />
    <CustomInput
      name="휴대폰 번호"
      placeholder="휴대폰 번호를 입력해주세요."
      type="text"
      v-model:value="numberText"
      @update-value="updateNumber"
      :icon="false"
    />
  </div>
  <div class="update-btn">
    <button @click="updateMyInfo">수정 완료</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomInput from '../CustomInput.vue';
import axios from '../../axios';
export default {
  components: {
    CustomInput,
  },
  setup() {
    const nameText = ref('');
    const emailText = ref('');
    const numberText = ref('');
    const userInfo = ref({
      userId: 1,
      email: '',
      password: '',
      userType: 0,
      role: null,
      nickName: '',
      profile: '',
      phoneNumber: '',
    });

    const updateName = name => {
      nameText.value = name;
    };

    const updateEmail = email => {
      emailText.value = email;
    };

    const updateNumber = number => {
      numberText.value = number;
    };

    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers: {
        accessToken,
      },
    };

    const getMyInfo = async () => {
      try {
        //const res = await axios.get('user/my-profile', config);
        //userInfo.value = res.data.data;
        nameText.value = userInfo.value.nickName;
        emailText.value = userInfo.value.email;
        numberText.value = userInfo.value.phoneNumber;
      } catch (err) {
        console.log(err);
      }
    };

    getMyInfo();

    const updateMyInfo = async () => {
      try {
        await axios.patch(
          'user/my-profile/modify',
          {
            nickName: nameText.value,
          },
          config,
        );
        alert('수정이 완료되었습니다.');
      } catch (err) {
        console.log(err);
      }
    };

    return {
      nameText,
      emailText,
      numberText,
      updateName,
      updateEmail,
      updateNumber,
      userInfo,
      updateMyInfo,
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
}

.profile img {
  width: 140px;
  margin-right: 3em;
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 135px;
}

.profile-title h4 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.profile-title span {
  background-color: #ffd600;
  color: white;
  padding: 0.3em 0.8em;
  border-radius: 4px;
  font-weight: 500;
}

.picture-btn {
  background-color: #081829;
  color: white;
  font-weight: 600;
  padding: 0.6em;
  width: 180px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.picture-btn i {
  margin-right: 0.5em;
}

.update-input {
  margin-top: 4em;
}

.update-btn {
  display: flex;
  justify-content: center;
  margin-top: 3em;
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
