import { useState, useContext } from "react";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setform] = useState();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <button>Login</button>
      </form>
      <Link to="/signup">Create account?</Link>
    </div>
  );
}
