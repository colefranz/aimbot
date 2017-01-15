'use strict';

var aimbotModule = angular.module('aimbot', []);

aimbotModule.controller('aimbotController', ['$scope', '$document', function($scope, $document) {
  $scope.gameState = {
    gameActive: false,
    targetsPerSecond: 2,
    isLoser: false,
    gameHasBeenPlayed: false,
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

aimbotModule.directive('startScreen', [function() {
  return {
    restrict: 'E',
    link: function(scope, element) {

      scope.startGame = function() {
        scope.gameState.gameActive = true;
        scope.gameState.gameHasBeenPlayed = true;
        scope.gameState.gamePaused = false;
      };
      
      
      element.on('keydown', function(event) {
        if(event.keyCode === 32) {
          event.stopPropagation();
          scope.startGame();
        }
      });
    },
    template: '<div id="start-screen"><button ng-click="startGame()" title="Start Game">Start Game</button><div id="targets-per-second"><p>Targets/second</p><input type="number" step=".1" min="1" max="5" ng-model="gameState.targetsPerSecond"/><p>{{gameState.message}}</p></div><p id="losing-message" ng-show="gameState.isLoser">You lost !!</p></div>'
  };
}]);

aimbotModule.directive('gameDirective', ['$interval', '$timeout', function($interval, $timeout) {
    return {
      restrict: 'E',
      link: function(scope, element) {
        var guid;
        
        scope.gameStats.targetsHit.value = 0;
        scope.gameStats.lives.value = 3;
        scope.gameStats.targetsMissed.value = 0;
        scope.targets = [];
        scope.isLivesOverlayActive = '';
        scope.width = element[0].clientWidth;
        scope.height = element[0].clientHeight;

        scope.spawnTarget = function() {
          scope.targets.unshift(guid());
        };

        scope.updateScore = function(wasClicked, id) {
          scope.targets.splice(scope.targets.indexOf(id), 1);

          if (wasClicked === true) {
            scope.gameStats.targetsHit.value++;
          } else {
            scope.gameStats.lives.value--;
          }
          scope.$digest();
        };

        guid = function() {
          var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          };

          return s4() + s4();
        };

        scope.livesLookUp = ['zero', 'one', 'two', 'full'];

        scope.$watch('gameStats.lives.value', function(lives) {
          scope.gameStats.lives.className = scope.livesLookUp[lives];

          if(lives !== 3) {
            scope.isLivesOverlayActive = 'active';
          }
          
          if (lives === 0) {
            $timeout(function() {
              scope.gameState.gameActive = false;
              scope.gameState.isLoser = true;
            }, 750);
          }
        });

        element.on('mousedown', function() {
          scope.gameStats.targetsMissed.value++;
        });

        $interval(function() {
          if (scope.gameState.gamePaused === false) {
            scope.spawnTarget();
          }
        }, 1000 / scope.gameState.targetsPerSecond);
      },
      template: '<div ng-repeat="target in targets track by target"><aim-target callback="updateScore(wasClicked, id)" width="{{width}}" height="{{height}}" guid="{{target}}" paused="{{gameState.gamePaused}}"></aim-target></div><div id="paused-overlay" class="overlay" ng-hide="!gameState.gamePaused"><p id="paused-header">paused</p><p>press space to unpause</p></div><div id="lives-overlay" class="overlay" ng-class="livesLookUp[gameStats.lives.value]"></div>'
    };
  }
]);

aimbotModule.directive('scoreboard', ['$filter', function($filter) {
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
    template: '<div id="score-board"><ul><li>Score: {{gameStats.targetsHit.value}}</li><li>Lives: {{gameStats.lives.value}}</li><li>Accuracy: {{gameStats.accuracy.value}}%</li></ul><div id="button-holder"><button id="pause-button" ng-click="commands.togglePauseGame()" ng-if="gameState.gameActive">{{gameState.gamePaused === true ? "Unpause" : "Pause"}}</button><button id="end-button" ng-show="gameState.gameActive" ng-click="commands.endGame()">End Game</button></div></div>'
  };
}]);

aimbotModule.directive('aimTarget', ['gameConstants', function(gameConstants) {
  return {
    restrict: 'E',
    scope: {
      callback: '&',
      width: '@',
      height: '@',
      guid: '@',
      paused: '@'
    },
    link: function(scope, element) {
      var onAnimationEnd,
        onMouseDown,
        resolveTarget,
        createTargetElement,
        top,
        left;

      createTargetElement = function(elementWidth) {
        return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"' +
          'width="' + elementWidth + 'px"' +
          'viewBox="0 0 32 32"><circle class="outer-circle" cx="16" cy="16" r="14.5" style="fill:#0f0;stroke:#080"/><circle class="inner-circle" cx="16" cy="16" r="5" style="fill:#0a0;stroke:#080"/></svg>';
      };

      onAnimationEnd = function() {
        resolveTarget(false);
      };

      onMouseDown = function() {
        resolveTarget(true);
      };

      resolveTarget = function(wasClicked) {
        scope.callback({
          'id': scope.guid,
          'wasClicked': wasClicked
        });
        scope.$destroy();
      };

      element.append(createTargetElement(gameConstants.targetWidth));

      element.on('animationend', onAnimationEnd);
      element.on('mousedown', onMouseDown);
      top = Math.random() * (scope.height -
        gameConstants.targetWidth - gameConstants.scoreBoardHeight);
      left = Math.random() * (scope.width - gameConstants.targetWidth);

      element.css('top', top + 'px');
      element.css('left', left + 'px');

      scope.$watch('paused', function(state) {
        var playState = state === 'true' ? 'paused' : 'running';
        angular.element(element.find('circle')[0])[0].style.animationPlayState = playState;
        angular.element(element.find('circle')[1])[0].style.animationPlayState = playState;
        element[0].style.animationPlayState = 'paused';
      });
    }
  };
}]);

aimbotModule.value('gameConstants', {
  targetWidth: '64',
  scoreBoardHeight: '60'
});