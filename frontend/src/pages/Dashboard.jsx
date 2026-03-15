import { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    API.get("/account/balance").then((res) => setBalance(res.data.balance));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Balance: {balance}</h3>

      <Link to="/send">Send Money</Link>
      <Link to="/statement">Account Statement</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
