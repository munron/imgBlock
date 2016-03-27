//-----------------------------------------------------------
//Name:      app.js
//Purpose:   画像ファイルをブロック化する
//Author:    @_munro_     
//Created:   27/3/2016
//Copyright: (c) @_munro_ 2016
//Licence:   
//-----------------------------------------------------------
var express=require('express'),
    app=express(),
    multer=require('multer'),
    http=require('http').Server(app),
    io=require('socket.io')(http),
    bodyParser=require('body-parser'),
    logger=require('morgan'),
    exec=require('child_process').exec,
    imgFile="sairikun.jpg";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use(logger('dev'));
app.use(express.static(__dirname+'/public'));
app.use(multer({dest:'uploads/'}).any());

//画像配列データ送信
var image=io.of('/image').on('connection',function(socket){
    socket.on("size",function(data){
        console.log(data);
        //分割カラム数の範囲は32~512
        if(data<32 || data>512)data=256;
        exec('sh imgBlock.sh uploads/' + imgFile + " " + data,function(err,stdout,stderr){
            image.emit("image",stdout);   
        });
    });
});

//画像postの受け取り
app.post('/upload',function(req,res){
    if(req.files[0]==undefined)res.redirect('/error');
    if(req.files[0].mimetype == 'image/jpeg'||req.files[0].mimetype=='image/png'){
        imgFile=req.files[0].filename;
    }else{
        res.redirect('/error');
    }
    res.redirect('/');
});


app.get('/',function(req,res){
    res.render('index');
});

//error
app.get('/error',function(req,res){
    res.render('error');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});





