import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Todo.css"
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://658a635cba789a96223700d8.mockapi.io/todo');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const addTask = async () => {
    try {
      if (taskInput.trim() !== '') {
        const response = await axios.post('https://658a635cba789a96223700d8.mockapi.io/todo', {
          title: taskInput,
          completed: false,
        });
        setTasks([...tasks, response.data]);
        setTaskInput('');
      }
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  const updateTask = async (id) => {
    try {
      const updatedTitle = prompt('Enter the updated task:');
      if (updatedTitle !== null) {
        await axios.put(`https://658a635cba789a96223700d8.mockapi.io/todo/${id}`, {
          title: updatedTitle,
        });

        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, title: updatedTitle };
          }
          return task;
        });

        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://658a635cba789a96223700d8.mockapi.io/todo/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <div className='container'>
      <h1>To-Do List</h1>
      <div className='input-field'>
      <div className='input-with-button'>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter task"
       
      />
     
      <button onClick={addTask} className='add'><IoIosAddCircleOutline/></button>
       </div>
       </div>

       <div className='body-container'>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
         <span>{task.title} </span>
         
            <button onClick={()=>updateTask(task.id) } className='update'><CiEdit/></button>
            <button onClick={() => deleteTask(task.id)} className='delete'><MdDeleteSweep/></button>
          </li>
        ))}
      </ul>
      </div>
      </div>
      
   
  );
};

export default TodoList;
