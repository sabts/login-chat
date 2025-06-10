import { useContext } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';

const AuthForms = () => {
	const { user } = useContext(AuthContext);
	return (
		<>
			{!user && (
				<>
					<Login />
					<Register />
				</>
			)}

			{user && (
				<div>
					<Link to="/chat">Ir al chat</Link>
					<button onClick={logout}>Cerrar sesión</button>
				</div>
			)}
		</>
	);
};

const logout = async () => {
	await signOut(auth);
};

export default AuthForms;
