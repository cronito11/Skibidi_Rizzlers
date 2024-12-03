import { useState, useEffect } from 'react';
import './Calendar.css';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import Sidebar from './Sidebar';
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { parse } from 'date-fns';

function calendarToDb(calendarFormat)
{
  var data = {
    title: calendarFormat.title,
    description: calendarFormat.description,
    startDate :calendarFormat.start,
    endDate : calendarFormat.end,
};
  return data;
}

function stringToDate(date)
{
  return parse(date, "yyyy-MM-dd HH:mm", new Date());
}

function dateToString(date)
{
  return parse (date, "yyyy-MM-dd HH:mm");
}

function Calendar() {
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    calendarID: ""
  });

  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0]

  const [events, setEvents] =  useState([]);
  const addEvent = async (newEvent) => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
    eventsServicePlugin.add(newEvent); // Updates the calendar with the new event
    const updatedCalendarInfo = 
      calendarToDb(newEvent)
    ;
    
    try {
      const url = `http://localhost:8080/calender/api/calendar/${userInfo.calendarID}/task/`;
      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCalendarInfo),
      });
      console.log(url+" - "+JSON.stringify(updatedCalendarInfo));

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        console.log("Saved")
      } else if (error) {
        const details = error?.details[0].message;
        alert(details);
      } else if (!success) {
        alert(message);
      }
      console.log(result);
    }catch (ex)
    {

    }
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
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

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
