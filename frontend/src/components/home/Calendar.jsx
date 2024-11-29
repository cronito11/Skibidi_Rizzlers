import { useState, useEffect } from 'react';
import './Calendar.css';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import Sidebar from './Sidebar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
const eventsServicePlugin = createEventsServicePlugin();

function Calendar() {
  
  const [events, setEvents] = useState([]);
  const addEvent = (newEvent) => {
    setEvents(prevEvents => {
      eventsServicePlugin.set([...prevEvents, newEvent]); // Updates the calendar with the new event
      return [...prevEvents, newEvent];  // Also update local state for consistency
    });
    console.log("Event Added: ", newEvent);
  };
  

  const modifyEvent = (updatedEvent) => {
    setEvents(prevEvents => {
      const eventId = String(updatedEvent.id);  // Ensure id is a string
      const updatedEvents = {
        ...prevEvents,
        [eventId]: updatedEvent // Use stringified id as the key
      };
  
      eventsServicePlugin.update(updatedEvents);
      return updatedEvents;
    });
  };

  const deletedEvent = (deletedEvent) => {
    setEvents(prevEvents => {
      const eventId = String(deletedEvent.id);  // Ensure id is a string
      const deletedEvents = {
        ...prevEvents,
        [eventId]: deletedEvent // Use stringified id as the key
      };
  
      eventsServicePlugin.remove(deletedEvents);
      return deletedEvents;
    });
  };
  
  

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [createEventModalPlugin(), createDragAndDropPlugin(), eventsServicePlugin],
  });

  return (
    <div className="calendar">
      <div className="calendar-container">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
      <Sidebar addEvent={addEvent} modifyEvent={modifyEvent} events={deletedEvent}/>
    </div>
  );
}
export default Calendar;
