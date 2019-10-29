var mysqlconnection=require('./db/conn');
var nodemailer = require('nodemailer');
var fs = require("fs");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'booksdealingsystem@gmail.com',
      pass: '7411597274'
    }
  });

function searchbyusername(username){
    return new Promise((resolve,reject)=>{
    var sql="select * from users";
    if(username=='0')
    {
        mysqlconnection.query(sql,(err,rows,fields)=>{
            if(!err){
                console.log("fetch query is executed in Search"); 
                resolve(rows);
                }
            else{
                reject(err);
            }
        }) 
    }
    else{
    sql="select * from users where username LIKE '%"+username+"%'";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err){
            console.log("fetch query is executed in Search"); 
            resolve(rows);
            }
        else{
            reject(err);
        }
    }) 
} 
})
}

function deleteuser(email)
{
    return new Promise((resolve,reject)=>{
    /*var fpath="C:/Users/naveen.g/Desktop/nodeapi/public/pictures/"+email+".jpg";
    fs.unlink(fpath,function(err,stats)
    {
        if(err){
            reject(err)
        }
    })*/
    var sql="delete from users where email='"+email+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
           // console.log("Record deleted successfully");
           resolve(true);
        }
        else{
            console.log(err);
            reject(err);
        }
    })
})
}

function updateuser(data){
    return new Promise((resolve,reject)=>{
    var sql="delete from users where email='"+data.email+"'";
    mysqlconnection.query(sql,function(err){
        if(!err){
            //console.log("Record deleted successfully");
            //var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+req.body.uname+"','"+req.body.ugender+"','"+req.body.udob+"','"+req.body.uemail+"','"+req.body.ucountry+"','"+req.body.ustate+"','"+req.body.udistrict+"',"+req.body.upin+",'"+req.body.upasswd+"')";
            var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+data.username+"','"+data.gender+"','"+data.dob+"','"+data.email+"','"+data.country+"','"+data.state+"','"+data.district+"',"+data.postal+",'"+data.password+"')";
console.log("update query entered");
mysqlconnection.query(sql,function(err){
        if(!err){
        //resolve({data:"success"});
        resolve(true)
        }else{
        reject(err);
        }
    })
}
else{
reject(err);
}
});
});
}


var fetchuserdetails=function(){
    return new Promise((resolve,reject)=>{
        var sql="select * from users ";
    mysqlconnection.query(sql,(err,rows,fields)=>{
        if(!err){
           resolve(rows)
            }
        else{
            reject(err)
        }
    })
    });
}



var insertuser=function(userdata){
    return new Promise((resolve,reject)=>{
    if(userdata.upasswd==userdata.urpasswd)
    {
        var sql="insert into users(username,gender,dob,email,country,state,district,postal,password) values('"+userdata.name+"','"+userdata.gender+"','"+userdata.dob+"','"+userdata.email+"','"+userdata.country+"','"+userdata.state+"','"+userdata.district+"',"+userdata.pin+",'"+userdata.passwd+"')";
        mysqlconnection.query(sql,function(err){
            if(!err)
            {
                var tomail=userdata.email;
                emailfunc(tomail)
               // console.log("record inserted successfully");
                //resolve({data:"success"})
                resolve(true)
                
            }else{
                reject(err)
            }
        })
    }
        else{
            console.log("password and conform donot match");
            resolve({err:"please verifiy your password and Try again"})
        }
})
}

    
var emailfunc=function(toemail){
    console.log(toemail)
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

module.exports={emailfunc,insertuser,fetchuserdetails,updateuser,deleteuser,searchbyusername};