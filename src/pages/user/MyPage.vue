<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl />
    <div class="mypage-content">
      <div class="mypage-filter-list">
        <div
          :class="
            currentFilter === filter.name
              ? 'mypage-filter filter-click'
              : 'mypage-filter'
          "
          v-for="filter in filterList"
          :key="filter"
          @click="clickFilter(filter.name)"
        >
          <p>{{ filter.name }}</p>
          <div>
            <span>{{ filter.num }}</span>
            <span>건</span>
          </div>
        </div>
      </div>
      <div class="mypage-filter-content">
        <PurchaseHistory v-if="currentFilter === '구매내역'" />
        <MyContents v-else-if="currentFilter === '내가 쓴 글'" />
        <InquiryHistory v-else />
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
import { ref } from 'vue';
import axios from '../../axios';

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
    const filterList = ref([
      { name: '구매내역', num: 0 },
      { name: '내가 쓴 글', num: 0 },
      { name: '문의 내역', num: 0 },
    ]);

    const getMyPage = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:9000',
          'Access-Control-Allow-Credentials': true,
        },
      };

      try {
        const res = await axios.get('user/my-profile', config);
        //const listCount = await axios.get('user/list/count', config);
        console.log(res);
        // filterList.value = [
        //   { name: '구매내역', num: listCount.data.data.paymentCount },
        //   {
        //     name: '내가 쓴 글',
        //     num: listCount.data.data.postCount,
        //   },
        //   {
        //     name: '문의 내역',
        //     num: listCount.data.data.inquiryCount,
        //   },
        // ];
      } catch (err) {
        console.log(err);
      }
    };

    getMyPage();

    const currentFilter = ref('구매내역');
    const clickFilter = filter => {
      currentFilter.value = filter;
    };

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
  justify-content: space-between;
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

.mypage-filter > div span:first-child {
  font-weight: bold;
  font-size: 2rem;
  margin-right: 0.5em;
}

.mypage-filter > div span:last-child {
  font-size: 1.2rem;
}

.mypage-filter-content {
  margin-top: 5em;
}
</style>
