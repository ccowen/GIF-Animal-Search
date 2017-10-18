// array of preset topics
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

// function to capatalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function to search for a value in an array
function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

// function for displaying topics as links
function renderLinks() {

	// store the data name of the active button
	var dataOfActiveButton = $(".active").attr("data-name");
	console.log(dataOfActiveButton);

	// emoty the list group of previous data, so when a new button is added, everything doesn't repeat itself
	$(".list-group").empty();

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

		var activeLink = search(dataOfActiveButton, topics);

		// Then dynamicaly generating links for each topic in the array
		var a = $("<a>");
		// Adding a class
		a.addClass("list-group-item");
		// Added a data-attribute
		a.attr("data-name", topics[i]);

		if (dataOfActiveButton == undefined) {
			a.addClass("list-group-item");
		} 
		else if (dataOfActiveButton == a.attr("data-name")) {
			a.attr("data-name", dataOfActiveButton).addClass("active");
		}
	

		// Added a data-attribute
		a.attr("href", "#");
		// Provided the initial button text
		a.text(topics[i]);
		// Added the button to the HTML
		$(".list-group").append(a);

	}

};

// function to call ajax for the animal that is clicked
function displayAnimalInfo() {

	// clear the previous active button
	$(".list-group-item").removeClass("active");

	// variable to store the data of the button clicked
	var animal = $(this).attr("data-name");

	// add active class to the button clicked
	$(this).addClass("active");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=100&api_key=dc6zaTOxFJmzC";

	// Creating an AJAX call for the specific topic button being clicked
	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response) {

	  $("#animalGifHere").empty();

	  // loop to create an element to hold each image
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

	// adds new topic defined by the user to the links
	$("#add-animal").on("click", function(event) {
		event.preventDefault();
		// This line grabs the input from the textbox
		var newTerm = $("#search-input").val().trim();

		var newTermUpper = capitalizeFirstLetter(newTerm);

		// Adding from the textbox to our array
		topics.unshift(newTermUpper);

		// calling renderLinks, handles the processing of our topics array
		renderLinks();
	});
    
}); 