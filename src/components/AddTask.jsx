import { useState } from "react";

const AddTask = (props) => {

  const {onAdd} = props;

  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const submitFunc = (e) => {
    e.preventDefault();
    if(!text){
      alert("Please enter a task");
    } else if(!day){
      alert("Please enter a day");
    }

    onAdd({text, day, reminder});
    setText("");
    setDay("");
    setReminder(false);
  };
  return(
    <form className="add-form" onSubmit={submitFunc}>

      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Enter Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"   
          checked={reminder}      
          onChange={() => setReminder(!reminder)} 
        />
      </div>

      <input type="submit" value="Save Task" className='btn btn-block'/>
    </form>
  );
};

export default AddTask;
