(function(angular) {

'use strict';

angular.module('aimbot')

.directive('postGame', [function() {
  return {
    restrict: 'E',
    link: {
      pre: function(scope, element) {
        var plainTime = scope.gameStats.time.plain;

        if (plainTime > 180000) {
          scope.qualityOfTime = 'You monster!';
        } else if (plainTime > 120000) {
          scope.qualityOfTime = 'That\'s nuts!';
        } else if (plainTime > 90000) {
          scope.qualityOfTime = 'Very Impressive!';
        } else if (plainTime > 60000) {
          scope.qualityOfTime = 'Respectable!';
        } else if (plainTime > 40000) {
          scope.qualityOfTime = 'Superb!';
        } else if (plainTime > 30000) {
          scope.qualityOfTime = 'Decent!';
        } else if (plainTime > 20000) {
          scope.qualityOfTime = 'Alright..';
        } else if (plainTime > 10000) {
          scope.qualityOfTime = 'Try harder!';
        } else if (plainTime > 5000) {
          scope.qualityOfTime = 'Need help?';
        } else {
          scope.qualityOfTime = 'Disappointing..';
        }
      }
    },
    templateUrl: 'templates/postGame.html'
  };
}]);

})(angular);