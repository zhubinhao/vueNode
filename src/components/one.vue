<template>
  <div class="one" @click="no">
    <div  class="left"  >
        <h1 >惟愿时光清浅</h1>
        <ul>
            <li @click="changeAdd(80)">+ 新建文集</li>
            <div class="add text" >
                <input type="text" placeholder="请输入文集名" v-model="articleName">
                <div>
                    <span class="bottom" @click="sub()">提交</span>
                    <span @click="changeAdd(0)">取消</span>
                </div>
            </div>
            <li class="list " v-for="(i,index) in leftData" :class="index==leftIndex?'active':''" @click="choose(index)">
                {{i.name}} 
                <span class="iconfont icon-shezhi"  v-if="index==leftIndex" @click.stop="open(index)"></span>
                <div class="alert" v-if="i.show=='1'" >
                    <div @click="change(i.id)">修改文集</div>
                    <div @click="deletes(i.id)">删除文集</div>
                </div>
            </li>
        </ul>
        <div class="morecontent" v-if="setting">
           <div @click="trash('bin')">回收站</div>
           <div @click="trash">用户管理</div>
        </div>
        <div class="more" @click.stop="more">
          <div class="iconfont icon-gengduo" ></div>设置
        </div>
    </div>
    <div class="right">
       <div class="li1 " @click="add()">

         +新建文章

      </div>
      <div v-for="(i,index) in rightData" class="li " :class="rightIndex==index?'active':''" @click="choose1(index,i)">

         <span class="iconfont icon-24" :class="i.release1=='0'?'icon-24':'icon-icon_article'"></span>
         <div>
           <p>{{i.title}}</p>
           <small>{{i.update_time.split('T')[0]}}</small>
         </div>
        <span class="iconfont icon-shezhi"  v-if="index==rightIndex"  @click.stop="open1(i)"></span>
        <div class="alert1"  v-if="i.show=='1'">
            <div @click.stop="release(i.id,1)" v-if="i.release1=='0'">发布</div>
            <div @click.stop="release(i.id,0)" v-if="i.release1=='1'">下架</div>
            <div @click.stop="state(i.id,0)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/index.js";
