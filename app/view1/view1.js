'use strict';

angular.module('app.view1', ['ajoslin.promise-tracker'])
.controller('VehicleController', function($scope, $http, promiseTracker, $timeout, $log) {
    $scope.progress = promiseTracker();

    $scope.submit = function(form) {
        $scope.submitted = true;
    };

    var vehicle = {
      params : {
        'callback' : 'JSON_CALLBACK',
        'name' : $scope.name,
        'reg' : $scope.reg,
        'lat' : $scope.lat,
        'ing' : $scope.ing
      },
    };

    var $promise = $http.jsonp('response.json', vehicle)
        .success(function(data, status, headers, vehicle) {
            if(data.status == 'OK') {
                $scope.name = null;
                $scope.reg = null;
                $scope.lat = null;
                $scope.ing = null;
            } else {
                $scope.messages = "error processing";
                $log.error(data);
            }
        })
        .error(function(data, status, headers, vehicle) {
            $scope.progress = data;
            $scope.messages = "error";
        })
        .finally(function() {
            $timeout(function() {
                $scope.messages = null;
            }, 3000);
    });

    $scope.progress.addPromise($promise);
});