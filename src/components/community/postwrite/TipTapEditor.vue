<template>
  <q-card class="tiptap" flat>
    <TiptapEditorMenu :editor="editor" class="tiptap-editor-menu" />
    <editor-content class="editor__content" :editor="editor" />
  </q-card>
</template>

<script setup>
import { watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';

import TiptapEditorMenu from 'components/community/postwrite/TipTapEditorMenu.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '본문을 입력하세요.',
    }),
    Link,
    Image,
    TextAlign,
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML());
  },
});
watch(
  () => props.modelValue,
  value => {
    const isSame = editor.value.getHTML() === value;
    if (isSame) {
      return;
    }
    editor.value.commands.setContent(value, false);
  },
);
</script>
<style lang="scss" src="src/css/tiptap.scss"></style>
<style lang="scss">


.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.tiptap-editor-menu {
  z-index: 2;
  margin-top: 30px;
}
</style>
