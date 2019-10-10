const express=require('express');
var router=express.Router();
var mysqlconnection=require('./db/conn');
var fs = require("fs");
var nodemailer = require('nodemailer');

/*router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'booksdealingsystem@gmail.com',
      pass: '7411597274'
    }
  });

const  multipart  =  require('connect-multiparty');
//const  multipartMiddleware  =  multipart({ uploadDir:  'public/pictures/'});
const multer = require('multer');
const path=require('path');
var fname=''
var storage = multer.diskStorage({
    destination:'public/pictures/',
    filename: function (req, file, cb) {
        //console.log(req.body.email);
        //console.log(req.params.uemail);
        fname=file.fieldname + '-' + Date.now()+ '.jpg'
        //console.log(file.originalname);
      ///cb(null, file.fieldname + '-' + Date.now()+ '.jpg');
      cb(null, file.originalname+ '.jpg');
      //cb(null, req.params.uemail+ '.jpg');
    }
  })
   
//const upload = multer({ storage:storage }).array('uploads',12);
const multipartMiddleware  =  multer({ storage:  storage }).array("uploads[]",2);

router.get('/',(req,res)=>{
    res.sendFile('/public/index.html')
})
/*
router.post('/fileupload', multipartMiddleware, (req, res) => {
    console.log(req.email);
    res.json({
        'message': 'File uploaded succesfully.'
    });
});*/

router.post('/login',(req,res)=>{
    console.log("request received");
    var sql="select username,email from users where email='"+req.body.uemail+"' and passwd='"+req.body.upasswd+"'";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err){
            console.log("fetch your query is executed in Search"); 
            res.send(rows);
            }
        else{
            res.send({flg:'1'});
        }
    })  
})

router.get('/search/:username',(req,res)=>{
    console.log(req.params.username);
    var sql="select * from users";
    if(req.params.username=='0')
    {
        mysqlconnection.query(sql,(err,rows,fields)=>{
            if(!err){
                console.log("fetch your query is executed in Search"); 
                res.send(rows);
                }
            else{
                res.send(err);
            }
        }) 
    }
    else{
    sql="select * from users where username LIKE '%"+req.params.username+"%'";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err){
            console.log("fetch your query is executed in Search"); 
            res.send(rows);
            }
        else{
            res.send(err);
        }
    }) 
} 
})

router.get('/delete/:email',(req,res)=>{
    var fpath="C:/Users/naveen.g/Desktop/node api/public/pictures/"+req.params.email+".jpg";
    fs.unlink(fpath,function(err,stats)
    {
        if(err){console.log(err);}
    })
    var sql="delete from users where email='"+req.params.email+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            console.log("Record deleted successfully");
           // var sql="select * from users ";
           // fetchdatamysql(sql,req,res); 
           res.send('successfull deletion');
        }
        else{
            console.log(err);
            res.send(err);
        }
    })
})


/*router.get('/insert',(req,res)=>{
    var email=0;
    res.render("insert.hbs")
    
})*/

router.get('/update/:email',(req,res)=>{
    sql="select * from users where email='"+req.params.email+"'";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows)
    /*res.render("update.hbs",{
        data:rows
    });*/
}
else{
    console.log(err)
    res.send(err);
}
    });
})

router.post('/fileupload',(req,res)=>{
    console.log("request for file upload received");
    //console.log(req.body.uemail);
    multipartMiddleware(req,res,(err)=>{
        if(err)
        {
            console.log(err);
            return res.json({error:"err"});
        }
        else{
            res.json({data:"successfull"});
        }
       });   
})

router.post('/update',(req,res)=>{
    var sql="delete from users where email='"+req.body.email+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            console.log("Record deleted successfully");
            //var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.uname+"','"+req.body.ugender+"','"+req.body.udob+"','"+req.body.uemail+"','"+req.body.ucountry+"','"+req.body.ustate+"','"+req.body.udistrict+"',"+req.body.upin+",'"+req.body.upasswd+"')";
            var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.username+"','"+req.body.gender+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.country+"','"+req.body.state+"','"+req.body.district+"',"+req.body.postal+",'"+req.body.password+"')";
            insertmysql(sql,req,res);
console.log("update query entered");
}
    });
})


router.post('/insertuser',(req,res)=>{
    /*upload(req,res,(err)=>{
        if(err)
        {
            console.log("error @ file upload");
            return res.status(501).json({error:err});
        }
        else{*/
            var flag='0';
    if(req.body.flg==flag){
        if(req.body.uname==''||req.body.ugender==''||req.body.udob==''||req.body.uemail==''||req.body.ucountry==''||req.body.ustate==''||req.body.udistrict==''||req.body.upin==''||req.body.upasswd==''||req.body.urpasswd=='')
        {
            res.json({err:'all fields are mantitory'});
        }
        else{
    if(req.body.upasswd==req.body.urpasswd)
    {
        var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.name+"','"+req.body.gender+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.country+"','"+req.body.state+"','"+req.body.district+"',"+req.body.pin+",'"+req.body.passwd+"')";
       console.log(""+req.body.email);
        insertmysql(sql,req,res);
    }
        else{
            console.log("password and conform donot match");
            res.json({err:"please verifiy your password and Try again"})
        }
    }
}
else{
    var sql="delete from users where email='"+req.body.flg+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            console.log("Record deleted successfully");
            //var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.uname+"','"+req.body.ugender+"','"+req.body.udob+"','"+req.body.uemail+"','"+req.body.ucountry+"','"+req.body.ustate+"','"+req.body.udistrict+"',"+req.body.upin+",'"+req.body.upasswd+"')";
            var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.name+"','"+req.body.gender+"','"+req.body.dob+"','"+req.body.email+"','"+req.body.country+"','"+req.body.state+"','"+req.body.district+"',"+req.body.pin+",'"+req.body.passwd+"')";
            insertmysql(sql,req,res);
console.log("update query entered");
}
    });
}
 });


router.get('/users',(req,res)=>{
    console.log("requested for users data");
   var sql="select * from users ";
   fetchdatamysql(sql,req,res); 
});


var insertmysql=function(sql,req,res){
    mysqlconnection.query(sql,function(err){
        if(!err)
        {
            var tomail=req.body.email;
            emailfunc(tomail)
           // console.log(req.body.email);
            console.log("record inserted successfully");
            /*sql="select * from users ";
            fetchdatamysql(sql,req,res);*/
            res.json({data:"success"})
            
        }else{
            res.json({err:"success"});
            console.log("error in sql insertion");
            console.log(err);
        }
    })
}


var fetchdatamysql=function(sql,req,res){
mysqlconnection.query(sql,(err,rows,fields)=>{
    if(!err){
        console.log("fetch your query is executed"); 
       // res.send(rows);
        res.send(rows);
       /* res.render("dip.hbs",{
            data:rows
        });*/
        }
    else{
        //console.log(err);
        res.json({err:"error in sql retrival"});
    }
})
}

var emailfunc=function(toemail){
    //console.log(toemail)
    var mailOptions = {
        from: 'booksdealingsystem@gmail.com',
        to: toemail,
        subject: 'Demo Angular App',
        text: 'Your Account created Successfully'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports=router;  