import { trim, sort } from "../js/fn.js";
export default {
  name: "one",
  computed: {
    rightData: function() {
      this.rightIndex = 0;
      let data = this.leftData[this.leftIndex];
      if (data == undefined) return [];
      sort(data.list, "id");
      return data.list;
    }
  },
  // props: [''],
  created() {
    this.articleCollection();
  },
  mounted() {},
  methods: {
    //获取文章集
    articleCollection() {
      this.$api.GET("article/articleCollection", { user: 1 }, res => {
        sort(res.detalis[0].list, "id");
        this.leftData = res.detalis;
        this.$store.commit("changeTitle", this.leftData[0].list[0].title);
        this.$store.commit("changeContent", this.leftData[0].list[0].content);
        this.$store.commit("changeArticleId", this.leftData[0].list[0].id);
      });
    },
    //发布or下架
    release(id,num) {
        let msg = num==1?'是否发布该文章？':'是否下架该文章？'
        this.$confirm(msg, "提示", {
        type: "warning"
      }).then(() => {
      console.log(id,num)
          this.$api.POST(
            "article/release",
            { id: id, state: num },
            res => {
              if (res.success) {
                this.articleCollection();
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });
              } else {
              }
            }
          );
        }).catch(() => {});
    },
    // 删除
    state(id,num) {
        this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        type: "warning"
      }).then(() => {
          this.$api.POST(
            "article/state",
            { id: id, state: num },
            res => {
              if (res.success) {
                this.articleCollection();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
              }
            }
          );
        }).catch(() => {});
    },
    //删除文章集
    deletes(id) {
      this.$confirm("此操作将永久删除该文集, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          console.log(id);
          this.$api.GET(
            "article/deleteCollection",
            { id: id, user: 1 },
            res => {
              if (res.success) {
                this.articleCollection();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
              }
            }
          );
        })
        .catch(() => {});
    },
    trash(e){
      this.$router.push({
         path:e
      })
    },
    //新增文章
    add() {
      console.log(this.leftData[this.leftIndex].id);
      let id = this.leftData[this.leftIndex].id;
      let title = new Date().toLocaleString().split(" ")[0];
      this.$api.POST(
        "article/addArticle",
        { title: title, content: "", collection: id, user: 1 },
        res => {
          console.log(res);
          this.articleCollection();
        }
      );
    },
    //选中xx文章集
    choose(index) {
      this.leftIndex = index;
      let data = this.leftData[index].list[0];
      if (data == undefined) {
        data = {
          title: "",
          content: ""
        };
      }
      this.$store.commit("changeTitle", data.title);
      this.$store.commit("changeContent", data.content);
      this.$store.commit("changeArticleId", data.id);
    },
    choose1(index, i) {
      // console.log(i);
      this.$store.commit("changeTitle", i.title);
      this.$store.commit("changeContent", i.content);
      this.$store.commit("changeArticleId", i.id);
      this.rightIndex = index;
    },
    //打开
    open(index) {
      this.leftData[index].show = "1";
    },
    open1(index) {
      console.log(this.rightData);
      console.log(index);
      index.show = 1;
    },
    //关闭
    close() {
      this.leftData.forEach(res => {
        res.show = "0";
      });
      this.rightData.forEach(res => {
        res.show = "0";
      });
    },
    //设置
    more() {
      this.setting = true;
    },
    //关闭
    no() {
      this.setting = false;
      this.close();
    },
    changeAdd(num) {
      let add = document.getElementsByClassName("add")[0];
      add.style.height = num + "px";
    },
    //新增文集
    sub() {
      if (trim(this.articleName) == "") {
        this.$message.error("文集名不能为空");
        return;
      }
      this.changeAdd(0);
      this.$api.GET(
        "article/addCollection",
        {
          name: this.articleName,
          user: 1
        },
        res => {
          if (res.success) {
            this.articleCollection();
            this.articleName = "";
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          }
        }
      );
    },
    change(id) {
      this.$prompt("请输入文集名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "文集名不能为空"
      }).then(({ value }) => {
        this.$api.GET(
          "article/updateCollection",
          {
            name: value,
            id: id
          },
          res => {
            if (res.success) {
              this.articleCollection();
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            }
          }
        );
      });
    }
  },
  data() {
    return {
      setting: false, //是否显示设置
      leftData: [], //文集集数据
      // rightData: [], //文章集数据
      leftIndex: 0, //文章集index
      rightIndex: 0, //文章集index
      articleName: "" //文集名称
    };
  }
};
</script>
<style scoped  lang="scss">
.one {
  position: relative;
  display: flex;
  justify-items: center;
  align-items: stretch;
  .alert {
    position: absolute;
    right: 10px;
    height: 70px;
    width: 140px;
    top: 40px;
    z-index: 2;
    border-radius: 6px;
    background-color: white;
    color: #999;
    font-size: 16px;
    div {
      height: 35px;
      line-height: 35px;
      padding-left: 20px;
      border-bottom: 1px solid #999;
      cursor: pointer;
      border-radius: 6px 6px 0 0;
      &:last-child {
        border-bottom: none;
        border-radius: 0 0 6px 6px;
      }
      &:hover {
        background-color: #999;
        color: white;
      }
    }
  }
  h1 {
    font-size: 22px;
    text-align: center;
    color: white;
    margin-top: 30px;
    font-family: "宋体";
  }
  .left {
    background-color: #404040;
    height: 100%;
    width: 40%;
    ul {
      font-size: 18px;
      color: white;
      margin-top: 20px;
      list-style: none;
      .text {
        transition: height 0.5s;
      }
      .add {
        width: 100%;
        padding: 0 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 0px;
        position: relative;

        input {
          color: #ccc;
          background-color: #595959;
          border: none;
          height: 30px;
          outline: none;
          border: 1px solid black;
          font-size: 16px;
          padding-left: 10px;
        }
        div {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          .bottom {
            font-size: 15px;
            color: #42c02e;
            border: 1px solid #42c02e;
            width: 60px;
            height: 25px;
            border-radius: 15px;
            text-align: center;
            line-height: 25px;
            margin-right: 10px;
            cursor: pointer;
            &:hover {
              background-color: #666;
            }
          }
          span {
            font-size: 15px;
            color: #999;
            line-height: 25px;
            cursor: pointer;
          }
        }
      }
      li {
        height: 40px;
        font-size: 18px;
        padding-left: 20px;
        line-height: 40px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        span {
          margin-right: 30px;
        }
      }
      .list {
        padding-left: 36px;
      }
      .list:hover {
        background-color: #666666;
      }
      .active {
        position: relative;
        background-color: #666666;
      }
      .active::after {
        content: "";
        position: absolute;
        width: 3px;
        height: 100%;
        background-color: #ec7259;
        left: 0;
      }
    }
    .more {
      position: absolute;
      left: 20px;
      right: 0;
      bottom: 30px;
      color: #999;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
      div {
        margin-right: 6px;
        position: relative;
        top: 1px;
        font-size: 12px;
      }
      &:hover {
        color: white;
      }
    }
    .morecontent {
      position: absolute;
      left: 20px;
      bottom: 70px;
      height: 70px;
      width: 140px;
      border-radius: 6px;
      background-color: white;
      div {
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
        border-bottom: 1px solid #999;
        cursor: pointer;
        border-radius: 6px 6px 0 0;
        &:last-child {
          border-bottom: none;
          border-radius: 0 0 6px 6px;
        }
        &:hover {
          background-color: #999;
          color: white;
        }
      }
    }
  }
  .right {
    height: 100%;
    width: 60%;
    overflow-y: scroll;
    .active {
      background-color: #e6e6e6;
      position: relative;
    }
    .active::after {
      content: "";
      position: absolute;
      width: 3px;
      height: 100%;
      background-color: #ec7259;
      left: 0;
    }
    .li1 {
      height: 60px;
      border-bottom: 1px solid lightgray;
      padding: 0 10px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
    }
    .li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 90px;
      border-bottom: 1px solid lightgray;
      padding: 0 10px;
      cursor: pointer;
      position: relative;
      div {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0 0 0 10px;
        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      &:hover {
        background-color: #e6e6e6;
      }
      .alert1 {
        position: absolute;
        right: 5px;
        height: 70px;
        width: 100px;
        top: 60px;
        z-index: 2;
        border-radius: 6px;
        background-color: #f5f5f5;
        color: #999;
        font-size: 16px;
        margin: 0;
        div {
          height: 35px;
          line-height: 35px;
          padding-left: 20px;
          border-bottom: 1px solid #999;
          cursor: pointer;
          box-sizing: border-box;

          margin: 0;
          &:first-child {
            border-radius: 6px 6px 0 0;
          }
          &:last-child {
            border-bottom: none;
            border-radius: 0 0 6px 6px;
          }
          &:hover {
            background-color: #999;
            color: white;
          }
        }
      }
    }
  }
}
</style>
