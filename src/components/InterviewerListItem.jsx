import React from 'react';
import "components/InterviewerListItem.scss";
import classnames from 'classnames';


// Props.
// selected
// spots
// setInterviewer
// avatar
// name
export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item": (props.spots === 0)
  });

  return (
    <li className={interviewerClass} onClick={()=>props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}