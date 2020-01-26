//psuedo code
//===============================================================================
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
//==============================================================================
/*
var currentBook;//whichever book is currently being read, based on time
var image=results[i].volumneinfo.imagelinks.thumbnail


var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + currentBook + "&maxResults=" + numOfSearch

    $.ajax({
        url: queryURL,
        method: "GET"


    })

//display current book
var currentBook=0//grab book from firebase
var bookRead=false;//by default assumes book is not read

for (i = 0; i < currentBook.length; i++) {
    
    if (bookRead=true){//if book is completed, go to the next book
        i++;
    }

    else{
        var showBook=$('<div>');
        showBook.addClass('show-book')

        var img = '<img class="" 'src=' + currentBook[i].volumeInfo.imageLinks.Thumbnail>'


    }

    }  
  
*/




//book wishilist
//student can search for a book, on-click--list shows up
//student sleects the book(s) they want to add to the wishlist
// var readingListId
// ​
//define databse
var config = {
    apiKey: "AIzaSyAhyTxSPD8112Yez11tgNMcizelr1YUOdY",
    authDomain: "class-d282a.firebaseapp.com",
    databaseURL: "https://class-d282a.firebaseio.com",
    projectId: "class-d282a",
    storageBucket: "class-d282a.appspot.com",
    messagingSenderId: "631653290831",
    appId: "1:631653290831:web:1af5b714141ec17310ab3a",
    measurementId: "G-3K1R5SSWYR"
};

//initialize database

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

console.log(database)
// ​
// //pull books from google books
// ​
// var readingListId = 0
// $("#search-book").on("click", function () {
// ​
//     event.preventDefault();
//     console.log("on button")
//     var newSearch = $("#item-input").val().trim();
//     var numOfSearch = $("#number-input").val()
// ​
//     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + newSearch + "&maxResults=" + numOfSearch
// ​
//     $.ajax({
//         url: queryURL,
//         method: "GET"
// ​
// ​
//     })
//         .then(function (response) {
//             var results = response.items;
//             console.log(results)
//             //loop thorigh reponse object
//             for (var i = 0; i < results.length; i++) {
//                 var image
//                 var title = results[i].volumeInfo.title
//                 var isbn13=results[i].volumeInfo.industryIdentifiers[1].identifier
//                 //console.log("isbn from modal---"+isbn13)
//                 if ("imageLinks" in results[i].volumeInfo) {
//                     image = results[i].volumeInfo.imageLinks.smallThumbnail
//                 }
//                 else { image = "" }
//                 var authorList = results[i].volumeInfo.authors

//                 //create new div and add each response index to div and add to modal window
//                 var gifDiv = `<tr>
//                 <td> <img src=${image} class="img-fluid" style=width:60px></td>
//                 <td>${title}</td>
//                 <td >${authorList}</td>                
//                 <td><input type="checkbox" class='markFor-reading'></td>  
//                 <td id=isbn_13_10 style=display:none>${isbn13}</td>               
//                 </tr>`
//                 $(".book-modal .modal-content .table").last().append(gifDiv)
//             }
// ​
//             //show modal window, this is bootstrap library
//             $('.book-modal').modal()
// ​
//             //array of all books from the modal window table
//             //logic after use select the book and click on the add to list button in modal window, 
//             //add selected books to reading list   
// ​
//         })
// ​
// })
// ​
// //on button click in modal window callback
// $('.modal').on('click', '.book-save', function () {

//     var tableCheckBox = $(".book-modal .modal-content .table .markFor-reading")
//     //go though all books from the modal window and check checked box value and create new div for reading list addition
//     for (var i = 0; i < tableCheckBox.length; i++) {
//         if (tableCheckBox[i].checked) {
//             readingListId++;
//             var row = tableCheckBox[i].parentNode.parentNode;
//             var cell0 = row.cells[0].innerHTML
//             var cell1 = row.cells[1].innerHTML
//             var cell2 = row.cells[2].innerHTML
//             var cell3= row.cells[4].innerHTML 
//             //update database with readinglist
//             addReadingList(cell0, cell1, cell2, readingListId,cell3)
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
// ​
// ​
// ///read last record from firebase to get last readingId
// ​
// database.ref("/readingList").orderByChild("readingId").limitToLast(1).once("value", function (snapshot) {
//     // console.log(snapshot.val());

