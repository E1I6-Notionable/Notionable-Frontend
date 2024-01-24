<template>
  <div class="file-upload">
    <span class="title">{{ title }}</span>
    <label :htmlFor="title">
      <div>
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
        <input
          class="file-uploader"
          type="file"
          :id="title"
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

.file-upload div {
  background-color: white;
  padding: 0.8em;
  margin: 0.5em 0 2.5em 0;
  border-radius: 6px;
  color: #737584;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.file-upload div i {
  margin-right: 0.5em;
}

.file-uploader {
  display: none;
}
</style>
