import { getTasks, completeTask, useGlobalState, getStorageToken, removeTask} from "../App";
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import {AiFillDelete} from 'react-icons/ai';

const TasksList = ({data}) => {
  const [jsonData, setData] = useGlobalState('data');
  return (
    <div className="tasks-list">
      <h1><BsFillCalendarWeekFill></BsFillCalendarWeekFill> TODO:</h1>
      <div className="task-container">
        {data && data.map(task => {
          if(task.token === getStorageToken())
            return (
              <div className="task" key={task.id}>
                <p className="small-text">Task:</p>
                <h2>{task.name}</h2>
                <p>{task.datetime}</p>
                <div className="completed">
                  <label htmlFor={"cb" + task.id}>Status: <span className={task.iscompleted ? "complete" : "todo"}>{task.iscompleted ? "COMPLETED" : "TODO"}</span></label>
                  <input type="checkbox" id={"cb" + task.id} checked={task.iscompleted} onChange={(e) => {completeTask(task.id, e.target.checked); setData(getTasks());}}></input>
                </div>
                <p className="task-content">{task.body}</p>
                <button onClick={() => {removeTask(task.id); setData(getTasks());}}> <AiFillDelete></AiFillDelete> Delete task</button>
              </div>
            );
        })}
      </div>
    </div>
  );
}
 
export default TasksList;