/**Display gif function that includes AJAX request**/
function displaySticker(){
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
}
