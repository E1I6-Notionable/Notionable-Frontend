<template>
  <q-list class="q-mt-lg commentitems" separator>
    <CommentItem v-for="item in items" :key="item.id" :comment="item" />
  </q-list>
</template>

<script setup>
import CommentItem from './CommentItem.vue';
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
