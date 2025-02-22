import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../components/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, googleLogin, logout } = useContext(AuthContext);

  const googleloginHandle = async (e) => {
    e.preventDefault();
    try {
      await googleLogin(); // ✅ `setUser` করা লাগবে না
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">Task Manager</Link>
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/add-task" className="hover:text-gray-300">
          Add Task
        </Link>
        <Link to="/manage-task" className="hover:text-gray-300">
          Manage Task
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user?.email ? (
          <>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={googleloginHandle}
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Sign In with Google
          </button>
        )}
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col items-center space-y-4 md:hidden">
          <Link to="/all-tasks" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/add-task" className="hover:text-gray-300">
            Add Task
          </Link>
          <Link to="/manage-task" className="hover:text-gray-300">
            Manage Task
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
