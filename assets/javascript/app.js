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


///firebase call to get current book image
database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
    //console.log(snapshot.val());
    var bookAdded = "No"
    console.log("test book--")
    snapshot.forEach(function (childSnapshot) {
        eventId = childSnapshot.val().eventID
        var completed = childSnapshot.val().completed
        var dueDate = childSnapshot.val().end
        var displayDueDate = moment(dueDate).format("dddd, MMMM Do");
        console.log(completed)
        if (completed == "No" && bookAdded == "No") {
            $("#no-books").hide();
            console.log("image url----" + childSnapshot.val().imgURL)
            var newDiv = `<div id=elementID>
                    <img src=${childSnapshot.val().imgURL} class=img-fluid style="width: 100%"; "height: 100%">
                    <p id=current-id style=display:none>${eventId}</p> 
                    <h5> Due Date:</h5>
                    <p> ${displayDueDate}</p>  
                    </div>`
            $("#book-cover").append(newDiv)
            bookAdded = "Yes"
        }

    });   

});


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
        $("#no-books").show();

    })

    database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
        var bookAdded = "No"
        console.log("test book--")

        snapshot.forEach(function (childSnapshot) {
            eventId = childSnapshot.val().eventID
            isbn = childSnapshot.val().isbn
            var completed = childSnapshot.val().completed
            var dueDate = childSnapshot.val().end
            var displayDueDate = moment(dueDate).format("dddd, MMMM Do");
            console.log(completed)
            if (completed == "No" && bookAdded == "No") {
                $("#no-books").hide();

                console.log("image url----" + childSnapshot.val().imgURL)
                var newDiv = `<div id=elementID>
                        <img src=${childSnapshot.val().imgURL} class=img-fluid style="width: 100%"; "height: 100%">
                        <p id=current-id style=display:none>${eventId}</p> 
                        <h5> Due Date:</h5>
                        <p> ${displayDueDate}</p>  
                        </div>`
                $("#book-cover").append(newDiv)
                bookAdded = "Yes"
            }

        })


    });




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






