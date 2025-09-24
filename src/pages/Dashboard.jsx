import React, { useEffect, useState } from "react";
import api from "../api.js";
import "./dash.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await api.get("/tasks/gtasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await api.post("/tasks/ptasks", {
        title: text,
        description,
      });
      setTasks([...tasks, res.data]);
      setText("");
      setDescription("");
      alert("✅ Task added successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/dtasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      alert("🗑 Task deleted successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting task");
    }
  };

  const toggleStatus = async (task) => {
    try {
      const res = await api.put(`/tasks/toggle/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((t) => (t._id === task._id ? res.data : t))
      );
      alert(
        `✅ Task marked as ${
          !task.completed ? "completed" : "incomplete"
        }`
      );
    } catch (err) {
      console.error(err);
      alert("❌ Error toggling status");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="task-container">
      <div className="logout-btn" onClick={logout}>
        Logout
      </div>

      <form onSubmit={addTask}>
        <input
          type="text"
          name="task"
          placeholder="Enter Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-desc">{task.description || "No description"}</div>
              </div>
              <div className="task-actions">
                <div
                  className={`status-indicator ${
                    task.completed ? "status-completed" : "status-pending"
                  }`}
                  title={task.completed ? "Completed" : "Pending"}
                  onClick={() => toggleStatus(task)}
                ></div>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
