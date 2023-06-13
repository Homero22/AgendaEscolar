import { Component, ChangeDetectorRef } from '@angular/core';

<<<<<<< HEAD
// import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
// import interactionPlugin from '@fullcalendar/interaction';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import { createEventId } from './event-utils';

=======
>>>>>>> c46691cdba359dd006d72ab7ca41ad7a8489d9ff
@Component({
  selector: 'app-horario-page',
  templateUrl: './horario-page.component.html',
  styles: [
  ]
})
<<<<<<< HEAD
  export class HorarioPageComponent {

    // calendarVisible = true;
    // calendarOptions: CalendarOptions = {
    //   plugins: [
    //     interactionPlugin,
    //     dayGridPlugin,
    //     timeGridPlugin,
    //     listPlugin,
    //   ],
      // headerToolbar: {
      //   // left: 'prev,next today',
      //   center: 'title',
      //   right: 'timeGridWeek'
      // },
      // initialView: 'timeGridWeek',
      // // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      // weekends: true,
      // editable: true,
      // selectable: true,
      // selectMirror: true,
      // dayMaxEvents: true,
      // select: this.handleDateSelect.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      // eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    // };
    // currentEvents: EventApi[] = [];

    // constructor(private changeDetector: ChangeDetectorRef) {
    // }
    // // Para que el calendario desapareza
    // handleCalendarToggle() {
    //   this.calendarVisible = !this.calendarVisible;
    // }

    // // Para quitar los fines de semana
    // handleWeekendsToggle() {
    //   const { calendarOptions } = this;
    //   calendarOptions.weekends = !calendarOptions.weekends;
    // }

    // handleDateSelect(selectInfo: DateSelectArg) {
    //   const title = prompt('Please enter a new title for your event');
    //   const calendarApi = selectInfo.view.calendar;

    //   calendarApi.unselect(); // clear date selection

    //   if (title) {
    //     calendarApi.addEvent({
    //       id: createEventId(),
    //       title,
    //       start: selectInfo.startStr,
    //       end: selectInfo.endStr,
    //       allDay: selectInfo.allDay
    //     });
    //   }
    // }

    // handleEventClick(clickInfo: EventClickArg) {
    //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove();
    //   }
    // }

    // handleEvents(events: EventApi[]) {
    //   this.currentEvents = events;
    //   this.changeDetector.detectChanges();
    // }

    // ngOnInit(): void {

    //   this.calendarVisible = true;
    // }
=======
export class HorarioPageComponent {
>>>>>>> c46691cdba359dd006d72ab7ca41ad7a8489d9ff

}
