<template>
  <div id="app" class="container">
    <h1> 记事本 </h1>
    <span v-if="notes.length==0"> （当前没有笔记，请添加新笔记）</span>
    <myNotes 
      v-for="(m_note, index) in notes"
      :key="m_note.id"
      :m_note="m_note"
      :index="index"
      @delete="deleteNote"
    > </myNotes>
    <button @click="addNote" class="btn-add"> 添加新笔记 </button>
    <button @click="clearNotes" class="btn-clear"> 清空所有笔记 </button>
  </div>
</template>
<!-- v-for循环渲染，里面的"："是什么意思 -->

<script>
import myNotes from './components/myNotes.vue';

export default {
  name: "App",
  components: {
    myNotes,
  },
  data() {
    return {
      // 这里的notes是数组，用于存放note
      notes: [],
    }
  },
  // created()是生命周期的初始化
  created(){
    this.loadNotes();
    if(!this.notes.length){
      this.addNote();
    }
  },
  methods: {
    addNote() {
      const newNote = {
        id: Date.now(),
        content: "",
      };
      // 将这个新note存入notes数组中
      this.notes.push(newNote);
    },
    deleteNote(index) {
      const note_delete = this.notes[index];
      localStorage.removeItem(note_delete.id.toString()); // 在本地仓库中删除关键值的内容
      this.notes.splice(index, 1); // 删除下表为index的内容
    },
    clearNotes() {
      // 清除localStorage并置notes数组为空
      localStorage.clear();
      this.notes = [];
      
    },
    loadNotes() {
      for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        const content = localStorage.getItem(key);
        this.notes.push({
          id: parseInt(key),
          content: content,
        });
      }
    },
  },
}
</script>

<style>
  .container{
    width: 80vh;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  h1 {
    font-family: cursive;;
  }
  button {
    font-family:sans-serifs;
    font-size: 12px;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 8px 10px;
    cursor: pointer; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  button:hover{
    opacity: 0.8;
  }
  .btn-add {
    background-color: #66CDAA;
    width: 100%;
    margin: 5px ;
  }
  .btn-clear {
    background-color: #FA8072;
    width: 100%;
    margin: 5px ;
  }
  span {
    font-family: serif;
    margin-top: 10px;
    margin-bottom: 20px;
  }
</style>
