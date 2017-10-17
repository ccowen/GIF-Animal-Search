var topics = [
	"Dog",
	"Cat",
	"Frog",
	"Horse",
	"Hamster",
	"Goldfish",
	"Bird",
	"Skunk",
	"Chicken",
	"Goat",
	"Pig"
]

// Function for displaying animal buttons
function renderLinks() {

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating links for each topic in the array
		var a = $("<a>");
		// Adding a class
		a.addClass("list-group-item");
		// Added a data-attribute
		a.attr("data-name", topics[i]);
		// Added a data-attribute
		a.attr("href", "#");
		// Provided the initial button text
		a.text(topics[i]);
		// Added the button to the HTML
		$(".list-group").append(a);

	}

};

function displayAnimalInfo() {

	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";

	// Creating an AJAX call for the specific movie button being clicked
	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {

	  $("#animalGifHere").empty();

	  // Creating an element to hold the image
	  for (var i = 0; i < response.data.length; i++) {

	  	var image = $("<img class='animalGif' src='" + response.data[i].images.fixed_width.url + "'>");

	  	var text = $("<a class='btn btn-secondary gifButton' href=" + response.data[i].images.fixed_width.url + "role='button'>Link &raquo;</a>")
	  	
	  	// Creating a div to hold the gif, maybe plus other info
	    var gifDiv = $("<div class='item'>");

	    // append the gif div the main area
	    $("#animalGifHere").append(gifDiv);

	    // Appending the image to the gif div
	    gifDiv.append(image);

	    // Appending the text to the gif div
	    gifDiv.append(text);

	  };

	});

}

$(document).ready(function() {

	// from bootstrap, toggles sidebar
	$('[data-toggle="offcanvas"]').click(function () {
		$('.row-offcanvas').toggleClass('active')
	});

	renderLinks();

	// Adding a click event listener to all elements with a class of "list-group-item"
    $(document).on("click", ".list-group-item", displayAnimalInfo);
    
}); 