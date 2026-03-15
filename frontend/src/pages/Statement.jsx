import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    API.get("/account/statement".then((res) => setTransactions(res.data)));
  }, []);
  return (
    <div>
      <h2>Account Statement</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              style={{
                color: t.transaction_type === "credit" ? "green" : "red",
              }}
            >
              <td>{new Date(t.created_at).toDateString()}</td>
              <td>{t.transaction_type}</td>
              <td>{t.amount}</td>
              <td>{t.sender_id}</td>
              <td>{t.receiver_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
