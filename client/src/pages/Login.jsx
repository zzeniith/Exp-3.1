import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, Container } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Success");
      window.location.href = "/dashboard";
    } catch {
      alert("Login Failed");
    }
    setLoading(false);
  };

  return (
    <Container>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" {...register("email")} fullWidth />
        <br /><br />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          fullWidth
        />
        <br /><br />

        <Button type="submit" variant="contained">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Container>
  );
}