const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <p className="text-lg font-semibold text-blue-400">
          Task Management Application
        </p>
        <p className="text-sm mt-1">
          Manage your tasks efficiently and stay organized.
        </p>

        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-blue-400 transition duration-300">
            About
          </a>
          <a href="#" className="hover:text-blue-400 transition duration-300">
            Contact
          </a>
          <a href="#" className="hover:text-blue-400 transition duration-300">
            Privacy Policy
          </a>
        </div>

        <hr className="border-gray-700 my-4" />

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Task Management App. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
