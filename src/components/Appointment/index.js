import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(()=>{transition(SHOW)});
  };

  const deleteAppointment = function(id){
    transition(DELETING);
    props.onDelete(id)
      .then(()=>{transition(EMPTY)})
  };

  const deletePrompt = function() {
    transition(CONFIRM);
  };

  const editPrompt = function(){
    transition(EDIT);
  };

  

  return (
    <article className="appointment">
      <Header time={ props.time }/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form onSave={save} interviewers={ props.interviewers } onCancel={back}/>}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deletePrompt}
            onEdit={editPrompt}
            id={props.id}
          />
        )}
        {mode === EDIT && <Form interviewer={props.interview.interviewer}student={props.interview.student}onSave={save} interviewers={ props.interviewers } onCancel={back}/>}
        {mode === SAVING && <Status message={'Saving'} />}
        {mode === DELETING && <Status message={'Deleting'}/>}
        {mode === CONFIRM && <Confirm message={'Are you sure you want to delete?'} onCancel={()=>transition(SHOW)} onConfirm={()=>deleteAppointment(props.id)} />}
    </article>
  );
};