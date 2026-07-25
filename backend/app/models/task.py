from ..extensions import db

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    description = db.Column(db.Text)
    priority = db.Column(db.String(20), default="Medium")

    completed = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=db.func.now())

    def to_dict(self):
     return {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "priority": self.priority,
        "completed": self.completed,
        "created_at": self.created_at
    }