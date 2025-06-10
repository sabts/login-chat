import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './lib/providers/auth.providers';
import Router from './lib/routes/routes';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Router/> 
				</AuthProvider>
			</BrowserRouter>
		</>
	);
};

export default App;