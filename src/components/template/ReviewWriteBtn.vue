<template>
  <div
    class="review-write-btn"
    :class="{ 'btn-absolute': page === 'review', 'write-view': writeView }"
  >
    <img
      :src="
        writeView ? '/img/icon/myreview-pencil.png' : '/img/icon/pencil.png'
      "
    />
    <span>구매후기 작성하기</span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
    },
    writeView: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.review-write-btn {
  background-color: #fafafc;
  padding: 0.7em 1.4em;
  display: flex;
  align-items: center;
  border-radius: 30px;
  cursor: pointer;
  width: fit-content;
  top: 0.5em;
  right: 0;
}

.btn-absolute {
  position: absolute;
}

.review-write-btn img {
  width: 17px;
  height: 17px;
  margin-right: 0.5em;
}

.review-write-btn span {
  color: #313440;
  font-weight: 600;
}

.write-view {
  border: 2px solid #3168cd;
  background-color: white;
}

.write-view span {
  color: #3168cd;
}
</style>
