<template>
  <CustomHeader page="creator" />
  <div class="creator-apply-container" v-if="!toCreator">
    <div class="creator-apply">
      <h1>크리에이터 신청하기</h1>
      <div>
        <p>Notionable에 크리에이터 등록하고</p>
        <p>수익을 창출해보세요!</p>
      </div>
      <button @click="clickCreator">크리에이터 신청 바로가기</button>
    </div>
    <div class="creator-img"><img src="/img/apply-creator.png" /></div>
  </div>
  <div v-else class="creator-form-container">
    <h1>크리에이터 신청하기</h1>
    <div class="creator-form">
      <Dropdown
        title="입점형태"
        :dropdownList="['개인사업자']"
        @click-category="storeCategory"
      />
      <Dropdown
        title="은행"
        :dropdownList="bankList"
        @click-category="bankCategory"
      />
      <div class="account-number">
        <span>계좌번호</span>
        <input
          placeholder="계좌번호를 입력해주세요."
          v-model="creatorInfo.accountNumber"
        />
      </div>
      <FileUploader title="통장 사본" @upload-file="uploadBankPaper" />
      <FileUploader title="신분증 사본" @upload-file="uploadIdentification" />
      <div class="creator-btn">
        <button @click="registerCreator">크리에이터 등록하기</button>
      </div>
    </div>
  </div>
  <Alert
    v-if="alertView"
    text="크리에이터 신청이 완료되었습니다."
    :buttonText="{ yes: '확인', close: '닫기' }"
    :buttonFunc="toMypage"
    :closeFunc="closeAlert"
  />
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import Dropdown from 'src/components/user/Dropdown.vue';
import FileUploader from 'src/components/user/FileUploader.vue';
import Alert from 'src/components/Alert.vue';
import { reactive, ref } from 'vue';
import axios from '../../axios';
import { useRouter } from 'vue-router';

export default {
  components: {
    CustomHeader,
    CustomFooter,
    Dropdown,
    FileUploader,
    Alert,
  },
  setup() {
    const router = useRouter();
    const toCreator = ref(false);
    const clickCreator = () => {
      toCreator.value = true;
    };
    const bankList = [
      'KB 국민은행',
      '신한은행',
      '농협은행',
      '카카오뱅크',
      '우리은행',
      '하나은행',
      '대구은행',
    ];
    const creatorInfo = reactive({
      creatorType: '',
      bank: '',
      accountNumber: '',
    });
    const formData = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const alertView = ref(false);

    const storeCategory = category => {
      creatorInfo.creatorType = category;
    };
    const bankCategory = category => {
      creatorInfo.bank = category;
    };

    const uploadBankPaper = file => {
      formData.append('bankPaper', file);
    };

    const uploadIdentification = file => {
      formData.append('identification', file);
    };

    const toMypage = () => {
      router.replace('/mypage');
    };

    const closeAlert = () => {
      alertView.value = false;
    };

    const registerCreator = async () => {
      const creatorDto = {
        creatorType: creatorInfo.creatorType,
        bank: creatorInfo.bank,
        accountNumber: creatorInfo.accountNumber,
      };

      const json = JSON.stringify(creatorDto);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('creatorDto', blob);

      try {
        const res = await axios.post('user/creator/register', formData, config);
        if (res.data.code === 200) {
          alertView.value = true;
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      toCreator,
      clickCreator,
      bankList,
      storeCategory,
      bankCategory,
      creatorInfo,
      uploadBankPaper,
      uploadIdentification,
      registerCreator,
      alertView,
      toMypage,
      closeAlert,
    };
  },
};
</script>

<style scoped>
.creator-apply-container {
  display: flex;
  justify-content: center;
  margin: 5em 0;
  min-height: 50vh;
}

.creator-apply {
  margin-right: 4em;
}

.creator-apply > div {
  margin: 2em 0 4em 0;
}

.creator-apply > h1 {
  font-size: 2.3rem;
  font-weight: 800;
  margin: 0;
}

.creator-apply p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

button {
  background-color: #081829;
  color: white;
  border: 0;
  padding: 1em;
  font-weight: 700;
  font-size: 1rem;
  width: 360px;
  border-radius: 10px;
  cursor: pointer;
}

.creator-img img {
  width: 500px;
}

/* 크리에이터 신청 폼 */
.creator-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
}

.creator-form-container h1 {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
}

.creator-form {
  background-color: #fafafc;
  width: 560px;
  padding: 2.5em 3.2em;
  border-radius: 20px;
}

.creator-form > div > span:first-child {
  color: #313440;
  font-weight: 600;
  font-size: 0.9rem;
}

.account-number {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5em;
}

.account-number input {
  box-sizing: border-box;
  border: 1px solid #e4e5ec;
  padding: 0.6em 0.8em;
  border-radius: 6px;
  margin: 0.5em 0;
}

.account-number input::placeholder {
  color: #cacbd3;
  font-weight: 500;
}

.account-number input:focus {
  outline: none;
}

.creator-btn {
  display: flex;
  justify-content: center;
}
</style>
