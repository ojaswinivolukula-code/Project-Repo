import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const SendMoney = async (e) => {
    e.preventDefault();
    try {
      await API.post("/account/transfer", {
        receiverEmail,
        amount: Number(amount),
      });
      alret("Transfer is sucess");
      navigate("/dashboard");
    } catch (err) {
      alert(err.msg);
    }
  };
  return (
    <div>
      <h2>Send Money</h2>
      <form onSubmit={SendMoney}>
        <input
          placeholder="Receiver Email"
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
