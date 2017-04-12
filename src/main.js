(function(angular) {
'use strict';

angular.module('aimbot', ['ngRoute'])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/start', {
      template: '<start-screen></start-screen>'
    }).when('/in-game', {
      template: '<game-area></game-area>'
    }).when('/post-game', {
      template: '<post-game></post-game>'
    }).otherwise({
      template: '<start-screen></start-screen>'
    });
  }
])
.controller('aimbotController', [
  '$scope',
  '$document',
  '$location',
  'Timer',
  'configConstants',
  function(
    $scope,
    $document,
    $location,
    Timer,
    configConstants
  ) {
    var customTps,
        timer;

    $scope.gameState = {
      gameActive: false,
      gamePaused: false,
      custom: false
    };

    $scope.config = configConstants.getCompetitive();

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
        plain: '',
        value: 0
      }
    };

    timer = new Timer($scope.gameStats.time);

    $scope.commands = {
      startCompetitiveGame: function() {
        $scope.config = configConstants.getCompetitive();
        startGame();
      },
      endGame: function() {
        $location.path('/post-game');
        timer.stop();
        $scope.gameState.gameActive = false;
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
          $scope.commands.endGame();
        }
        $scope.$digest();
      },
      plusScore: function() {
        $scope.gameStats.score.value++;
        $scope.$digest();
      },
      goHome: function() {
        $location.path('/start');
      },
      startGame: startGame
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

    function startGame() {
      $location.path('/in-game');
      customTps = $scope.config.targetsPerSecond.value;
      $scope.gameState.gamePaused = false;
      $scope.gameStats.score.value = 0;
      $scope.gameStats.targetsMissed.value = 0;
      $scope.gameStats.lives.value = 3;

      timer.start();
      $scope.gameState.gameActive = true;
    }
  }
])
.value('gameConstants', {
  targetWidth: '64',
  scoreBoardHeight: '60'
})
.value('configConstants', {
  getCompetitive: function() {
    return {
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
    }
  }
});

})(angular);