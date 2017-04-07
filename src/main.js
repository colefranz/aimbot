(function(angular, moment) {
'use strict';

var aimbotModule = angular.module('aimbot', []);

aimbotModule.controller('aimbotController', ['$scope', '$document', 'Timer',
  function($scope, $document, Timer) {
    var customTps,
        timer;

    $scope.gameState = {
      gameActive: false,
      isLoser: false,
      gamePaused: false
    };

    $scope.config = {
      targetsPerSecond: {
        name: 'Targets/second',
        shortName: 'Targets/s',
        value: 2
      },
      acceleration: {
        name: 'Acceleration',
        tooltip: 'Increases the number of targets per second gradually.',
        value: true
      }
    };

    $scope.gameStats = {
      score: {
        name: 'Score',
        value: 0
      },
      lives: {
        name: 'Lives',
        value: 3
      },
      targetsMissed: {
        name: 'Targets Missed',
        value: 0
      },
      accuracy: {
        name: 'Accuracy',
        value: 100
      },
      time: {
        name: 'Time',
        value: 0
      }
    };

    timer = new Timer($scope.gameStats.time);

    $scope.commands = {
      init: function() {
        $scope.gameState.gamePaused = false;
      },
      endGame: function(isLoser) {
        timer.stop();
        $scope.gameState.gameActive = false;
        $scope.gameState.isLoser = isLoser || false;
        $scope.config.targetsPerSecond.value = customTps;
      },
      pauseGame: function() {
        $scope.gameState.gamePaused = true;
        timer.pause();
      },
      unpauseGame: function() {
        $scope.gameState.gamePaused = false;
        timer.unpause();
      },
      togglePauseGame: function() {
        $scope.gameState.gamePaused ? $scope.commands.unpauseGame() : $scope.commands.pauseGame();
      },
      targetMissed: function() {
        $scope.gameStats.targetsMissed.value++;
        $scope.$digest();
      },
      loseLife: function() {
        $scope.gameStats.lives.value--;

        if ($scope.gameStats.lives.value <= 0) {
          $scope.commands.endGame(true);
        }
        $scope.$digest();
      },
      plusScore: function() {
        $scope.gameStats.score.value++;
        $scope.$digest();
      },
      startGame: function() {
        customTps = $scope.config.targetsPerSecond.value;
        $scope.gameState.gamePaused = false;
        $scope.gameStats.score.value = 0;
        $scope.gameStats.targetsMissed.value = 0;
        $scope.gameStats.lives.value = 3;

        timer.start();
        $scope.gameState.gameActive = true;
      }
    };

    $document.on('keydown', function(event) {
      if (event.keyCode === 27) {
        $scope.commands.endGame();
        event.preventDefault();
        event.stopPropagation();
      } else if (event.keyCode === 32) {
        $scope.commands.togglePauseGame();
      }
    });
  }
]);
  // function syncStorage(key, value) {
  //   var keyValuePair = {};

  //   keyValuePair[appId + key] = value;
  //   chrome.storage.sync.set(keyValuePair);
  // }
aimbotModule.value('gameConstants', {
  targetWidth: '64',
  scoreBoardHeight: '60'
});

})(angular, moment);