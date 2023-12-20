<template>
  <CustomHeader />
  <div class="mypage">
    <MyPageControl />
    <div class="mypage-content">
      <MyInfoUpdate />
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MyPageControl from 'src/components/user/MypageControl.vue';
import MyInfoUpdate from 'src/components/user/MyInfoUpdate.vue';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    MyPageControl,
    MyInfoUpdate,
  },
  setup() {},
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
