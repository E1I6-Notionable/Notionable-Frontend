<template>
  <div v-if="!loading">
    <div class="profile">
      <div class="profile-img">
        <img
          :src="
            userInfo.profile === ''
              ? '/img/icon/default-profile.png'
              : userInfo.profile
          "
        />
      </div>
      <div class="profile-info">
        <div class="profile-title">
          <h4>{{ userInfo.nickName }}</h4>
          <span>구매자</span>
        </div>
        <label htmlFor="input-file">
          <input
            class="img-input"
            type="file"
            accept="image/*"
            id="input-file"
            @change="saveImgFile"
          />
          <div class="picture-btn">
            <i class="fa-solid fa-camera"></i>
            <span>사진 변경</span>
          </div>
        </label>
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
        v-model:value="userInfo.email"
        :icon="false"
        disabled
      />
      <CustomInput
        name="휴대폰 번호"
        v-model:value="userInfo.phoneNumber"
        :icon="false"
        disabled
      />
    </div>
    <div class="update-btn">
      <button @click="updateMyInfo">수정 완료</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CustomInput from '../CustomInput.vue';
import axios from '../../axios';
import { useStore } from 'vuex';
export default {
  components: {
    CustomInput,
  },
  setup() {
    const nameText = ref('');
    const userInfo = ref(null);
    const loading = ref(false);
    const formData = new FormData();
    const imgFile = ref('');
    const store = useStore();

    const updateName = name => {
      nameText.value = name;
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

    const getMyInfo = async () => {
      loading.value = true;
      try {
        const res = await axios.get('user/my-profile', config);
        console.log(res);

        userInfo.value = res.data.data;
        if (userInfo.value.phoneNumber === null)
          userInfo.value.phoneNumber = '';
        nameText.value = userInfo.value.nickName;

        loading.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    getMyInfo();

    const saveImgFile = e => {
      if (e.target.files) {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          imgFile.value - reader.result;

          reader.result === null || reader.result === ''
            ? (userInfo.value.profile = '')
            : (userInfo.value.profile = reader.result.toString());
        };

        if (file !== undefined) {
          formData.append('newProfile', file);
        }
      }
    };

    const updateMyInfo = async () => {
      const modifyUserDto = {
        nickName: nameText.value,
      };
      const json = JSON.stringify(modifyUserDto);
      const blob = new Blob([json], { type: 'application/json' });

      formData.append('modifyUserDto', blob);

      try {
        const res = await axios.patch(
          'user/my-profile/modify',
          formData,
          config,
        );
        console.log(res);
        if (res.data.code === 200) {
          alert('수정이 완료되었습니다.');
          userInfo.value.nickName = res.data.data.nickName;
          store.dispatch('user/loginUser', {
            ...store.state.user,
            name: nameText.value,
            profile: res.data.data.profile,
          });
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      nameText,
      updateName,
      userInfo,
      updateMyInfo,
      loading,
      saveImgFile,
    };
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 3em;
  display: flex;
  justify-content: center;
}

.profile img {
  object-fit: cover;
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

.img-input[type='file'] {
  display: none;
}

.preview-img {
  height: 200px;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  overflow-x: auto;
  white-space: nowrap;
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
