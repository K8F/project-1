
//current book
    //when a book is in progress on the calendar, book image is appended to the frontpage #book-cover
    //on click, book goes to newly rendered page with samples from the current book reading
    //when reader finishes book, message pops up: "you are done! yay!"
    //if a new book is already queued , message goes away and book shows up
    //else if message added: "stay posted! a new book will be on the list soon"


//book wishlist    
    //student can search for book
    //renders 3 results automatically
    //on click-- list shows up
    //student selects books they want to add to wishlist
    //when student submits books they are added to the backend
        // var readingListId = 0
        // $("#search-book").on("click", function () {
        
        //     event.preventDefault();
        //     console.log("on button")
        //     var newSearch = $("#item-input").val().trim();
        //     var numOfSearch = 5;
        
        //     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + newSearch + "&maxResults=" + numOfSearch
        
        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        
        
        //     })
        //         .then(function (response) {
        //             var results = response.items;
        //             console.log(results)
        //             //loop thorigh reponse object
        //             for (var i = 0; i < results.length; i++) {
        //                 var image
        //                 var title = results[i].volumeInfo.title
        //                 if ("imageLinks" in results[i].volumeInfo) {
        //                     image = results[i].volumeInfo.imageLinks.smallThumbnail
        //                 }
        //                 else { image = "" }
        //                 var authorList = results[i].volumeInfo.authors
                    
        //                 var gifDiv = `<tr>
        //                 <td> <img src=${image} class="img-fluid" style=width:60px></td>
        //                 <td>${title}</td>
        //                 <td >${authorList}</td>                
        //                 <td><input type="checkbox" class='markFor-reading'></td>                
        //                 </tr>`
        //                 $(".book-modal .modal-content .table").last().append(gifDiv)
        //             }
        
        //             //show modal window, this is bootstrap library
        //             $('.book-modal').modal()
        
        //             //array of all books from the modal window table
        
        
        //             //console.log(tableCheckBox)            
        //             /* $('.markFor-reading').change(function() {
        //                 if(this.checked) {
        //                     console.log(this)
        //                     var innertext = $(this).parent().next().text();
        //                     arrayOfValues.push(innertext);
        //                 }
        //                 console.log(arrayOfValues)
        //             });*/
        
        //             //logic after use select the book and click on the add to list button in modal window, 
        //             //add selected books to reading list   
        
        //         })
        
        // })
        
        
        // $('.modal').on('click', '.book-save', function () {
        //     var tableCheckBox = $(".book-modal .modal-content .table .markFor-reading")
        //     //go though all books from the modal window and check checked box value and create new div for reading list addition
        //     for (var i = 0; i < tableCheckBox.length; i++) {
        //         if (tableCheckBox[i].checked) {
        //             readingListId++
        //             var row = tableCheckBox[i].parentNode.parentNode;
        //             var cell0 = row.cells[0].innerHTML
        //             var cell1 = row.cells[1].innerHTML
        //             var cell2 = row.cells[2].innerHTML
        //             $(cell0).css("width", "40px")
        
        //             var rowDiv = `<tr>
        //             <td>${cell0}</td>
        //             <td class=fc-event>${cell1}</td>
        //             <td>${cell2}</td>
        //             <td><button class="btn btn-secondary btn-sm active removeList">Remove</button></td>
        //             <td id=readId style=display:none>${readingListId}</td>            
        //             </tr>`
        //             console.log(row.cells[0].innerText)
        //             $(".reading-list").last().append(rowDiv)
        
        //             //update database with readinglist
        
        //             addReadingList(cell0, cell1, cell2, readingListId)
        //         }
        //     }
        //     //empty query string
        //     $("#item-input").val("")
        //     //close modal window, this is bootstrap library
        //     $('.book-modal').modal("hide")
        //     //while closing modal windo emopty previous book list from the modal window
        //     $('.book-modal').on('hidden.bs.modal', function () {
        //         $('.book-modal .modal-content .table > tbody').remove();
        //     })
        // });