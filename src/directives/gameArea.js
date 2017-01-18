(function(angular) {

'use strict';

angular.module('aimbot')

.directive('gameArea', ['$interval', function($interval) {
    return {
      restrict: 'E',
      link: function(scope, element) {        
        scope.targets = [];

        function spawnTarget() {
          scope.targets.unshift(guid());
        }

        scope.updateScore = function(wasClicked, id) {
          scope.targets.splice(scope.targets.indexOf(id), 1);

          if (wasClicked === true) {
            scope.commands.plusScore();
          } else {
            scope.commands.loseLife();
          }
        };

        function guid() {
          var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          };

          return s4() + s4();
        }

        element.on('mousedown', function() {
          scope.commands.targetMissed();
        });

        $interval(function() {
          if (scope.gameState.gamePaused === false) {
            spawnTarget();
          }
        }, 1000 / scope.config.targetsPerSecond);
      },
      templateUrl: 'templates/gameArea.html'
    };
  }
]);

})(angular);