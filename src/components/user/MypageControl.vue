<template>
  <div v-if="!loading" class="mypage-control">
    <div class="user-info">
      <div class="profile-img">
        <img
          :src="
            userInfo.profile === ''
              ? '/img/icon/default-profile.png'
              : userInfo.profile
          "
        />
      </div>
      <h4 class="user-name">{{ userInfo.nickName }}</h4>
      <span
        class="user-type"
        :class="{ 'user-type-creator': userRole === 'ROLE_CREATOR' }"
        >{{ userRole === 'ROLE_CREATOR' ? '판매자' : '구매자' }}</span
      >
      <button class="apply-creator-btn" @click="clickCreatorBtn">
        {{
          userRole === 'ROLE_CREATOR'
            ? '구매자로 전환'
            : creator
            ? '판매자로 전환'
            : '크리에이터 신청✨'
        }}
      </button>
    </div>
    <div class="mypage-title">
      <span v-if="userRole !== 'ROLE_CREATOR'" @click="toMyPage"
        >마이페이지</span
      >
    </div>
    <div class="mypage-category">
      <div v-for="list in myPageList" :key="list.title">
        <router-link :to="`/mypage/${list.link}`"
          ><span
            :class="
              url.includes(list.link)
                ? 'category-click'
                : 'mypage-category-title'
            "
            >{{ list.title }}</span
          ></router-link
        >
      </div>
    </div>
  </div>
  <div v-else>loading</div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../axios';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const userRole = computed(() => store.state.user.role);
    const user = computed(() => store.state.user);
    const url = window.location.href;
    const userList = [
      {
        title: '내 정보 수정',
        link: 'info-update',
      },
      {
        title: '비밀번호 수정',
        link: 'pwd-update',
      },
      {
        title: '내가 쓴 리뷰',
        link: 'my-review',
      },
      {
        title: '내가 스크랩한 글',
        link: 'my-scrap',
      },
    ];
    const creatorList = [
      {
        title: '판매 등록',
        link: 'upload-template',
      },
      {
        title: '수익 관리',
        link: 'revenue-management',
      },
    ];
    const myPageList = computed(() => {
      if (userRole.value === 'ROLE_CREATOR') {
        return creatorList;
      } else return userList;
    });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const userInfo = ref({});
    const creator = ref(false);
    const loading = ref(false);

    const getMyInfo = async () => {
      loading.value = true;
      try {
        const res = await axios.get('user/my-profile', config);
        console.log(res);
        userInfo.value = res.data.data;
        loading.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    const getCreator = async () => {
      loading.value = true;
      try {
        const res = await axios.get('verify-creator', config);
        console.log(res);
        creator.value = res.data.data.isCreator;
        loading.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    getMyInfo();
    getCreator();

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

    const changeCreator = async () => {
      loading.value = true;
      try {
        const res = await axios.get('user/change-creator', config);
        console.log(res);
        store.dispatch('user/loginUser', {
          ...user.value,
          role: res.data.data.role,
        });
        loading.value = false;
        router.replace('/mypage');
      } catch (err) {
        console.log(err);
      }
    };

    const changeUser = async () => {
      loading.value = true;
      try {
        const res = await axios.get('creator/change-user', config);
        console.log(res);
        store.dispatch('user/loginUser', {
          ...user.value,
          role: res.data.data.role,
        });
        loading.value = false;
        router.replace('/mypage');
      } catch (err) {
        console.log(err);
      }
    };

    const clickCreatorBtn = () => {
      if (userRole.value === 'ROLE_CREATOR') {
        changeUser();
      } else if (creator.value) {
        changeCreator();
      } else {
        toCreator();
      }
    };

    return {
      toMyPage,
      url,
      myPageList,
      userInfo,
      creator,
      loading,
      clickCreatorBtn,
      userRole,
    };
  },
};
</script>

<style scoped>
.mypage-control {
  width: 200px;
  margin-right: 6em;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-img {
  width: 160px;
  height: 160px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.profile-img img {
  object-fit: cover;
}

.user-name {
  margin: 0.5em 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.user-type {
  background-color: #ffd600;
  color: white;
  font-weight: 600;
  padding: 0.1em 0.8em;
  border-radius: 4px;
}

.user-type-creator {
  background-color: #3bc1c6;
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
  margin: 1.8em 0 4em;
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
