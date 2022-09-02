import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };

  return (
    <>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button onClick={() => getProfile()}>Get Profile</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default DashboardPage;
