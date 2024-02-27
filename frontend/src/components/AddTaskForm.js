import { useTodos } from "../App";
import React, {useState} from "react";
import axios from "axios";

export function AddTaskForm(){
    const {setTodoList} = useTodos();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodoHandler = () => {
        axios.post('http://localhost:8000/api/todo',
        {title, description})
        .then((res) => {
        const newTodo = res.data;
          setTodoList((prevTodos) => [...prevTodos, newTodo]);
          setTitle('');
          setDescription('');
        
        }).catch((err) => {
            console.error("Error adding todo:", err);
        })
      };

    function handleSubmit(e) {
        e.preventDefault();
        if (title.trim() === "" || description.trim() === "") {
            return;
        }
        addTodoHandler();
    }
    return (
        <>
        <form onSubmit={handleSubmit} >
            <div className="card-body">
            <h5 className="card text-white bg-dark mb-3">
                Add Task
            </h5>
            <span className="card-text">
                    <input className="mb-2 form-control titleIn" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
                    <input className="mb-2 form-control descriptionIn" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                    <button className="btn btn-outline-primary mx-2 mb-3" 
                            style={{"borderRadius": "50px", "fontWeight": "bold"}}
                            type="submit"
                            onClick={handleSubmit}>
                    Add Task
                    </button> 
            </span>
            </div>
        </form>
        </>
    )
}