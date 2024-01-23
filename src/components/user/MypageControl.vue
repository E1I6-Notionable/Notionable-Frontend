<template>
  <div class="mypage-control">
    <div class="mypage-title">
      <span @click="toMyPage">마이페이지</span>
    </div>
    <div class="mypage-category">
      <router-link to="/mypage/info-update"
        ><span
          :class="
            url.includes('info-update')
              ? 'category-click'
              : 'mypage-category-title'
          "
          >내 정보 수정</span
        ></router-link
      >
      <router-link to="/mypage/pwd-update"
        ><span
          :class="
            url.includes('pwd-update')
              ? 'category-click'
              : 'mypage-category-title'
          "
          >비밀번호 수정</span
        ></router-link
      >
      <router-link to="/mypage/my-review"
        ><span
          :class="
            url.includes('my-review')
              ? 'category-click'
              : 'mypage-category-title'
          "
          >내가 쓴 리뷰</span
        ></router-link
      >
      <router-link to="/mypage/my-scrap"
        ><span
          :class="
            url.includes('my-scrap')
              ? 'category-click'
              : 'mypage-category-title'
          "
          >내가 스크랩한 글</span
        ></router-link
      >
    </div>
    <button class="apply-creator-btn" @click="toCreator">
      크리에이터 신청✨
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const url = window.location.href;

    const toMyPage = () => {
      router.push({
        path: '/mypage',
      });
    };

    const toCreator = () => {
      router.push({
        path: '/apply-creator',
      });
    };

    return {
      toMyPage,
      toCreator,
      url,
    };
  },
};
</script>

<style>
.mypage-control {
  width: 200px;
  margin-right: 6em;
}

.mypage-title {
  font-weight: 600;
  font-size: 1.4rem;
  border-bottom: 2px solid black;
  padding: 0.3em 0;
}

.mypage-title span {
  cursor: pointer;
}

.mypage-category {
  display: flex;
  flex-direction: column;
  margin: 1.2em 0;
}

.mypage-category-title,
.category-click {
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  margin: 0.5em 0;
  cursor: pointer;
}

.category-click {
  font-weight: 700;
}

.apply-creator-btn {
  background-color: #081829;
  color: white;
  border-radius: 30px;
  padding: 0.7em;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  border: 0;
}

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
