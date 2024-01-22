<template>
  <div
    class="inquiry-history-list"
    v-for="inquiry in inquiryList"
    :key="inquiry.inquiry.inquiry_id"
  >
    <div class="inquiry-history">
      <div class="inquiry-history-title">
        <img src="/img/icon/default-profile.png" />
        <span>서은</span>
        <span>님의 답변</span>
      </div>
      <p>안녕하세요! 노션 사용 방법 문의드려요</p>
    </div>
    <i class="fa-solid fa-chevron-right"></i>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../../axios';
export default {
  setup() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const inquiryList = ref([]);

    const getMyInquiry = async () => {
      try {
        // const res = await axios.get('user/inquiry-answer', config);
        // console.log(res);
        inquiryList.value = [
          {
            inquiry: {
              inquiry_id: 7,
              title: '문의 제목입니다.',
              content: '문의 본문입니다.',
              fileUrl:
                'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/70d03c4d-7349-43c6-95e0-5c78e3a4e69e.jpg',
              createdAt: '2024-01-14T19:23:07.600819',
              status: 'No',
              user: {
                createdAt: '2023-12-31T16:31:04.854484',
                modifiedAt: '2024-01-10T17:58:27.847717',
                userId: 1,
                email: 'test@naver.com',
                password:
                  '{bcrypt}$2a$10$jtL8KUMlcwa8NDNsMCrSHuLd.xWwQl.Yb/49GsEWWzMpHP7ozMWTO',
                userType: 0,
                role: null,
                nickName: '수정된 닉네임',
                profile:
                  'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/9cfbb7f2-acea-4ca5-8a4f-0e3d0bf7743f.jpg',
                phoneNumber: '01012345678',
              },
              template_id: 2,
            },
            answer: null,
          },
          {
            inquiry: {
              inquiry_id: 9,
              title: '문의 제목입니다!!!!.',
              content: '문의 본문입니다.!!!!',
              fileUrl:
                'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/51b98acf-c28a-4767-a766-3c8ca402da1b.jpg',
              createdAt: '2024-01-14T20:54:52.916236',
              status: 'Yes',
              user: {
                createdAt: '2023-12-31T16:31:04.854484',
                modifiedAt: '2024-01-10T17:58:27.847717',
                userId: 1,
                email: 'test@naver.com',
                password:
                  '{bcrypt}$2a$10$jtL8KUMlcwa8NDNsMCrSHuLd.xWwQl.Yb/49GsEWWzMpHP7ozMWTO',
                userType: 0,
                role: null,
                nickName: '수정된 닉네임',
                profile:
                  'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/9cfbb7f2-acea-4ca5-8a4f-0e3d0bf7743f.jpg',
                phoneNumber: '01012345678',
              },
              template_id: 2,
            },
            answer: {
              answer_id: 6,
              title: '답변 제목입니다.',
              content: '답변 본문입니다.',
              fileUrl:
                'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/1302d475-2cf5-40d4-9e6e-3202e67c3292.jpg',
              createdAt: '2024-01-14T22:16:24.708113',
              status: 'Yes',
              creator_id: 46,
              template_id: 2,
              inquiry_id: 9,
            },
          },
        ];
      } catch (err) {
        console.log(err);
      }
    };

    getMyInquiry();

    return {
      inquiryList,
    };
  },
};
</script>

<style>
.inquiry-history-list {
  display: flex;
  border-bottom: 1px solid #e4e5ec;
  align-items: center;
  justify-content: space-between;
  padding: 1.2em 1.5em 1.2em 0;
}

.inquiry-history-title {
  display: flex;
  align-items: center;
}

.inquiry-history-title img {
  width: 28px;
}

.inquiry-history-title span:nth-child(2) {
  font-weight: 800;
  font-size: 1.1rem;
  margin: 0 0.4em;
}

.inquiry-history-title span:last-child {
  font-size: 1.1rem;
  font-weight: 600;
}

.inquiry-history p {
  font-size: 1rem;
  font-weight: 500;
  margin: 0.8em 0 0 0;
}

.inquiry-history-list i {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
