import { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../config/firebase.config';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
