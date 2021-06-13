import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



const apiRoutes = {
  DAYS:         "http://localhost:8001/api/days",
  APPOINTMENTS: "http://localhost:8001/api/appointments",
  INTERVIEWERS: "http://localhost:8001/api/interviewers",
}

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = function(day) {
    setState({ ...state, day })
  };

  const bookInterview = function(id, interview) {
    console.log('book interview called');
    console.log('id for bookInterview', id);
    console.log('interview for bookInterview', interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    console.log('interview sent to api', interview);
    return axios.put(`${apiRoutes.APPOINTMENTS}/${id}`, {interview})
  };

  const appointments = getAppointmentsForDay(state, state.day);
  
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={state.interviewers}
      bookInterview={bookInterview}
      />
      );
    });
    
    const interviewers = getInterviewersForDay(state, state.day);



    useEffect(()=>{
      Promise.all([
        axios.get(apiRoutes.DAYS),
        axios.get(apiRoutes.APPOINTMENTS),
        axios.get(apiRoutes.INTERVIEWERS)
      ])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
      .catch((error)=> console.error(error))
    }, []);
    
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
            days={state.days}
            day={state.day}
            setDay={dayToSet => setDay(dayToSet)}
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
          { schedule }
          <Appointment bookInterview={ bookInterview } interviewers={ state.interviewers }key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
