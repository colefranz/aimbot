(function(angular) {

'use strict';

angular.module('aimbot')

.directive('startScreen', [function() {
  return {
    restrict: 'E',
    link: function(scope, element) {
      element.on('keydown', function(event) {
        if(event.keyCode === 32) {
          event.stopPropagation();
          scope.startGame();
        }
      });
    },
    templateUrl: 'templates/startScreen.html'
  };
}]);

})(angular);