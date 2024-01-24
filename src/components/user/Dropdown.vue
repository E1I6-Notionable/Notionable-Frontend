<template>
  <div class="drop-down">
    <span class="title">{{ title }}</span>
    <div class="category" @click="clickCategory">
      <span>{{ currentCategory }}</span>
      <i v-if="click" class="fa-solid fa-caret-up"></i>
      <i v-else class="fa-solid fa-caret-down"></i>
    </div>
    <div v-if="click" class="dropdown-container">
      <div
        class="dropdown-item"
        :class="{ current: currentCategory === dropdown }"
        v-for="dropdown in dropdownList"
        :key="dropdown"
        @click="changeCategory(dropdown)"
      >
        {{ dropdown }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    title: {
      type: String,
    },
    dropdownList: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const click = ref(false);
    const currentCategory = ref('선택');
    const clickCategory = () => {
      click.value = !click.value;
    };
    const changeCategory = category => {
      currentCategory.value = category;
      click.value = false;
      emit('click-category', category);
    };

    return {
      click,
      clickCategory,
      currentCategory,
      changeCategory,
    };
  },
};
</script>

<style scoped>
.drop-down {
  position: relative;
}

.title {
  color: #313440;
  font-weight: 600;
  font-size: 0.9rem;
}

.category {
  background-color: white;
  border: 1px solid #e4e5ec;
  width: 110px;
  padding: 0.5em 0.8em;
  border-radius: 6px;
  margin: 0.5em 0 2.5em 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category > span:first-child {
  font-weight: 500;
}

.dropdown-container {
  box-shadow: 0 4px 8px rgba(180, 180, 180, 0.373);
  background-color: white;
  width: 110px;
  box-sizing: border-box;
  padding: 0.3em 0;
  border-radius: 6px;
  max-height: 180px;
  overflow-y: scroll;
  position: absolute;
  top: 75px;
  z-index: 5;
}

.dropdown-container::-webkit-scrollbar {
  display: none;
}

.dropdown-item {
  padding: 0.5em 0.8em;
  font-weight: 500;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f6f6f9;
}

.current {
  font-weight: 600;
}
</style>
