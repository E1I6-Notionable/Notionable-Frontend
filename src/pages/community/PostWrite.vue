<template>
  <div>
    <CustomHeader />
    <div class="community-page">
      <PostWriteForm />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import PostWriteForm from 'src/components/community/postwrite/PostWriteForm.vue';
import { ref } from 'vue';
export default {
  components: {
    CustomFooter,
    CustomHeader,
    PostWriteForm,
  },
};
</script>

<style lang="scss" scoped>
.community-page {
  margin: 80px 275px;
}
</style>
