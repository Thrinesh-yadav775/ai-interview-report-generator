const jwt = require("jsonwebtoken");
const prisma = require("../lib/db");

async function authuser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "token not provided" });
  }
  const isTokenBlacklisted = await prisma.blacklist.findFirst({
    where: { token },
  });
  if (isTokenBlacklisted) {
    return res.status(400).json({ message: "this token has been blacklisted" });
  }
  try {
    const decoded = jwt.verify(token, process.env.tokenkey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
}
module.exports = { authuser };
