import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 4,
    time: "1pm",
    interview: {
      student: "Kobe Bryant",
      interviewer: {
        id: 1,
        name: "Lebron James",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Albert Einstein",
      interviewer: {
        id: 1,
        name: "Joe Rogan",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {

  const [currentDay, setCurrentDay] = useState("Monday");

  const listOfAppointments = appointments.map((appointment)=>{
    return (
        <Appointment
          key={ appointment.id }
          {...appointment}
        />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={currentDay}
            setDay={day => setCurrentDay(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          { listOfAppointments }
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
