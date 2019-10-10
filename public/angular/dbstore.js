var app=angular.module("signup",[]);
app.controller("mycontrol",['$scope','$http',function($scope,$http){

    $scope.user=
    {
    name:'',
    email:'',
    gender:'',
    dob:'',
    country:'',
    state:'',
    district:'',
    pin:'',
    passwd:'',
    rpasswd:'',
    pic:''
}
$scope.err="";

$scope.submitvalues=function(){
    if($scope.user.name=='' || $scope.user.email=='' || $scope.user.gender=='' || $scope.user.dob=='' || $scope.user.country=='' || $scope.user.state=='' || $scope.user.district=='' || $scope.user.pin=='' || $scope.user.passwd=='' || $scope.user.rpasswd=='' || $scope.user.pic=='')
    {
        $scope.err="All fields are manditory please verifiy !!! ";
    }
    else{
        console.log("entered next");
    if($scope.user.passwd!=$scope.user.rpasswd)
    {
        $scope.err="please verifiy the password ??";
    }
    else{
    $http.post('/insertuser').then(function(response,error){
        if(!error=='')
        {
            $scope.err="User already exists with this email-id !!!";  
        }
        console.log(response);
      //  $scope.data = response.data;
        //$location.path('dispusers.html');
})

    }
}
}
}]);
/*

$scope.submitvalues=function()
{
alert("data u enterd is as fallow"+$scope.user.indian);
if($scope.user.indian="indian")
{
    $scope.user.nationality=$scope.user.indian; 
}
else{
    $scope.user.nationality=$scope.user.nonindian; 
}  
$scope.disp="user-Name : "+$scope.user.name+",  user-Email : "+$scope.user.email+",  user-Gender : "+$scope.user.gender+",  user-Nationality : "+$scope.user.nationality+",  user-Address : "+$scope.user.address;
}*/

