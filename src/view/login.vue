<template>
  <div class="Login">
    <div >
       <h1>登录</h1> 
       <div >
           <span>用户名</span>
           <input type="text" v-model="name">
       </div>
       <div>
           <span>密码</span>
           <input type="password" v-model="password">
       </div>

       <button @click="submit">登录</button>
    </div>
  </div>
</template>
<script>
import store from '../store/index'
export default {
  name: "Login",
  methods: {
    submit(){//登录
      this.$api.GET("users/login",{
        name:this.name,
        passworld:this.password
      },res=>{
        this.$store.commit('login')
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        this.$router.push({
          path: redirect
        })
      })
    }
  },
  watch: {},
  data() {
    return {
      name: "admin",//用户名
      password:"123456",//密码
    };
  }
};
</script>
<style scoped  lang="scss">
.Login {
  background-color: #f1f1f1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  h1 {
    text-align: center;
  }
  > div {
    width: 360px;
    height: 400px;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    padding: 30px  ;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    border-radius: 6px;
    div {
      height: 60px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      span {
        width: 70px;
      }
      input {
        border: none;
        border-bottom: 1px solid gray;
        outline: none;
        font-size: 18px;
        width: 200px;
        padding: 0 10px;
      }
    }
  }
  button {
    width: 90%;
    display: block;
    margin: 60px auto 0 auto;
    height: 40px;
    background: #3194d0;
    border-radius: 20px;
    border: none;
    color: white;
    font-size: 17px;
    outline: none;
    &:hover {
      background: #67add8;
    }
  }
}
</style>
