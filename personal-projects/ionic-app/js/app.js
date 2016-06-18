// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true, //I want this to be a parent template (not to navigate)
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    //if the user goes somewhere else, I redirect them to the '/tabs/list' url
    $urlRouterProvider.otherwise('/tab/home');
}])


.controller('CalendarController', ['$scope', '$http', '$state', function($scope, $http, $state) { 
  $http.get('js/data.json').success( function (data) {
    $scope.calendar = data.calendar;
    $scope.data = {showDelete: false, showReorder: false};
    

    //On scrolling down refresh the page
    $scope.doRefresh = function () {
      $http.get('js/data.json').success( function (data) {
        $scope.calendar = data.calendar;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    //toggling the star
    $scope.toggleStar = function (item) {
      item.star = !item.star;
    }

    //Deleting an item from a calendar. We need info about 'which' day I am gonna delete from 'which' Item 
    $scope.onItemDelete =function (dayIndex, item) { 
      $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
    }

  });
}])


.controller('ListController', ['$scope', '$http', '$state', function($scope, $http, $state) { 
  $http.get('js/data.json').success( function (data) {
    $scope.artists = data.artists;
    
    $scope.whichartist = $state.params.aId; //This will be whatever artist we have clicked on
    $scope.data = {showDelete: false, showReorder: false};
    //reordering Artist
    $scope.moveItem = function (item, fromIndex, toIndex) {
      $scope.artists.splice(fromIndex, 1);
      $scope.artists.splice(toIndex, 0, item);
    }

    //On scrolling down refresh the page
    $scope.doRefresh = function () {
      $http.get('js/data.json').success( function (data) {
        $scope.artists = data.artists;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    //toggling the star
    $scope.toggleStar = function (item) {
      item.star = !item.star;
    }

    //Deleting Artists
    $scope.onItemDelete =function (item) {
      $scope.artists.splice($scope.artists.indexOf(item), 1);
    }

  });
}]);
