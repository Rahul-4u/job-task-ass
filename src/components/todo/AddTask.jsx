import React, { useState } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (title.trim() === "" || title.length > 50) {
  //       alert("Title is required and must be under 50 characters.");
  //       return;
  //     }
  //     if (description.length > 200) {
  //       alert("Description must be under 200 characters.");
  //       return;
  //     }

  //     const newTask = {
  //       title,
  //       description,
  //       category,
  //       timestamp: new Date().toISOString(),
  //     };

  //     console.log("Task added:", newTask);
  //     // API call to save task in the database will go here

  //     setTitle("");
  //     setDescription("");
  //     setCategory("To-Do");
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || title.length > 50) {
      alert("Title is required and must be under 50 characters.");
      return;
    }
    if (description.length > 200) {
      alert("Description must be under 200 characters.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/add-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Task added:", data);
        alert("Task added successfully!");
        setTitle("");
        setDescription("");
        setCategory("To-Do");
      } else {
        alert(data.message || "Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={50}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
