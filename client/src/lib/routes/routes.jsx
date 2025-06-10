import { Route, Routes } from 'react-router-dom';
import AuthForms from '../../components/auth-form/AuthForm';
import Chat from '../pages/chat/Chat';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<AuthForms />} />
			<Route path='/chat' element={<Chat />} />
		</Routes>
	);
};

export default Router;
