(function(angular) {
	"use strict";
	angular.module("aimbot").directive(
		"gameArea",
		[
			"$timeout",
			function($timeout) {
				return {
					restrict: "E",
					link: function(scope, element) {
						var spawnTimeout;
						scope.targets = [];

						function spawnTarget() {
							scope.targets.unshift(guid());
						}

						scope.updateScore = function(wasClicked, id) {
							scope.targets.splice(scope.targets.indexOf(id), 1);

							if (wasClicked === true) {
								scope.commands.plusScore();
							} else {
								scope.commands.loseLife();
							}
						};

						function guid() {
							var s4 = function() {
								return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(
									1,
								);
							};

							return s4() + s4();
						}

						element.on(
							"mousedown",
							function() {
								scope.commands.targetMissed();
							},
						);

						(function tryToSpawnTarget() {
							var tps;

							if (scope.gameState.gamePaused === false) {
								spawnTarget();

								if (scope.config.acceleration.value === true) {
									tps = scope.config.targetsPerSecond.value + 0.009;
									tps = tps.toFixed(2);
									scope.config.targetsPerSecond.value = parseFloat(tps);
								}
							}

							spawnTimeout = $timeout(
								tryToSpawnTarget,
								1_000 / scope.config.targetsPerSecond.value,
							);
						})();

						scope.$on(
							"$destroy",
							function() {
								$timeout.cancel(spawnTimeout);
							},
						);
					},
					templateUrl: "templates/gameArea.html",
				};
			},
		],
	);
})(angular);
