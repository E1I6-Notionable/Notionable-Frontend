<template>
  <div class="tabs-container">
    <div class="tabs">
      <q-btn
        flat
        class="tab"
        v-for="(button, index) in buttons"
        :key="index"
        :label="button.label"
        :class="{ 'clicked-button': button.clicked }"
        @click="handleButtonClick(index)"
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
        { label: '전체글', url: '/posts/all', clicked: true},
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
    goToWritePage() {

    },
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

<!--
  <template>
  <div class="tabs-container">
    <div class="tabs">
      <q-btn
        flat
        class="tab"
        v-for="option in tabOptions"
        :key="option.label"
        :to="option.to"
        :label="option.label"
        :class="{ 'active-tab': selectedTab === option.label }"
        @click="selectTab(option.label)"
      />
    </div>

    <q-btn
      padding="6px 12px 6px 8px"
      unelevated
      color="white"
      text-color="black"
      class="post-write"
      @click="goToWritePage"
    >
      <img src="../../../public/img/icon/tabler_pencil.png" />
      <span class="text-weight-bold">&nbsp;글 작성하기</span>
    </q-btn>

    <component :is="selectedComponent" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: 'all',
      tabOptions: [
        { to: '/posts/all', label: '전체글' },
        { to: '/posts/hot', label: '인기글' },
        { to: '/posts/free', label: '자유게시판' },
        { to: '/posts/tip', label: '꿀팁공유' },
        { to: '/posts/inquiry', label: '질문있어요' },
      ],
    };
  },
  methods: {
    goToWritePage() {
      // 글 작성 페이지로 이동하는 메서드
      // 여기에 필요한 로직을 추가하세요
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
  computed: {
    selectedComponent() {
      switch (this.selectedTab) {
        case 'all':
          return 'all';
        case 'hot':
          return 'hot';
        case 'free':
          return 'free';
        case 'tip':
          return 'tip';
        case 'inquiry':
          return 'inquiry';
        default:
          return 'all';
      }
    },
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
.q-btn.active-tab {
  /* Add your styles for the active tab here */
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
  font-size: 16.5px;
}
</style> -->
