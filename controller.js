const express=require('express');
var router=express.Router();
var functions=require('./functions');


  router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


const  multipart  =  require('connect-multiparty');
//const  multipartMiddleware  =  multipart({ uploadDir:  'public/pictures/'});
const multer = require('multer');
const path=require('path');
var storage = multer.diskStorage({
    destination:'public/pictures/',
    filename: function (req, file, cb) {
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


router.post('/update',(req,res)=>{
    data=req.body;
    console.log(data)
    functions.updateuser(data).then((result)=>
    {
        res.json({data:"success"})
    }).catch((error)=>{
        console.log(error);
    })
})


router.post('/insertuser',(req,res)=>{
    var userdata=req.body;
    functions.insertuser(userdata).then((result)=>{
        res.json({data:"success"})
    }).catch((error)=>{
        console.log(error);
    })
 });


router.get('/users',(req,res)=>{
    console.log("requested for users data");
   functions.fetchuserdetails().then((userdata)=>{
        res.send(userdata);
   }).catch((error)=>{
    console.log(error);
   })
});



router.get('/search/:username',(req,res)=>{
    var username=req.params.username
    functions.searchbyusername(username).then((userdata)=>{
        res.send(userdata);
    }).catch((error)=>{
        console.log(error);
    })
})

router.get('/delete/:email',(req,res)=>{
    var email=req.params.email;
    functions.deleteuser(email).then((result)=>{
        res.send('successfull deletion');
    }).catch((error)=>{
        //res.send(err)
        console.log(error);
    })
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
            //res.json({data:"successfull"});
            res.sendFile(path.join(__dirname, '/public/pictures/n@gmail.com.jpg'));
        }
       });   
})


module.exports=router;  

