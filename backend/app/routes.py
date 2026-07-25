from flask import Blueprint, request
from .models import Task
from .extensions import db
print(Task)
print(Task.__table__.columns.keys())


main = Blueprint("main", __name__)

@main.route("/")
def home():
    return {
        "message": "TaskFlow Backend Running!"
    }
@main.route("/tasks", methods=["GET"])
def get_tasks():

    completed = request.args.get("completed")
    priority = request.args.get("priority")

    query = Task.query

    if completed is not None:
        query = query.filter_by(
            completed=completed.lower() == "true"
        )

    if priority:
        query = query.filter_by(priority=priority)

    tasks = query.all()

    return {
        "success": True,
        "count": len(tasks),
        "data": [task.to_dict() for task in tasks]
    }

@main.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):

    task = Task.query.get_or_404(id)

    return {
        "success": True,
        "data": task.to_dict()
    }


@main.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()
    if not data:
        return{
            "error": "No data provided."
        }, 400
    title = data.get("title")

    if not title:
        return {
        "error": "Title is required."
    }, 400

    new_task = Task(
    title=title,
    description=data.get("description"),
    priority=data.get("priority", "Medium")
)

    db.session.add(new_task)
    db.session.commit()
    db.session.refresh(new_task)

    return {
    "success": True,
    "message": "Task created successfully.",
    "data": new_task.to_dict()
}, 201

    

@main.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):

    task = Task.query.get_or_404(id)

    data = request.get_json()

    if not data:
        return {
            "error": "No data provided."
        }, 400

    if "title" in data:
        task.title = data["title"]

    if "description" in data:
        task.description = data["description"]

    if "priority" in data:
        task.priority = data["priority"]

    if "completed" in data:
        task.completed = data["completed"]

    db.session.commit()

    return {
        "success": True,
        "message": "Task updated successfully.",
        "data": task.to_dict()
    }
    
@main.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):

    task = Task.query.get_or_404(id)

    db.session.delete(task)

    db.session.commit()

    return {
    "success": True,
    "message": "Task deleted successfully."
}