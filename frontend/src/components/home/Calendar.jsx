import { useState, useEffect } from 'react';
import './Calendar.css';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import Sidebar from './Sidebar';
import { createEventsServicePlugin } from '@schedule-x/events-service'

function Calendar() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0]

  const [events, setEvents] = useState([]);
  const addEvent = (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    eventsServicePlugin.add(newEvent); // Updates the calendar with the new event
    
    console.log("Event Added: ", newEvent);
    console.log("Total: ", eventsServicePlugin.getAll());
  };
  

  const modifyEvent = (updatedEvent) => {
    setEvents(prevEvents =>
      prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    eventsServicePlugin.update(updatedEvent); // Update plugin
  };

  const deletedEvent = (deletedEvent) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== deletedEvent.id));
    eventsServicePlugin.remove(deletedEvent); // Update plugin
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

  useEffect(() => {
    // Fetch initial events and set state
    const initialEvents = eventsServicePlugin.getAll();
    setEvents(initialEvents);
  }, [eventsServicePlugin]);

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
