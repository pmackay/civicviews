(function() {
  var API_ENDPOINT, app;

  API_ENDPOINT = 'http://civicapi.herokuapp.com/api';

  app = angular.module('CivicViews', []);

  app.config([
    '$interpolateProvider', '$httpProvider', function($interpolateProvider, $httpProvider) {
      $interpolateProvider.startSymbol('{(').endSymbol(')}');
      $httpProvider.defaults.useXDomain = true;
      return delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

  app.controller('ProjectsController', function($scope, CivicActivityService) {
    console.log('hello');
    $scope.test = 'hello!';
    return CivicActivityService.fetchOrgs(function(data) {
      console.log(data);
      return $scope.orgs = data.objects;
    });
  });

  app.factory('CivicActivityService', function($q, $timeout, $http, $rootScope) {
    return {
      fetchOrgs: function(callback) {
        var url;
        url = API_ENDPOINT + '/organizations';
        console.log('call: ' + url);
        return $http.get(url, {
          timeout: 1000
        }).success(function(data, status, headers, config) {
          console.log('success: ' + status + ' ' + data.status);
          return callback(data);
        }).error(function(data, status, headers, config) {
          if (status === 404) {
            return console.log("404 error, going to try again");
          } else {
            return console.log(data);
          }
        });
      }
    };
  });

}).call(this);