//     snapshot.forEach(function (childSnapshot) {
//              //console.log(childSnapshot.val().url)   
//       readingListId = childSnapshot.val().readingId


//     })
//   })
// //add reading list to database
//   function addReadingList(imageURL, title, authors, id,isbn) {
//     database.ref("/readingList").push({
//       url: imageURL,
//       title: title,
//       authors: authors,
//       readingId: id,
//       isbn:isbn,
//       dateadded: firebase.database.ServerValue.TIMESTAMP
//     });
//   }




    ///firebase call to get current book image
    database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
        //console.log(snapshot.val());
        var bookAdded = "No"
        console.log("test book--")
        snapshot.forEach(function (childSnapshot) {
            eventId = childSnapshot.val().eventID
            var completed = childSnapshot.val().completed
            console.log(completed)
            if (completed == "No" && bookAdded == "No") {
                console.log("image url----" + childSnapshot.val().imgURL)
                var newDiv = `<div>
       <img src=${childSnapshot.val().imgURL} class=img-fluid style="width: 100%"; "height: 100%">
       <p id=current-id style=display:none>${eventId}</p> 
       </div>`
                $("#book-cover").append(newDiv)
                bookAdded = "Yes"

            }
        })
    })


    $("#finished-book").on("click", function () {

        event.preventDefault();
        var currentId = $("#current-id").text()

        console.log("id--------" + currentId);
        var queryRef = database.ref("/eventList").orderByChild("eventID").equalTo(parseInt(currentId));

        queryRef.once('value', function (snapshot) {
            console.log(snapshot.val())
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val().eventID;
                console.log(childKey + " " + childData)
                database.ref("/eventList").child(childKey).update({
                    completed: "Yes",
                    dateaUpdated: firebase.database.ServerValue.TIMESTAMP
                })
            })

            $("#book-cover").empty()
        })

        database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
            var bookAdded = "No"
            console.log("test book--")
            snapshot.forEach(function (childSnapshot) {
                eventId = childSnapshot.val().eventID
                var completed = childSnapshot.val().completed
                console.log(completed)
                if (completed == "No" && bookAdded == "No") {
                    console.log("image url----" + childSnapshot.val().imgURL)
                    var newDiv = `<div>
       <img src=${childSnapshot.val().imgURL} class=img-fluid style="width: 100%"; "height: 100%">
       <p id=current-id style=display:none>${eventId}</p> 
       </div>`
                    $("#book-cover").append(newDiv)
                    bookAdded = "Yes"

                }
            })
        })


        ///pull gif


        console.log("on button")
        //var newSearch = $("#item-input").val().trim();

        var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + "emoji" + "&api_key=7yWWp89zKr3OvZfcBlWP0GZ6POxKBpIg&rating=G&limit=15&tag=happy";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results)
                //loop thorigh reponse object
                for (var i = 0; i < results.length; i++) {
                    var image
                    console.log("in loop---")
                    if ("fixed_height_still" in results[i].images) {
                        image = results[i].images.fixed_height_still.url
                    }
                    else { image = "" }
                    //create new div and add each response index to div and add to modal window
                    var gifDiv = `<tr>
                        <td> <img src=${image} class="img-fluid" style=width:60px></td>             
                        <td><input type="radio" class='markFor-stickers'></td>              
                        </tr>`
                    $(".sticker-modal .modal-content .table").last().append(gifDiv)
                }
                //show modal window, this is bootstrap library
                $('.sticker-modal').modal()
                //allow only one sticker to be selected
                $("input:radio").click(function () {
                    var bol = $("input:radio:checked").length >= 1;
                    $("input:radio").not(":checked").attr("disabled", bol);
                });
            })


    })




