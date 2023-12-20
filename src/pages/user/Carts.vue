<template>
  <CustomHeader />
  <div class="carts-container">
    <h1>장바구니</h1>
    <div class="carts-list-container">
      <div class="carts-list" v-for="i in 3" :key="i">
        <TemplateItem v-for="i in 3" :key="i" />
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import TemplateItem from 'src/components/template/TemplateItem.vue';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    TemplateItem,
  },
};
</script>

<style>
.carts-container {
  width: 1200px;
  margin: 3em auto;
}

.carts-container h1 {
  font-weight: 600;
  font-size: 2rem;
  margin: 0;
  padding-left: 1.4em;
}

.carts-list {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e5ec;
  padding: 0 3em 3em;
}

.carts-list:not(:first-of-type) {
  padding: 2em 3em 3em;
}
</style>
