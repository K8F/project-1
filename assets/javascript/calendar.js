//add calendar objcet on page load

var eventId = 0
var calendar
var vstart
var vend
var vallDay
var vdateStr
var vtitle
var visbn

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
        //defaultDate: '2020-01-01',
        height: 500,
        aspectRatio: 1,
        selectable: true,
        //unselectAuto: true,
        eventColor: '#967bb6',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        /*events: [
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

        ],*/
        editable: true,
        droppable: true,
        drop: function (info) {
            //get row which was dropped into calendar
            var row = info.draggedEl.parentNode;
            vtitle = row.cells[1].innerHTML
            visbn = row.cells[5].innerHTML
            console.log("isbn---"+visbn)
            //get row id from element 3
            //var readingId = row.cells[3].innerHTML

            vdateStr = info.dateStr
            

            // is the "remove after drop" checkbox checked?
            if (checkbox.checked) {
                // if so, remove the element from the "Draggable Events" list                
                $(info.draggedEl.parentNode).remove()
                removeReadingList(readingId)
            }

            //addEvents(title, info.dateStr, info.dateStr, info.allDay, eventId)
            //console.log("event external dropped---" + eventId)


        },
        //set dropped event id
        eventReceive: function (info) {
            //console.groupCollapsed("event received--refresh page")
            // console.groupCollapsed("event received--refresh page"+info.event.id)
            eventId++
            var allDay = info.event.allDay
            //console.log("eventreceive title--" + vdateStr)
            info.event.remove()

            calendar.addEvent({
                title: vtitle,
                start: vdateStr,
                end: vdateStr,
                allDay: vallDay,
                id: eventId                
            
            })
            addEvents(vtitle, vdateStr, vdateStr, allDay, eventId,visbn)
            //window.location.reload(true);
            
        },
        eventClick: function (info) {
            info.jsEvent.preventDefault()
            //info.el.style.borderColor = 'red';
            console.log("eventclick " + info.event)
            $(".closon").on("click", function () {
                console.log("remove " + info.event.id)
                removeEventList(info.event.id)
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
        eventDrop: function (info) {
            console.log("event dragged and dropped---" + info.event.id)

            updateEventList(info.event.id, info.event.start, info.event.end, info.event.allDay, info.event.title)

            console.log("event drag drop event info:" + info.event.start)
        },
        eventResize: function (info) {
            console.log("event resized---" + info.event.id)

            updateEventList(info.event.id, info.event.start, info.event.end, info.event.allDay, info.event.title)

            console.log("event resize event info:" + info.event.start)

        },
        //adding event directly on calendar, pops up modal window
        select: function (info) {
            console.log('selected ' + info.startStr + ' to ' + info.endStr)
            vstart = info.startStr
            vend = info.endStr
            vallDay = info.allDay

            //open modal window
            $('.event-modal').modal()
            //unselect calendar
            calendar.unselect()
            //console.log("end of add event --------")
            // alert('selected ' + info.startStr + ' to ' + info.endStr);

            console.log("select info" + info)
        }
    })

    //use one event to avoid mutiple time event firing
    $('.modal').on('click', '.modal-save', function (event) {
        event.preventDefault();
        var title
        //increment event id
        eventId++
        //console.log(event)       
        //console.log("in modal window count: "+modalcounter)
        title = $("#event-input").val().trim()
        if (title) {
            calendar.addEvent({
                title: title,
                start: vstart,
                end: vend,
                allDay: vallDay,
                id: eventId

            })
            //console.log(info.start)
            visbn=""
            addEvents(title, vstart, vend, vallDay, eventId,visbn)
            //reset globasl variable
            vstart = ""
            vend = "'"
            vallDay = ""


        }

        $(".event-modal").modal("hide");
        $(".event-modal").on('hidden.bs.modal', function () {
            $("#event-input").val("")
            $(this).removeData();
        })


    })

    //render calendar
    calendar.render();

});







