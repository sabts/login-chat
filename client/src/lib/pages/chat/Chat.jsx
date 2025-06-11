import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { auth } from '../../config/firebase.config';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const handleServerMessage = (data) => {
			const updatedMessages = [...messages, data]    
			setMessages(updatedMessages);      
		};
	
		socket.on('server-message', handleServerMessage);
	
		return () => {
			socket.off('server-message', handleServerMessage);
		};
	}, [messages, user]);

	return (
		<>
			<button onClick={logout}>Sign out</button>
			<h2>Chat</h2>
			<div>
				{messages.map(msg => (
					<div key={msg.id}>
					<span>{msg.user}</span>
					  <p>{msg.message}</p>
					<span> {msg.time} {msg.date}</span>
					</div>
				))}
			</div>
			<form
				onSubmit={(event) => {
					sendMessage(event, event.target.message.value, user);
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
	if (message && user) {
		socket.emit('server-message', {
			id: v4(),
			user: user.email,
			message: message,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString()
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
