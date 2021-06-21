
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
  let interviewers;
  if (state.days.length === 0) {
    return [];
  };
  for (const dayOf of state.days) {
    if (dayOf.name === day) {
      interviewers = dayOf.interviewers;
    };
  };
  for (const interviewer of interviewers) {
    if (interviewer === state.interviewers[`${interviewer}`].id) {
      result.push(state.interviewers[`${interviewer}`]);
    }
  }
  return result;
}


export function getInterview(state, interview) {
  let result = {};
  if (!interview) {
    return null;
  }

  if (!interview.interviewer) {
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