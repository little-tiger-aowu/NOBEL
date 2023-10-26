<template>
 <div class="listBox">
   <div @scroll="handleScroll" class="content">
     <Waterfall :list="photoList" :gutter="10"  :breakpoints="breakpoints">
       <template #item="{ item, url, index }">
         <div class="card">
           <div class="info">
             <div class="intro">
               <span>{{item.content}}</span>
             </div>
             <div class="cover" style="display: flex;justify-content: space-between">
               <div class="userinfo" style="display: flex;align-items: center">
                 <img :src="item.wxHeadPortrait">
                 <div v-if="item.recommendation === '我的故事'" class="username">{{item.title}}</div>
                 <div v-else class="username1">
                   <div class="wxName">{{item.wxNickname}}</div>
                   <span>推荐了</span>
                   <div class="wxName">{{item.title}}</div>
                 </div>
               </div>
               <div class="like" style="font-size: 0.45rem">
                 <div v-if="!item.isLike" style="display: flex;align-items: center">
                   <van-icon @click="clickLike(item)" size="22" name="like-o" />
                   {{ item.countPage }}
                 </div>
                 <div v-else style="display: flex;align-items: center">
                   <van-icon @click="clickLike(item)" color="red" size="22" v-show="!like" name="like" />
                   {{ item.countPage }}
                 </div>
               </div>
             </div>
           </div>
           <!--             <LazyImg :url="item.url" />-->
           <!--             {{item.name}}-->
         </div>
       </template>
     </Waterfall>
     <div class="bottomTip">
       <span v-if="noMore">没有更多了</span>
       <span v-else>加载中。。。</span>
     </div>
   </div>
   <div class="bottomTab">
     <img @click="generatePoster" src="../assets/images/postersBtn.png">
     <img @click="player" src="../assets/images/playerBtn.png">
   </div>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getAllList,cliLike } from "../api/path";
import { useCookie } from "vue-cookie-next";
import { Toast } from 'vant';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import 'vant/es/toast/style';
const cookies = useCookie()
const router = useRouter();

const like = ref<boolean>(false)

// 滚动加载更多
const isLoading = ref(false) //  是否正在加载中
const noMore = ref(false);   // 是否有更多数据
const handleScroll = () => {
  if (isLoading.value){
    return;
  }
  // 滚动元素的DOM节点
  const scrollElement:any = document.querySelector('.content');
  // 滚动元素的高度
  const containerHeight = scrollElement.offsetHeight;
  // 滚动元素滚动的高度
  const scrollHeight = scrollElement.scrollHeight;
  // 滚动元素顶部距离滚动容器顶部的距离
  const scrollTop = scrollElement.scrollTop;
  // 判断是否触底
  if (containerHeight + scrollTop + 20 >= scrollHeight) {
    isLoading.value = true
    // 触底逻辑，例如加载更多数据
    console.log('触底')
    setTimeout(()=>{
      data1.pageSize += 10
      getPhotoList()
      isLoading.value = false
    },1500)
  }

}


// 获取全部
const photoList = ref<any>()
const size = ref(0)
let data1 = {
  openId:cookies.getCookie('openId'),
  pageNum:1,
  pageSize:10,
}
const getPhotoList = () => {
  getAllList(data1).then((res:any) =>{
    photoList.value = res.data.pagedList
    size.value = res.data.totalCount
    if (size.value === 0 || size.value <= data1.pageSize) {
      noMore.value = true
    }
  })
}
getPhotoList()

// 点赞
const data = {
  doctorInformationId:0,
  userId:cookies.getCookie('openId'),
}
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

// 瀑布流自适应
const  breakpoints = ref({
  1200: { //当屏幕宽度小于等于1200
    rowPerView: 4,
  },
  800: { //当屏幕宽度小于等于800
    rowPerView: 3,
  },
  500: { //当屏幕宽度小于等于500
    rowPerView: 2,
  }
})

</script>

<style scoped lang="less">
.listBox{
  height: 100vh;
  background-image: url("../assets/images/listBgimg1.png");
  background-size: 100% 100%;
  .content{
    width: 100%;
    position: absolute;
    bottom: 1%;
    overflow: scroll;
    height: 52vh;
  }
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
.card{
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  page-break-inside: avoid;
  flex-direction: column;

}
.info{
  width: 95%;
  margin: 0 auto;
  .intro{
    min-height: 50px;
    display: flex;
    align-items: center;
    margin: 2px;
    letter-spacing: 2px;
    font-size: 0.35rem;
    border-bottom: 1px solid;
    color: #999999;
    span{
      padding: 4px;
    }
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
  .username1{
    font-size: 0.2rem;
    display: flex;
    align-items: center;
    .wxName{
      font-size: 12px;
      width: 30px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    span{
      display: inline-block;
      margin: 0 1px;
      font-size: 12px;
      color: #999999
    }
  }
}
.waterfall-list{
  background-color: transparent;
}
.bottomTip{
  height: 50px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  span{
    text-align: center;
  }
}
</style>
