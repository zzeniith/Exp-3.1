import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import Dashboard from "./components/Dashboard";

function Nav() {
  const { auth, logout } = useAuth();
  return (
    <nav style={{ padding:"12px 24px", background:"#1976d2", color:"#fff", display:"flex", gap:16, alignItems:"center" }}>
      <Link to="/" style={{ color:"#fff", textDecoration:"none" }}>Home</Link>
      {auth ? (
        <>
          <Link to="/dashboard" style={{ color:"#fff", textDecoration:"none" }}>Dashboard</Link>
          {auth.user?.role === "admin" && <Link to="/admin" style={{ color:"#fff", textDecoration:"none" }}>Admin</Link>}
          <Link to="/user" style={{ color:"#fff", textDecoration:"none" }}>My Page</Link>
          <button onClick={logout} style={{ marginLeft:"auto", background:"transparent", border:"1px solid #fff", color:"#fff", padding:"4px 12px", borderRadius:6, cursor:"pointer" }}>Logout</button>
          <span style={{ fontSize:12 }}>👤 {auth.user?.email} ({auth.user?.role})</span>
        </>
      ) : (
        <Link to="/login" style={{ color:"#fff", textDecoration:"none", marginLeft:"auto" }}>Login</Link>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<div style={{padding:32}}><h2>Exp 3.1 — Auth & RBAC Demo</h2><p>Login to explore protected routes and role-based access.</p></div>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPage /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<div style={{padding:32, color:"red"}}><h2>403 — Unauthorized</h2><p>You don't have permission to view this page.</p></div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
