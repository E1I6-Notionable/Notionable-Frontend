<template>
  <CustomHeader />
  <div class="mypage">
    <MyPageControl />
    <div class="mypage-content">
      <MyPwdUpdate />
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MyPageControl from 'src/components/user/MypageControl.vue';
import MyPwdUpdate from 'src/components/user/MyPwdUpdate.vue';
export default {
  components: {
    CustomHeader,
    CustomFooter,
    MyPageControl,
    MyPwdUpdate,
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
