var assert=require("chai").assert;
var test_functions=require('../functions.js');
var request=require('supertest');
var should=require('should');
var content=require('./data.json');
var updatecontent=require('./updatedata.json');

var server=request.agent("http://localhost:3000")
data=content.data
updatedata=updatecontent.data
title='';
describe('Testing Functions.js all functionalities', function(){
  for(var d=0;d<data.length;d++)
{
  title="Inserting " +(d+1)+" user data into users table";
  testfunctioninsertuser(title,data[d])
  //testroutinginsert(title,data[d])
}
title="Fetching data from the user table";
testfunctiongetdata(title,data)
title="searching userdata from the user table through username";
testfunctionsearchbyusername(title,'nav')
title="delete userdata from the user table through email";
testfunctiondeleteuser(title,'booksdealingsystem@gmail.com')
for(var d=0;d<updatedata.length;d++)
{
    title="update userdata in the user table through email";
testfunctionupdateuser(title,updatedata[d])
}
//title="Fetching data from the student table through routing";
//testroutingfetch(title,data)


  function testfunctioninsertuser(title,input_json)
  {
   it(title,(done)=>
   {
      test_functions.insertuser(input_json).then((result)=>{
        assert.equal(result,true)
        done()
      }).catch((error)=>{
        done(error)
        console.log(error)
      })
   })
  }

  function testfunctiongetdata(title,input_json)
  {
   it(title,(done)=>
   {
    test_functions.fetchuserdetails().then((data_in_DB)=>{
        if(data_in_DB.length>0)
        {
          for(var i=0;i<data_in_DB.length;i++)
          {
            if(input_json[i].name==data_in_DB[i].username && input_json[i].email==data_in_DB[i].email)
            {
              assert.equal(input_json[i].name,data_in_DB[i].username);
              assert.equal(input_json[i].email,data_in_DB[i].email);
              //assert.equal(data[i].equal,0);
            }
          }
        }
        done()
      }).catch((error)=>{
        done(error)
        //console.log(error)
      })
   })
  }

  function testfunctiondeleteuser(title,email)
  {
    it(title,(done)=>
   {
      test_functions.deleteuser(email).then((result)=>{
        assert.equal(result,true)
        done()
      }).catch((error)=>{
        done(error)
        console.log(error);
      })
   })  
  }

  function testfunctionsearchbyusername(title,username)
  {
    it(title,(done)=>
    {
     test_functions.searchbyusername(username).then((data_in_DB)=>{
         assert.isAbove(data_in_DB.length,0)
         done()
       }).catch((error)=>{
         done(error)
         //console.log(error)
       })
    })   
  }

  function testfunctionupdateuser(title,data)
  {
    it(title,(done)=>
   {
      test_functions.updateuser(data).then((result)=>{
        assert.equal(result,true)
        done()
      }).catch((error)=>{
        done(error)
        console.log(error);
      })
   })  
  }


  function testroutinginsert(title,data)
  {
     it(title,function(done){
      server
      .post('/putdata')
      .send(data)
      .expect("Content-type",/json/)
      .end(function(err,res){
        res.body.resultflag.should.equal(true)
        done();
      });
    });
  }
   
  function testroutingfetch(title,input_json)
  {
  it(title,function(done){
    server
    .get("/getdata")
    .expect("Content-type",/json/)
    .end(function(err,res){
      var result_data=res.body;
      if(result_data>0)
        {
          for(var i=0;i<result_data.length;i++)
          {
            if(input_json[i].name==result_data[i].name && input_json[i].email==result_data[i].email)
            {
              assert.equal(input_json[i].name,data_in_DB[i].name);
              assert.equal(input_json[i].email,data_in_DB[i].email);
              //assert.equal(data[i].equal,0);
            }
          }
        }
    //res.body.error.should.equal(false);
    done();
    
 })
})
}   
});