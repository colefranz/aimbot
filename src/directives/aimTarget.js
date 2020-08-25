(function(angular) {
	"use strict";
	angular.module("aimbot").directive(
		"aimTarget",
		[
			"gameConstants",
			function(gameConstants) {
				return {
					restrict: "E",
					scope: {
						callback: "&",
						id: "@",
						paused: "@",
					},
					link: function(scope, element) {
						var onAnimationEnd;
						var onMouseDown;
						var resolveTarget;
						var createTargetElement;
						var top;
						var left;
						createTargetElement = function(elementWidth) {
							return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"width="${elementWidth}px"viewBox="0 0 32 32"><circle class="outer-circle" cx="16" cy="16" r="14.5" /><circle class="inner-circle" cx="16" cy="16" r="5" /></svg>`;
						};

						onAnimationEnd = function() {
							resolveTarget(false);
						};

						onMouseDown = function() {
							resolveTarget(true);
						};

						resolveTarget = function(wasClicked) {
							scope.callback({
								"id": scope.id,
								"wasClicked": wasClicked,
							});
							scope.$destroy();
						};

						element.append(createTargetElement(gameConstants.targetWidth));
						element.on("animationend", onAnimationEnd);
						element.on("mousedown", onMouseDown);
						top =
							Math.random() *
							(element.parent()[0].clientHeight -
							gameConstants.targetWidth -
							gameConstants.scoreBoardHeight);
						left =
							Math.random() *
							(element.parent()[0].clientWidth - gameConstants.targetWidth);

						element.css("top", `${top}px`);
						element.css("left", `${left}px`);

						scope.$watch(
							"paused",
							function(state) {
								var playState = state === "true" ? "paused" : "running";
								angular.element(element.find("circle")[0])[0].style.animationPlayState = playState;
								angular.element(element.find("circle")[1])[0].style.animationPlayState = playState;
								element[0].style.animationPlayState = playState;
							},
						);
					},
				};
			},
		],
	);
})(angular);
