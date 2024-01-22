import { ref } from 'vue';

export const useImgSave = () => {
  const uploadImg = ref([]);
  const imgFiles = ref([]);

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

  return {
    uploadImg,
    imgFiles,
    saveImgFile,
    deleteImg,
  };
};
