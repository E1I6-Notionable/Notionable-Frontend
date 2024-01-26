<template>
  <div class="category">
    <div
      :class="
        currentCategory === '카테고리' ? 'category-btn' : 'category-btn-click'
      "
      @click="categoryView = !categoryView"
    >
      <span>{{ currentCategory.ko }}</span>
      <i
        :class="
          !categoryView ? 'fas fa-angle-down fa-xs' : 'fas fa-angle-up fa-xs'
        "
        :style="
          currentCategory === '카테고리' ? 'color: #313440' : 'color: #3168cd'
        "
      ></i>
    </div>
    <div class="category-container" v-if="categoryView">
      <div
        v-for="(category, i) in categoryList"
        :key="i"
        @click="clickCategory(category)"
      >
        {{ category.ko }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    categoryList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const categoryView = ref(false);
    const currentCategory = ref({ ko: '카테고리' });
    const clickCategory = category => {
      categoryView.value = false;
      currentCategory.value = category;

      emit('click-category', currentCategory.value);
    };

    return {
      categoryView,
      currentCategory,
      clickCategory,
    };
  },
};
</script>

<style scoped>
.category {
  position: relative;
  margin: 0 1em;
  z-index: 5;
}

.category-btn,
.category-btn-click {
  width: fit-content;
  padding: 0.4em 1.2em;
  border-radius: 30px;
  cursor: pointer;
}

.category-btn {
  background-color: #f7f8fc;
}

.category-btn-click {
  background-color: white;
  border: 1.5px solid #3168cd;
}

.category-btn span {
  color: #313440;
  font-size: 0.9rem;
  font-weight: 500;
}

.category-btn-click span {
  color: #3168cd;
  font-size: 0.9rem;
  font-weight: 600;
}

.category-btn span:first-child,
.category-btn-click span:first-child {
  margin-right: 0.5em;
}

.category-container {
  margin-top: 1em;
  background-color: white;
  box-shadow: 0 3px 8px rgb(219, 219, 219);
  width: fit-content;
  border-radius: 8px;
  padding: 0.3em 1.2em;
  position: absolute;
}

.category-container div {
  color: #313440;
  font-weight: 500;
  font-size: 0.9rem;
  margin: 1em 0;
  cursor: pointer;
  white-space: nowrap;
}

.category-container div:hover {
  color: #3168cd;
  font-weight: 600;
}
</style>
