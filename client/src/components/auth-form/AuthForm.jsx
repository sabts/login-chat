import { useContext } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import { AuthContext } from '../../lib/context/AuthContext';
import { Link } from 'react-router-dom';

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

//{user && <Link to='/chat'>Go to chat</Link>} usar el useNavigate
export default AuthForms;
