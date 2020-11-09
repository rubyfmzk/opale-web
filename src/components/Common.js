export default{
  created(){
    Number.prototype.int = function(){
      return parseInt(this)
    }

    String.prototype.int = function(){
      return parseInt(this)
    }

    Number.prototype.zeroPadding = function(digit){
      var zero = "";
      for(var i=1; i<digit; i++){
        zero += "0";
      }
      return (zero + this).substr(-digit);
    }
  },

  methods:{
    getStyle(opt){
      if(!opt || !opt.type) return ''

      if(opt.type === 'gray'){
        return ';background-color:rgb('+opt.color.int()+','+opt.color.int()+','+opt.color.int()+')'
      }

      if(opt.type === 'sabian'){
        return ';background-image:url(https://opale-sabian.s3-ap-northeast-1.amazonaws.com/base_image/'+(opt.image_key.int()+1).zeroPadding(3)+'.jpg)'
      }
    },

  }
}


