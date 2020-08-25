(function(angular) {
	"use strict";
	angular.module("aimbot").directive(
		"scoreboard",
		[
			"$filter",
			"$timeout",
			function($filter, $timeout) {
				return {
					restrict: "E",
					link: function(scope) {
						var setAccuracy;

						scope.$watch(
							"gameStats.score.value",
							function(targetsHit) {
								$timeout(
									function() {
										if (scope.gameStats.targetsMissed.value !== 0) {
											setAccuracy(
												targetsHit / scope.gameStats.targetsMissed.value * 100,
											);
										}
									},
									0,
								);
							},
						);

						scope.$watch(
							"gameStats.targetsMissed.value",
							function(targetsMissed) {
								$timeout(
									function() {
										setAccuracy(
											scope.gameStats.score.value / targetsMissed * 100,
										);
									},
									0,
								);
							},
						);

						setAccuracy = function(accuracy) {
							scope.gameStats.accuracy.value = $filter("number")(accuracy, 2);
						};
					},
					templateUrl: "templates/scoreboard.html",
				};
			},
		],
	);
})(angular);
