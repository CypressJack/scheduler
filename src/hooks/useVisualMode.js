import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    let historyArray = history;
    if (replace) {
      historyArray[0] = newMode;
    } else {
      historyArray.unshift(newMode);  
    }
    setHistory(historyArray);
    setMode(newMode);
  };

  const back = function() {
    if (history[0] !== initial) {
      const historyArray = history;
      historyArray.shift();
      setHistory(historyArray);
      setMode(history[0]);
    };
  };

  return { mode, transition, back }
}; 