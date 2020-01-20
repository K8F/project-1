//db properties



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

//add reading list to db

function addReadingList(imageURL, title, authors, id) {

  database.ref("/readingList").push({
    url: imageURL,
    title: title,
    authors: authors,
    readingId: id,
    dateadded: firebase.database.ServerValue.TIMESTAMP
  });
}


//add event to database
function addEvents(title, startDate, endDate, allDay, id) {
  database.ref("/eventList").push({
    title: title,
    start: startDate,
    end: endDate,
    allDay: allDay,
    eventID: id,
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

///read all data and add to readingList only when page is reloaded

database.ref("/readingList").orderByChild("readingId").once("value", function (snapshot) {
  // console.log(snapshot.val());

  snapshot.forEach(function (childSnapshot) {
    //console.log(childSnapshot.val().url)
    var rowDiv = `<tr>
                        <td>${childSnapshot.val().url}</td>
                        <td class=fc-event>${childSnapshot.val().title}</td>
                        <td>${childSnapshot.val().authors}</td>
                        <td id=readId style=display:none>${childSnapshot.val().readingId}</td>
                         </tr>`
    readingListId = childSnapshot.val().readingId
    $(".reading-list").last().append(rowDiv)

  })
})
console.log("event load")

//add event from database
database.ref("/eventList").orderByChild("eventID").once("value", function (snapshot) {
  //console.log(snapshot.val());

  snapshot.forEach(function (childSnapshot) {
    console.log(childSnapshot.val().url)

    calendar.addEvent({
      title: childSnapshot.val().title,
      start: childSnapshot.val().start,
      end: childSnapshot.val().end,
      allDay: childSnapshot.val().allDay,
      id: childSnapshot.val().eventID

    })
    eventID = childSnapshot.val().eventID
  })
})


