import axios from "axios";

function DashboardPage() {
  const getProfile = async () => {
    const response = await axios.get("/api/profile");
    console.log(response);
  };

  return (
    <>
      <h1>Dashboard</h1>

      <button onClick={() => getProfile()}>Get Profile</button>
    </>
  );
}

export default DashboardPage;
