(function(angular) {
	"use strict";
	angular.module("aimbot").directive(
		"postGame",
		[
			function() {
				return {
					restrict: "E",
					link: {
						pre: function(scope, element) {
							var plainTime = scope.gameStats.time.plain;

							if (plainTime > 180_000) {
								scope.qualityOfTime = "You monster!";
							} else if (plainTime > 120_000) {
								scope.qualityOfTime = "That's nuts!";
							} else if (plainTime > 90_000) {
								scope.qualityOfTime = "Very Impressive!";
							} else if (plainTime > 60_000) {
								scope.qualityOfTime = "Respectable!";
							} else if (plainTime > 40_000) {
								scope.qualityOfTime = "Superb!";
							} else if (plainTime > 30_000) {
								scope.qualityOfTime = "Decent!";
							} else if (plainTime > 20_000) {
								scope.qualityOfTime = "Alright..";
							} else if (plainTime > 10_000) {
								scope.qualityOfTime = "Try harder!";
							} else if (plainTime > 5_000) {
								scope.qualityOfTime = "Need help?";
							} else {
								scope.qualityOfTime = "Disappointing..";
							}
						},
					},
					templateUrl: "templates/postGame.html",
				};
			},
		],
	);
})(angular);
