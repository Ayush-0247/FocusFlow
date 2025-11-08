import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, toggleComplete, deleteTask, updateTask }) {
  if (!tasks.length) {
    return <p className="empty">No tasks found — add one above ✨</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          toggleComplete={() => toggleComplete(t.id)}
          deleteTask={() => deleteTask(t.id)}
          updateTask={(patch) => updateTask(t.id, patch)}
        />
      ))}
    </ul>
  );
}
