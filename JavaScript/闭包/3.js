function foo(){
    for(var i=0; i<6;i++){
        (function(){
            var j = i
            setTimeout(function (){
                console.log(j);      //  ?
            },1000 * i);
        })();
    }
}
foo();
// 0,1,2,3,4,5