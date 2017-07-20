'use strict';


angular.module('ChatbotApp')
    .controller('ChatBotCtrl', function ($scope, $location, $rootScope, $anchorScroll, $interval, ChatBotService) {
        $scope.chatInput = {
            inputMessage: "",
            sessionID: "2"
        };
        $scope.messageList = [];
        $scope.sendMessage = function () {
            if ($scope.validation()) {
                var message = { message: $scope.chatInput.inputMessage, user: "Me", lineLeft: true, time: moment().format('HH:mm') };
                $scope.messageList.push(message);
                console.log($scope.chatInput);
                ChatBotService.sendMessage($scope.chatInput, function (err, response) {
                    if (err) {
                    }
                    else if (response) {
                        if (response.data.result && response.data.result.fulfillment) {
                            var messageRes = { message: response.data.result.fulfillment.speech, user: "AI", lineLeft: false, time: moment().format('HH:mm') };
                            $scope.messageList.push(messageRes);
                        
                            $interval(function () {
                                //$location.hash('viewAnchor');
                                $anchorScroll('bottom');
                                return false;
                            }, 100, 1);
                        }
                        $scope.chatInput.inputMessage = "";
                        console.log(response);
                    }
                });
            }
        };
        $scope.refresh = function () {
            $scope.messageList = [];
            $scope.chatInput.inputMessage = "";
        };
        $scope.validation = function () {
            var isValid = true;
            if (!$scope.chatInput.inputMessage) {
                isValid = false;
                $scope.errorMsg="Please specify your answer"
            }
            return isValid;
        };
    });