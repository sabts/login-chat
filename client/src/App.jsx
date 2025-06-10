import AuthForms from './components/auth-form/AuthForm';
import AuthProvider from './lib/providers/auth.providers';

const App = () => {
	return (
		<>
			<AuthProvider>
				<AuthForms />
			</AuthProvider>
		</>
	);
};

export default App;
