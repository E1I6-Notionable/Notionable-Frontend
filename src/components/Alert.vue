<template>
  <div class="alert-container">
    <div class="alert-modal">
      <div class="alert-text">
        <span>{{ text }}</span>
      </div>
      <div class="alert-btn">
        <button @click="buttonFunc">{{ buttonText.yes }}</button>
        <button @click="closeFunc">{{ buttonText.close }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    buttonText: {
      type: Object,
    },
    buttonFunc: {
      type: Function,
    },
    closeFunc: {
      type: Function,
    },
  },
  setup() {},
};
</script>

<style scoped>
.alert-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.alert-modal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.alert-text {
  text-align: center;
  padding: 3em 0;
  font-weight: 500;
}

.alert-btn button {
  width: calc(100% / 2);
  padding: 0.8em 0;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.alert-btn button:first-child {
  background-color: #081829;
  color: white;
}
</style>
