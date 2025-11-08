import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ProgressRing from "./components/ProgressRing";
import Pomodoro from "./components/Pomodoro";
import "./index.css";

const STORAGE_KEYS = {
  TASKS: "focusflow_tasks_v2",
  THEME: "focusflow_theme_v2",
};

function App() {
  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === "true";
  });

  // Tasks: structure { id, text, category, due, completed, createdAt }
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    return raw ? JSON.parse(raw) : [];
  });

  // UI state
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("created"); // 'created' or 'due'
  const [showCompleted, setShowCompleted] = useState(true);

  // Persist tasks & theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, darkMode);
  }, [darkMode]);

  // Derived metrics
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  // categories from tasks
  const categories = useMemo(() => {
    const set = new Set(tasks.map((t) => t.category || "General"));
    return ["All", ...Array.from(set)];
  }, [tasks]);

  // Handlers
  const addTask = ({ text, category = "General", due = null }) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      category,
      due: due ? new Date(due).toISOString() : null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((s) => [newTask, ...s]);
  };

  const updateTask = (id, patch) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const deleteTask = (id) => {
    setTasks((s) => s.filter((t) => t.id !== id));
  };

  // Filtering + sorting
  const filteredTasks = useMemo(() => {
    let arr = tasks.slice();

    if (!showCompleted) arr = arr.filter((t) => !t.completed);

    if (activeCategory && activeCategory !== "All") {
      arr = arr.filter((t) => (t.category || "General") === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((t) => t.text.toLowerCase().includes(q) || (t.category || "").toLowerCase().includes(q));
    }

    if (sortBy === "due") {
      arr.sort((a, b) => {
        if (!a.due && !b.due) return 0;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return new Date(a.due) - new Date(b.due);
      });
    } else {
      arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return arr;
  }, [tasks, query, activeCategory, sortBy, showCompleted]);

  return (
    <div className="master">
      <div className={`app-root ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <Header darkMode={darkMode} toggleDark={() => setDarkMode((v) => !v)} />

        <div className="main">
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setShowCompleted={setShowCompleted}
            showCompleted={showCompleted}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />

          <section className="content">
            <div className="top-row">
              <div className="left">
                <TaskInput addTask={addTask} />
                <div className="controls">
                  <input
                    placeholder="Search tasks..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="small-controls">
                    <label>
                      <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                      />{" "}
                      Show completed
                    </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="created">Sort: Newest</option>
                      <option value="due">Sort: Due date</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="right">
                <ProgressRing percentage={progressPercent} />
                <Pomodoro />
              </div>
            </div>

            <div className="list-area">
              <h3>
                Tasks ({filteredTasks.length}) • {completedCount} done
              </h3>
              <TaskList
                tasks={filteredTasks}
                toggleComplete={(id) => updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed })}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default App;
