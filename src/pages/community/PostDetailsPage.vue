<template>
  <div>
    <PostDetails :postId="postId" />
  </div>
</template>

<script>
import PostDetails from 'src/components/community/PostDetails.vue';

export default {
  components: {
    PostDetails,
  },
  methods: {
    fetchPostId() {
      this.postId = this.$route.params.id;
    },
  },
  mounted() {
    this.fetchPostId();
  },
};
</script>
