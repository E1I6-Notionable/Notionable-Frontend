<template>
  <div
    class="my-contents"
    v-for="content in contentsList"
    :key="content.communityId"
  >
    <div class="contents-title-container">
      <div class="contents-title">
        <span>{{ content.category }}</span>
        <span>|</span>
        <span>{{ content.title }}</span>
      </div>
      <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="contents-info">
      <span>{{ elapsedTime(content.createdAt) }}</span>
      <span>|</span>
      <div class="contents-comments">
        <i class="fa-regular fa-heart"></i>
        <span>{{ content.communityLike }}</span>
        <i class="fa-regular fa-comment fa-flip-horizontal"></i>
        <span>{{ content.communityComment }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../../axios';
import { elapsedTime } from '../../composables/elapsedTime';

export default {
  setup() {
    const page = ref(0);
    const contentsList = ref([]);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
      params: {
        page: page.value,
      },
    };

    const getMyContents = async () => {
      try {
        // const res = await axios.get('user/community', config);
        // console.log(res);
        contentsList.value = [
          {
            communityId: 17,
            category: '질문',
            communityLike: 0,
            communityComment: 0,
            title: '테스트제목17',
            content: '테스트 내용17',
            thumbnail: null,
            createdAt: '2024-01-14T16:15:07.77758',
            existLike: false,
          },
          {
            communityId: 16,
            category: '질문',
            communityLike: 0,
            communityComment: 0,
            title: '테스트제목16',
            content: '테스트 내용16',
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/622048ca-9aa5-4301-a88c-6ec6c90bf5d4.png',
            createdAt: '2024-01-14T16:00:25.468905',
            existLike: false,
          },
          {
            communityId: 15,
            category: '질문',
            communityLike: 0,
            communityComment: 0,
            title: '테스트제목15',
            content: '테스트 내용15',
            thumbnail: null,
            createdAt: '2024-01-14T15:59:51.007294',
            existLike: false,
          },
          {
            communityId: 14,
            category: '자유',
            communityLike: 0,
            communityComment: 0,
            title: '테스트제목12',
            content: '테스트 내용12',
            thumbnail:
              'https://notionable-s3-bucket.s3.ap-northeast-2.amazonaws.com/fbe83ca9-f4cb-449a-b8c0-8fb829e26b3c.png',
            createdAt: '2024-01-14T15:57:05.631679',
            existLike: false,
          },
          {
            communityId: 13,
            category: '자유',
            communityLike: 0,
            communityComment: 0,
            title: '테스트제목10',
            content: '댓글 내용10',
            thumbnail: null,
            createdAt: '2024-01-12T15:30:12.104772',
            existLike: false,
          },
        ];
      } catch (err) {
        console.log(err);
      }
    };

    getMyContents();

    return {
      contentsList,
      elapsedTime,
    };
  },
};
</script>

<style>
.my-contents {
  border-bottom: 1px solid #e4e5ec;
  padding: 1.5em 1.5em 1.5em 0;
}
.contents-title-container {
  display: flex;
  justify-content: space-between;
}

.contents-title-container i {
  font-size: 1.2rem;
}

.contents-title {
  display: flex;
  align-items: center;
}

.contents-title span:first-child {
  background-color: #d6e1f5;
  color: #3168cd;
  font-weight: 600;
  padding: 0.2em 0.6em;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-right: 0.8em;
}

.contents-title span:nth-child(2) {
  font-size: 1.3rem;
}

.contents-title span:last-child {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0 0.5em;
}

.contents-info {
  display: flex;
  margin-top: 1.2em;
}

.contents-info span:first-child {
  padding-right: 0.6em;
}

.contents-info span:nth-child(2) {
  font-size: 1rem;
}

.contents-comments {
  padding: 0 0.6em;
}

.contents-comments i {
  font-size: 1.1rem;
}

.contents-comments span {
  font-size: 1rem;
  margin: 0 0.4em;
}
</style>
