<template>
  <div class="postwrite">
    <q-form @submit.prevent="handleSubmit">
      <q-card-section class="q-gutter-y-sm">
        <div class="categories">
          <div class="aselect" :data-value="value" :data-list="list">
            <div class="selector" @click="toggle()">
              <div class="label">
                <span>{{ value }}</span>
              </div>
              <span class="material-icons arrow" :class="{ expanded: visible }">
                expand_more
              </span>
              <div :class="{ hidden: !visible, visible }">
                <ul>
                  <li
                    :key="item"
                    :class="{ current: item === value }"
                    v-for="item in list"
                    @click="updateCategory(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <input
          v-model="titleModel"
          placeholder="제목을 입력하세요"
          @change="updateTitle"
        />
        <q-separator />
          <TiptapEditor v-model="contentModel" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="left">
        <slot name="actions">
          <q-btn
            type="submit"
            flat
            rounded
            label="등록하기"
            style="font-weight: 500; font-size: 15px; background-color: #313440; color: white; width: 95px; height: 35px;margin-top: 20px;"
            :loading="loading"
          />
        </slot>
      </q-card-actions>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TiptapEditor from 'src/components/community/postwrite/TipTapEditor.vue';
import axios from 'axios';
import {useQuasar} from 'quasar';

const $q = useQuasar();
const value = ref('카테고리');
const list = ref(['자유게시판', '꿀팁 공유', '질문있어요']);
const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};

const updateCategory = option => {
  value.value = option;
};


const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'submit',
]);

const titleModel = ref(props.title);
const contentModel = ref(props.content);

const updateTitle = () => {
  emit('update:title', titleModel.value);
};

const handleSubmit = async () => {
  if (!contentModel.value) {
    $q.notify('내용을 작성하세요.');
    return;
  }
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.post(
      'http://13.209.29.227:8080/posts/add',
      {
        title: props.title,
        category: value.value,
        content: contentModel.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Post saved successfully:', response.data);
    emit('submit');
  } catch (error) {
    console.error('Error saving post:', error);
  }
};
</script>

<style lang="scss" scoped>
.aselect {
  width: 110px;
  height: 30px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #313440;
  .selector {
    border-radius: 50px;
    background: #f7f8fc;
    position: relative;
    .arrow {
      font-size: 22px;
      position: absolute;
      right: 5px;
      top: 13px;
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
    .label {
      display: block;
      padding: 12px;
    }
  }
  ul {
    border-radius: 10px;
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #fff;
  }
  li {
    padding: 12px;
    &:hover {
      color: #3168cd;
    }
  }
  .current {
    background: #eaeaea;
  }
  .hidden {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
}

input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-top: 40px;
  padding: 20px 5px;

  &:focus {
    border: none;
  }
}
input::placeholder {
  color: black;
}


</style>
