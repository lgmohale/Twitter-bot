//$(document).ready(function(){
      var addressArr = ['111','222','333','444','555'],
            counter = 0,
            timer = setInterval(function(){
                  codeAddress(addressArr[counter]);
                  counter++
                  if (counter === addressArr.length) {
                        clearInterval(timer);
                  }
            },5000);
      function codeAddress(address) {
            //alert(address);
            console.log(address);
      }
//});
