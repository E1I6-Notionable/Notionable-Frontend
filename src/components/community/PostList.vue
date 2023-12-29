<template>
  <q-list class="post-list">
    <PostItem v-for="post in items" :key="post.id" :post="post" :showLabel="showLabel"/>
  </q-list>
</template>

<script setup>
import PostItem from './PostItem.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.post-list {
  margin: 80px 0px;
}
</style>
