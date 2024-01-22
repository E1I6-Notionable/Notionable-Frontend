<template>
  <div v-if="editor" class="flex q-pa-xs tip-tap-editor-menu">
    <q-btn flat dense icon="sym_o_photo_camera" @click="handleImageMenu" />
    <q-btn flat dense icon="sym_o_smart_display" @click="handleVideoMenu" />
    <q-btn flat dense @click="toggleTextAlignment">
      <img src="../../../../public/img/icon/align.png" style="width: 21px" />
    </q-btn>
    <q-btn flat dense @click="handleFileMenu">
      <img src="../../../../public/img/icon/file.png" style="width: 21px" />
    </q-btn>
    <q-btn flat dense @click="editor.chain().focus().setHorizontalRule().run()"
      ><img src="../../../../public/img/icon/line.png" style="width: 23px"
    /></q-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  editor: {
    type: Object,
  },
});

const handleImageMenu = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', handleImageUpload);
  input.click();
};

const handleImageUpload = event => {
  const file = event.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    props.editor.chain().focus().setImage({ src: imageUrl }).run();
  }
};

const handleVideoMenu = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/*';
  input.addEventListener('change', handleVideoUpload);
  input.click();
};

const handleVideoUpload = event => {
  const file = event.target.files[0];

  if (file) {
    const videoUrl = URL.createObjectURL(file);
    props.editor.chain().focus().setNode('video', { src: videoUrl }).run();
  }
};

const alignment = ref('left');
const toggleTextAlignment = () => {
  const alignments = ['left', 'center', 'right'];
  const currentIndex = alignments.indexOf(alignment.value);
  const nextIndex = (currentIndex + 1) % alignments.length;

  alignment.value = alignments[nextIndex];

  const contentElement = document.querySelector('.editor__content');
  if (contentElement) {
    contentElement.style.textAlign = alignment.value;
  }
};

const handleFileMenu = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.addEventListener('change', handleFileUpload);
  input.click();
};

const handleFileUpload = event => {
  const file = event.target.files[0];

  if (file) {
    if (!isImageFile(file) && !isVideoFile(file)) {
      const fileUrl = URL.createObjectURL(file);
      const link = `<a href="${fileUrl}" target="_blank">${file.name}</a>`;
      props.editor.chain().focus().insertText(link).run();
    } else {
      window.alert(
        '이미지 또는 비디오 파일을 업로드하려면 상단의 버튼을 이용해주세요.',
      );
      return;
    }
  }
};

const isImageFile = file =>
  checkFileExtension(file, ['.png', '.jpg', '.jpeg', '.gif']);
const isVideoFile = file =>
  checkFileExtension(file, ['.mp4', '.mov', '.avi', '.mkv']);

const checkFileExtension = (file, allowedExtensions) => {
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some(ext => fileName.includes(ext));
};
</script>

<style lang="scss" scoped>
.tip-tap-editor-menu {
  display: flex;
  flex-direction: column;
  width: 50px;
  padding: 10px;
  margin-left: 95%;
  background-color:#fafafc;
  position: absolute;
  & button {
    margin-bottom: 8px; /* Add more padding between icons */
  }
}
</style>
