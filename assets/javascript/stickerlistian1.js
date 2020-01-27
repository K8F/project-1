var stickerListId = 0


$('.modal').on('click', '.sticker-save', function () {
    var tableCheckBox = $(".sticker-modal .modal-content .table .markFor-stickers")
    //go though all books from the modal window and check checked box value and create new div for sticker list addition
    for (var i = 0; i < tableCheckBox.length; i++) {
        if (tableCheckBox[i].checked) {
            stickerListId++
            var sticks = tableCheckBox[i].parentNode.parentNode;
            var stick1 = sticks.cells[0].innerHTML
            $(stick1).css("width", "40px")

            var sticksDiv = `<tr>
            <td>${stick1}</td>
            <td id=stickId style=display:none>${stickerListId}</td>        
            </tr>`
            console.log(sticks.cells[0].title)
            console.log(sticksDiv)
            $(".sticker-list").last().append(stick1)

            //update database with stickerlist
            addStickerList(stick1, stickerListId)
        }
    }
    //empty query string
    $("#item-input").val("")
    //close modal window, this is bootstrap library
    $('.sticker-modal').modal("hide")
    //while closing modal windo emopty previous book list from the modal window
    $('.sticker-modal').on('hidden.bs.modal', function () {
        $('.sticker-modal .modal-content .table > tbody').remove();
    })
})


//sticket storage to db

//add stickerList to db
function addStickerList(imageURL, id) {
    database.ref("/stickersdb01279").push({
        url: imageURL,
        stickerId: id,
        dateadded: firebase.database.ServerValue.TIMESTAMP
    });
}


//sticker read

///read all data and add to stickerList only when page is reloaded
database.ref("/stickersdb01279").orderByChild("stickerId").once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var rowDiv = childSnapshot.val().url
        // `<tr>
        //                     <td>${childSnapshot.val().url}</td>
        //                     <td id=stickId style=display:none>${childSnapshot.val().stickerId}</td>
        //                      </tr>`
        stickerListId = childSnapshot.val().stickerId
        $(".sticker-list").last().append(rowDiv)
    })
})
