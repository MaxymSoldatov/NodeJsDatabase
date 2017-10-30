var app = angular.module('students',[])
app.controller('stdinfo', function ( $scope, $http ) {
	$scope.data = [];
	var req = $http.get('/');
	req.success(function ( data ) {
		$scope.data = data;
	})
	req.error(function ( data ) {
		console.log("Error");
	})
})