<template>
  <div class="loginBox">
    <img @click="playClick()" src="../assets/images/playBtn.png">
  </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCookie } from "vue-cookie-next";
import { userLogin } from '../api/path'
import { Toast } from 'vant';
import 'vant/es/toast/style';
const router = useRouter()
const cookies = useCookie()
// 获取授权信息
const userInfo = reactive<any>({
  openId:router.currentRoute.value.query.openid?.slice(-1)[0] || '',
  wxHeadPortrait:router.currentRoute.value.query.headimgurl || '',
  // wxNickname:router.currentRoute.value.query.nickname || ''
})

console.log(userInfo)

onMounted(()=>{
  getOpenId()
})

// 获取openId
function getOpenId() {
  if (userInfo.openId) {
    cookies.setCookie("openId", userInfo.openId);
    cookies.setCookie("avatar", userInfo.wxHeadPortrait);
    // cookies.setCookie("nickName", userInfo.wxNickname);
    login()
  } else {
    let url = encodeURIComponent("http://craftsman_h5.cdn-static.synconize.com/"); //http://106.14.218.186:7798  http://craftsman_h5.cdn-static.synconize.com
    window.location.href =
        `https://app.jingsocial.com/api/oauth/authorize?appid=wx923804b1d49f51fb&scope=snsapi_userinfo&redirect_uri=${url}`;
  }
}

const isLogin  = ref<boolean>(false)

// 登录
const login = () => {
  userLogin(JSON.stringify(userInfo)).then((res:any) =>{
    isLogin.value = true
    if (res.code === 200){
      Toast.success('登录成功')
    }
  })
}

// 参与活动
const playClick = () =>{
  router.replace({path:'/pictures'})
  if (isLogin.value) {
    router.replace({path:'/pictures'})
  }else {
    Toast.fail('未登录')
  }
}


</script>
<style lang="less" scoped>
  .loginBox{
    height: 100vh;
    background: url('../assets/images/loginBgimg.png') no-repeat fixed;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    img{
      position: absolute;
      bottom: 1.4rem;
      margin: 0 auto;
      width: 5rem;
    }
  }
</style>
