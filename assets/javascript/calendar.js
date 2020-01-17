document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var Draggable = FullCalendarInteraction.Draggable;
    var containerEl = document.getElementById('external-events');

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
        height: 700,
        selectable: true,
        unselectAuto: true,
        dateClick: function (info) {
            info.jsEvent.preventDefault()            
            info.dayEl.className += ' selected';
        },


        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'All Day Event',
                start: '2020-01-11'
            },
            {
                title: 'Long Event',
                start: '2020-01-07',
                end: '2020-01-25'
            },

        ],
        editable: true,
        droppable: true,
        drop: function(info) {
            // is the "remove after drop" checkbox checked?
            console.log("checked")
            if ($("#drop-remove").checked) {
              // if so, remove the element from the "Draggable Events" list
              console.log("checked")
              info.draggedEl.parentNode.removeChild(info.draggedEl);
            }
          },
        eventClick: function (info) {
            info.jsEvent.preventDefault()            
            info.el.style.borderColor = 'red';            
        },    


    })

    calendar.render();



});




