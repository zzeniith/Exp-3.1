const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "supersecret123";

// Mock users DB
const USERS = [
  { id: 1, email: "admin@test.com", password: "admin123", role: "admin" },
  { id: 2, email: "user@test.com", password: "user123", role: "user" },
];

// Auth middleware (Exp 3.1.2)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// RBAC middleware (Exp 3.1.3)
const rbac = (role) => (req, res, next) => {
  if (req.user?.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};

// Routes
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

app.get("/api/protected/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Protected dashboard data", user: req.user });
});

app.get("/api/admin/users", authMiddleware, rbac("admin"), (req, res) => {
  res.json({ users: USERS.map(({ password, ...u }) => u) });
});

app.listen(5000, () => console.log("Server running on port 5000"));
