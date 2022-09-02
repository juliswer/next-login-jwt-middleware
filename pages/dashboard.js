import { useState } from "react";
import axios from "axios";

function DashboardPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getProfile = async () => {
    const response = await axios.get("/api/profile");
    setUser(response.data);
  };

  return (
    <>
      <h1>Dashboard</h1>

      <button onClick={() => getProfile()}>Get Profile</button>
    </>
  );
}

export default DashboardPage;
