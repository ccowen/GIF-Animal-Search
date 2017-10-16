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

	  	var image = $("<img class='panel-body animalGif' src='" + response.data[i].images.fixed_width.url + "'>");

	  	var text = $("<p class='panel-footer'><a class='btn btn-secondary' href=" + response.data[i].images.original.url + "role='button'>Go to Link &raquo;</a></p>")
	  	
	  	// Creating a div to hold the gif, maybe plus other info
	    var gifDiv = $("<div class='col-6 col-lg-4 panel panel-default grid-item'>");

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

    $('.grid').masonry({
	  // options
	  itemSelector: '.grid-item',
	  columnWidth: 500
	});

    // testing masonry, are you working?
	var $grid = $('.grid').masonry({
	  columnWidth: 80
	});
	// change size of item by toggling gigante class
	$grid.on( 'click', '.grid-item', function() {
	  $(this).toggleClass('gigante');
	  // trigger layout after item size changes
	  $grid.masonry('layout');
	});

}); 