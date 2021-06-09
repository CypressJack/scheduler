import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  // Props.
  // selected
  // spots
  // setInterviewer
  // avatar
  // name
  const listItems = props.interviewers.map((item)=>{
    return (
      <InterviewerListItem
      id={item.id}
      name={item.name}
      avatar={item.avatar}
      selected={item.id === props.interviewer}
      setInterviewer={props.setInterviewer}
       />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ listItems }</ul>
    </section>
  );
}