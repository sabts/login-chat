import { Route, Routes } from 'react-router-dom';
import Chat from '../pages/chat/Chat';
import Home from '../pages/home/Home';
import ProtectedRoute from '../../components/protected-route/ProtectedRoute';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route
				path='/chat'
				element={
					<ProtectedRoute>
						<Chat />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default Router;
