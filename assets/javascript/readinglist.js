//pull books from goodread

$("#search-book").on("click", function () {

    event.preventDefault();
    console.log("on button")
    var newSearch = $("#item-input").val().trim();
    var numOfSearch = $("#number-input").val()
    //var config = {headers: {"X-Requested-With" : "XMLHttpRequest"}};
    //var queryURL = "http://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?" +
    //  "key=PJr6weMgv3J21iNRTVcafQ&q="+newSearch +"&limit=10"

    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + newSearch + "&maxResults=" + numOfSearch

    $.ajax({
        url: queryURL,
        method: "GET"


    })
        .then(function (response) {
            var results = response.items;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
                var title = results[i].volumeInfo.title
                var image = results[i].volumeInfo.imageLinks.smallThumbnail
                var authorList = results[i].volumeInfo.authors
               /* if ("authors" in results.volumeInfo) {
                    var authors = results[i].volumeInfo.authors

                    console.log(authors.length)
                    
                    if (authors.length > 1) {
                        for (var j = 0; j < authors.length; j++) {
                            authorList = authorList + "," + authors[j]
                        }
                    }
                    else {
                        authorList = authors[0]
                    }
                }*/
                var gifDiv = `<tr>
                <td> <img src=${image}></td>
                <td>${title}</td>
                <td >${authorList}</td>                
                <td><input type="checkbox"></td>
                </tr>`
                $(".book-modal .modal-content .table").last().append(gifDiv)
            }
            $('.book-modal').modal()


        })

})