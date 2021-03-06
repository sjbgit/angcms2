'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('messageFlash', [function () {
        return {
            controller: function ($scope, flashMessageService, $timeout) {
                $scope.$on('NEW_MESSAGE', function () {
                    $scope.message = flashMessageService.getMessage();
                    $scope.isVisible = true;
                    return $timeout(function () {
                        $scope.isVisible = false;
                        return $scope.message = '';
                    }, 2500);
                })
            },
            template: '<p ng-if="isVisible" class="alert alert-info">{{message}}</p>'
        }
    }])
    .directive('navBar', [
        function () {
            return {
                controller: function ($scope, pagesFactory, $location) {
                    var path = $location.path().substr(0, 6);
                    if (path == "/admin") {
                        $scope.navLinks = [{
                            title: 'Pages',
                            url: 'admin'
                        }, {
                            title: 'Site Settings',
                            url: 'admin/site-settings'
                        }];
                    } else {
                        pagesFactory.getPages().then(
                            function (response) {
                                $scope.navLinks = response.data;
                            }, function () {

                            });
                    }
                },
                templateUrl: 'partials/directives/nav.html'

            };
        }
    ])
    .directive('adminLogin', [
        function () {
            return {
                controller: function ($scope, $cookies) {
                    $scope.loggedInUser = $cookies.loggedInUser;
                },
                templateUrl: 'partials/directives/admin-login.html'
            };
        }
    ])

;
