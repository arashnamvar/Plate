//////////////////////////////////////
//-----------SETUP/ROUTES-----------//
//////////////////////////////////////

var PonP = angular.module('PlateOnPlate', ['ngRoute']);
	PonP.config(function($routeProvider)
	{
		$routeProvider
		.when('/',
		{
			templateUrl: 'partials/landing.html'
		})
		.when('/s/:search',
		{
			templateUrl: 'partials/results.html'
		})
		.when('/host/:id',
		{
			templateUrl: 'partials/host.html'
		})
		.otherwise
		({
			redirectTo: '/'
		});
	});

//////////////////////////////////////
//--------LANDING CONTROLLER--------//
//////////////////////////////////////
PonP.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal1 = function() {
    $scope.modalShown = !$scope.modalShown;
  };

    $scope.modalShown1 = false;
  $scope.toggleModal = function() {
    $scope.modalShown1 = !$scope.modalShown1;
  };

}]);


PonP.controller('resultsController', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal1 = function() {
    $scope.modalShown = !$scope.modalShown;
  };

    $scope.modalShown1 = false;
  $scope.toggleModal = function() {
    $scope.modalShown1 = !$scope.modalShown1;
  };

  var myCenter=new google.maps.LatLng(42.508742,-0.120850);

  function initialize()
  {
  var mapProp = {
    center:myCenter,
    disableDefaultUI:true,
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var marker=new google.maps.Marker({
    position:myCenter,
    });

  marker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content:"Arash's Vegetarian Bistro!"
    });

  var infowindow2 = new google.maps.InfoWindow({
    content:"Cody's Pizza Palace!"
    });

  infowindow.open(map,marker);
  infowindow2.open(map,marker);
  }

  google.maps.event.addDomListener(window, 'load', initialize);
  initialize();
}]);

// SLIDING NAV FOR MOBILE DIRECTIVE//

PonP.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" >' + contents + '</div>');
            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '.5s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
});

PonP.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target = document.querySelector(attrs.slideToggle);
            attrs.expanded = false;
            element.bind('click', function() {
                var content = target.querySelector('.slideable_content');
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    };
});

// MODAL DIRECTIVE //

PonP.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>&#10006</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});
