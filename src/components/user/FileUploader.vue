<template>
  <div class="file-upload">
    <span class="title">{{ title }}</span>
    <label :htmlFor="title ? title : page">
      <div
        class="file-upload-container"
        :class="{ 'answer-file': page === 'answer' }"
      >
        <i v-if="page === 'answer'" class="fa-solid fa-paperclip"></i>
        <i v-else class="fa-solid fa-arrow-up-from-bracket"></i>
        <input
          class="file-uploader"
          type="file"
          :id="title ? title : page"
          accept=".pdf"
          @change="saveFile"
        />
        <span>{{ creatorFileName }}</span>
      </div>
    </label>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    title: {
      type: String,
    },
    page: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const creatorFileName = ref('파일 업로드하기(PDF)');

    const saveFile = e => {
      if (e.target.files) {
        creatorFileName.value = e.target.files[0].name;

        const file = e.target.files[0];
        emit('upload-file', file);
      }
    };

    return {
      creatorFileName,
      saveFile,
    };
  },
};
</script>

<style scoped>
.title {
  color: #313440;
  font-weight: 600;
  font-size: 0.9rem;
}

.file-upload-container {
  background-color: white;
  padding: 0.8em;
  margin: 0.5em 0 2.5em 0;
  border-radius: 6px;
  color: #737584;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.answer-file {
  margin: 0;
}

.file-upload-container i {
  margin-right: 0.5em;
}

.file-uploader {
  display: none;
}
</style>
