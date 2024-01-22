<template>
  <form class="write-review" @submit.prevent="uploadReview">
    <h1>구매하신 상품은 만족하시나요?</h1>
    <div class="btn-container">
      <div
        class="satisfaction-btn"
        v-for="btn in ['만족해요', '별로에요']"
        :key="btn"
        :class="{ 'btn-click': btn === satisfaction }"
        @click="clickSatisfaction(btn)"
      >
        {{ btn }}
      </div>
    </div>
    <h1>자세한 리뷰를 작성해주세요</h1>
    <div class="write-content">
      <textarea v-model="content" />
      <label htmlFor="input-file">
        <input
          class="img-input"
          type="file"
          accept="image/*"
          id="input-file"
          multiple
          @change="saveImgFile"
        />
        <i class="fa-solid fa-camera"></i>
      </label>
    </div>
    <div v-if="uploadImg.length !== 0" class="preview-img">
      <div class="image-container" v-for="(image, i) in uploadImg" :key="i">
        <div>
          <img :src="image" :alt="`${image}-${i}`" />
        </div>
        <i class="fa-solid fa-circle-xmark" @click="deleteImg(i)"></i>
      </div>
    </div>
    <div class="upload-btn">
      <button>리뷰 등록하기</button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import axios from '../../axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const satisfaction = ref('');
    const content = ref('');
    const formdata = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data',
      },
    };
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const uploadImg = ref([]);
    const imgFiles = ref([]);

    const clickSatisfaction = state => {
      satisfaction.value = state;
    };

    const saveImgFile = e => {
      if (e.target.files) {
        const files = e.target.files;

        if (!files[0]) return;

        let imgUrlList = [...uploadImg.value];
        let imgList = [...imgFiles.value];

        for (let i = 0; i < files.length; i++) {
          const currentImageUrl = URL.createObjectURL(files[i]);
          imgUrlList.push(currentImageUrl);
          imgList.push(files[i]);
        }

        uploadImg.value = imgUrlList;
        imgFiles.value = imgList;
      }
    };

    const deleteImg = id => {
      uploadImg.value = uploadImg.value.filter((_, index) => index !== id);
      imgFiles.value = imgFiles.value.filter((_, index) => index !== id);
    };

    const uploadReview = async () => {
      const reqDto = {
        templateId: id,
        rate: satisfaction.value,
        content: content.value,
      };
      const json = JSON.stringify(reqDto);
      const blob = new Blob([json], { type: 'application/json' });

      formdata.append('reqDto', blob);

      if (imgFiles.value.length !== 0) {
        for (let i = 0; i < imgFiles.value.length; i++) {
          formdata.append('files', imgFiles.value[i]);
        }
      }

      if (satisfaction.value === '' || content.value === '') {
        alert('항목을 모두 입력해주세요.');
      } else {
        try {
          const res = await axios.post('template/review', formdata, config);
          console.log(res);

          if ((res.data.code = 200)) {
            alert('리뷰가 정상적으로 등록되었습니다.');
            store.dispatch('review/reviewView', { reviewView: true });
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      satisfaction,
      clickSatisfaction,
      uploadReview,
      content,
      saveImgFile,
      uploadImg,
      deleteImg,
    };
  },
};
</script>

<style scoped>
.write-review {
  margin-top: 5em;
}

h1 {
  font-size: 1.8em;
  font-weight: 600;
  margin: 0;
}

.btn-container {
  display: flex;
  margin-bottom: 4em;
}

.satisfaction-btn {
  background-color: #fafafc;
  padding: 0.5em 1.3em 0.3em;
  margin-right: 1em;
  font-size: 1.2rem;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
}

.btn-click {
  background-color: #081829;
  color: white;
}

.write-content {
  position: relative;
}

.write-content textarea {
  width: 100%;
  box-sizing: border-box;
  background-color: #fafafc;
  border-radius: 20px;
  min-height: 300px;
  border: none;
  padding: 1.5em;
  font-size: 1rem;
}

.write-content textarea:focus {
  outline: none;
}

.write-content i {
  color: #3a3a3a;
  font-size: 1.4rem;
  cursor: pointer;
  position: absolute;
  bottom: 25px;
  right: 25px;
}

.img-input[type='file'] {
  display: none;
}

.preview-img {
  height: 200px;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  overflow-x: auto;
  white-space: nowrap;
}

.image-container {
  display: inline-block;
  position: relative;
  margin-right: 1.5em;
  border-radius: 10px;
}

.image-container > div {
  width: 250px;
  height: 150px;
  overflow: hidden;
}

.image-container > div > img {
  margin: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
}

.image-container i {
  color: #081829;
  position: absolute;
  cursor: pointer;
  font-size: 1.7rem;
  bottom: -10px;
  right: -10px;
  cursor: pointer;
}

.upload-btn {
  display: flex;
  justify-content: right;
  margin-top: 2em;
}

.upload-btn button {
  background-color: #313440;
  color: white;
  border: none;
  padding: 0.5em 1.3em;
  font-weight: 700;
  cursor: pointer;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
