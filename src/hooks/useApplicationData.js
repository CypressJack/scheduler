import { useState } from 'react';
import axios from 'axios';

export default function useApplicationData(){

  const apiRoutes = {
    DAYS:         "http://localhost:8001/api/days",
    APPOINTMENTS: "http://localhost:8001/api/appointments",
    INTERVIEWERS: "http://localhost:8001/api/interviewers",
  }
  
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
      console.log('interview sent to api', interview);
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
    return res;
  })};


  return { state, setState, setDay, bookInterview, cancelInterview };
};