import supabase from "../config/supabaseClient.js";

export const getBalance = async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", req.user.id)
    .single();

  if (error) return res.status(400).json(error);
  res.json(data);
};

export const transferMoney = async (req, res) => {
  try {
    const { receiverEmail, account } = req.body;
    const { data: sender } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.user.id)
      .single();
    if (sender.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });
    const { data: receiver } = await supabase
      .from("users")
      .select("*")
      .eq("email", receiverEmail)
      .single();
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    await supabase
      .from("users")
      .update({ balance: sender.balance - amount })
      .eq("id", req.user.id);

    await supabase
      .from("users")
      .update({ balance: receiver.balance + amount })
      .eq("id", receiver.id);

    await supabase.from("transactions").insert({
      sender_id: sender.id,
      receiver_id: receiver.id,
      amount,
      transaction_type: "debit",
    });
    await supabase.from("transactions").insert({
      sender_id: sender.id,
      receiver_id: receiver.id,
      amount,
      transaction_type: "credit",
    });
    res.json({ message: "Transaction successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStatement = async (req, res) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`);

  if (error) return res.status(400).json(error);
  res.json(data);
};
