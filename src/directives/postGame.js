(function(angular) {

'use strict';

angular.module('aimbot')

.directive('postGame', [function() {
  return {
    restrict: 'E',
    link: function(scope, element) {

    },
    templateUrl: 'templates/postGame.html'
  };
}]);

})(angular);