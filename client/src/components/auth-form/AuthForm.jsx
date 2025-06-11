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

			{user && <Link to='/chat'>Go to chat</Link>}
		</>
	);
};

export default AuthForms;
