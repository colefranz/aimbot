(function(angular) {

'use strict';

var aimbotModule = angular.module('aimbot', []);

aimbotModule.controller('aimbotController', ['$scope', '$document', function($scope, $document) {
  $scope.gameState = {
    gameActive: false,
    targetsPerSecond: 2,
    isLoser: false,
    gamePaused: false
  };

  $scope.gameStats = {
    targetsHit: {
      name: 'Score',
      value: 0
    },
    lives: {
      name: 'Lives',
      value: 3,
      className: 'full'
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
    endGame: function() {
      $scope.gameState.gameActive = false;
      $scope.gameState.isLoser = false;
    },
    pauseGame: function() {
      $scope.gameState.gamePaused = true;
    },
    unpauseGame: function() {
      $scope.gameState.gamePaused = false;
    },
    togglePauseGame: function() {
      $scope.gameState.gamePaused = !$scope.gameState.gamePaused;
    }
  };

  $document.on('keydown', function(event) {
    if (event.keyCode === 27) {
      $scope.commands.endGame();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.keyCode === 13 || event.keyCode === 32) {
      $scope.commands.togglePauseGame();
    }
  });
}]);

aimbotModule.value('gameConstants', {
  targetWidth: '64',
  scoreBoardHeight: '60'
});

})(angular);