$(document).ready(function(){

    //array of celebration gifs
    var congratsGif= ["Reading Rainbow", "Arthur", "Harley Quinn"]

  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reading + "&api_key=GbRihUv0Hb08GrTIBghIXh1vFSkQWBxt&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "Get"
        })


});