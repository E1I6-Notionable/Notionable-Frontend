<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl />
    <div class="mypage-content"></div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MypageControl from 'src/components/user/MypageControl.vue';

export default {
  components: {
    CustomHeader,
    CustomFooter,
    MypageControl,
  },
  setup() {
    return {};
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
  padding-right: 18em;
}
</style>
