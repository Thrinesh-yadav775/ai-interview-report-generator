const prisma = require("../lib/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const isuseraleadyregistered = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (isuseraleadyregistered) {
      return res.status(400).json({ message: "user already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hash,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.tokenkey,
    );
    res.cookie("token", token);
    res.status(200).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error in registration " });
  }
}
async function login(req, res) {
  try {
    const { email, username, password } = req.body;
    if ((!email && !username) || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const isuserrvalid = await prisma.user.findFirst({
      where: email ? { email } : { username },
    });
    if (!isuserrvalid) {
      return res.status(400).json({ message: "invalid username or email" });
    }

    const ispasswordvalid = await bcrypt.compare(
      password,
      isuserrvalid.password,
    );
    if (!ispasswordvalid) {
      return res.status(400).json({ message: "inavalid password" });
    }
    const token = jwt.sign(
      {
        id: isuserrvalid.id,
        email: isuserrvalid.email,
        username: isuserrvalid.username,
      },
      process.env.tokenkey,
      { expiresIn: "30d" },
    );
    res.cookie("token", token);
    res.status(200).json({ message: "Login successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error in registration " });
  }
}
async function logout(req, res) {
  const token = req.cookies.token;
  if (token) {
    await prisma.blacklist.create({
      data: {
        token,
      },
    });
  }
  res.clearCookie("token");
  res.status(200).json("user logged out successfully");
}
async function getme(req, res) {
  const { email, username } = req.user;
  const result = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  res.status(200).json({ message: "user data fecthed successfully", result });
}
module.exports = { register, login, logout, getme };
