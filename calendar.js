document.addEventListener('DOMContentLoaded', function () {
    // Initialize FullCalendar
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: [] // You can load events dynamically or leave it empty for now
    });

    // Event form submission
    $('#eventForm').submit(function (event) {
        event.preventDefault();

        const title = $('#eventTitle').val();
        const date = $('#eventDate').val();

        if (title && date) {
            $('#calendar').fullCalendar('renderEvent', {
                title: title,
                start: date,
                allDay: true
            }, true);

            $('#eventTitle').val('');
            $('#eventDate').val('');
        }
    });

    // Background form submission
    $('#backgroundForm').submit(function (event) {
        event.preventDefault();

        const imageUrl = $('#backgroundImage').val();

        if (imageUrl) {
            $('body').css('background-image', `url(${imageUrl})`);
            $('#backgroundImage').val('');
        }
    });
});
