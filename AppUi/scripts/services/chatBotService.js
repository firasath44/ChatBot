'use strict';

angular.module('ChatbotApp')
    .service('ChatBotService', function ($http, $window, $rootScope) {

        this.sendMessage = function (input, cbFn) {
            var reqObj =input;
            var serviceUrl = '/api/v1/apiAiCall';
          

            $http.post(serviceUrl, reqObj).then(function successCallback(response) {
                cbFn(null, response);
            }, function errorCallback(response) {
                cbFn(response, null);
            });
        };
    });