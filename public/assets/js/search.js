
var map = null;


$(document).ready(function() {
  function performSearch() {
  	var category = this.id;
    $.get({
      url: '/categories/' + category,
      success: function(data) { 
        updateSearchResults(data);

      }
    }) 
  }

  $( ".performSearch" ).click(performSearch)

  function updateSearchResults (searchData){
    var results = $('#searchResults');
    results.empty();
 
    searchData.forEach(function (result) {
  	  var searchData = [result.businessName, result.fullName, result.phoneNumber, result.email];
  	  var searchText = searchData.join(', ');
        $('<li class="list-group-item"></li>').html(searchText).appendTo(results);

        // TODO add a marker to google map for each search result
        // First, use zipcode to find lat/long (either here or when user signs up)
        /*
          var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
        */
    });
  }
});


// Google maps

function centerMap(latitude, longitude) {
	map = new google.maps.Map(document.getElementById('map'), {
  		center: {lat: latitude, lng: longitude},
  		zoom: 8
	});
}

function initMap() {
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
  		centerMap(position.coords.latitude, position.coords.longitude);
		});
	} else {
	  console.log('geolocation is unavailable');
	}

	setTimeout(function() {
        if (!map) {
          console.log("No confirmation from user, using fallback");
          centerMap(35.7796, -78.6382); // Default to Raleigh, NC
        }
      }, 5000);
}
