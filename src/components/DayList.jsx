import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const list = props.days.map((day, index)=>{
   return (
  <DayListItem 
  name={day.name}
  key={index} 
  spots={day.spots} 
  selected={day.name === props.day}
  setDay={props.setDay}  />
  );
  });

   return (
     <ul>{list}</ul>
   );
 }
