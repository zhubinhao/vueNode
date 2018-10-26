<template>

  <div class="index" v-loading="loading">
    
      <one  class="left" ref="one"></one>
    <div class="right">
       <input placeholder="请输入标题"  v-model="content.title"/>
       <mavon-editor v-model="content.content" @save="save" :ishljs = "true" :subfield ='false' class="editor" :toolbars="toolbars"/>

    </div>

  </div>
</template>
<script>
import one from "../components/one";
import { mapState } from "vuex";
import store from "../store/index.js";
export default {
  name: "Index",
  components: { one },
  // props: [''],
  created() {},
  mounted() {},
  computed: {
    ...mapState({
       content: state => state,
       loading:state=>state.loading,
       articleId:state=>state.articleId
    })
  },
  methods: {
    save(value,content){
     let obj={
       id:this.articleId,
       title:this.$store.getters.title,
       content:value
     }
    console.log(obj)
      this.$api.POST('article/updateArticle',obj,res=>{
        console.log(res)
        this.$refs.one.articleCollection()
      })
    }
  },

  watch: {},
  data() {
    return {
      btns: "1",
      toolbars: {
        imagelink: true, // 图片链接
        fullscreen: true, // 全屏编辑
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, //
        htmlcode: true,
       readmodel: true,// 沉浸式阅读
        subfield: true // 单双栏模式
      }
    };
  }
};
</script>
<style scoped  lang="scss">
.v-note-wrapper .v-note-panel.shadow {
    border: none;
    box-shadow: 0 0px 0px rgba(0,0,0,0.157), 0 0px 0px rgba(0,0,0,0.227);
}
.index {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  .left {
    width: 30%;
  }
  
  .right {
    width: 70%;
    position: relative;
    .editor {
      position: absolute;
      left: 0;
      right: 0;
      top: 100px;
      bottom: 0;
      box-shadow: 0 0px 0px white;
    }
    input {
      height: 101px;
      width: 100%;
      border: none;
      outline: none;
      font-size: 30px;
      text-align: center;
    }
  }
}
</style>
