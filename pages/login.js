import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const _res = await axios.post("/api/auth/login", user);
    console.log(_res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
