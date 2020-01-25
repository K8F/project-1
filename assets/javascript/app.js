/* ORIGINAL PAGE FOR STORING BOOKS AND TRACKING PROGRESS */
/* Javascript/Jquery for tracking status */

	/*Declare arrays for book lists */
	var originalList =["book1", "book2", "book3"]; /*will list books on the left hand side of page */
	var booksRead = ["book1", "book2"];
	var booksRemaining =[];
	var bookCount = 0;
	var bookList = 10;
	var bookPercentage = 0;
	
	/* Function for displaying Book Count */
	$("#book-count").text("Book Count: " + bookCount);
	$("#book-percentage").text("Percent Read: " + bookPercentage + "%");
	
	/*function for copying originalList into booksRemaining*/
	booksRemaining = originalList.slice(0);
	
	/* On click function for Finished Book */
	$("#finished-book").click(function () {
		moveBookToCompletedList(); 
		updateCount();
		console.log("test");
		console.log(bookCount);
	  }); 
	
	/* function for updating status */
	function updateCount() {
		bookCount++;
		bookPercentage = (bookCount*100/bookList).toFixed(2); 
		$("#book-count").text("Book Count: " + bookCount);
		$("#book-percentage").text("Percent Read: " + bookPercentage + "%");
		/*add book count to db 
		addBookCount(bookCount, bookPercentage); */
	} 
	
	/* function moving book from Remaining to Read list  */ 
	function moveBookToCompletedList() {
		if (booksRead >= originalList.length) {
			var k = booksRead - originalList.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}
		originalList.splice(booksRead, 0, originalList.splice(booksRemaining, 1)[0]);
		return booksRead; 
		/* booksRead.push(); */
	};
	
	/* Convert arrays into colums */
	function writeArrays() {
	 /*for (var i =0; i<booksRemaining.length; i++) {
		$("#books-remaining").append("<br> " + booksRemaining[i] +"</br>");
	} */
	for (var i =0; i<booksRead.length; i++) {
		$("#books-read").append("<br> " + booksRead[i] +"</br>");    
	
	}
	}
	
	/* print changes to html */
	/* showCount(); */
	writeArrays();
	
