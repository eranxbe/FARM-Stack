import React from "react";
import { useTodos } from "../App";

export function TodoItem({todo}) {
    const {deleteTodoHandler} = useTodos();

    return (
        <div>
            <p style={{"display": "flex", "justifyContent": "space-between", "flexDirection": "row", "alignItems": "center"}}>
                <div style={{"display": "flex", "justifyContent": "space-around"}}>
                    <span style={{"fontWeight": "bold", "textDecoration": "underline" }}>
                        {todo.title} 
                    </span> 
                    : {todo.description}
                </div>
                <button className="btn btn-outline-danger my-2 mx-2"
                    style={{"borderRadius": "50px"}}
                    onClick={() => deleteTodoHandler(todo.title)}>
                        X
                </button>
            </p>
            <hr/>
        </div>
    )
}