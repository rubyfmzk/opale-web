<template>
  <router-view></router-view>
</template>

<script>
export default {
  data(){
    return{
/*
      r:{
        data: [],
        centers_history: [],
        last_centers: [],
        centers_class: [],
        css:{
          px: 'px' + window.px,
        },
      }*/
    }
  },

  created(){

    window.px = this.$route.params.px
  }

}

</script>

<style>
table tr{
  vertical-align: top;
  text-align: left;
}
.cell{
  display: inline-block;
  height: 50px;
  width: 50px;
  line-height: 0;
  margin: 0 2px;
  background-size: contain;
}
.cell.px2{
  height: 50px;
  width: 50px;
}
.cell.px3{
  height: 48px;
  width: 48px;
}
.cell.px10{
  height: 90px;
  width: 90px;
}
.cell div{
  display: inline-block;
  height: 10px;
  width: 10px;
}
.cell.px2 div{
  height: 25px;
  width: 25px;
}
.cell.px3 div{
  height: 16px;
  width: 16px;
}
.cell.px10 div{
  height: 9px;
  width: 9px;
}
</style>