<template>
  <div class="index">
      <ul>
          <div>回收站(9)</div>
          <li v-for=" (i,index) in dat" :class="index===btns?'act':''" @click="change(index)">12</li>
      </ul>
      <div class="rigth">
         <div class="title">
             <h3>121212</h3>
             <i @click="cencel">X</i>
         </div>
        <mavon-editor v-model="html" :ishljs = "true" :defaultOpen="preview" :subfield ='false' class="editor" :editable="false" :toolbarsFlag="false"/>
        <div class="title1 ">
            <button>恢复文章</button>
            <button>彻底删除</button>

         </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "Bin",
  components: {},
  // props: [''],
  created() {},
  mounted() {},
  computed: {
    //计算机属性
  },
  methods: {
    change(e) {
      this.btns = e;
    },
    cencel() {
      window.history.go(-1);
    }
  },

  watch: {},
  data() {
    return {
      btns: 0,
      dat: 9,
      preview: "preview",
      html: "<p><code>121</code></p>"
    };
  }
};
</script>
<style scoped  lang="scss">

.index {
    
  ul {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 20%;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;
    li {
      height: 45px;
      border-bottom: 1px solid #d9d9d9;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 3px solid white;
      cursor: pointer;
    }
    .act {
      background-color: #f2f2f2;
      border-left-color: #ec7259;
    }
    div {
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .rigth {
    position: fixed;
    left: 20%;
    top: 0;
    bottom: 0;
    width: 80%;
    display: flex;
    flex-direction: column;
    .title1 {
      height: 80px;
      background: #fff;
      padding: 0 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 130px;
        height: 40px;
        border-radius: 6px;
        margin: 0 10px;
        border: none;
        outline: none;
        &:last-child {
          background: #ec7259 ;
          color: white;
        }
        &:first-child {
          background: #42c02e;
          color: white;
        }
      }
    }
    .title {
      height: 80px;
      background: #e6e6e6;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h1 {
        flex: 1;
      }
      i {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .editor {
      flex: 1;
      border: 1px solid #fbfbfb;
      div{
      box-shadow: none;

      }
    }
  }
}
</style>
