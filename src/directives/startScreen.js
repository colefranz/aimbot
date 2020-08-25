(function(angular) {
	"use strict";
	angular.module("aimbot").directive(
		"startScreen",
		[
			function() {
				return {
					restrict: "E",
					link: function(scope, element) {
						element.on(
							"keydown",
							function(event) {
								scope.optionsIsOpen = false;

								if (event.keyCode === 32) {
									event.stopPropagation();
									scope.startGame();
								}
							},
						);

						scope.toggleOpenOptions = function() {
							scope.optionsIsOpen = !scope.optionsIsOpen;
						};
					},
					templateUrl: "templates/startScreen.html",
				};
			},
		],
	);
})(angular);
