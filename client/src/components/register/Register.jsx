import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Register = () => {
  const { handleSubmit } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Cuenta</h2>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

const handleChange = (event, form) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event, form, handleSubmit) => {
    event.preventDefault();
    await handleSubmit(form);
    navigate("/chat"); 
  };


export default Register