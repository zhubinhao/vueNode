import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
  state: {
    token:1,//0未登录 1 登录
    title: '',
    content: "",
    articleId:0,//文章id
    loading: false
  },
  mutations: {
    login (state) {
      state.token=1
    },
    changeLoding(state){
      state.loading=!state.loading
    },
    changeTitle(state,val){
      state.title = val
    },
    changeContent(state,val){
      state.content = val
    },
    changeArticleId(state,val){
      state.articleId = val
    }
  },
  actions: {
    
   
  },
  getters: {
    title: function (state) {
      return state.title
    }
  }
})

export default store
