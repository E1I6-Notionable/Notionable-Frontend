<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl />
    <div class="mypage-content">
      <div class="order-list-title">
        <span>주문 목록</span>
        <i class="fa-solid fa-chevron-right"></i>
      </div>
      <div class="order-list">
        <div
          class="order-item"
          v-for="order in orderList"
          :key="order.approvedAt"
        >
          <div class="order-info">
            <span>{{ parseDate(order.approvedAt) }}</span>
            <h4>{{ order.title }}</h4>
          </div>
          <span class="order-price"> + {{ order.price }}원 </span>
        </div>
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MypageControl from 'src/components/user/MypageControl.vue';
import axios from '../../axios';
import { ref } from 'vue';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    MypageControl,
  },
  setup() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
    };
    const orderList = ref([]);

    const getOrderList = async () => {
      try {
        const res = await axios.get('payments/selling', config);
        console.log(res);
        orderList.value = res.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getOrderList();

    const parseDate = approvedAt => {
      const date = new Date(approvedAt);
      return date.toLocaleDateString();
    };

    return {
      orderList,
      parseDate,
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

.order-list-title {
  display: flex;
  justify-content: space-between;
  background-color: #081829;
  color: white;
  align-items: center;
  padding: 0.5em 1.2em;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
}

.order-list {
  margin-top: 3em;
  padding-left: 1.5em;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e5ec;
  padding: 1em 1.5em 1em 0;
}

.order-info {
  display: flex;
  align-items: center;
}

.order-info span {
  margin-right: 4em;
}

.order-info h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.order-price {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
