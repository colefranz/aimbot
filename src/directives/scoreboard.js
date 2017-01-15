(function(angular) {

'use strict';

angular.module('aimbot')

.directive('scoreboard', ['$filter', function($filter) {
  return {
    restrict: 'E',
    link: function(scope) {
      var setAccuracy;

      scope.$watch('gameStats.targetsHit.value', function(targetsHit) {
        if (scope.gameStats.targetsMissed.value !== 0) {
          setAccuracy(targetsHit / scope.gameStats.targetsMissed.value * 100);
        }
      });

      scope.$watch('gameStats.targetsMissed.value', function(targetsMissed) {
        setAccuracy(scope.gameStats.targetsHit.value / targetsMissed * 100);
      });

      setAccuracy = function(accuracy) {
        scope.gameStats.accuracy.value = $filter('number')(accuracy, 2);
      };
    },
    templateUrl: 'templates/scoreboard.html'
  };
}]);

})(angular);