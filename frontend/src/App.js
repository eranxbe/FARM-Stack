import './App.css';
import React, {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderTitle } from './components/HeaderTitle';
import { AddTaskForm } from './components/AddTaskForm';
import { YourTasks } from './components/YourTasks';

const TodosContext = createContext();

export function useTodos() {
  return useContext(TodosContext);
}

function App() {
  const [todoList, setTodoList] = useState([{}]);

  function getAllTodos() {
    axios.get('http://localhost:8000/api/todos')
    .then((res) => {
      setTodoList(res.data)
    })
  }

  useEffect(() => {
    getAllTodos();
  }, []);


  const deleteTodoHandler = (title) => {
    axios.delete(`http://localhost:8000/api/todo/${title}`)
        .then(res => res.data)
        .then(() => getAllTodos())
    }


  return (
    <TodosContext.Provider value={{todoList, setTodoList, deleteTodoHandler}} >
      <div className="App list-group-item justify-content-center align-items-center mx-auto" 
            style={{"width": "400px", "backgroundColor": "white", "marginTop": "15px"}}>
          <HeaderTitle />
          <AddTaskForm todoList={todoList} setTodoList={setTodoList}/>
          <hr/>
          <YourTasks deleteTodoHandler={deleteTodoHandler} todoList={todoList}/>
      </div>
    </TodosContext.Provider>  
  );
}

export default App;
