import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" {...register("email")} fullWidth />
      <TextField label="Password" type="password" {...register("password")} fullWidth />

      <Button type="submit" variant="contained">
        {loading ? "Loading..." : "Login"}
      </Button>
    </form>
  );
}