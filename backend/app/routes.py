from flask import Blueprint, request
from .models import Task
from .extensions import db
from sqlalchemy import case

print(Task)
print(Task.__table__.columns.keys())

main = Blueprint("main", __name__)


@main.route("/")
def home():
    return {
        "message": "TaskFlow Backend Running!"
    }


# GET ALL TASKS + FILTERING + SORTING + PAGINATION
@main.route("/tasks", methods=["GET"])
def get_tasks():

    completed = request.args.get("completed")
    priority = request.args.get("priority")
    sort = request.args.get("sort")

    # Pagination parameters
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    query = Task.query

    # Filter by completed status
    if completed is not None:
        query = query.filter_by(
            completed=completed.lower() == "true"
        )

    # Filter by priority
    if priority:
        query = query.filter_by(priority=priority)

    # Sort by created date
    if sort == "created_at":
        query = query.order_by(Task.created_at.desc())

    # Sort by priority
    elif sort == "priority":
        priority_order = case(
            (Task.priority == "High", 1),
            (Task.priority == "Medium", 2),
            (Task.priority == "Low", 3),
            else_=4
        )

        query = query.order_by(priority_order)

    total = query.count()
    pages = (total + per_page - 1) // per_page

    has_next = page < pages
    has_prev = page > 1

    offset = (page - 1) * per_page

    tasks = query.offset(offset).limit(per_page).all()
    return {
        "success": True,
        "count": len(tasks),
         "total": total,
         "pages": pages,
         "has_next": has_next,
         "has_prev": has_prev,
        "data": [task.to_dict() for task in tasks]
    }


# GET SINGLE TASK
@main.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):

    task = Task.query.get_or_404(id)

    return {
        "success": True,
        "data": task.to_dict()
    }


# SEARCH TASKS
@main.route("/tasks/search", methods=["GET"])
def search_tasks():

    title = request.args.get("title")

    if not title:
        return {
            "error": "Search title is required."
        }, 400

    tasks = Task.query.filter(
        Task.title.ilike(f"%{title}%")
    ).all()

    return {
        "success": True,
        "count": len(tasks),
        "data": [task.to_dict() for task in tasks]
    }


# CREATE TASK
@main.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    if not data:
        return {
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


# UPDATE TASK
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


# DELETE TASK
@main.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):

    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()

    return {
        "success": True,
        "message": "Task deleted successfully."
    }