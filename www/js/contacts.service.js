angular.module('starter.services', [])

.factory('PersonService', function($http){
	var BASE_URL = "https://randomuser.me/api/";
	var items = [];

	return {
		GetFeed: function(){
			return $http.get(BASE_URL+'?results=7').then(function(response){
				items = response.data.results;
				return items;
			});
		},
		GetNewUser: function(){
			return $http.get(BASE_URL).then(function(response){
				items = response.data.results;
				return items;
			});
		}
	}
})

.controller('ContactsCtrl', function($scope, $timeout, PersonService) {
  $scope.items = [];

  PersonService.GetFeed().then(function(items){
	$scope.items = items;
  });

  $scope.doRefresh = function() {
		PersonService.GetNewUser().then(function(items){
			$scope.items = items.concat($scope.items);

			//Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		});
  };

});
