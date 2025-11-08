import React, { useState } from "react";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [due, setDue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({ text: text.trim(), category, due: due || null });
    setText("");
    setDue("");
    setCategory("General");
  };

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you want to accomplish?"
      />
      <div className="task-input-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work</option>
          <option>Study</option>
          <option>Personal</option>
          <option>Errand</option>
        </select>
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
