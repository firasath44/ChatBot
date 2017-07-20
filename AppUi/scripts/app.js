'use strict';


angular
    .module('ChatbotApp', [
        'ngResource',
        'ngRoute'
        
    ])

    .config(function ($routeProvider, $httpProvider) {
       
        $routeProvider
            .when('/chatBot', {
                templateUrl: 'views/chatbot.html',
                controller: 'ChatBotCtrl',
                controllerAs: 'chatbot'
            })
            
            .otherwise({
                redirectTo: '/chatBot'
            });
    })
    .run(function ($rootScope, $window, $route, $location) {
        $location.path("/chatBot");
    })
    .controller('RootCtrl', function ($rootScope, $scope) {
       


  
    });