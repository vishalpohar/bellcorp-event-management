import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col px-4 py-4">
    <Navbar />
    <main className="flex-1 pt-24 sm:pt-16 px-2 md:px-10 lg:px-20 pb-6">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;
