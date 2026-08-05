import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FocusTimer from "../components/FocusTimer";

function Focus() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <FocusTimer />
    </DashboardLayout>
  );
}

export default Focus;