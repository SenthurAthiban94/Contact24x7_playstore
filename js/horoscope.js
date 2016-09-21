var appname=angular.module('Horoscope_Predictor',[]);
appname.controller('horoscopecontroller',['$scope',function($scope){
	$scope.change=function(){
		$scope.contents=false;
	}
}]);