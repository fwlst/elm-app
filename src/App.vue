<template>
  <div>
    <v-header :seller=" seller "></v-header>
    <div class="tab border-1px">
      <div class="tab-item" v-link="{path:'/goods'}">商品</div>
      <div class="tab-item" v-link="{path:'/ratings'}">评论</div>
      <div class="tab-item" v-link="{path:'/seller'}">商家</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  const ERR_OK = 0;
  export default {
    data() {
      return {
          seller: {}
      }
    },
    created() {
      const _this = this;
      const url = '/api/seller';
      this.$http.get(url).then((res) => {
          if(res.data.errCode == ERR_OK){
            _this.seller = res.data.data
          }
      }).catch((err) => {
          console.log(err)
      })
    },
    components: {
      'v-header':header
    }
  }
</script>

<style rel="stylesheet/less" lang="less" >
  @import "common/css/mixin";
  .tab{
    display: flex;
    width: 100%;
    line-height: 40px;
    height: 40px;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77,85,93);
      &.active{
        color: rgb(240,20,20);
      }
    }
  }

</style>
