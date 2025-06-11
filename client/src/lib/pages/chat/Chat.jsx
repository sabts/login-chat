import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!user) return;
		socket.emit('user-connected', { email: user.email });

		socket.emit('user-disconnect', { email: user.email });
		socket.on('server-message', serverMessage);
	}, [user]);

	useEffect(() => {
		const serverMessage = data => {};

		socket.on('server-message', serverMessage);

		return () => socket.off('message', serverMessage);
	}, []);

	return (
		<>
			<button onClick={logout}>Sign out</button>
			<h2>Chat</h2>
			<div>
				{messages.map(msg => (
					<p key={v4()}>{msg}</p>
				))}
			</div>
			<form
				onSubmit={event => {
					sendMessage(event, event.target.message.value);
				}}
			>
				<input type='text' placeholder='type your message' name='message' />
				<input type='submit' />
			</form>
		</>
	);
};

const sendMessage = (event, message, user) => {
	event.preventDefault();
	if (message) {
		socket.emit('server-message', {
			id: v4(),
			user: user.email,
			text: message
		});
		event.target.reset();
	}
};

const serverMessage = (data, messages, setMessages) => {
	setMessages([...messages, data]);
};

const logout = async () => {
	await signOut(auth);
};
export default Chat;
