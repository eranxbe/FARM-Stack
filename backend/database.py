from motor import motor_asyncio
from model import Todo
from dotenv import find_dotenv, load_dotenv
import os
from fastapi import HTTPException
from pymongo import MongoClient
import motor.motor_asyncio

load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://gustavotigde:{password}@demo.jlkippi.mongodb.net/"

# client = MongoClient(connection_string)
client = motor_asyncio.AsyncIOMotorClient(connection_string)

todo_database = client['todo']
todo_collection = todo_database['todo']


async def fetch_one_todo_db(title):
    document = await todo_collection.find_one({"title": title})
    if document:
        return document
    else:
        raise HTTPException(404, f"Failed to fetch todo with title \"{title}\"")


async def fetch_all_todos_db() -> list[Todo]:
    todos = []
    cursor = todo_collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))

    if len(todos) > 0:
        return todos
    else:
        raise HTTPException(404, "Failed to fetch all todos")


async def create_todo_db(todo: Todo):
    doc = todo.dict()
    result = await todo_collection.insert_one({"title": doc['title'], "description": doc['description']})
    inserted_id = result.inserted_id
    inserted_document = await todo_collection.find_one({"_id": inserted_id})
    if inserted_document:
        return Todo(**inserted_document)
    else:
        raise HTTPException(400, f"Failed to create todo with title \"{doc['title']}\"")


async def update_todo_db(title, description):
    await todo_collection.update_one({
        "title": title},
        {"$set": {"description": description}
         })
    document = await todo_collection.find_one({"title": title})
    if document:
        return document
    else:
        raise HTTPException(404, f"Failed to update todo with title \"{title}\"")


async def delete_todo_db(title):
    document = await todo_collection.find_one({"title": title})
    if document:
        _id = document['_id']
        response = await todo_collection.delete_one({"_id": _id})
        if response.deleted_count == 1:
            return todo_collection.find({})
        else:
            raise HTTPException(500, f"Failed to delete todo: \"{title}\"")
    else:
        raise HTTPException(404, f"Todo with title \"{title}\" not found")