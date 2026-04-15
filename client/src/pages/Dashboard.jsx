import { useAuth } from "../context/AuthContext";
export default function Dashboard() {
  const { auth } = useAuth();
  return (
    <div style={{ padding: 32 }}>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{auth?.user?.email}</strong>!</p>
      <p>Role: <strong>{auth?.user?.role}</strong></p>
      {auth?.user?.role === "admin" && <p style={{color:"green"}}>✅ You have Admin access. Visit <a href="/admin">/admin</a></p>}
    </div>
  );
}
