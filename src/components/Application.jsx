import React, { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

const apiRoutes = {
  DAYS: "/api/days",
  APPOINTMENTS: "/api/appointments",
  INTERVIEWERS: "/api/interviewers",
};

export default function Application(props) {
  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview,
    interviewBooked,
  } = useApplicationData();
  useEffect(() => {
    Promise.all([
      axios.get(apiRoutes.DAYS),
      axios.get(apiRoutes.APPOINTMENTS),
      axios.get(apiRoutes.INTERVIEWERS),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [interviewBooked, setState]);

  const appointments = getAppointmentsForDay(state, state.day);

  const interviewersByDay = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersByDay}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
      />
    );
  });

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
            setDay={(dayToSet) => setDay(dayToSet)}
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
          {schedule}
          <Appointment
            onDelete={cancelInterview}
            bookInterview={bookInterview}
            interviewers={state.interviewers}
            key="last"
            time="5pm"
          />
        </ul>
      </section>
    </main>
  );
}
