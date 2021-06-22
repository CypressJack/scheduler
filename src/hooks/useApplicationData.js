import { useState } from 'react';
import axios from 'axios';

export default function useApplicationData(){

  const apiRoutes = {
    DAYS:         "/api/days",
    APPOINTMENTS: "/api/appointments",
    INTERVIEWERS: "/api/interviewers",
  }
  
  const [interviewBooked, setInterviewBooked] = useState('');

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
    return axios.put(`${apiRoutes.APPOINTMENTS}/${id}`, {interview})
    .then((res)=>{
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
      setInterviewBooked(interview);
      return res;
    })
  };

  const cancelInterview = function(id){
    return axios.delete(`${apiRoutes.APPOINTMENTS}/${id}`).then((res)=>{
      const interview = null;
      const appointment = {
        ...state.appointments[id],
        interview: interview
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
      setInterviewBooked(id);
    return res;
  })};


  return { state, setState, setDay, bookInterview, cancelInterview, interviewBooked };
};