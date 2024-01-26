<template>
  <div class="modal-container">
    <div class="creator-info">
      <div class="profile-img">
        <img src="/img/icon/default-profile.png" />
      </div>
      <div class="creator-name">
        <span class="name">횬닝</span>
        <span class="response-time">평균 응답시간: 1시간 이내</span>
      </div>
    </div>
    <input
      class="title-input"
      placeholder="제목을 입력해주세요."
      v-model="titleText"
    />
    <textarea placeholder="상세내용을 입력해주세요." v-model="inquiryText" />
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
    <div class="inquire-btn">
      <button @click="uploadInquire">문의하기</button>
      <div @click="clickInquire">취소</div>
    </div>
  </div>
</template>

<script>
import { useImgSave } from '../../composables/imgController';
import axios from '../../axios';
import { ref } from 'vue';
export default {
  props: {
    templateDesc: {
      type: Object,
    },
    clickInquire: {
      type: Function,
    },
  },
  setup({ templateDesc, clickInquire }) {
    const { uploadImg, imgFiles, saveImgFile, deleteImg } = useImgSave();
    const titleText = ref('');
    const inquiryText = ref('');
    const formData = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:9000',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'multipart/form-data',
      },
    };

    const uploadInquire = async () => {
      const inquiryDto = {
        title: titleText.value,
        content: inquiryText.value,
        template_id: templateDesc.templateId,
      };

      const json = JSON.stringify(inquiryDto);
      const blob = new Blob([json], { type: 'application/json' });
      formData.append('inquiryDto', blob);

      if (imgFiles.value.length !== 0) {
        for (let i = 0; i < imgFiles.value.length; i++) {
          formData.append('file', imgFiles.value[i]);
        }
      }

      if (titleText.value === '' || inquiryText.value === '') {
        alert('항목을 모두 입력해주세요.');
      } else {
        try {
          const res = await axios.post('user/inquiry', formData, config);
          console.log(res);
          if (res.data.code === 200) {
            alert('문의가 등록되었습니다.');
            clickInquire();
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      uploadImg,
      saveImgFile,
      deleteImg,
      inquiryText,
      titleText,
      uploadInquire,
    };
  },
};
</script>

<style scoped>
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  background: #fff;
  border-radius: 8px;
  padding: 3em 3.5em;
  box-sizing: border-box;
  max-height: 700px;
  overflow-y: scroll;
}

.creator-info {
  display: flex;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 100;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-right: 0.5em;
}

.profile-img img {
  object-fit: cover;
}

.creator-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.3em;
}

.name {
  font-weight: 600;
  font-size: 1rem;
}

.response-time {
  font-size: 0.8rem;
}

.title-input {
  margin: 2.5em 0 1em;
}

textarea,
.title-input {
  border: 1px solid #e4e5ec;
  border-radius: 8px;
  width: 100%;

  padding: 1em;
}

textarea {
  min-height: 300px;
}

textarea::placeholder,
.title-input::placeholder {
  color: #cacbd3;
}

textarea:focus,
.title-input:focus {
  outline: none;
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

.btn-wrap {
  width: 100%;
  display: flex;
  justify-content: right;
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
}

.add-picture-btn i {
  font-size: 0.8rem;
  margin-right: 0.5em;
}

.inquire-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.6em;
}

.inquire-btn button {
  background-color: #081829;
  color: white;
  border: none;
  padding: 0.8em;
  font-weight: 600;
  width: 300px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-right: 0.8em;
}

.inquire-btn div {
  background-color: #f7f8fc;
  font-size: 0.9rem;
  padding: 0.8em 1.4em;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}
</style>
