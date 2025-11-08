import React, { useState } from "react";
//import { motion } from "framer-motion";
import { FiTrash2, FiEdit, FiCheckSquare } from "react-icons/fi";

export default function TaskItem({ task, toggleComplete, deleteTask, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [category, setCategory] = useState(task.category || "General");
  const [due, setDue] = useState(task.due ? task.due.split("T")[0] : "");

  const save = () => {
    updateTask({ text: text.trim(), category, due: due || null });
    setEditing(false);
  };

  return (
    <motion.li
      className={`task-item ${task.completed ? "done" : ""}`}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
    >
      <div className="left">
        <button className="check-btn" onClick={toggleComplete} title="Toggle complete">
          <FiCheckSquare />
        </button>

        <div className="task-main">
          {editing ? (
            <>
              <input value={text} onChange={(e) => setText(e.target.value)} />
              <div className="edit-row">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>General</option>
                  <option>Work</option>
                  <option>Study</option>
                  <option>Personal</option>
                  <option>Errand</option>
                </select>
                <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
              </div>
            </>
          ) : (
            <>
              <div className="task-title">{task.text}</div>
              <div className="task-meta">
                <span className="badge">{task.category || "General"}</span>
                {task.due && <span className="due">Due: {new Date(task.due).toLocaleDateString()}</span>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="right">
        {editing ? (
          <>
            <button onClick={save} className="save-btn">Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} title="Edit"><FiEdit /></button>
            <button onClick={deleteTask} title="Delete"><FiTrash2 /></button>
          </>
        )}
      </div>
    </motion.li>
  );
}
