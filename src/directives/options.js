(function(angular) {

'use strict';

angular.module('aimbot')

.directive('options', ['$document', function($document) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope) {
      $document.on('keydown', function(event) {
        if (event.keyCode === 27) {
          scope.optionsIsOpen = false;
          scope.$digest();
        }
      })
    },
    templateUrl: 'templates/options.html'
  };
}]);

})(angular);