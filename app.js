function bookSearch() {
    var search = document.getElementById('search').value
    document.getElementById('results').innerHTML = ""
    console.log(search)
    
    $.ajax({
        url: "http:/www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",

        success: function (data) {
            for (i = 0; i < data.items.length; i++){
        results.innerHTML +="<h2>" + data.items[i].volumeInfo.title + "</h2>"
            }
        },
        type: 'GET'
    });
}

document.getElementById('button').addEventlistener('click', bookSearch, false)






    //var unirest = require("unirest");

    //var req = unirest("POST", "https://googlebooksraygorodskijv1.p.rapidapi.com/getVolumeBySearchQuery");

    //req.headers({
      //  "x-rapidapi-host": "GoogleBooksraygorodskijV1.p.rapidapi.com",
        //"x-rapidapi-key": "50e9c4785bmsh85954b7e77fc930p15268ejsnf106fff72855",
        //"content-type": "application/x-www-form-urlencoded"
   // });
    
    //req.form({});
    //"searchQuery": "getVolumeBySearchQuery"

    //req.end(function (res) {
      //  if (res.error) throw new Error(res.error);

        //console.log(res.body);
    //});
       
    
    







