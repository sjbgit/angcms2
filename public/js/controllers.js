'use strict';

'use strict';
angular.module('myApp.controllers', []).
    controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
      function($scope, $log, pagesFactory) {
        pagesFactory.getPages().then(
            function(response) {
              $scope.allPages = response.data;
            },
            function(err) {
              $log.error(err);
            });

        $scope.deletePage = function(id) {
          pagesFactory.deletePage(id);
        };

      }
    ]);

/* Controllers

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
  */
