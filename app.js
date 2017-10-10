var movies = ["The Godfather", "The Shining",
 "2001: A Space Oddisey", "Inception"];

function renderButtons() {
// Deleting the movie buttons prior to adding new movie buttons
// (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("movie btn btn-secondary");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", movies[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(movies[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
// event.preventDefault() prevents the form from trying to submit itself.
// We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  var movie = $("#movie-input").val().trim();
  movies.push(movie);
  renderButtons();
});

$(document).on("click", "button", function() {

  var movie = $(this).attr('data-name');
  console.log(movie);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + 
  "&api_key=FeQ3KbvAx8gVEWbkDSPrafX3oVL8rGBI&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
      console.log(response);
          // storing the data from the AJAX request in the results variable
      var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var movieDiv = $("<div>");
            movieDiv.addClass('col-6 card');

            var movieImage = $("<img>");
            movieImage.addClass('gif card-img-top');
            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("data-still", results[i].images.fixed_height_still.url);
            movieImage.attr("data-animate", results[i].images.fixed_height.url);
            movieImage.attr("data-state", "still");
            
            var ratingDiv = $("<div>");
            ratingDiv.addClass('card-block');

            var p = $("<p>").text("Rating: " + results[i].rating);
            p.addClass('lead card-text');

            // Appending the paragraph and image tag to the animalDiv
            ratingDiv.append(p);
            movieDiv.append(movieImage);
            movieDiv.append(ratingDiv);
            

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#movies-view").prepend(movieDiv);
            pause();

            //Animate Gif
          }
    });

});

function pause(){
  $(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}

renderButtons();
  // This line will grab the text from the input box

  // The movie from the textbox is then added to our array

  // calling renderButtons which handles the processing of our movie array

// Calling the renderButtons function at least once to display the initial list of movies