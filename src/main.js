(function(angular) {

'use strict';

var aimbotModule = angular.module('aimbot', []);

aimbotModule.controller('aimbotController', ['$scope', '$document',
  function($scope, $document) {
  $scope.gameState = {
    gameActive: false,
    isLoser: false,
    gamePaused: false
  };

  $scope.config = {
    targetsPerSecond: {
      name: 'Targets/second',
      value: 2
    },
    acceleration: {
      name: 'Acceleration',
      tooltip: 'Increases the number of targets per second gradually.',
      value: false
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
    }
  };

  $scope.commands = {
    init: function() {
      $scope.gameState.gamePaused = false;
    },
    endGame: function(isLoser) {
      $scope.gameState.gameActive = false;
      $scope.gameState.isLoser = isLoser || false;
    },
    pauseGame: function() {
      $scope.gameState.gamePaused = true;
    },
    unpauseGame: function() {
      $scope.gameState.gamePaused = false;
    },
    togglePauseGame: function() {
      $scope.gameState.gamePaused = !$scope.gameState.gamePaused;
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
      $scope.gameState.gamePaused = false;
      $scope.gameStats.score.value = 0;
      $scope.gameStats.targetsMissed.value = 0;
      $scope.gameStats.lives.value = 3;
      
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
}]);

aimbotModule.value('gameConstants', {
  targetWidth: '64',
  scoreBoardHeight: '60'
});

})(angular);