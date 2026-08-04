import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>👋 Welcome to MindGuard</h1>

        <h3>Today's Focus</h3>
        <p>0 Minutes</p>

        <h3>Productivity Score</h3>
        <p>0%</p>

        <h3>Today's Habits</h3>

        <ul>
          <li>Exercise</li>
          <li>Read 20 Pages</li>
          <li>Meditate</li>
        </ul>
      </div>
    </>
  );
}

export default Dashboard;