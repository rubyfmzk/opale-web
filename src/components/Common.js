export default{
  created(){
    Number.prototype.int = function(){
      return parseInt(this)
    }

    Number.prototype.zeroPadding = function(digit){
      var zero = "";
      for(var i=1; i<digit; i++){
        zero += "0";
      }
      return (zero + this).substr(-digit);
    }
  }
}
