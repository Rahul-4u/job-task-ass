import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AuthContext } from "../../components/AuthContext";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.email) return;

    axios
      .get(`https://pp-wine.vercel.app/tasks?email=${user.email}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(`Tasks for ${user.email}:`, response.data);

          // শুধুমাত্র user.email এর সাথে মিল থাকা tasks সেট করুন
          const filteredTasks = response.data.filter(
            (task) => task.userEmail === user.email
          );

          setTasks(filteredTasks);
        } else {
          console.warn("Unexpected API response:", response.data);
          setTasks([]);
        }
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Task Management Board
      </h2>
      <DragDropContext>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id.toString()}
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
                            <h4 className="text-lg font-bold text-gray-700">
                              {task.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {task.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
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
