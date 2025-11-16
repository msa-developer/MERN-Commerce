import generateToken from "../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ msg: "Please fill all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "password should be minimum 6 characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Invalid Email" });

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ msg: "Email Already In Use" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const NewUser = new User({
      email,
      fullName,
      password: hashPass,
    });

    await NewUser.save();
    generateToken(NewUser._id, res);
    res.status(201).json(NewUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in Register Function" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "password should be minimum 6 characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ msg: "Invalid Email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User Does Not Exists" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ msg: "Incorrect Password" });

    generateToken(user._id, res);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ msg: "Logged Out " });
};
