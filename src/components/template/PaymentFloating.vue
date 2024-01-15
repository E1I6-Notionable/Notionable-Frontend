<template>
  <div class="template-floating">
    <div class="template-author">
      <div class="profile-img">
        <img
          :src="
            templateDesc.profile
              ? templateDesc.profile
              : '/img/icon/default-profile.png'
          "
        />
      </div>
      <span>{{ templateDesc.nickName }}</span>
    </div>
    <p>{{ templateDesc.title }}</p>
    <div class="template-price">
      <span>{{ templateDesc.price ? `${templateDesc.price}원` : '무료' }}</span>
      <div class="template-cart">
        <img @click="addCarts" src="/img/icon/basket.png" />
        <span>장바구니</span>
      </div>
    </div>
    <div class="template-floating-btn">
      <div><span>문의하기</span></div>
      <div><span>공유하기</span></div>
    </div>
    <div class="pay-btn" @click="clickPayment">결제하기</div>
  </div>
  <div v-if="tossPaymentView" class="modal-wrap">
    <TossPayment :templateDesc="templateDesc" />
  </div>
</template>

<script>
import axios from '../../axios';
import { ref, watch } from 'vue';
import TossPayment from './TossPayment.vue';
export default {
  components: {
    TossPayment,
  },
  props: {
    templateDesc: {
      type: Object,
    },
  },
  setup({ templateDesc }) {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    const config = {
      Authorization: accessToken,
    };
    const tossPaymentView = ref(false);

    const addCarts = async () => {
      await axios.post(
        'user/my-cart/add',
        {
          user_id: '',
          template_id: templateDesc.templateId,
          creator: templateDesc.nickName,
          template_url: '',
          attribute: '',
          price: templateDesc.price,
          title: templateDesc.title,
        },
        config,
      );
    };

    const clickPayment = () => {
      tossPaymentView.value = true;
    };

    watch(tossPaymentView, tossPaymentView => {
      if (tossPaymentView === true) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    });

    return {
      addCarts,
      clickPayment,
      tossPaymentView,
    };
  },
};
</script>

<style scoped>
.template-floating {
  position: fixed;
  min-width: 220px;
}

.template-author {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
}

.template-author img {
  object-fit: cover;
}

.template-author span {
  font-weight: 500;
  display: block;
  margin: 0 0 -0.3em 0.5em;
  font-size: 0.9rem;
}

.template-floating p {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.3em 0;
}

.template-price {
  display: flex;
  align-items: center;
}

.template-price > span {
  background-color: #ffed46;
  color: #081829;
  padding: 0.2em 0.6em;
  font-weight: 700;
  border-radius: 20px;
  margin-right: 1.3em;
}

.template-cart {
  border: 1px solid #cacbd3;
  border-radius: 30px;
  padding: 0.5em 1.2em;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.template-cart img {
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
}

.template-cart span {
  color: #081829;
  font-size: 1rem;
  font-weight: 600;
}

.template-floating-btn {
  display: flex;
  margin: 1.5em 0;
}

.template-floating-btn div:first-child {
  padding-right: 1em;
  border-right: 1px solid black;
  height: 18px;
}

.template-floating-btn div:last-child {
  padding-left: 1em;
}

.template-floating-btn span {
  cursor: pointer;
  display: block;
  font-weight: 600;
}

.pay-btn {
  background-color: #081829;
  color: white;
  padding: 0.8em;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
</style>
