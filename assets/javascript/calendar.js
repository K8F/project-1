//add calendar objcet on page load

var eventId=0
var calendar

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var Draggable = FullCalendarInteraction.Draggable;
    var containerEl = document.getElementById('external-events');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events for dorpping events to calendar
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText
            };
        }
    });

    // initialize the calendar object
    // -----------------------------------------------------------------

    calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        defaultView: 'dayGridMonth',
        defaultDate: '2020-01-01',
        height: 500,
        aspectRatio: 1,
        selectable: true,
        unselectAuto: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'All Day Event',
                start: '2020-01-11',
                allDay: true
            },
            {
                title: 'Long Event',
                start: '2020-01-07',
                end: '2020-01-10'
            },

        ],
        editable: true,
        droppable: true,
        drop: function (info) {
            //get row which was dropped into calendar
            var row = info.draggedEl.parentNode;
            var title=row.cells[1].innerHTML

            //get row id from element 3
            var readingId=row.cells[3].innerHTML
            console.log(readingId)
            //increamet eventid
            eventId++

            // is the "remove after drop" checkbox checked?
            if (checkbox.checked) {
                // if so, remove the element from the "Draggable Events" list
                //console.log("test test test")
                //console.log(info.draggedEl.parentNode)
                //console.log(row.cells[1])
                
                //info.draggedEl.parentNode.removeChild(info.draggedEl);
                $(info.draggedEl.parentNode).remove()
                removeReadingList(readingId)
                

            }
            addEvents(title, info.dateStr, info.dateStr, info.allDay,eventId)
        },
        eventClick: function (info) {
            info.jsEvent.preventDefault()
            //info.el.style.borderColor = 'red';
            console.log(info.event)
            $(".closon").on("click", function () {
                console.log("remove")
                info.event.remove()
            })
        },
        eventMouseEnter: function (info) {
            //if (info.view.type == 'timeGridWeek') {
            //  $(info.jsEvent.target).attr('title', info.event.title);
            //}
            //info.event.setProp('backgroundColor', '#00CCFF');
        },
        eventMouseLeave: function (info) {
            //if (info.view.type == 'timeGridWeek') {
            //  $(info.jsEvent.target).attr('title', info.event.title);
            //}
            //info.event.setProp('backgroundColor', 'blue');
        },
        dateClick: function (info) {
            info.jsEvent.preventDefault()
            info.dayEl.className += ' selected';
        },
        eventPositioned: function (info) {
            if (info.isEnd) {
                $(".fc-content").append("<span class='closon'>X</span>")
            }
        },
        //adding event directly on calendar, pops up modal windos
        select: function (info) {
            var title
            eventId++
            $('.event-modal').modal()
            $('.modal-save').on('click', function () {
                //console.log("modal")
                title = $("#event-input").val()
                console.log(title)
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: info.start,
                        end: info.end

                    })
                    console.log(info.start)
                    addEvents(title, info.startStr, info.endStr, info.allDay,eventId)
                }
                $("#event-input").val("")
                $('.modal').modal("hide");

            })

            

        }



    })

     /*calendar.addEvent({
         title:"test",
         start: '2020-01-21',
                allDay: true
     })*/
    calendar.render();



});




