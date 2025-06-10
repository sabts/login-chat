import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../../lib/config/firebase.config';
import { AuthContext } from '../../lib/context/AuthContext';

const Register = () => {
	const {} = useContext(AuthContext);

	return (
		<form onSubmit={registerUser}>
			<h2>Crear Cuenta</h2>
			<input type='text' name='email' placeholder='email' />
			<input type='text' name='password' placeholder='password' />
			<button type='submit'>Registrarse</button>
		</form>
	);
};

const registerUser = async event => {
	event.preventDefault();
	const formData = event.target;
	const email = formData.email.value;
	const password = formData.password.value;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
	}
};

export default Register;
