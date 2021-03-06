
var map = null;
var geocoder;

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
  // Update Search Results
  function updateSearchResults (searchData){
    var results = $('#searchResults');
    results.empty();
    
    // Search results joined and displayed.
    searchData.forEach(function (result) {
  	  var searchData = [result.businessName, result.fullName, result.phoneNumber, result.email];
  	  var searchText = searchData.join(', ');
        $('<li class="list-group-item"><h3 align="center"></h3></li>').html(searchText).appendTo(results);

        // Markers Making, Title & Location
        geocoder.geocode({address: result.zipCode}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              var marker = new google.maps.Marker({
                map: map,
                title: result.businessName,
                position: results[0].geometry.location
              });
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
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

// Initialize Map & get lat & long
function initMap() {
  geocoder = new google.maps.Geocoder;
	if ("geolocation" in navigator) {
	  navigator.geolocation.getCurrentPosition(function(position) {
  		centerMap(position.coords.latitude, position.coords.longitude);
		});
	} else {
	  console.log('geolocation is unavailable');
	}
  // Time out if user does not allow access to google
	setTimeout(function() {
        if (!map) {
          console.log("No confirmation from user, using fallback");
          centerMap(35.7796, -78.6382); // Default to Raleigh, NC
        }
      }, 5000);
}
