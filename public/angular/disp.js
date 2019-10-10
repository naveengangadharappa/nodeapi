var app=angular.module("dispusers",[]);
app.controller("mycontroldisp",['$scope','$http','$location',function($scope,$http)
{
    $scope.uname='';
$http.get('/users').then(function(response,error){
        console.log("response received from node");
        console.log(response);
        $scope.data=response.data;
        if(error)
        {
            $scope.err="error occured in retriving Users Details !!!"
        }
    })
    $scope.search=function(){
        //let params = new HttpParams().set("username",$scope.uname);
        console.log("response received from node");
        var user=$scope.uname
        $http.get('/search/'+user).then(function(response,error){
            console.log("response received from node");
            console.log(response);
            $scope.data=response.data;
            if(error)
            {
                $scope.err="error occured in retriving Users Details !!!";
            }
        })
    }
   
    $scope.update=function(data)
    {
     console.log(data);
     $scope.updata=data;
     window.location.href ='/update.html';
     
     //$location.href="update.html";
     //$location.url='insert.html'
     //$location.path('update.html').replace();
 }   

}]);
/*app.controller("mycontroldisp1",['$scope','$http','$location',function($scope,$http)
{
    $scope.update=function(data)
   {
    console.log(data);
    $scope.updata=data;
    window.location.href ='/update.html';
    
    //$location.href="update.html";
    //$location.url='insert.html'
    //$location.path('update.html').replace();
}   
}])*/