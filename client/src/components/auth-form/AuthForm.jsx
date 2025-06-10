import { useContext } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
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
			{user && <button onClick={logout}>Sign out</button>}
		</>
	);
};

const logout = async () => {
	await signOut(auth);
};

export default AuthForms;
