<template>
  <CustomHeader />
  <div class="mypage">
    <MypageControl v-if="!next" />
    <div v-else class="mypage-category">
      <span
        :class="
          next && !templateNext ? 'category-click' : 'mypage-category-title'
        "
        >템플릿 기본 사항</span
      >
      <span :class="templateNext ? 'category-click' : 'mypage-category-title'"
        >템플릿 소개</span
      >
    </div>
    <div class="mypage-content">
      <div v-if="!next" class="upload-template">
        <img class="upload-template-img" src="/img/apply-creator.png" />
        <p class="upload-template-comment">
          직접 만든 노션 템플릿을 공유해보세요!
        </p>
        <button class="upload-template-btn" @click="toUploadTemplate">
          판매 등록 하러가기
        </button>
      </div>
      <div v-else-if="next && !templateNext" class="template-info">
        <CustomInput
          name="템플릿 제목"
          placeholder="제목을 입력해주세요."
          v-model:value="templateInfo.title"
          page="upload-template"
        />
        <div class="input-wrap">
          <CustomInput
            name="템플릿 가격"
            placeholder="가격을 입력해주세요."
            v-model:value="templateInfo.price"
            page="upload-template"
          />
        </div>
        <div class="next-btn">
          <button class="upload-template-btn" @click="toTemplateDetail">
            다음
          </button>
        </div>
      </div>
      <div v-else class="template-detail">
        <h4>템플릿 소개 상세내용</h4>
        <TemplateCategory
          :categoryList="categoryList"
          @click-category="clickCategory"
        />
        <label htmlFor="input-file" class="btn-wrap">
          <input
            class="img-input"
            type="file"
            accept="image/*"
            id="input-file"
            multiple
            @change="saveImgFile"
          />
          <div class="add-picture-btn">
            <i class="fa-solid fa-plus"></i>
            <span>사진 추가</span>
          </div>
        </label>
        <div v-if="uploadImg.length !== 0" class="preview-img">
          <div class="image-container" v-for="(image, i) in uploadImg" :key="i">
            <div>
              <img :src="image" :alt="`${image}-${i}`" />
            </div>
            <i class="fa-solid fa-circle-xmark" @click="deleteImg(i)"></i>
          </div>
        </div>
        <textarea
          class="template-detail-content"
          placeholder="상세내용을 입력해주세요."
          v-model="templateInfo.content"
        />
        <div class="next-btn">
          <button class="upload-template-btn" @click="uploadTemplate">
            저장하기
          </button>
        </div>
      </div>
    </div>
  </div>
  <CustomFooter />
</template>

<script>
import CustomHeader from 'src/components/CustomHeader.vue';
import CustomFooter from 'src/components/CustomFooter.vue';
import MypageControl from 'src/components/user/MypageControl.vue';
import CustomInput from 'src/components/CustomInput.vue';
import { useImgSave } from 'src/composables/imgController';
import TemplateCategory from 'src/components/template/TemplateCategory.vue';
import { ref } from 'vue';
import axios from '../../axios';

export default {
  components: {
    CustomHeader,
    CustomFooter,
    MypageControl,
    CustomInput,
    TemplateCategory,
  },
  setup() {
    const next = ref(false);
    const templateNext = ref(false);
    const templateInfo = ref({
      title: '',
      price: '',
      content: '',
    });
    const { uploadImg, imgFiles, saveImgFile, deleteImg } = useImgSave();
    const formData = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data',
      },
    };
    const categoryList = [
      { ko: '전체', en: '' },
      { ko: '학업관리', en: 'studyManagement' },
      { ko: '계획표', en: 'plan' },
      { ko: '가계부', en: 'account' },
      { ko: '비지니스/업무용', en: 'business' },
      { ko: '취미관리', en: 'hobby' },
      { ko: '습관관리', en: 'habit' },
      { ko: '독서관리', en: 'reading' },
      { ko: '여행계획', en: 'travel' },
    ];
    const currentCategory = ref('');

    const toUploadTemplate = () => {
      next.value = true;
    };

    const toTemplateDetail = () => {
      if (templateInfo.value.title !== '' && templateInfo.value.price !== '')
        templateNext.value = true;
      else alert('항목을 모두 입력해주세요.');
    };

    const clickCategory = category => {
      currentCategory.value = category;
    };

    const uploadTemplate = async () => {
      try {
        const res = await axios.post(
          'template',
          {
            title: templateInfo.value.title,
            content: templateInfo.value.content,
            category: currentCategory.value,
            price: templateInfo.value.price,
            notionUrl: '',
          },
          config,
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      toUploadTemplate,
      next,
      templateInfo,
      templateNext,
      toTemplateDetail,
      uploadImg,
      saveImgFile,
      deleteImg,
      categoryList,
      clickCategory,
      uploadTemplate,
    };
  },
};
</script>

<style scoped>
.mypage {
  display: flex;
  justify-content: center;
  margin-top: 6em;
  min-height: 60vh;
}

.mypage-content {
  width: 800px;
}

.upload-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5em;
}

.upload-template-img {
  width: 70%;
}

.upload-template-comment {
  font-size: 1.6rem;
}

.upload-template-btn {
  background-color: #081829;
  color: white;
  border: none;
  padding: 0.9em;
  font-size: 1rem;
  font-weight: 600;
  width: 350px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 3em;
}

.mypage-category {
  width: 200px;
  margin-right: 6em;
  border-top: 2px solid black;
  padding-top: 1em;
  display: flex;
  flex-direction: column;
}

.mypage-category-title,
.category-click {
  font-weight: 500;
  font-size: 1rem;
  display: inline-block;
  margin: 0.5em 0;
  cursor: pointer;
}

.category-click {
  font-weight: 700;
}

.template-info,
.template-detail {
  width: 600px;
}

.input-wrap {
  margin: 3em 0;
}

.next-btn {
  display: flex;
  justify-content: center;
}

.template-detail h4 {
  font-size: 1.2rem;
  margin: 0 0 0.5em 0.8em;
}

.img-input[type='file'] {
  display: none;
}

.preview-img {
  height: 200px;
  display: flex;
  align-items: center;
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

.add-picture-btn {
  background-color: #f7f8fc;
  color: #3a3a3a;
  width: fit-content;
  white-space: nowrap;
  padding: 0.5em 1em;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1em;
  margin-left: 1em;
}

.add-picture-btn i {
  font-size: 0.8rem;
  margin-right: 0.5em;
}

.template-detail-content {
  width: 100%;
  border: 1px solid #e4e5ec;
  resize: none;
  border-radius: 6px;
  min-height: 400px;
  margin-top: 1.5em;
  padding: 1em;
  margin-left: 1em;
}

.template-detail-content::placeholder {
  color: #cacbd3;
}

.template-detail-content:focus {
  outline: none;
}
</style>
