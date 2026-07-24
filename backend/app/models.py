from datetime import datetime
from .extensions import db


class Task(db.Model):  #Create a database table called Task.
    __tablename__ = "tasks" #Instead of naming the table automatically, we're explicitly naming it: tasks

    id = db.Column(db.Integer, primary_key=True) #Every task gets a unique ID    ::: SQLite automatically generates them.

    title = db.Column(db.String(200), nullable=False)  #Maximum 200 characters.

    description = db.Column(db.Text, nullable=True)

    completed = db.Column(db.Boolean, default=False)  #Every new task starts as False Later when the user click ✔ Complete it becomes True

    created_at = db.Column(db.DateTime, default=datetime.utcnow) #When a task is created:it is automatically created 

    def __repr__(self):
        return f"<Task {self.title}>"
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "completed": self.completed,
            "created_at": self.created_at
        }