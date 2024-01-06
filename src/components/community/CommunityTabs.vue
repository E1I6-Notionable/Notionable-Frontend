<template>
  <div class="tabs-container">
    <div class="tabs">
      <q-btn
        flat
        class="tab"
        @click="handleButtonClick(index)"
        v-for="(button, index) in buttons"
        :key="index"
        :label="button.label"
        :class="{ 'clicked-button': button.clicked }"
      />
    </div>
    <q-btn
      padding="4.5px 12px 4.5px 12px"
      unelevated
      color="white"
      text-color="black"
      class="post-write"
      @click="goToWritePage"
    >
      <img src="../../../public/img/icon/tabler_pencil.png" />
      <span class="text-weight-bold">&nbsp;글 작성하기</span>
    </q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { label: '전체글', url: '/posts/all', clicked: false },
        { label: '인기글', url: '/posts/hot', clicked: false },
        { label: '자유게시판', url: '/posts/free', clicked: false },
        { label: '꿀팁공유', url: '/posts/tip', clicked: false },
        { label: '질문있어요', url: '/posts/inquiry', clicked: false },
      ],
    };
  },
  methods: {
    handleButtonClick(index) {
      this.buttons[index].clicked = true;
      this.buttons.forEach((button, i) => {
        if (i !== index) {
          button.clicked = false;
        }
      });
      this.$router.push(this.buttons[index].url);
    },
    goToWritePage() {},
  },
  created() {
    const currentRoute = this.$route.path;
    console.log(currentRoute);
    if (currentRoute.includes('/posts/hot')) {
      this.buttons[1].clicked = true;
    } else if (currentRoute.includes('/posts/free')) {
      this.buttons[2].clicked = true;
    } else if (currentRoute.includes('/posts/tip')) {
      this.buttons[3].clicked = true;
    } else if (currentRoute.includes('/posts/inquiry')) {
      this.buttons[4].clicked = true;
    } else {
      this.buttons[0].clicked = true;
    }
  },
};
</script>

<style scoped>
.tabs-container {
  margin: 80px 360px;
}
.tabs {
  display: flex;
  gap: 15px;
}
.tab {
  background-color: #f7f8fc;
  border-radius: 50px;
  font-weight: 600;
}
.clicked-button {
  border: 1.5px solid #3168cd;
  border-radius: 50px;
  color: #3168cd;
}
.post-write {
  display: flex;
  margin-top: 30px;
  margin-left: auto;
  border-radius: 50px;
  border: 1.5px solid #cacbd3;
  font-size: 16px;
}
</style>
