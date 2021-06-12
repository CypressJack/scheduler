import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// PROPS
// props.name
// props.interviewer
// props.onCancel
// props.interviewers
// props.onSave

export default function Form(props) {

  const [name, setName] = useState(props.name || null );
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function(){
    setInterviewer(null);
    setName("");
  };

  const cancel = function() {
    reset();
    props.onCancel();
    console.log('props cancel ran');
  };

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={val=>setName(val.target.value)}
        onSubmit={event => event.preventDefault()}
        value={ name }
        /*s
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={ interviewer } setInterviewer={ setInterviewer } />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={()=>{ cancel() }} danger >Cancel</Button>
      <Button onClick={()=>{ props.onSave({name, interviewer}) }} confirm >Save</Button>
    </section>
  </section>
</main>
  );
};