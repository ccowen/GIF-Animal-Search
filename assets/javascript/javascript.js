var topics = [
	"Dog",
	"Cat",
	"Frog",
	"Horse"
]

// Function for displaying animal buttons
function renderLinks() {

/* Deleting the movies prior to adding new movies
// (this is necessary otherwise we will have repeat buttons)
$("#buttons-view").empty(); */

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating buttons for each movie in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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

	  // Creating a div to hold the gif plus other info

	  /* // Storing the rating data
	  var rating = response.Rated;

	  // Creating an element to have the rating displayed
	  var pOne = $("<p>").text("Rating: " + rating); 

	  // Displaying the rating
	  gifImage.append(pOne);

	  // Storing the release year
	  var released = response.Released;

	  // Creating an element to hold the release year
	  var pTwo = $("<p>").text("Released: " + released);

	  // Displaying the release year
	  movieDiv.append(pTwo);

	  // Storing the plot
	  var plot = response.Plot;

	  // Creating an element to hold the plot
	  var pThree = $("<p>").text("Plot: " + plot);

	  // Appending the plot
	  movieDiv.append(pThree); */

	  $("#animalGifHere").empty();

	  // Creating an element to hold the image
	  for (var i = 0; i < response.data.length; i++) {

	  	var heading = ("<h2 class='gifHeading'>" + animal + " " + [i + 1] + "</h2>");
	  	var image = $("<img src='" + response.data[i].images.fixed_width.url + "'>");
	  	var text = ("<p class='gifText'>" + response.data[i].images.fixed_width.url + "</p>")
	  	
	  	// Creating a div to hold the gif, maybe plus other info
	    var gifDiv = $("<div class='col-6 col-lg-4'>");

	    // append the gif div the main area
	    $("#animalGifHere").append(gifDiv);

	    // Appending the heading to the gif div
	    gifDiv.append(heading);

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