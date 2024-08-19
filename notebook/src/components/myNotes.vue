<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="note">
    <!-- textarea输入文本框。v-model：进行数据的双向绑定；placeholder：可被替换的文字 -->
    <textarea v-model="m_note.content" placeholder="点击编辑笔记..."> </textarea> <br>
    <button @click="deleteNote" class="btn_delete"> 删除 </button>
  </div>
  
</template>
  
  <script>
  export default {
    // prop：myNotes对象的属性？
    props: {
        // 名称：类型
        // 这里m_note指自身吗？
        m_note: Object,
        index: Number,
    },
    // watch：监听m_content的变化（由于双向绑定，也即textare的变化），进行文本内容的保存
    watch: {
        "m_note.content": function() {
            this.saveNote();
        },
    },
    methods: {
        // saveNote：将此时编辑的笔记保存至localStorage
        saveNote() {
            localStorage.setItem(this.m_note.id.toString(), this.m_note.content);
        },
        // deleteNote：删除笔记（与父类连接）
        deleteNote() {
            this.$emit("delete", this.index);
        }
    }
  }
  </script>
  
  <style>
    .note{
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 10px;
      width: 96%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    textarea{
      margin-top: 20px;
      height: 50px;
      width: 96%;
      border: none;
      background-color: #F7F7F7;
      padding: 8px;
      cursor: test;
    }
    .btn_delete{
      background-color: #1E90FF;
      margin-top: 8px;
    }

  </style>
  