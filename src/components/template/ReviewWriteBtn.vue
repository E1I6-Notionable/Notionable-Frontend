<template>
  <div
    :class="
      page === 'review' ? 'review-write-btn btn-absolute' : 'review-write-btn'
    "
  >
    <img src="/img/icon/pencil.png" />
    <span>구매후기 작성하기</span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
    },
  },
};
</script>

<style>
.review-write-btn {
  background-color: #fafafc;
  padding: 0.7em 1.4em;
  display: flex;
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
</style>
