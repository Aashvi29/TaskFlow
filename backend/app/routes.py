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

    tasks = Task.query.all()
    return {
    "success": True,
    "count": len(tasks),
    "data": [task.to_dict() for task in tasks]
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

    task.completed = True

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