<template>
  <CustomHeader />
  <div class="carts-container">
    <h1>장바구니</h1>
    <span @click="clickUpdate">{{ checkboxView ? '취소' : '편집' }}</span>
    <div class="carts-list-container">
      <div
        class="carts-list"
        :class="i === 0 && 'first'"
        v-for="(cartsList, i) in calCartsList"
        :key="i"
      >
        <TemplateItem
          v-for="cart in cartsList"
          :key="cart.item_id"
          :template="cart"
          :checkboxView="checkboxView"
          :id="cart.item_id"
          @check-item="checkItem"
        />
      </div>
    </div>
    <div class="deleteBtn" v-if="checkboxView">
      <button @click="deleteCartItem">선택항목 삭제하기</button>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import TemplateItem from 'src/components/template/TemplateItem.vue';
import { ref } from 'vue';
import axios from '../../axios';
import { useRouter } from 'vue-router';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    TemplateItem,
  },
  setup() {
    const cartsList = ref([]);
    const calCartsList = ref([]);
    const checkboxView = ref(false);
    const checkList = ref([]);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
      },
      data: {
        item_id: checkList.value,
      },
    };
    const router = useRouter();

    const getCarts = async () => {
      let index = 0;

      try {
        const res = await axios.get('user/my-cart', config);
        console.log(res);
        cartsList.value = res.data.data;

        for (let i = 0; i < cartsList.value.length; i++) {
          if (i % 3 === 0) {
            let arr = cartsList.value.slice(i, i + 3);
            calCartsList.value[index++] = arr;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCarts();

    const clickUpdate = () => {
      checkboxView.value = !checkboxView.value;
    };

    const checkItem = (id, checked) => {
      if (checked) {
        checkList.value.push(id);
      } else if (!checked) {
        const filtered = checkList.value.filter(item => item !== id);
        checkList.value = filtered;
      }
    };

    const deleteCartItem = async () => {
      let index = 0;
      let filtered;

      console.log(checkList.value);

      checkList.value.map(item => {
        filtered = cartsList.value.filter(cart => cart.item_id !== item);
      });

      cartsList.value = filtered;

      for (let i = 0; i < cartsList.value.length; i++) {
        if (i % 3 === 0) {
          let arr = cartsList.value.slice(i, i + 3);
          calCartsList.value[index++] = arr;
        }
      }

      try {
        const res = await axios.delete('user/my-cart/delete', config);
        console.log(res);
        if (res.data.code === 200) router.replace();
        // checkboxView.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    return {
      calCartsList,
      checkboxView,
      clickUpdate,
      checkItem,
      deleteCartItem,
    };
  },
};
</script>

<style>
.carts-container {
  width: 1200px;
  margin: 3em auto;
  min-height: 60vh;
}

.carts-container h1 {
  font-weight: 600;
  font-size: 2rem;
  margin: 0;
  padding-left: 1.4em;
}

.carts-container > span {
  display: flex;
  justify-content: right;
  color: #313440;
  font-weight: 700;
  cursor: pointer;
  margin-right: 4em;
  font-size: 1.1rem;
}

.carts-list {
  display: flex;
  border-top: 1px solid #e4e5ec;
  padding: 0 3em 3em;
}

.first {
  border: none;
}

.carts-list:not(:first-of-type) {
  padding: 2em 3em 3em;
}

.deleteBtn {
  display: flex;
  justify-content: center;
  margin: 5em 0;
}

.deleteBtn button {
  background-color: #081829;
  color: white;
  border: none;
  padding: 1em 7em;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}
</style>
