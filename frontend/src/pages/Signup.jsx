import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setform] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("auth/signup", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("signup failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <button>{loading ? "Creating..." : "Signup"}</button>
      </form>
      <Link to="/login">Already have account?</Link>
    </div>
  );
}
