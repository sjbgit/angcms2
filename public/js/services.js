'use strict';
angular.module('myApp.services', [])
    .factory('pagesFactory', ['$http',
        function($http) {
            return {
                getPages: function() {
                    return $http.get('/api/pages');
                },
                savePage: function(pageData) {
                    var id = pageData._id;

                    if (id == 0) {
                        return $http.post('/api/pages/add', pageData);
                    } else {
                        return $http.post('/api/pages/update', pageData);
                    }
                },
                deletePage: function(id) {
                    return $http.get('/api/pages/delete/' + id);
                },
                getAdminPageContent: function(id) {
                    return $http.get('/api/pages/admin-details/' + id);
                },
                getPageContent: function(url) {
                    return $http.get('/api/pages/details/' + url);
                },
            };
        }
    ])
    .factory('AuthService', ['$http',
        function($http) {
            return {
                login: function(credentials) {
                    console.log('auth services', JSON.stringify(credentials));
                    return $http.post('/api/login', credentials);
                },
                logout: function() {
                    return $http.get('/api/logout');
                }
            };

        }
    ]);

