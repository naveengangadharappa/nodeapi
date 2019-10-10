const mysql=require('mysql');
var mysqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});

mysqlconnection.connect((err)=>{
if(!err)
{
    console.log("Db connection successfull");
}
else{
    console.log(" sorry Db connection un-successfull"+JSON.stringify(err));
}
});

module.exports=mysqlconnection;