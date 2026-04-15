const users = [
  { id: 1, email: "admin@test.com", role: "admin" },
  { id: 2, email: "user@test.com", role: "user" },
];
export default function AdminPage() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Admin Panel — User Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1976d2", color: "#fff" }}>
            <th style={th}>ID</th><th style={th}>Email</th><th style={th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={td}>{u.id}</td>
              <td style={td}>{u.email}</td>
              <td style={td}><span style={{ background: u.role==="admin"?"#ff9800":"#4caf50", color:"#fff", padding:"2px 10px", borderRadius:12 }}>{u.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const th = { padding:"10px 16px", textAlign:"left" };
const td = { padding:"10px 16px", borderBottom:"1px solid #eee" };
