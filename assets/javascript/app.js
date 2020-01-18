/* Javascript/Jquery for tracking status */

/*Declare arrays for book lists */
var originalList =["book1", "book2", "book3"]; /*will list books on the left hand side of page */
var booksRead = ["book1", "book2"];
var booksRemaining =[];
var bookCount = 0;
var bookList = 10;
var bookPercentage = 0;

/*function for copying originalList into booksRemaining*/
booksRemaining = originalList.slice(0);

/* On click function for Finished Book */
$("#finishedBook").click(function () {
    moveBookToCompletedList();
    bookCount++;
    bookPercentage = (bookCount*100/10).toFixed(2);
  }); 

/* Function for displaying Book Count */
function showCount() {
    $("#status-tracking").append("<br><h5>Book Count: " + bookCount + "</h5></br>");
    $("#status-tracking").append("<br><h5>Percent Complete: " + bookPercentage + "</h5></br>")
}

/* function moving book from Remaining to Read list  */ 
function moveBookToCompletedList(arr, booksRemaining, booksRead) {
    if (booksRead >= arr.length) {
        var k = booksRead - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(booksRead, 0, arr.splice(booksRemaining, 1)[0]);
    return arr; 
};

/* Convert arrays into colums */
function writeArrays() {
for (var i =0; i<booksRemaining.length; i++) {
    $("#books-remaining").append("<br> " + booksRemaining[i] +"</br>");
}
for (var i =0; i<booksRead.length; i++) {
    $("#books-read").append("<br> " + booksRead[i] +"</br>");    

}

}

//move index 1(b) to index 2(c)
/* console.log(moveArrayItemToNewIndex(["a","b","c","d"], 1, 2)); // returns ["a", "c", "b", "d"] */

/* print changes to html */
showCount();
writeArrays();

