import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const { handleLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

const handleChange = (event, setForm) => {
    setForm([...event.target.name], [...event.target.value]);
  };

  const handleSubmit = async (event, form, handleLogin) => {
    event.preventDefault();
    await  handleLogin(form);
    navigate("/chat");
  };

export default Login