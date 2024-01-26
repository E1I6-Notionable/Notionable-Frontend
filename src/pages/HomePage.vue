<template>
  <div>
    <CustomHeader page="template" />
    <div class="body">
      <div class="free-template">
        <div class="title">
          <p>추천 무료 템플릿</p>
        </div>
        <div class="carousel">
          <div
            :class="`carousel-img ${
              bannerList.length % 2 === 0 ? '' : 'img-center'
            }`"
          >
            <div
              v-for="(banner, i) in bannerList"
              :key="i"
              :style="`transition: ${carouselTransition}; transform: translateX(-${num}00%)`"
              @click="toTemplatePage('free', banner.templateId)"
            >
              <img :src="banner.thumbnail" alt="thumbnail-img" />
            </div>
          </div>
          <div class="control">
            <div class="control-btn">‹</div>
            <span>{{
              num < 10
                ? `0${(num + 1) % 3 === 0 ? banner.length : (num + 1) % 3}`
                : (num + 1) % 3 === 0
                ? banner.length
                : (num + 1) % 3
            }}</span>
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
              v-for="(banner, i) in payBannerList"
              :key="i"
              :style="`transition: ${payCarouselTransition}; transform: translateX(-${payNum}00%)`"
              @click="toTemplatePage('paid', banner.templateId)"
            >
              <img :src="banner.thumbnail" alt="thumbnail-img" />
            </div>
          </div>
          <div class="control">
            <div class="control-btn">‹</div>
            <span>{{
              payNum < 10
                ? `0${
                    (payNum + 1) % 3 === 0 ? payBanner.length : (payNum + 1) % 3
                  }`
                : (payNum + 1) % 3 === 0
                ? payBanner.length
                : (payNum + 1) % 3
            }}</span>
            <span>/{{ payBannerCount }}</span>
            <div class="control-btn">›</div>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="banner-container community-banner">
          <div class="banner-content">
            <p class="community-p">노션 사용하다가 질문이 생기셨다면?</p>
            <div>
              <p class="community-p">노셔너블 커뮤니티 바로가기</p>
              <div class="community-btn">›</div>
            </div>
          </div>
          <img src="/img/banner_img.png" />
        </div>
        <div class="banner-container creator-banner" @click="toApplyCreator">
          <div class="banner-content">
            <p>Notionable의 크리에이터가 되어주세요!</p>
            <div>
              <p>크리에이터 신청 바로가기</p>
              <div class="creator-btn">›</div>
            </div>
          </div>
          <img src="/img/banner_img2.png" />
        </div>
      </div>
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import CustomHeader from '../components/CustomHeader.vue';
import CustomFooter from '../components/CustomFooter.vue';
import axios from 'src/axios';
import { useRouter } from 'vue-router';
export default {
  name: 'HomePage',
  components: {
    CustomHeader,
    CustomFooter,
  },
  setup() {
    const num = ref(0);
    const payNum = ref(0);
    const carouselTransition = ref('transform 500ms ease-in-out');
    const payCarouselTransition = ref('transform 500ms ease-in-out');
    let timer;
    let payTimer;
    const banner = ref([]);
    const payBanner = ref([]);
    const router = useRouter();

    const bannerList = computed(() => {
      if (banner.value.length !== 0) {
        return [
          ...banner.value,
          ...banner.value,
          ...banner.value,
          banner.value[0],
        ];
      } else return [];
    });
    const payBannerList = computed(() => {
      if (payBanner.value.length !== 0) {
        return [
          ...payBanner.value,
          ...payBanner.value,
          ...payBanner.value,
          payBanner.value[0],
        ];
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

    const payBannerCount = computed(() => {
      if (payBanner.value.length !== 0) {
        return payBanner.value.length < 10
          ? '0' + payBanner.value.length
          : payBanner.value.length;
      } else {
        return 0;
      }
    });

    const getHomePage = async () => {
      try {
        const res = await axios.get('template/recommend-free');
        const payRes = await axios.get('template/recommend-paid');
        console.log(res);
        banner.value = res.data.data;
        payBanner.value = payRes.data.data;
      } catch (err) {
        console.log(err);
      }
    };

    getHomePage();

    onMounted(() => {
      timer = setInterval(() => {
        num.value = num.value + 1;
        carouselTransition.value = 'transform 500ms ease-in-out';
      }, 3000);
      payTimer = setInterval(() => {
        payNum.value = payNum.value + 1;
        payCarouselTransition.value = 'transform 500ms ease-in-out';
      }, 3000);
    });

    onUnmounted(() => {
      clearInterval(timer);
      clearInterval(payTimer);
    });

    watchEffect(() => {
      if (num.value === banner.value.length + 1) {
        handleOriginSlide(0);
      }
      if (payNum.value === payBanner.value.length + 1) {
        payHandleOriginSlide(0);
      }
    });

    const handleOriginSlide = index => {
      setTimeout(() => {
        num.value = index;
        carouselTransition.value = '';
      });
    };

    const payHandleOriginSlide = index => {
      setTimeout(() => {
        payNum.value = index;
        payCarouselTransition.value = '';
      });
    };

    const toApplyCreator = () => {
      router.push('/apply-creator');
    };

    const toTemplatePage = (type, id) => {
      router.push(`/template/${type}/none/${id}`);
    };

    return {
      num,
      carouselTransition,
      bannerList,
      bannerCount,
      banner,
      payNum,
      payCarouselTransition,
      payBanner,
      payBannerList,
      payBannerCount,
      toApplyCreator,
      toTemplatePage,
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
  width: 1400px;
  display: flex;
  justify-content: flex-start;
}

.title > p {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 1.5em 2.5em;
}

.carousel {
  width: 100%;
}

.carousel-img {
  display: flex;
  overflow: hidden;
}

.img-center {
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

.carousel-img > div > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px;
  cursor: pointer;
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
  width: 1400px;
  margin: 6em auto 0;
}

.banner-container {
  display: flex;
  height: 170px;
  border-radius: 10px;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
}

.community-banner {
  background-color: #081829;
  margin-bottom: 2em;
}

.creator-banner {
  background-color: #ffed46;
}

.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6em;
}

.banner-content > p:first-child {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 0.3em 0;
}

.banner-content > div {
  display: flex;
  align-items: center;
}

.banner-content > div > p {
  font-weight: bold;
  font-size: 1.8rem;
  margin: 0 0.5em 0 0;
}

.banner-content > div > div {
  height: 30px;
  width: 30px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2em;
  font-size: 2rem;
}

.community-p {
  color: white;
}

.community-btn {
  background-color: #3a4554;
  color: white;
}

.creator-btn {
  background-color: rgba(0, 0, 0, 0.236);
  color: #081829;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.282);
}

/* .banner img {
  width: 100%;
  margin: 1em 0;
  cursor: pointer;
} */

a {
  text-decoration: none;
}

a:link,
a:active,
a:visited {
  color: black;
}
</style>
