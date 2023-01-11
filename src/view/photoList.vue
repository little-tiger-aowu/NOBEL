<template>
 <div class="listBox">
   <div class="list">
     <van-list
         v-model:loading="loading"
         :finished="finished"
         :immediate-check="immediate"
         finished-text="没有更多了"
         @load="onLoad"
     >
         <div style="" v-for="item in photoList" class="item">
           <div class="imgBox">
             <img :src="item.photo">
           </div>
           <div class="info">
             <div class="intro">
               {{item.content}}
             </div>
             <div class="cover" style="display: flex;justify-content: space-between">
               <div class="userinfo" style="display: flex;align-items: center">
                 <img :src="item.wxHeadPortrait">
                 <div class="username">{{item.title}}</div>
               </div>
               <div class="like" style="font-size: 0.45rem">
                 <div v-if="!item.isLike" style="display: flex;align-items: center">
                   <van-icon @click="clickLike(item)" size="22" name="like-o" />
                   {{ item.countPage }}
                   {{ item.totalCount }}
                 </div>
                 <div v-else style="display: flex;align-items: center">
                   <van-icon @click="clickLike(item)" color="red" size="22" v-show="!like" name="like" />
                   {{ item.countPage }}
                   {{ item.totalCount }}
                 </div>
               </div>
             </div>
           </div>
         </div>
       <div class="bottomTab">
         <img @click="generatePoster" src="../assets/images/postersBtn.png">
         <img @click="player" src="../assets/images/playerBtn.png">
       </div>
     </van-list>
   </div>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllList,cliLike } from "../api/path";
import { useCookie } from "vue-cookie-next";
import { Toast } from 'vant';
import 'vant/es/toast/style';
const cookies = useCookie()
const router = useRouter();

const like = ref<boolean>(false)
// list
const list = ref<any>();
const immediate = ref<boolean>(false)
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  loading.value = true;
  setTimeout(() => {
    data1.pageSize += 4
    getAllList(data1).then((res:any) =>{
      const size = res.data.totalCount
      photoList.value = res.data.pagedList
    })
    loading.value = false;

    if (photoList.value.length >= size.value){
      finished.value = true
    }
  }, 1000);
};

// 获取全部
const photoList = ref<any>()
const size = ref(0)
let data1 = {
  openId:cookies.getCookie('openId'),
  pageNum:1,
  pageSize:4,
}
const getPhotoList = () => {
  getAllList(data1).then((res:any) =>{
    photoList.value = res.data.pagedList
    size.value = res.data.totalCount
    if (size.value === 0 || size.value <= data1.pageSize) {
      finished.value = true
    }
  })
}
getPhotoList()


const data = {
  doctorInformationId:0,
  userId:cookies.getCookie('openId'),
}
// 点赞
const clickLike = (item:any) => {
  data.doctorInformationId = item.id
  cliLike(JSON.stringify(data)).then((res:any) =>{
    getPhotoList()
  })
}

// 生成海报
const generatePoster = () => {
  console.log(cookies.getCookie('openId'))
  if (!cookies.getCookie('openId')) {
    Toast.fail('请先参与活动再分享吧！')
  } else {
    router.push({
      path:'/posters'
    })
  }
}

// 参与活动
const player = () => {
  router.replace({
    path:'/'
  })
}

</script>

<style scoped lang="less">
.listBox{
  height: 100vh;
  background-image: url("../assets/images/listBgimg.png");
  background-size: 100% 100%;
  .list{
    width: 100%;
    position: absolute;
    overflow: scroll;
    bottom: 1%;
    height: 52vh;
    .van-list{
      //display: flex;
      ////flex-direction: column;
      //flex-flow: column wrap;
      //height: 200px;
      column-count: 2;
      column-gap: 0.2rem;
      margin: 0 10px;
    }
    //.item:nth-child(odd){
    //  margin-left: 12px;
    //}
    .item{
      width: 100%;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 0 5px 10px 0;
      display: flex;
      page-break-inside: avoid;
      flex-direction: column;
      .imgBox{
        width: 100%;
        border-radius: 10px 10px 0 0;
      }
      img{
        width: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
      }
      .info{
        width: 95%;

        margin: 0 auto;
        .intro{
          height: 5vh;
          margin: 2px 0;
          font-size: 0.35rem;
          border-bottom: 1px solid;
        }
      }
      .cover{
        display: flex;
        align-items: center;
        margin: 3px 0;
        img{
          border: 1px solid;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          margin-right: 5px;
        }
        .username{
          font-size: 0.2rem;
        }
      }
    }
  }
}
:deep(.van-list__finished-text){
  position: absolute;
  right: 40%;
}
.bottomText{
  display: flex;
  justify-content: center;
  color: #999999;
  font-size: 0.3rem;
}
.bottomTab{
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0.4rem;
  left: 0;
  img{
    width: 40%;
  }
}
</style>
