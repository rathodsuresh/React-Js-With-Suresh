import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simulate an API request for authentication
    const response = await authenticateUser(username, password);
    console.log(response);
    if (response.success) {
      history("/home");
      console.log("User authenticated");
    } else {
      setError("Invalid username or password");
    }
  };

  const authenticateUser = async (username, password) => {
    try {
      // Simulate a GET request to check user credentials
      const apiUrl = await fetch(
        "https://mocki.io/v1/63b7c56d-4d96-429a-a956-60d1eac9e57c"
      ); // Replace with your Mocki.io API URL
      const data = await apiUrl.json();

      if (data.user === username && data.password === password) {
        return { success: true, message: "Authentication successful" };
      } else {
        return { success: false, message: "Invalid username or password" };
      }
    } catch (error) {
      console.error("API request failed:", error);
      return { success: false, message: "API request failed" };
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
