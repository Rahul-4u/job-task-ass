import React, { useState, useEffect } from "react";
import axios from "axios"; // Optional: For API calls, can be replaced with fetch

export default function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Store task being edited
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetch("https://pp-wine.vercel.app/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handle Dark Mode Toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://pp-wine.vercel.app/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Edit Task
  const handleEdit = (task) => {
    setEditingTask(task);
    setUpdatedTask({
      title: task.title,
      description: task.description,
      category: task.category,
    });
  };

  // Handle Save Updated Task
  const handleSave = async () => {
    try {
      const updatedTaskData = {
        title: updatedTask.title,
        description: updatedTask.description,
        category: updatedTask.category,
      };

      const response = await axios.put(
        `https://pp-wine.vercel.app/tasks/${editingTask._id}`,
        updatedTaskData
      );

      if (response.data.modifiedCount > 0) {
        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id
              ? { ...editingTask, ...updatedTaskData }
              : task
          )
        );
        setEditingTask(null); // Close the edit form
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {/* Dark Mode Toggle Button */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold text-green-600 dark:text-green-400">
            Task Manager
          </h1>
        </div>

        {/* Task Columns */}
        <div className="flex gap-4 flex-wrap">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <div
              key={category}
              className="task-column w-full sm:w-1/3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
                {category}
              </h2>

              {/* Task Cards */}
              <div className="space-y-4 mt-4">
                {tasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="task-card bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {task.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {task.description}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>

                        {/* Edit Button */}
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Edit Task
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
                className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
                className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                value={updatedTask.category}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, category: e.target.value })
                }
                className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingTask(null)} // Close edit form without saving
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
