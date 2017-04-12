(function(angular, moment) {

'use strict';

angular.module('aimbot')

.factory('Timer', ['$timeout', function($timeout) {
  return function(timeObject) {
    var startTime = 0,
        pauseTime = 0,
        timeoutRef;

    this.pause = function() {
      $timeout.cancel(timeoutRef);
      pauseTime = moment().valueOf();
    };

    this.unpause = function() {
      startTime += getTimeSince(pauseTime);
      updateTimePlayed();
    };

    function getTimeSince(time) {
      return moment().valueOf() - time;
    }

    function formatTime(time) {
      return moment(time).format('mm:ss');
    }

    function updateTimePlayed() {
      var timePlayed = getTimeSince(startTime);
      timeObject.value = formatTime(timePlayed);
      timeObject.plain = timePlayed;
      timeoutRef = $timeout(updateTimePlayed, 32);
    }

    this.start = function() {
      startTime = moment();
      updateTimePlayed();
    };

    this.stop = function() {
      $timeout.cancel(timeoutRef);
    };
  };
}]);

})(angular, moment);