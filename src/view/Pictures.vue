<template>
  <div class="content">
    <div class="uploadBox" :style="{height:bgHeight}">
      <div class="uploadImg">
        <van-field style="background-color: #fddbde" v-model="city" placeholder="所在城市" />
        <van-field v-model="clinicName" placeholder="诊所名称" />
        <div class="row">
          <van-field label-width="30" style="background-color: #fddbde" v-model="userName" placeholder="医生姓名" />
          <van-dropdown-menu>
            <van-dropdown-item v-model="recommendation" :options="option1" />
          </van-dropdown-menu>
        </div>
          <van-field
              v-model="textarea"
              rows="10"
              autosize
              type="textarea"
              placeholder="请填写您/TA的故事"
              show-word-limit
          />
      </div>
      <img @click="sumbitFrom" class="submitbtn" src="../assets/images/submit.png">
    </div>
    <!-- 进入页面弹出层 -->
    <div v-show="ismaskBox === 'true'" class="maskBox">
      <img width="300" src="../assets/images/tip.png">
      <img  @click="closeBtn" width="50" src="../assets/images/close.png">
    </div>
    <!-- 提交成功弹出层 -->
    <div v-show="isSumbitMaskBox === true" class="maskBox1">
      <div class="popCente">
        <img width="300" style="border-radius: 15px 15px 0 0" src="../assets/images/popup1.jpg">
      </div>
      <div class="tbnBox" style="margin-top: -10px;border-top: 1px solid #ffffff">
        <img width="150" @click="again" style="border-radius: 0 0 0 15px" src="../assets/images/poppuBtn4.png">
        <img width="150" @click="moreBtn" style="border-radius: 0 0 15px 0" src="../assets/images/poppuBtn3.png">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { userFrom,getToken,uploadQiNiu } from "../api/path";
import uploadImg from '../components/uploadImg.vue'
import { useRouter } from "vue-router";
import { useCookie } from "vue-cookie-next";
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { Dialog } from 'vant';
import 'vant/es/dialog/style';
const cookies = useCookie()
const router = useRouter();


// 获取屏幕高度
let bgHeight = ref(document.documentElement.clientHeight + "px")

const ismaskBox = ref(cookies.getCookie('ismaskBox') ||"true")
// 关闭遮罩层
const closeBtn = () => {
  ismaskBox.value = 'false'
  cookies.setCookie('ismaskBox','false')
}


// 表单
const option1 = [
  { text: '我的故事', value: '我的故事' },
  { text: '他/她的故事', value: '他/她的故事' },
];
const city = ref('')
const clinicName = ref('')
const recommendation = ref('我的故事')
const userName = ref('')
const textarea = ref('')
const fromData = {
  city:'',
  clinic:'',
  recommendation:'',
  content:'',
  imgUrl:'',
  fromData: '',
  openId:cookies.getCookie('openId'),
  title:''
}

// 提交成功提示
const isSumbitMaskBox = ref(false)


// 提交
const sumbitFrom = () => {
  if (city.value &&  clinicName.value && userName.value && textarea.value) {
    fromData.city = city.value // 城市
    fromData.clinic = clinicName.value //诊所名称
    fromData.recommendation = recommendation.value // 我的故事/Ta的故事
    fromData.content = textarea.value // 内容
    fromData.title = userName.value  // 名字
    userFrom(JSON.stringify(fromData)).then((res:any) =>{
      if (res.code === 200) {
        isSumbitMaskBox.value = true
        cookies.setCookie('fromData',JSON.stringify(fromData))
      }
    })
  } else {
    Toast.fail('请完整填写表单')
  }


}
// 发现更多
const moreBtn = () => {
  router.push({
    path:'/photoList'
  })
}
// 再次发现
const again = () => {
  isSumbitMaskBox.value = false
  textarea.value = ''
  city.value = ''
  clinicName.value = ''
  recommendation.value = '我的故事'
  userName.value = ''
}


</script>

<style scoped lang="less">
  .content {
    overflow: auto;
    background: url("../assets/images/uploadBgimg1.png") no-repeat;
    background-size: 100% 100%;

    .uploadBox{
      //background: url("../assets/images/uploadBgimg.png") no-repeat;
      //background-size: 100% auto;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;
      //border: 1px solid #000000;
      //height: 80%;
      text-align: center;
      padding: 0 20px;
      .uploadImg{
        // width: 70%;
        display: flex;
        flex-direction: column;
        margin-top: 40%;
        background: url('../assets/images/uploadBgimg3.png') no-repeat;
        background-size: 100% 100%;
        padding: 60px 40px 30px;
        :deep(.van-uploader__preview){
          margin: 0;
        }
        .uploadImgBtn{
          display: flex;
          justify-content: center;
          margin: 5px 4px;
        }
        .name{
          margin: 10px 0;
        }
      }
    }
    .van-field{
      background-color: #eeeeee;
      padding: 0.1rem;
      margin: 0.2rem 0;
      border-radius: 6px;
    }
    .row{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-field{
        width: 42%;
      }
      .van-dropdown-menu{
        background-color: #eeeeee;
        width: 42%;
        height: 0.4rem;
        padding: 0.2rem;
        border-radius: 6px;
        :deep(.van-dropdown-menu__bar){
          background-color: #eeeeee;
          height: 0.4rem;
          box-shadow: unset;
        }
        :deep(.van-dropdown-menu__title){
          width: 78%;
          margin-right: 0.2rem;
        }
        :deep(.van-dropdown-menu__title:after){
          color: red;
          opacity: 1;
          border-color: #911e1e00 #6c5c5c00 #f50000 #f50000;
        }
      }
    }
    .maskBox1{
      position: absolute;
      top: 0;
      background-color: rgba(47, 44, 44, 0.7);
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .imgBox{
        position: absolute;
        background-image: url("../assets/images/popup.png");
        background-repeat: no-repeat;
        background-size: 100% auto;
        width: 80%;
        height: 30.5%;
        display: flex;
        .Btn1{
          position: absolute;
          left: 10px;
          bottom: 0;
        }
        .Btn{
          position: absolute;
          right: 10px;
          bottom: 0;
        }
      }
    }
    .maskBox{
      position: absolute;
      top: 0;
      background-color: rgba(47, 44, 44, 0.7);
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .submitbtn{
      width: 200px;
      margin: 15px auto;
    }
    .van-uploader{
      height: 4.6rem;
      :deep(.van-uploader__upload){
        position: absolute;
        width: 100%;
        height: 4.6rem;
        background: #d1cfcf
      }
      :deep(.van-uploader__preview){
        width: 100%;
        z-index: 1;
        .van-image{
          width: 100%;
          height: 4.6rem;
        }
      }
    }
  }
  :deep(.van-cell__title){
    flex: 2;
  }
  :deep(.van-cell__value){
    flex: 1;
  }
  :deep(.van-dropdown-item){
    width: 4rem;
    height: 112px;
    right: 58px;
    left: unset;
    top: 330px !important;
    .van-overlay{
      background-color: transparent;
    }
  }
  .maskBox1{
    position: absolute;
    top: 0;
    background-color: rgba(47, 44, 44, 0.7);
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
