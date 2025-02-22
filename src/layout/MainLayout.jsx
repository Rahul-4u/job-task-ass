import { Outlet } from "react-router-dom";
import Navbar from "../share/Navbar";
import Footer from "../share/Footer";

export default function MainLayout() {
  return (
    <div>
      <div>
        <div>
          <Navbar />
        </div>
      </div>
      <main className="mt-17">
        <div className="max-w-[1440px] mx-auto">
          <Outlet />
          <Footer />
        </div>
      </main>
    </div>
  );
}
