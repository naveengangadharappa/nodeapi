var calculator=angular.module("mycalculator",[]);
calculator.controller("mycalccontrol",['$scope',function($scope){
$scope.demo="This is a simple calculator";
$scope.result='';
$scope.input='';
$scope.res=function()
{ 
    var temp=$scope.input;
    if(isNaN(temp))
    {
        $scope.result="This Expression cannot be evaluated";
    }
    if(temp.includes('@')||temp.includes('#')||temp.includes('!')||temp.includes('$')||temp.includes('&')||temp.includes('_')||temp.includes('~')||temp.includes(';')||temp.includes(':')||temp.includes('>')||temp.includes('<'))
    {
        $scope.result="This Expression cannot be evaluated";   
    }
    else
    {
        $scope.result=eval($scope.input); 
    }  
}
}])
