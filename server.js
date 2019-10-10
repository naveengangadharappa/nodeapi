
const express=require('express');
const cors=require('cors');
var app=express();
app.use(cors());
app.use(express.static(__dirname+"/public"));

const bodyparser=require('body-parser');
app.use(bodyparser.json());

const path=require('path');
const userctrls=require('./userctrl');

app.use(bodyparser.urlencoded({
    extended:true
}))
app.listen(3000,()=>{
    console.log("Express server started at port : 3000");
});

app.use('/',userctrls);
