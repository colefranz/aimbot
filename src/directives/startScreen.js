(function(angular) {

'use strict';

angular.module('aimbot')

.directive('startScreen', [function() {
  return {
    restrict: 'E',
    link: function(scope, element) {

      scope.startGame = function() {
        scope.gameState.gameActive = true;
        scope.gameState.gamePaused = false;
      };     
      
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