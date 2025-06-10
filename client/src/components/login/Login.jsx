import { useContext } from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const {} = useContext(AuthContext);

	return (
		<form onSubmit={loginUser}>
			<h2>Iniciar Sesión</h2>
			<input type='text' name='email' placeholder='Email' />
			<input type='text' name='password' placeholder='Password' />
			<button type='submit'>Entrar</button>
		</form>
	);
};

const loginUser = async event => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
	}
};

export default Login;
