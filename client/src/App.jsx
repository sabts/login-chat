import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './lib/providers/auth.providers';
import Router from './lib/routes/routes';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	return (
		<>
			<BrowserRouter>
			<GlobalStyles/>
				<AuthProvider>
					<Router/> 
				</AuthProvider>
			</BrowserRouter>
		</>
	);
};

export default App;