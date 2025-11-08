import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Header({ darkMode, toggleDark }) {
  return (
    <header className="app-header">
      <h1>✨ FocusFlow</h1>
      <div className="header-right">
        <button className="theme-btn" onClick={toggleDark}>
          {darkMode ? <FiSun /> : <FiMoon />} {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
