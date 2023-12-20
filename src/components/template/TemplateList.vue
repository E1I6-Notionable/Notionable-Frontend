<template>
  <div class="template-list">
    <TemplateItem v-for="(_, i) in 12" :key="i"> </TemplateItem>
  </div>
</template>

<script>
import TemplateItem from './TemplateItem.vue';
export default {
  components: {
    TemplateItem,
  },
  props: {
    currentCategory: {
      type: String,
    },
    currentPrice: {
      type: String,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
