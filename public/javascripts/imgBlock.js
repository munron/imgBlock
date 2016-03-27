//-----------------------------------------------------------
//Name:      imgBlock.js
//Purpose:   クライアントサイド
//Author:    @_munro_
//Created:   27/3/2016
//Copyright: (c) @_munro_ 2016
//Licence:   
//----------------------------------------------------------

console.log("loaded legoprinter.js");
var image=io.connect('http://localhost:3000/image');
var canvas=$("canvas").get(0);

//スライダー値の更新イベント(リアルタイム)
$("#rangeSize").on("input", function(){
    $("h2").text($("#rangeSize").val()+"columuns");
});

//スライダー値が更新イベント(停止時)
$("#rangeSize").change("input", function(){
    image.emit("size",$("#rangeSize").val());
});

//サーバーから画像配列の受信イベント
image.on("image",function(data){
    draw(data,$("#rangeSize").val(),data.length/$("#rangeSize").val(),512/$("#rangeSize").val())
    $("h1").text("Amount of BLOCKS : " + data.length);
});

//描画関数
function draw(data,width,height,pixelSize){
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        for(var j=0;j<height;j++){
            for(var i=0;i<width;i++){
                 if(data.charAt(j*width+i)==0){
                    ctx.fillStyle="white";
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                }else{
                    ctx.fillStyle="black";
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                }
            }
        }
    }
}


