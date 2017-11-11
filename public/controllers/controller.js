var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
    console.log("Corriendo desde el controlador");
                            

var refresh = function(){
$http.get('/listabovinos').then(function(response){
        console.log("recibí los datos: "+response.data);
        $scope.listabovinos = response.data;
        $scope.bovino = {};
    });
};

refresh();

$scope.addBovino = function(){
    console.log($scope.bovino);
    console.log("Estoy en addBovino");
    $http.post('/listabovinos',$scope.bovino).then(function(response){
        console.log(response.data);
        refresh();
        
    });
    
};

$scope.remove = function(id){
    console.log(id);
    $http.delete('/listabovinos/' + id).then(function(response){
        refresh();
    });
};

    
$scope.edit = function(id) {
  console.log(id);
  $http.get('/listabovinos/' + id).then(function(response) {
    $scope.bovino = response.data;
  });
};  

$scope.update = function() {
  console.log($scope.bovino._id);
  $http.put('/listabovinos/' + $scope.bovino._id, $scope.bovino).then(function(response) {
    refresh();
  })
};
    

    
}]);