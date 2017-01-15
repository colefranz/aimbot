(function(angular) {

'use strict';

angular.module('aimbot')

.directive('gameArea', ['$interval', '$timeout', function($interval, $timeout) {
    return {
      restrict: 'E',
      link: function(scope, element) {
        var guid;
        
        scope.gameStats.targetsHit.value = 0;
        scope.gameStats.lives.value = 3;
        scope.gameStats.targetsMissed.value = 0;
        scope.targets = [];
        scope.width = element[0].clientWidth;
        scope.height = element[0].clientHeight;

        scope.spawnTarget = function() {
          scope.targets.unshift(guid());
        };

        scope.updateScore = function(wasClicked, id) {
          scope.targets.splice(scope.targets.indexOf(id), 1);

          if (wasClicked === true) {
            scope.gameStats.targetsHit.value++;
          } else {
            scope.gameStats.lives.value--;
          }
          scope.$digest();
        };

        guid = function() {
          var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          };

          return s4() + s4();
        };

        scope.$watch('gameStats.lives.value', function(lives) {
          if (lives === 0) {
            $timeout(function() {
              scope.gameState.gameActive = false;
              scope.gameState.isLoser = true;
            }, 750);
          }
        });

        element.on('mousedown', function() {
          scope.gameStats.targetsMissed.value++;
        });

        $interval(function() {
          if (scope.gameState.gamePaused === false) {
            scope.spawnTarget();
          }
        }, 1000 / scope.gameState.targetsPerSecond);
      },
      templateUrl: 'templates/gameArea.html'
    };
  }
]);

})(angular);