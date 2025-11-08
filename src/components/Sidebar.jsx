import React from "react";

export default function Sidebar({
  categories,
  activeCategory,
  setActiveCategory,
  setShowCompleted,
  showCompleted,
  setSortBy,
  sortBy,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h4>Categories</h4>
        <ul className="cat-list">
          {categories.map((c) => (
            <li
              key={c}
              className={c === activeCategory ? "active" : ""}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Quick Settings</h4>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />{" "}
          Show completed
        </label>

        <div style={{ marginTop: 10 }}>
          <label>Sort by</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created">Newest</option>
            <option value="due">Due date</option>
          </select>
        </div>
      </div>

      <div className="sidebar-footer">
        <small>Built with React • Vite</small>
      </div>
    </aside>
  );
}
