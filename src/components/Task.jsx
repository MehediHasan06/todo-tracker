import {FaTimes} from 'react-icons/fa';
import { useContext } from 'react';
import { taskContext } from '../App';


const Task = (props) => {
  const {task} = props;
  const { deleteTask, toggleReminder} = useContext(taskContext);
  return(
    <div 
      className={`task ${task.reminder && "reminder"}`} 
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.text} 
        <FaTimes 
          style={{color: "red", cursor: "pointer"}} 
          onClick={() => deleteTask(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
