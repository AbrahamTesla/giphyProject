
 $("#addButton").on("click", function(event){
            event.preventDefault();
            
            var buttonName =$(".inputText").val().trim();
            var newButton=$("<button data-value='"+buttonName+"'>");
            
            
            newButton.addClass("newButton");
            newButton.append(buttonName);
            
            var collectionButton = $("#collectionButton");
            collectionButton.append(newButton);
            
            $(".inputText").val("");
  
        });
        $(document).on("click",".newButton",function() {
            var press=$(this).attr("data-value");
            displayGifs(press);
            console.log(press);
            
        });
        
        // Function that displays all of the gifs
function displayGifs(keyword){
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=NseLriKV7yu8CiRFHqIfP8hW1Y9hfsEk&limit=10";
    console.log(queryURL); // displays the constructed url
    console.log(keyword);
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response) {
        console.log(response); // console test to make sure something returns
        $(".collectionGiphy").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){  //if no data return disply error message
            $(".collectionGiphy").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            $(".collectionGiphy").append("<BR> none exists");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("displayImg");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $(".collectionGiphy").prepend(gifDiv);
        }
    });
};


$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
