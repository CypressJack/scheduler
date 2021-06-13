
export function getAppointmentsForDay(state, day) {
  let result = [];
  if (state.days.length === 0) {
    return [];
  }
  const keys = Object.keys(state.appointments);
  for (const element of state.days) {
    if (element.name === day) {
      for (const appointment of element.appointments) {
        const appt = appointment.toString();
        const found = keys.find(element=> element === appt)
        if (found) {
          result.push(state.appointments[found]);
        }
      }
    }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  let interviewers = [];
  if (state.days.length === 0) {
    return [];
  };
  const appointments = getAppointmentsForDay(state, day);
  for (const appointment of appointments) {
    if (appointment.interview) {
      const interviewerId = appointment.interview.interviewer.toString();
      interviewers.push(interviewerId);
    };
  };
  for (const interviewer of interviewers) {
    if (state.interviewers[interviewer]) {
      result.push(state.interviewers[interviewer]);
    };
  };
  return result;
}


export function getInterview(state, interview) {
  let result = {};
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer.toString();
  const keys = Object.keys(state.interviewers);

    for (const key of keys) {
      if (interviewerId === key) {
        result.student = interview.student;
        result.interviewer = {
          ...state.interviewers[key]
        }
    }
  }
  return result;
};