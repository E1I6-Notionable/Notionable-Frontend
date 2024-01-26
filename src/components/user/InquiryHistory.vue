<template>
  <h4 class="inquiry-history-title">문의 내역</h4>
  <div class="inquiry-history-subtitle">
    <span>상담제목</span>
    <div class="answer-existence">
      <span>작성일</span>
      <span>답변유무</span>
    </div>
  </div>
  <div
    v-for="(inquiry, index) in inquiryList"
    :key="inquiry.inquiry.inquiry_id"
    class="inquiry-history-list"
    :class="{
      border:
        index === inquiryList.length - 1 ||
        (click.id === inquiry.inquiry.inquiry_id && click.click),
    }"
  >
    <div class="inquiry-history">
      <div class="content" @click="clickInquiry(inquiry.inquiry.inquiry_id)">
        <p>{{ inquiry.inquiry.title }}</p>
      </div>
      <div class="content-info">
        <span>{{ parseDate(inquiry.inquiry.createdAt) }}</span>
        <span>{{ inquiry.inquiry.status === 'Yes' ? 'O' : 'X' }}</span>
      </div>
    </div>
    <div v-if="click.id === inquiry.inquiry.inquiry_id && click.click">
      <div
        :class="
          userType === 'creator' && inquiry.inquiry.status === 'No'
            ? 'question-container'
            : 'answer-container'
        "
      >
        <div class="question">
          <span>Q. {{ inquiry.inquiry.title }}</span>
          <p>{{ inquiry.inquiry.content }}</p>
          <div v-if="inquiry.inquiry.fileUrl !== null" class="question-img">
            <img :src="inquiry.inquiry.fileUrl" />
          </div>
        </div>
        <div v-if="inquiry.inquiry.status === 'Yes'" class="answer-content">
          <span>A. {{ inquiry.answer.title }}</span>
          <p>{{ inquiry.answer.content }}</p>
        </div>
        <div
          v-if="userType === 'creator' && inquiry.inquiry.status === 'No'"
          class="creator-answer"
        >
          <input
            class="answer-title"
            placeholder="제목을 입력해주세요."
            v-model="answerText.title"
          />
          <textarea
            class="answer-textarea"
            placeholder="상세내용을 입력해주세요."
            v-model="answerText.content"
          />
          <FileUploader page="answer" @upload-file="uploadFile" />
          <div class="answer-btn">
            <button
              @click="
                uploadAnswer(
                  inquiry.inquiry.inquiry_id,
                  inquiry.inquiry.template_id,
                )
              "
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import FileUploader from './FileUploader.vue';
import axios from '../../axios';

export default {
  components: {
    FileUploader,
  },
  props: {
    userType: {
      type: String,
    },
  },
  setup({ userType }) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const inquiryList = ref([]);
    const click = ref({});
    const answerText = ref({
      title: '',
      content: '',
    });
    const formData = new FormData();

    const getMyInquiry = async () => {
      let res;
      try {
        if (userType === 'user') {
          res = await axios.get('user/inquiry-answer', config);
          console.log(res);
          inquiryList.value = res.data.data;
        } else {
          res = await axios.get('creator/inquiry-answer', config);
          console.log(res);
          inquiryList.value = res.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMyInquiry();

    const parseDate = approvedAt => {
      const date = new Date(approvedAt);
      return date.toLocaleDateString();
    };

    const clickInquiry = id => {
      click.value = { id, click: !click.value.click };
    };

    const uploadFile = file => {
      formData.append('file', file);
    };

    const uploadAnswer = async (inquiry_id, template_id) => {
      const answerDto = {
        title: answerText.value.title,
        content: answerText.value.content,
        template_id,
        inquiry_id,
      };

      const json = JSON.stringify(answerDto);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('answerDto', blob);

      try {
        const res = await axios.post('creator/answer', formData, config);
        if (res.data.code === 200) {
          alert('답변이 등록되었습니다.');
          clickInquiry(inquiry_id);
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    };

    return {
      inquiryList,
      click,
      clickInquiry,
      parseDate,
      answerText,
      uploadFile,
      uploadAnswer,
    };
  },
};
</script>

<style>
.inquiry-history-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.3em;
}

.inquiry-history-subtitle {
  border-top: 1px solid #e4e5ec;
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
}

.answer-existence span:first-child {
  display: inline-block;
  width: 80px;
  text-align: center;
}

.answer-existence span:last-child {
  display: inline-block;
  width: 50px;
  text-align: center;
  margin-left: 2em;
}

.inquiry-history-list {
  padding: 1.2em 0;
  border-bottom: 1px solid #e4e5ec;
}

.border {
  border: none;
}

.inquiry-history {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  cursor: pointer;
}

.content-info span:first-child {
  display: inline-block;
  width: 80px;
  text-align: center;
}

.content-info span:last-child {
  font-size: 1rem;
  display: inline-block;
  width: 50px;
  text-align: center;
  margin-left: 1.8em;
}

.answer-container {
  background-color: #fafafc;
  margin-top: 0.6em;
  padding: 2em;
}

.question-container {
  padding: 2em;
}

.question {
  margin-bottom: 2em;
}

.question span {
  font-size: 1rem;
  font-weight: 500;
  color: #3168cd;
}

.question-img {
  width: calc(100% / 3);
  height: 140px;
  overflow: hidden;
  border-radius: 20px;
  margin-left: 1.5em;
}

.question-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.answer-content span {
  font-size: 1rem;
  font-weight: 500;
}

.question p,
.answer-content p {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.5em 0 0.5em 1.5em;
}

.creator-answer {
  width: 95%;
  padding-left: 1.5em;
}

.answer-textarea,
.answer-title {
  width: 100%;
  border: 1px solid #e4e5ec;
  border-radius: 6px;
  padding: 0.5em 1em;
}

.answer-textarea {
  min-height: 130px;
  resize: none;
  padding: 1em;
  margin-top: 0.5em;
}

.answer-textarea::placeholder,
.answer-title::placeholder {
  color: #cacbd3;
}

.answer-textarea:focus,
.answer-title:focus {
  outline: none;
}

.answer-btn {
  text-align: right;
}

.answer-btn button {
  background-color: #313440;
  color: white;
  border: none;
  padding: 0.5em 1em;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
}
</style>
