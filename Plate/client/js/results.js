PonP.controller('resultsController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.modalShown = false;
  $scope.searchlocation = $routeParams.search;
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
