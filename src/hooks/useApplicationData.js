import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData(){

  const apiRoutes = {
    DAYS:         "/api/days",
    APPOINTMENTS: "/api/appointments",
    INTERVIEWERS: "/api/interviewers",
  };

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

  useEffect(()=>{
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
  },[apiRoutes.DAYS, apiRoutes.INTERVIEWERS, apiRoutes.APPOINTMENTS]);


  return { state, setState, setDay, bookInterview, cancelInterview };
};