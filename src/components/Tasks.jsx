import Task from "./Task";

const Tasks = (props) => {
  const { tasks } = props;
  return(
    <>
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          task={task}             
        />
      ))}      
    </>
  );
};

export default Tasks;
