(function(angular, chrome) {

'use strict';

angular.module('aimbot')

.directive('options', ['$document', 'optionsController', function($document, optionsController) {
  return {
    restrict: 'E',
    replace: true,
    controller: ['$scope', optionsController],
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
}])
.factory('optionsController', [function() {
  return function($scope) {
    var windowedKey = 'aimbot-windowed';

    $scope.windowed = false;

    chrome.storage.sync.get(windowedKey, function(items) {
      $scope.windowed = items[windowedKey];
    });

    $scope.toggleWindowedMode = function() {
      var keyValuePair = {};

      $scope.windowed = !$scope.windowed;

      keyValuePair[windowedKey] = $scope.windowed;
      chrome.storage.sync.set(keyValuePair);
    }
  };
}]);

})(angular, chrome);