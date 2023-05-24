<template>
 <div class="postersBox">
   <!-- 生成海报 -->
   <div v-if="!isMakePoster" class="posterTemplate" ref="posterTemplate">
     <div  class="userImg">
       <img  style="width: 100%;height: 100%" :src=fromData.imgUrl class="posterBg" />
<!--       <img  style="width: 100%;height: 100%" :src=userImg class="posterBg" />-->
     </div>
     <div>
       <div class="userInfo">
          <div class="userName">{{ fromData.title }}</div>
         <div class="hospitalName">{{ fromData.clinic}}</div>
         <div class="introduce">{{ fromData.content }}</div>
       </div>
     </div>
   </div>
   <div v-else class="posterImg" style="width: 100%;height: 100vh">
      <img style="width: 100%;height: 100%" :src="posterUrl">
     <div class="bottomTip">
      <img style="width: 100%" src="../assets/images/bottomTip.png">
     </div>
   </div>
 </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import html2canvas from "html2canvas";
import { Toast } from 'vant';
import { useCookie } from "vue-cookie-next";
import 'vant/es/toast/style';
import {message} from "ant-design-vue";
const router = useRouter();
const cookies = useCookie()


const fromData = cookies.getCookie('fromData')

// 生成海报
const isMakePoster = ref(false)
const userImg = ref('https://ssl.resource.synconize.com/1667536527423-36D71A48-15CE-4445-948F-3EF6E8CF86B4.jpeg')
const posterTemplate = ref<any>('');
const posterUrl = ref('')
const makePoster = () => {
  Toast({
    message:"海报生成中...",
    type:'loading',
    duration:1500
  });
  setTimeout(() => {
    html2canvas(posterTemplate.value, {
      backgroundColor: null,
      useCORS: true, // 开启跨越配置
      scale: 4
    }).then((canvas:any)  => {
      // Snackbar.clear(); // 清除上传动画
      posterUrl.value = canvas.toDataURL("image/*");
      isMakePoster.value = true
      Toast({
        message:'海报生成成功',
        type:'success',
        duration:1000
      });
    });
  }, 100);
}

setTimeout(() =>{
  makePoster()
},800)


</script>

<style scoped lang="less">
.postersBox{
  height: 100vh;
  width: 100%;
  .posterTemplate{
    height: 100%;
    background-image: url("../assets/images/postersBgimg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .userImg{
      width: 69%;
      height: 40%;
      transform: rotate(11deg);
      position: absolute;
      top:25%;
      left: 19%;
    }
    .userInfo{
      width: 69%;
      height: 20%;
      position: absolute;
      top:68%;
      transform: rotate(10deg);
      left: 5%;
      .userName{
        //position: relative; top:-150px;LEFT: 150px;
        color: transparent;
        -webkit-text-stroke: 1px rgba(23, 22, 22, 0.7);
        font-size: 0.7rem;
        font-weight: bold;
        letter-spacing: 0.02em;
      }
      .hospitalName{
        font-size: 0.4rem;
        font-weight: bolder;
        margin: 5px 0;
      }
      .introduce{
        font-size: 0.35rem;
      }

    }

  }
}
.bottomTip{
  position: fixed;
  bottom: 0;
  height: 28px;
  font-size: 0.35rem;
  font-weight: bolder;
  width: 100%;
  //background-color: #f50000;
  //text-align: center;
  //color: white;
  //opacity: 0.8;
}
</style>
