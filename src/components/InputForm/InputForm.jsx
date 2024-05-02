import { useState } from "react";
import "./InputForm.css";

const InputForm = ({onDataSelect,isTimerActive,onCancel}) => {
  const [data,setDate]= useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onDataSelect(data);
  }
  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        required
        className="input-field"
        value={data}
        onChange={(e) => setDate(e.target.value)}
      />
      {!isTimerActive && (
         <button type="submit" className="button">
         Start Timer
       </button>
      )}
     
     {
      isTimerActive && (
        <button type="button" className="button" onClick={onCancel}>
        Cancel Timer
      </button>
      )
     }
      </form>
    </div>
  )
}

export default InputForm;
