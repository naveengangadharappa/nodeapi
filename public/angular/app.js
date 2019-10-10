var app=angular.module("mygame",[]);
app.controller("mycontrol",['$scope',function($scope){
$scope.demo="This is demo Game application on angular js"
var words=["elephant","monkey","Bhanu Prakash","rabbit","gorilla","peacock","butterfly","housefly","aeroplane","banana","rose","jamoon","lover","father",,"mother","pubg","cricket","ludo"];
$scope.incorrectletterschoosen=[];
$scope.correctletterschoosen=[];
$scope.gusses=6;
$scope.displayword='';
$scope.msg='';
$scope.hintname='is available for only last chance';
$scope.index1='';
$scope.input={
    letter:''
}

var selectrandomword=function(){
    var index=Math.round(Math.random()*words.length);
    $scope.index1=index;
    return words[index];
}

var newgame=function(){
    $scope.incorrectletterschoosen=[];
    $scope.correctletterschoosen=[];
    $scope.gusses=6;
    $scope.displayword='';
    selectedword=selectrandomword();
    console.log(selectedword);
    var tempdisplay='';
    for(var i=0;i<selectedword.length;i++)
    {
        tempdisplay+='*';
    }
    $scope.displayword=tempdisplay;
}

$scope.letterchoosen=function(){
    for(var i=0;i<$scope.correctletterschoosen.length;i++)
    {
       if($scope.correctletterschoosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter="";
            return;
       }
    }
    for(var i=0;i<$scope.incorrectletterschoosen.length;i++)
    {
       if($scope.incorrectletterschoosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter="";
            return;
       }
    }
    var correct=false;
    for(var i=0;i<selectedword.length;i++)
    {
        if(selectedword[i].toLowerCase()==$scope.input.letter.toLowerCase() && $scope.displayword[i]=='*')
        {
            var temp=$scope.displayword.substr(0,i)+$scope.input.letter.toLowerCase()+$scope.displayword.substr(i+1,$scope.displayword.length);
            $scope.displayword=temp;
            correct=true;
        }
    }
    if(correct)
    {
        $scope.correctletterschoosen.push($scope.input.letter.toLowerCase());  
    }
    else{
        $scope.incorrectletterschoosen.push($scope.input.letter.toLowerCase()); 
        $scope.gusses=$scope.gusses-1;
    }
    $scope.input.letter="";
    if($scope.gusses<1)
    {
        $scope.msg='Sorry you have lost the game try again ??? The Word is '+selectedword;
    }
    if(selectedword.toLowerCase()==$scope.displayword.toLowerCase())
    {
        $scope.msg='Congrulations you have won the game ///';
    }
    if($scope.gusses==1)
    {
        if($scope.index1<=3)
{
    $scope.hintname= "Animal name";  
}
if($scope.index1==3)
{
    $scope.hintname= "esds employee";  
}
else if($scope.index1==4)
{
    $scope.hintname= "bird name";  
}
else if($scope.index1<=6)
{
    $scope.hintname= "insect name";  
}
else if($scope.index1==7)
{
    $scope.hintname= "Automobile name";  
}
else if($scope.index1==8)
{
    $scope.hintname= "fruit name";  
}
else if($scope.index1==9)
{
    $scope.hintname= "flower name";  
}
else if($scope.index1==10)
{
    $scope.hintname= "sweet name";  
}
else if($scope.index1<=13)
{
    $scope.hintname= "relation ship name";  
}
else if($scope.index1==16)
{
    $scope.hintname= "game name";  
}
    }
}
newgame();
}]);