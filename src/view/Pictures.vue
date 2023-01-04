<template>
  <div class="content">
    <div class="uploadBox" :style="{height:bgHeight}">
        <!-- 上传照片 -->
      <div class="uploadImg">
        <van-uploader
            v-model="fileList"
            multiple
            :after-read="afterRead">
        </van-uploader>
        <van-field v-model="city" placeholder="所在城市" />
        <van-field v-model="clinicName" placeholder="诊所名称" />
        <div class="row">
          <van-field label-width="30" v-model="userName" placeholder="医生名称" />
          <van-dropdown-menu>
            <van-dropdown-item v-model="recommendation" :options="option1" />
          </van-dropdown-menu>
  <!--         <select v-model="recommendation">-->
  <!--           <option value ="volvo">Volvo</option>-->
  <!--           <option value ="saab">Saab</option>-->
  <!--         </select>-->
        </div>
          <van-field
              v-model="textarea"
              rows="3"
              autosize
              type="textarea"
              maxlength="20"
              placeholder="请填写您/TA的故事"
              show-word-limit
          />
      </div>
      <img @click="sumbitFrom" class="submitbtn" src="../assets/images/submit.png">
    </div>
    <!-- 弹出层 -->
    <div v-show="ismaskBox === 'true'" class="maskBox">
      <img width="300" src="../assets/images/tip.png">
      <img  @click="closeBtn" width="50" src="../assets/images/close.png">
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


// 照片上传
const fileList = ref<any>([])
const files = ref<any>()
const afterRead = (file:any) => {
  // 此时可以自行将文件上传至服务器
  getToken().then((res:any) => {
    if (res.code == 200) {
      let data = new FormData();
      data.append("token", res.data.token);
      data.append("file", file.file);
      // data.append("name", new Date() + file.file.nmae);
      data.append("name", file.file.name);
      data.append("key", Date.now() + "-" + file.file.name);
      // 上传七牛云
      uploadQiNiu(data).then((putres:any) => {
        files.value = "https://ssl.resource.synconize.com/" + putres.key;
      });
    } else {
      console.log("获取不到Token");
    }
  });
};

// 表单
const option1 = [
  { text: '自荐', value: '自荐' },
  { text: '推荐', value: '推荐' },
];
const city = ref('')
const clinicName = ref('')
const recommendation = ref('自荐')
const userName = ref('')
const textarea = ref('')
const fromData = {
  city:'',
  clinic:'',
  recommendation:'',
  content:'',
  imgUrl:'',
  openId:cookies.getCookie('openId'),
  title:''
}

// 提交
const sumbitFrom = () => {
  if (files.value) {
    fromData.city = city.value
    fromData.clinic = clinicName.value
    fromData.recommendation = recommendation.value
    fromData.content = textarea.value
    fromData.imgUrl = files.value
    fromData.title = userName.value
    console.log(fromData)
    userFrom(JSON.stringify(fromData)).then((res:any) =>{
      if (res.code === 200) {
        Dialog.confirm({
          message: '提交成功',
          confirmButtonText:"查看更多",
          cancelButtonText:"再传一张"
        })
            .then(() => {
              router.push({
                path:'/photoList'
              })
            })
            .catch(() => {
              textarea.value = ''
              files.value = ''
              city.value = ''
              clinicName.value = ''
              recommendation.value = ''
              files.value = ''
              userName.value = ''
            });
        Toast.success('提交成功')
      }
    })
  } else {
    Toast.fail('请先上传图片')
  }

}



</script>

<style scoped lang="less">
  .content {
    height: 100vh;
    overflow: auto;
    background: url("../assets/images/uploadBgimg.png") no-repeat;
    background-size: 100% 100%;

    .uploadBox{
      background: url("../assets/images/uploadBgimg.png") no-repeat;
      background-size: 100% auto;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;
      text-align: center;
      padding: 0 20px;

      .uploadImg{
        // width: 70%;
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        background: url('../assets/images/uploadBgimg3.png') no-repeat;
        background-size: 100% 100%;
        padding: 100px 40px 30px;

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
          width: 70%;
        }
        :deep(.van-dropdown-menu__title:after){
          color: red;
          opacity: 1;
          border-color: #911e1e00 #6c5c5c00 #000000 #000000;
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
  :deep(.van-dropdown-item){
    width: 130px;
    height: 112px;
    right: 61px;
    left: unset;
    .van-overlay{
      background-color: transparent;
    }
  }
</style>
