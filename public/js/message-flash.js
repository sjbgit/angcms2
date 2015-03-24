/**
 * Created by sbunke on 3/19/2015.
 */
'use strict'
angular.module('message.flash', [])
    .factory('flashMessageService', ['$rootScope', function ($rootScope) {
        var message = '', callback = {};
        return {
            getMessage: function() {
                return message;
            },
            setMessage: function(newMessage) {
                message = newMessage;
                $rootScope.$broadcast('NEW_MESSAGE');
            }
            /*
            setCallback: function(cb) {
                callback = cb;
            }
            */
        };
    }]);