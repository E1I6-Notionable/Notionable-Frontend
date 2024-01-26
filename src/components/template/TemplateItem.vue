<template>
  <div class="template-item">
    <img
      class="template-img"
      :src="template.thumbnail === '' ? '/img/test_img' : template.thumbnail"
      @click="toTemplatePage(template.templateId)"
    />
    <div class="template-author">
      <span class="template-recommend">추천</span>
      <span class="template-author">{{
        template.nickName || template.creator
      }}</span>
    </div>
    <span class="template-title" @click="toTemplatePage(template.templateId)">{{
      template.title
    }}</span>
    <div class="template-info">
      <div class="template-price">
        <img src="/img/icon/price-receipt.png" />
        <span>{{ template.price ? `${template.price}원` : '무료' }}</span>
      </div>
      <div class="checkbox" v-if="checkboxView">
        <input
          type="checkbox"
          :id="id"
          :checked="checked"
          @change="checkItem"
        />
        <label :for="id"></label>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
export default {
  props: {
    template: {
      type: Object,
    },
    checkboxView: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
    type: {
      type: String,
      default: 'none',
    },
    search: {
      type: String,
      default: 'none',
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const checkboxView = computed(() => props.checkboxView);

    const toTemplatePage = id => {
      router.push(`/template/${props.type}/${props.search}/${id}`);
    };
    const checked = ref(false);

    const checkItem = () => {
      checked.value = !checked.value;
      emit('check-item', props.id, checked.value);
    };

    watch(checkboxView, () => {
      checked.value = false;
    });

    return {
      toTemplatePage,
      checked,
      checkItem,
    };
  },
};
</script>

<style>
.template-item {
  margin-top: 2em;
  width: calc(100% / 3);
  padding: 0 1em;
}

.template-img {
  height: 220px;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  object-fit: cover;
}

.template-author {
  margin: 1em 0 0.5em 0;
}

.template-recommend {
  background-color: #d6e1f5;
  color: #3168cd;
  padding: 0.2em 0.5em;
  border-radius: 5px;
  font-weight: 600;
  margin-right: 0.5em;
  display: none;
}

.template-author {
  color: #7b7b7b;
  font-weight: 500;
}

.template-title {
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
}

.template-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-price {
  margin-top: 0.8em;
  display: flex;
  align-items: flex-start;
}

.template-price img {
  width: 22px;
  margin-right: 0.3em;
}

.template-price span {
  font-weight: 800;
  font-size: 1.1rem;
  margin-right: 0.4em;
}

.checkbox input {
  display: none;
}

.checkbox input + label {
  cursor: pointer;
}

.checkbox input + label:before {
  content: '';
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 2px solid #e4e5ec;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 0.5em;
}

.checkbox input:checked + label:before {
  background-color: #081829;
  border: 2px solid #081829;
  background-image: url('/img/icon/check.png');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 12px;
}
</style>
