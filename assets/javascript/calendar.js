document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var Draggable = FullCalendarInteraction.Draggable;
    var containerEl = document.getElementById('external-events');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events
    // -----------------------------------------------------------------

    new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.innerText
            };
        }
    });

    // initialize the calendar
    // -----------------------------------------------------------------

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        defaultView: 'dayGridMonth',
        defaultDate: '2020-01-01',
        height: 400,
        aspectRatio: 2,
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
                allDay:true
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
            // is the "remove after drop" checkbox checked?
            console.log("checked")
            if (checkbox.checked) {
                // if so, remove the element from the "Draggable Events" list
                console.log(info.draggedEl.parentNode)
                //info.draggedEl.parentNode.removeChild(info.draggedEl);
                $(info.draggedEl.parentNode).remove()
            }
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
        select: function (info) {
            var title
            $('.event-modal').modal()
            $('.modal-save').on('click', function () {
                //console.log("modal")
                title = $("#event-input").val()
                //console.log(title)
                if (title) {
                    calendar.addEvent({
                        title: title,
                        start: info.start,
                        end: info.end
                    })
                }
                $('.modal').modal("hide");

            })

                     

        }



    })

    calendar.render();



});




