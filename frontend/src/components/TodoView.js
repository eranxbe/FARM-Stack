import {TodoItem} from "./TodoItem";
import React from "react";

export function TodoView({todoList}) {
    return (
        <div>
            <ul>
                {todoList.length === 0 && "No Todos"}
                {todoList.map((todo, idx) => {
                    return <TodoItem todo={todo} key={idx}/>
                    }
                )}
            </ul>
        </div>
    );
}