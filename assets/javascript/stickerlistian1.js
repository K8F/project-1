var stickerListId = 0
/*$("#finished-book").on("click", function () {

    event.preventDefault();
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
                //console.log("isbn from modal---"+isbn13)
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
            $("input:radio").click(function() {
                var bol = $("input:radio:checked").length >= 1;     
                $("input:radio").not(":checked").attr("disabled",bol);
                });
        })
})*/

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


database.ref("/stickersdb01253").orderByChild("stickerId").once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var rowDiv = childSnapshot.val().url
      
      /*`<tr>
                          <td>${childSnapshot.val().url}</td>
                          <td id=stickId style=display:none>${childSnapshot.val().stickerId}</td>
                           </tr>`*/
      stickerListId = childSnapshot.val().stickerId
      $(".sticker-list").last().append(rowDiv)
    })
  })
