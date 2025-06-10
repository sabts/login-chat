import { useContext } from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import { auth } from '../../lib/config/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate(); 

	return (
		<form onSubmit={(event) => loginUser(event, navigate)}>
		<h2>Iniciar Sesión</h2>
		<input type="text" name="email" placeholder="Email" />
		<input type="password" name="password" placeholder="Password" />
		<button type="submit">Entrar</button>
	  </form>
	);
};

const loginUser = async (event, navigate) => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
  
	try {
	  await signInWithEmailAndPassword(auth, email, password);
	  navigate('/chat');
	} catch (error) {
	  console.log(error);
	}
  };

export default Login;
