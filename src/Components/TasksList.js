import { getTasks, completeTask, useGlobalState, getStorageToken, removeTask, editTaskContent} from "../App";
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {RiSave3Line} from 'react-icons/ri';
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const TasksList = ({data}) => {
  const [jsonData, setData] = useGlobalState('data'); 
  const [editingId, setEditingId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

  return (
    <div className="tasks-list">
      <h1><BsFillCalendarWeekFill></BsFillCalendarWeekFill> TODO:</h1>
      <div className="task-container">
        {data && data.map(task => {
          if(task.token === getStorageToken())
            return (
              <div className="task" key={task.id}>
                <p className="small-text">Task:</p>
                {(!editing || task.id !== editingId ) && <h2 id={"name-" + task.id}>{
                  newName === "" ? task.name : (editing && task.id === editingId ? newName : task.name)
                }</h2>}
                {editing && task.id === editingId && <input type="text" value={newName} onChange={(e) => {
                  setNewName(e.target.value);
                }}></input>}
                <p>{task.datetime}</p>
                <div className="completed">
                  <label htmlFor={"cb" + task.id}>Status: <span className={task.iscompleted ? "complete" : "todo"}>{task.iscompleted ? "COMPLETED" : "TODO"}</span></label>
                  <input type="checkbox" id={"cb" + task.id} checked={task.iscompleted} onChange={(e) => {completeTask(task.id, e.target.checked); setData(getTasks());}}></input>
                </div>
                {(!editing || task.id !== editingId ) && <p className="task-content" id={"content-" + task.id}>{task.body}</p>}
                {editing && task.id === editingId && <textarea className="task-newcontent" value={newContent} onChange={(e) => {
                  setNewContent(e.target.value);
                }}></textarea>}
                {(!editing || task.id !== editingId ) && <button onClick={() => {setEditingId(task.id);setEditing(!editing); setNewName(task.name); setNewContent(task.body)}}><AiFillEdit></AiFillEdit> Edit</button>}

                {editing && task.id === editingId && <button onClick={() => {
                  if(isEmptyOrSpaces(newContent) ||isEmptyOrSpaces(newName)){
                    toast.error('Fill the blank fields');
                  }else{
                    editTaskContent(task.id, newContent, newName);
                    setEditingId(null);
                    setEditing(!editing);
                    setData(getTasks());
                  }
                }}><RiSave3Line></RiSave3Line> Save</button>}

                <button className="delete-btn" onClick={() => {removeTask(task.id); setData(getTasks()); toast.success('Successfully deleted');}}> <AiFillDelete></AiFillDelete> Delete task</button>
              </div>
            );
        })}
      </div>
    </div>
  );
}
 
export default TasksList;