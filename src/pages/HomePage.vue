<template>
  <div>
    <CustomHeader page="template" />
    <div class="body">
      <div class="free-template">
        <div class="title">
          <p>추천 무료 템플릿</p>
        </div>
        <div class="carousel">
          <div class="carousel-img">
            <div
              v-for="(banner, i) in bannerList"
              :key="i"
              :style="`transition: ${carouselTransition}; transform: translateX(-${num}00%)`"
            >
              <div>{{ banner }}</div>
            </div>
          </div>
          <div class="control">
            <div class="control-btn">‹</div>
            <span>{{ num < 10 ? `0${num + 1}` : num + 1 }}</span>
            <span>/{{ bannerCount }}</span>
            <div class="control-btn">›</div>
          </div>
        </div>
      </div>
      <div class="free-template">
        <div class="title">
          <p>추천 유료 템플릿</p>
        </div>
        <div class="carousel">
          <div class="carousel-img">
            <div
              v-for="(banner, i) in bannerList"
              :key="i"
              :style="`transition: ${carouselTransition}; transform: translateX(-${num}00%)`"
            >
              <div>{{ banner }}</div>
            </div>
          </div>
          <div class="control">
            <div class="control-btn">‹</div>
            <span>{{ num < 10 ? `0${num + 1}` : num + 1 }}</span>
            <span>/{{ bannerCount }}</span>
            <div class="control-btn">›</div>
          </div>
        </div>
      </div>
      <div class="banner">
        <img src="/img/Banner_1.png" />
        <img src="/img/Banner_2.png" />
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import CustomHeader from '../components/CustomHeader.vue';
import CustomFooter from '../components/CustomFooter.vue';
export default {
  name: 'HomePage',
  components: {
    CustomHeader,
    CustomFooter,
  },
  setup() {
    const num = ref(0);
    const carouselTransition = ref('transform 500ms ease-in-out');
    let timer;
    const banner = ref([]);
    const bannerList = computed(() => {
      if (banner.value.length !== 0) {
        return [...banner.value, ...banner.value, ...banner.value];
      } else return [];
    });
    const bannerCount = computed(() => {
      if (banner.value.length !== 0) {
        return banner.value.length < 10
          ? '0' + banner.value.length
          : banner.value.length;
      } else {
        return 0;
      }
    });

    const getHomePage = () => {
      banner.value = [0, 1, 2, 3, 4, 5, 6];
    };

    getHomePage();

    // onMounted(() => {
    //   timer = setInterval(() => {
    //     num.value = num.value + 1;
    //     carouselTransition.value = 'transform 500ms ease-in-out';
    //   }, 3000);
    // });

    onUnmounted(() => {
      clearInterval(timer);
    });

    watchEffect(() => {
      if (num.value === banner.value.length) {
        handleOriginSlide(0);
      }
    });

    const handleOriginSlide = index => {
      setTimeout(() => {
        num.value = index;
        carouselTransition.value = '';
      });
    };

    return {
      num,
      carouselTransition,
      bannerList,
      bannerCount,
    };
  },
};
</script>

<style scoped>
.body {
  max-width: 2400px;
  margin: 0 auto;
}

.free-template {
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  width: 1500px;
  display: flex;
  justify-content: flex-start;
}

.title > p {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 1.5em 3.5em;
}

.carousel {
  width: 100%;
}

.carousel-img {
  display: flex;
  overflow: hidden;
  justify-content: center;
}

.carousel-img > div {
  width: 100%;
  max-width: 480px;
  height: 250px;
  border-radius: 18px;
  flex-shrink: 0;
  padding: 0 0.5em;
  overflow: hidden;
}

.carousel-img > div > div {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  background-color: gray;
}

.control {
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.control-btn {
  box-shadow: 0px 3px 5px rgb(213, 213, 213);
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 0.9em 0.3em 0.9em;
}

.control span:nth-child(2) {
  font-size: 1.2rem;
  font-weight: 600;
}

.control span:nth-child(3) {
  font-size: 1.2rem;
  font-weight: 600;
  color: #c8cad1;
}

.banner {
  margin-top: 6em;
  padding: 0 4em;
}

.banner img {
  width: 100%;
  margin: 1em 0;
  cursor: pointer;
}

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
