<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl />
    <div class="mypage-content">
      <div class="mypage-filter-list">
        <div class="filter-wrap" v-for="filter in filterList" :key="filter">
          <div
            :class="
              currentFilter === filter.name
                ? 'mypage-filter filter-click'
                : 'mypage-filter'
            "
            @click="clickFilter(filter.name)"
          >
            <p>{{ filter.name }}</p>
            <div v-if="filter.name !== '응답 내역'">
              <span>{{ filter.num }}</span>
              <span>건</span>
            </div>
            <div v-else>
              <span
                >{{ filter.num.answerCount }}
                <span class="division">/</span>
                {{ filter.num.inquiryCount }}
              </span>
              <span>건</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mypage-filter-content">
        <PurchaseHistory v-if="currentFilter === '구매 내역'" userType="user" />
        <MyContents v-else-if="currentFilter === '내가 쓴 글'" />
        <InquiryHistory
          v-else-if="currentFilter === '문의 내역'"
          userType="user"
        />
        <PurchaseHistory
          v-if="currentFilter === '판매 내역'"
          userType="creator"
        />
        <InquiryHistory
          v-else-if="currentFilter === '응답 내역'"
          userType="creator"
        />
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MypageControl from 'src/components/user/MypageControl.vue';
import PurchaseHistory from 'src/components/user/PurchaseHistory.vue';
import MyContents from 'src/components/user/MyContents.vue';
import InquiryHistory from 'src/components/user/InquiryHistory.vue';
import { computed, ref, watch } from 'vue';
import axios from '../../axios';
import { useStore } from 'vuex';

export default {
  components: {
    CustomHeader,
    CustomFooter,
    MypageControl,
    PurchaseHistory,
    MyContents,
    InquiryHistory,
  },
  setup() {
    const store = useStore();
    const userRole = computed(() => store.state.user.role);
    const filterList = ref([]);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };

    const getMyPageCount = async () => {
      try {
        let listCount;
        if (userRole.value === 'ROLE_CREATOR') {
          listCount = await axios.get('creator/list/count', config);
          console.log(listCount);
          filterList.value = [
            {
              name: '판매 내역',
              num: listCount.data.data.sellCount,
            },
            {
              name: '응답 내역',
              num: {
                answerCount: listCount.data.data.answerCount,
                inquiryCount: listCount.data.data.inquiryCount,
              },
            },
          ];
        } else {
          listCount = await axios.get('user/list/count', config);
          console.log(listCount);
          filterList.value = [
            { name: '구매 내역', num: listCount.data.data.paymentCount },
            {
              name: '내가 쓴 글',
              num: listCount.data.data.postCount,
            },
            {
              name: '문의 내역',
              num: listCount.data.data.inquiryCount,
            },
          ];
        }
      } catch (err) {
        console.log(err);
      }
    };

    getMyPageCount();

    const currentFilter = ref(
      userRole.value === 'ROLE_CREATOR' ? '판매 내역' : '구매 내역',
    );
    const clickFilter = filter => {
      currentFilter.value = filter;
    };

    watch(userRole, () => {
      getMyPageCount();
      if (userRole.value === 'ROLE_CREATOR') {
        currentFilter.value = '판매 내역';
      } else {
        currentFilter.value = '구매 내역';
      }
    });

    return {
      filterList,
      currentFilter,
      clickFilter,
    };
  },
};
</script>

<style scoped>
.mypage {
  display: flex;
  justify-content: center;
  margin-top: 6em;
}

.mypage-content {
  width: 800px;
}

.mypage-filter-list {
  display: flex;
  width: 800px;
}

.filter-wrap {
  width: calc(100% / 3);
}

.filter-wrap:nth-child(2) {
  display: flex;
  justify-content: center;
}

.filter-wrap:nth-child(3) {
  display: flex;
  justify-content: right;
}

.mypage-filter {
  background-color: #fafafc;
  width: 230px;
  height: 140px;
  padding: 1.6em;
  border-radius: 10px;
  cursor: pointer;
}

.filter-click {
  background-color: #081829;
  color: white;
}

.mypage-filter p {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.5em;
}

.mypage-filter > div {
  display: flex;
  align-items: center;
  margin-left: 0.8em;
}

.mypage-filter > div > span:first-child {
  font-weight: bold;
  font-size: 2rem;
  margin-right: 0.5em;
}

.mypage-filter > div > span:last-child {
  font-size: 1.2rem;
}

.division {
  font-weight: 400;
}

.mypage-filter-content {
  margin-top: 5em;
}
</style>
