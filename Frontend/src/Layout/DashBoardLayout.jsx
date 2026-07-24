import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6 flex-1">
          {children}
        </main>

        <Footer />

      </div>

    </div>
  );
}

export default DashboardLayout;