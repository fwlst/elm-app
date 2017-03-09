<template>
    <div class="goods">
      <div class="menu-wrapper"></div>
      <div class="foods-wrapper"></div>
    </div>
</template>

<script>


  const ERR_OK = 0;
  export default {
    props:{
      seller: {
          type: Object
      }
    },
    created (){
      const _this = this;
      const url = '/api/goods';
      this.$http.get(url).then((res) => {
        if(res.data.errCode == ERR_OK){
          _this.seller = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    name: '',
    data () {
        return {
            goods: ''
        }
    },
    methods: {}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
  .goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;

    }
    .foods-wrapper{

    }
  }
</style>
