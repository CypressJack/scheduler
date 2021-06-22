import React, { useState, useEffect } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  let interviewersArray = [];
  for (const interviewer in props.interviewers) {
    interviewersArray.push(props.interviewers[interviewer]);
  }
  const [error, setError] = useState("");
  const [name, setName] = useState(props.name || "" );
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function(){
    setInterviewer(null);
    setName("");
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };

  useEffect(()=>{
    if (!name && props.student && props.interviewer) {
      setName(props.student);
      setInterviewer(props.interviewer.id);
    }
  },[props.edit, name, props.interviewer, props.student]);

  const validate = function(){
    if(name === "") {
      setError("Student name cannot be blank");
      return;
    };
    if (!interviewer) {
      setError("Please pick an Interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer)
  };

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={val=>setName(val.target.value)}
        value={ name }
        data-testid="student-name-input"
        /*s
          This must be a controlled component
        */
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewersArray} interviewer={ interviewer } setInterviewer={ setInterviewer } />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={()=>{ cancel() }} danger >Cancel</Button>
      <Button onClick={()=>{ validate() }} confirm >Save</Button>
    </section>
  </section>
</main>
  );
};