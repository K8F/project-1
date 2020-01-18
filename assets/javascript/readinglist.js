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
                <td> <img src=${image} class="img-fluid" style=width:40px></td>
                <td>${title}</td>
                <td >${authorList}</td>                
                <td><input type="checkbox" class='markFor-reading'></td>
                </tr>`
                $(".book-modal .modal-content .table").last().append(gifDiv)
            }
            $('.book-modal').modal()
            var tableCheckBox = $(".book-modal .modal-content .table .markFor-reading")
            console.log(tableCheckBox)
            var arrayOfValues = [];
            /* $('.markFor-reading').change(function() {
                 if(this.checked) {
                     console.log(this)
                     var innertext = $(this).parent().next().text();
                     arrayOfValues.push(innertext);
                 }
                 console.log(arrayOfValues)
             });*/
            $('.book-save').on('click', function () {
                for (var i = 0; i < tableCheckBox.length; i++) {
                    if (tableCheckBox[i].checked) {
                        var row = tableCheckBox[i].parentNode.parentNode;
                        var cell0 = row.cells[0].innerHTML
                        var cell1 = row.cells[1].innerHTML
                        var cell2 = row.cells[2].innerHTML
                        $(cell0).css("width", "40px")
                        
                        var rowDiv = `<tr>
                        <td>${cell0}</td>
                        <td class=fc-event>${cell1}</td>
                        <td>${cell2}</td>
                         </tr>`
                        console.log(row.cells[0].innerText)
                        $(".reading-list").last().append(rowDiv)
                    }
                }
                $("#item-input").val("")
                $('.book-modal').modal("hide");
            })


        })

})