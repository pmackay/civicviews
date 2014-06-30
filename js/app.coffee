---
---

# API_ENDPOINT = 'http://localhost:5000/api'
API_ENDPOINT = 'http://civicapi.herokuapp.com/api'


app = angular.module('CivicViews', [])

app.config ['$interpolateProvider', '$httpProvider', ($interpolateProvider, $httpProvider)->
  $interpolateProvider.startSymbol('{(').endSymbol(')}')

  $httpProvider.defaults.useXDomain = true
  delete $httpProvider.defaults.headers.common['X-Requested-With']
]


app.controller 'ProjectsController', ($scope, CivicActivityService) ->
  console.log 'hello'
  $scope.test = 'hello!'
  CivicActivityService.fetchOrgs (data) ->
    console.log data
    $scope.orgs = data.objects


app.factory 'CivicActivityService', ($q, $timeout, $http, $rootScope) ->
  fetchOrgs: (callback) ->
    url = API_ENDPOINT + '/organizations'
    console.log 'call: ' + url
    $http.get(url, {timeout: 1000}).
      success((data, status, headers, config) ->
        console.log 'success: ' + status + ' ' + data.status
        callback(data)
      ).
      error((data, status, headers, config) ->
        if (status == 404)
          console.log("404 error, going to try again")
        else
          console.log(data)
      )
