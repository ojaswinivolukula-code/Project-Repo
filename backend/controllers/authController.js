import bcrypt from "bcrypt";
import supabase from "../config/supabaseClient";
import generateToken from "../utils/generateToken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id,
          name,
          email,
          password: hashedPassword,
          balance: 10000,
        },
      ])
      .select()
      .single();
    if (error)
      throw errorres.json({
        token: generateToken(data),
        user: data,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    res.json({
      token: generateToken(user),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
