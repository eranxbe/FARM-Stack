from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from database import *

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.get("/api/todos")
async def get_all_todos():
    response = await fetch_all_todos_db()
    if response:
        return response
    else:
        raise HTTPException(404, "No todos found...")

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title: str):
    response = await fetch_one_todo_db(title)
    if response:
        return response
    else:
        raise HTTPException(404, f"Todo with title \"{title}\" not found...")

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo_db(todo)
    if response:
        return response
    else:
        raise HTTPException(400, f"Couldn't add todo: \"{todo.title}\"")

@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo(title: str, description: str):
    response = await update_todo_db(title, description)
    if response:
        return response
    else:
        raise HTTPException(404, f"Couldn't update todo: \"{title}\"")

@app.delete("/api/todo/{title}")
async def delete_todo(title: str):
    response = await delete_todo_db(title)
    if response:
        return f"Successfully deleted todo: \"{title}\""
    else:
        raise HTTPException(400, f"Couldn't delete todo: \"{title}\"")