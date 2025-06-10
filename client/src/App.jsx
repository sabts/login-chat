import { BrowserRouter } from 'react-router-dom';
import AuthForms from './components/auth-form/AuthForm';
import AuthProvider from './lib/providers/auth.providers';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<AuthForms />
				</AuthProvider>
			</BrowserRouter>
		</>
	);
};

export default App;
