import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend
  useEffect(() => {
    axios
      .get("https://pp-wine.vercel.app/tasks")
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log("Fetched tasks:", response.data); // Debugging
          setTasks(response.data);
        } else {
          console.warn("Unexpected API response:", response.data);
          setTasks([]);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // ✅ Handle Drag & Drop
  const onDragEnd = async (result) => {
    console.log("Drag Result:", result);

    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const movedTaskIndex = source.index;
    const movedTask = { ...updatedTasks[movedTaskIndex] };

    // ✅ Task category update
    movedTask.category = destination.droppableId;

    updatedTasks.splice(movedTaskIndex, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    try {
      if (movedTask?._id) {
        await axios.put(
          `https://pp-wine.vercel.app/tasks/update-category/${movedTask._id}`,
          { category: movedTask.category }
        );
        console.log("✅ Task updated in DB");
      } else {
        console.warn("⚠️ Task _id is missing!", movedTask);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Task Management Board
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ✅ Task Columns */}
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-gray-200 rounded-lg shadow-md p-4 min-h-[500px] transition-all ${
                    snapshot.isDraggingOver ? "bg-blue-100" : ""
                  }`}
                >
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                    {category}
                  </h3>
                  {tasks.filter((task) => task.category === category).length ===
                    0 && (
                    <p className="text-gray-500 text-sm text-center">
                      No tasks available.
                    </p>
                  )}
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => {
                      if (!task._id) {
                        console.warn("⚠️ Missing Task ID:", task);
                      }
                      return (
                        <Draggable
                          key={task._id || `task-${index}`}
                          draggableId={(task._id || `task-${index}`).toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg shadow p-4 mb-4 border border-gray-300 transition-transform ${
                                snapshot.isDragging ? "shadow-lg scale-105" : ""
                              }`}
                            >
                              <div className="flex items-center mb-2">
                                <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full">
                                  {task.title.charAt(0)}
                                </span>
                                <h4 className="ml-2 text-lg font-bold text-gray-700">
                                  {task.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {task.description}
                              </p>
                              <div className="flex justify-between text-sm mt-3">
                                <p>
                                  <strong>Assignee:</strong> {task.assignee}
                                </p>
                                <p>
                                  <strong>Priority:</strong> {task.priority}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500">
                                Due Date: {task.dueDate}
                              </p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default AllTasks;
