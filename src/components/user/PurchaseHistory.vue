<template>
  <div
    class="purchase-history"
    v-for="purchase in purchaseList"
    :key="purchase.approvedAt"
  >
    <div class="purchase-date" @click="toTemplatePage(purchase.templateId)">
      <span>{{ parseDate(purchase.approvedAt) }}</span>
      <i class="fa-solid fa-chevron-right"></i>
    </div>
    <div class="purchase-template">
      <img class="purchase-template-img" :src="purchase.thumbnail" />
      <div class="purchase-template-content">
        <div class="purchase-template-title">
          <span>구매완료</span>
          <span>{{ purchase.title }}</span>
          <span>{{ purchase.creatorName }}</span>
        </div>
        <div class="purchase-template-bottom">
          <div class="purchase-template-price">
            <img src="/img/icon/price-receipt.png" />
            <span>{{
              purchase.price === 0 ? '무료' : `${purchase.price} 원`
            }}</span>
          </div>
          <ReviewWriteBtn @click="toWriteReview(purchase.templateId)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewWriteBtn from 'src/components/template/ReviewWriteBtn.vue';
import axios from '../../axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components: {
    ReviewWriteBtn,
  },
  setup() {
    const purchaseList = ref([]);
    const router = useRouter();
    const store = useStore();

    const getPurchaseHistory = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Access-Control-Allow-Origin': 'http://localhost:9000',
          'Access-Control-Allow-Credentials': true,
        },
      };

      try {
        const res = await axios.get('payments/buying', config);
        console.log(res);
        purchaseList.value = res.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getPurchaseHistory();

    const parseDate = approvedAt => {
      const date = new Date(approvedAt);
      return date.toLocaleDateString();
    };

    const toTemplatePage = id => {
      router.push(`/template/none/none/${id}`);
    };

    const toWriteReview = id => {
      store.dispatch('template/clickWriteReview', { writeReview: true });
      router.push(`/template/none/none/${id}`);
    };

    return {
      purchaseList,
      parseDate,
      toTemplatePage,
      toWriteReview,
    };
  },
};
</script>

<style>
.purchase-history:first-child {
  padding: 1em 0 3em;
}
.purchase-history:not(:first-of-type) {
  padding: 2.5em 0 3em;
}

.purchase-history:not(:last-of-type) {
  border-bottom: 1px solid #e4e5ec;
}

.purchase-date {
  position: relative;
  width: 130px;
  cursor: pointer;
}

.purchase-date span {
  font-size: 1.4rem;
  font-weight: 700;
}

.purchase-date i {
  font-size: 1.1rem;
  position: absolute;
  top: 6px;
  right: 0;
}

.purchase-template {
  display: flex;
  margin-top: 1.2em;
}

.purchase-template-img {
  width: 180px;
  height: 130px;
  border-radius: 10px;
  margin-right: 2em;
  flex-shrink: 0;
  object-fit: cover;
}

.purchase-template-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.purchase-template-title {
  display: flex;
  flex-direction: column;
}

.purchase-template-title span:first-child {
  color: #f41f00;
  font-weight: 700;
  font-size: 1rem;
}

.purchase-template-title span:nth-child(2) {
  font-weight: 600;
  font-size: 1rem;
  display: inline-block;
  margin: 0.3em 0 0.2em 0;
}

.purchase-template-title span:last-child {
  color: #737584;
  font-weight: 600;
}

.purchase-template-bottom {
  display: flex;
  justify-content: space-between;
}

.purchase-template-price {
  display: flex;
  align-items: flex-end;
}

.purchase-template-price img {
  width: 25px;
  margin-right: 0.3em;
}

.purchase-template-price span {
  font-weight: 700;
  font-size: 1rem;
}
</style>
