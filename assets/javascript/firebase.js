//db properties

var config = {
  apiKey: "AIzaSyCfdeBT5mxosBZIEwWBryEkCW1vct0xOrc",
  authDomain: "class-d1b90.firebaseapp.com",
  databaseURL: "https://class-d1b90.firebaseio.com",
  projectId: "class-d1b90",
  storageBucket: "class-d1b90.appspot.com",
  messagingSenderId: "150993905646",
  appId: "1:150993905646:web:8e131f8d6c852abe0bd0ff",
  measurementId: "G-515WJ1WC1M"
};

//initialize database

firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();

//add reading list to db

function addReadingList(imageURL, title, authors, id,isbn) {
  database.ref("/readingList").push({
    url: imageURL,
    title: title,
    authors: authors,
    readingId: id,
    isbn:isbn,
    dateadded: firebase.database.ServerValue.TIMESTAMP
  });
}


//add event to database
function addEvents(title, startDate, endDate, allDay, id,isbn) {
  database.ref("/eventList").push({
    title: title,
    start: startDate,
    end: endDate,
    allDay: allDay,
    eventID: id,  
    isbn:isbn,     
    dateadded: firebase.database.ServerValue.TIMESTAMP
  });
}



//delete reading list from db after moved to calendar if remove on check flag is checked
function removeReadingList(id) {
  console.log("readingid" + id)
  var queryRef = database.ref("/readingList").orderByChild("readingId").equalTo(parseInt(id));
  queryRef.once('value', function (snapshot) {
    console.log(snapshot.val())
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val().readingId;
      console.log(childKey + " " + childData)
      database.ref("/readingList").child(childKey).remove();
    })
  })

}


//remove event from db once deleted from calendar
function removeEventList(id) {
  var queryRef = database.ref("/eventList").orderByChild("eventID").equalTo(parseInt(id));
  queryRef.once('value', function (snapshot) {
    console.log(snapshot.val())
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val().readingId;
      console.log(childKey + " " + childData)
      database.ref("/eventList").child(childKey).remove();
    })

  })

}


///update event after resized on calendar
function updateEventList(id, startDate, endDate, allDay, title) {
  var queryRef = database.ref("/eventList").orderByChild("eventID").equalTo(parseInt(id));
  console.log("update event---" + id + " " + startDate + endDate + allDay + title)
  queryRef.once('value', function (snapshot) {
    console.log(snapshot.val())
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val().readingId;
      console.log(childKey + " " + childData)
      database.ref("/eventList").child(childKey).update({
        title: title,
        start: startDate,
        end: endDate,
        allDay: allDay,        
        dateaUpdated: firebase.database.ServerValue.TIMESTAMP
      })
    })
  })
}



///read all data and add to readingList only when page is reloaded

database.ref("/readingList").orderByChild("readingId").once("value", function (snapshot) {
  // console.log(snapshot.val());

  snapshot.forEach(function (childSnapshot) {
    //console.log(childSnapshot.val().url)
    var rowDiv = `<tr>
                        <td>${childSnapshot.val().url}</td>
                        <td class=fc-event>${childSnapshot.val().title}</td>
                        <td>${childSnapshot.val().authors}</td>
                        <td><button class="btn btn-secondary btn-sm active removeList">Remove</button></td>
                        <td id=readId style=display:none>${childSnapshot.val().readingId}</td>
                        <td id=isbn_13_10 style=display:none>${childSnapshot.val().isbn}</td>  
                         </tr>`
    readingListId = childSnapshot.val().readingId
    $(".reading-list").last().append(rowDiv)

  })
})
//console.log("event load")

//add event from database only when page is reloaded
database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
  //console.log(snapshot.val());

  snapshot.forEach(function (childSnapshot) {
    calendar.addEvent({
      title: childSnapshot.val().title,
      start: childSnapshot.val().start,
      end: childSnapshot.val().end,
      allDay: childSnapshot.val().allDay,
      id: childSnapshot.val().eventID      
    })
    eventId = childSnapshot.val().eventID
  })
})