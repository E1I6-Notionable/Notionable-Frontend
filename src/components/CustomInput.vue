<template>
  <div class="input-container">
    <span
      class="title"
      :class="{ 'title-large': page === 'upload-template' }"
      >{{ name }}</span
    >
    <div>
      <input
        :placeholder="placeholder"
        :type="currentType"
        :value="value"
        @input="onInput"
      />
      <img
        v-if="icon"
        src="/img/icon/password_icon.png"
        alt="password_icon"
        @click="controlPwView"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
    },
    icon: {
      type: Boolean,
    },
    value: {
      type: String,
      required: true,
    },
    page: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const currentType = ref(props.type);

    const onInput = e => {
      emit('update:value', e.target.value);
    };

    const controlPwView = () => {
      if (currentType.value === 'password') {
        currentType.value = 'text';
      } else {
        currentType.value = 'password';
      }
    };

    return {
      currentType,
      onInput,
      controlPwView,
    };
  },
};
</script>

<style>
.input-container {
  text-align: left;
  margin-top: 1.5em;
}

.title {
  color: #313440;
  font-size: 0.9rem;
  font-weight: 500;
}

.title-large {
  font-size: 1.1rem;
  color: black;
}

input {
  border: 1px solid #e4e5ec;
  padding: 0.8em 0.9em;
  border-radius: 6px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 0.9rem;
  margin: 0.4em 0 0 0;
}

input::placeholder {
  color: #cacbd3;
}

input:focus {
  outline: none;
}

.input-container div {
  position: relative;
  height: fit-content;
}

.input-container div img {
  width: 17px;
  position: absolute;
  right: 15px;
  top: 30%;
  cursor: pointer;
}
</style>
