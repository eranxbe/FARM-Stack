import { useTodos } from "../App";
import { TodoView } from "./TodoView";
import React from "react";

export function YourTasks({todoList}) {
    const {deleteTodoHandler} = useTodos();
    return (
        <>
        <h5 className="card text-white bg-dark mb-3">
          Your Tasks
        </h5>
        <div>
          <TodoView todoList={todoList} deleteTodoHandler={deleteTodoHandler}/>
        </div>
        </>
    )
}