//pull books from google books

var readingListId = 0
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
            //loop thorigh reponse object
            for (var i = 0; i < results.length; i++) {
                var image
                var title = results[i].volumeInfo.title
                var isbn13=results[i].volumeInfo.industryIdentifiers[1].identifier
                //console.log("isbn from modal---"+isbn13)
                if ("imageLinks" in results[i].volumeInfo) {
                    image = results[i].volumeInfo.imageLinks.smallThumbnail
                }
                else { image = "" }
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
                //create new div and add each response index to div and add to modal window
                var gifDiv = `<tr>
                <td> <img src=${image} class="img-fluid" style=width:60px></td>
                <td>${title}</td>
                <td >${authorList}</td>                
                <td><input type="checkbox" class='markFor-reading'></td>  
                <td id=isbn_13_10 style=display:none>${isbn13}</td>               
                </tr>`
                $(".book-modal .modal-content .table").last().append(gifDiv)
            }

            //show modal window, this is bootstrap library
            $('.book-modal').modal()

            //array of all books from the modal window table


            //console.log(tableCheckBox)            
            /* $('.markFor-reading').change(function() {
                 if(this.checked) {
                     console.log(this)
                     var innertext = $(this).parent().next().text();
                     arrayOfValues.push(innertext);
                 }
                 console.log(arrayOfValues)
             });*/

            //logic after use select the book and click on the add to list button in modal window, 
            //add selected books to reading list   

        })

})


$('.modal').on('click', '.book-save', function () {
    var tableCheckBox = $(".book-modal .modal-content .table .markFor-reading")
    //go though all books from the modal window and check checked box value and create new div for reading list addition
    for (var i = 0; i < tableCheckBox.length; i++) {
        if (tableCheckBox[i].checked) {
            readingListId++
            var row = tableCheckBox[i].parentNode.parentNode;
            var cell0 = row.cells[0].innerHTML
            var cell1 = row.cells[1].innerHTML
            var cell2 = row.cells[2].innerHTML
            var cell3= row.cells[4].innerHTML           
            $(cell0).css("width", "40px")

            var rowDiv = `<tr>
            <td>${cell0}</td>
            <td class=fc-event>${cell1}</td>
            <td>${cell2}</td>
            <td><button class="btn btn-secondary btn-sm active removeList">Remove</button></td>
            <td id=readId style=display:none>${readingListId}</td>   
            <td id=isbn_13_10 style=display:none>${cell3}</td>          
             </tr>`
            console.log(row.cells[0].innerText)
            $(".reading-list").last().append(rowDiv)

            //update database with readinglist

            addReadingList(cell0, cell1, cell2, readingListId,cell3)
        }
    }
    //empty query string
    $("#item-input").val("")
    //close modal window, this is bootstrap library
    $('.book-modal').modal("hide")
    //while closing modal windo emopty previous book list from the modal window
    $('.book-modal').on('hidden.bs.modal', function () {
        $('.book-modal .modal-content .table > tbody').remove();
    })
})
//remove reading list on remove button press
$(".reading-list").on("click", ".removeList", function (event) {
    event.preventDefault();  
    var listNum = $(this)[0].parentNode.parentNode.cells[4].innerHTML
    removeReadingList(listNum)
    $(this)[0].parentNode.parentNode.remove()
    console.log(listNum)
    //anotehr way to select row and columns for that row
    //var row = $(this).closest("tr"),        // Finds the closest row <tr> 
    //tds = row.find("td"); // find all tds for tr
    //console.log(row)

    // $.each($(tds), function () {               // Visits every single <td> element
    //console.log("----" + $(this).text());        // Prints out the text within the <td>
    //});

    //update databse and remove train

})
