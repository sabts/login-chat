import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { auth } from '../../config/firebase.config';
import { showChatHistory } from '../../utils/api';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	const [messages, setMessages] = useState([]);
	const [showHistory, setShowHistory] = useState(false)

	useEffect(() => {
		const handleServerMessage = (data) => {
			setMessages(message=> [...message, data]);
		console.log('Mensaje recibido del servidor:', data)   
		};
	
		socket.on('server-message', handleServerMessage);
	
		return () => {
			socket.off('server-message', handleServerMessage);
		};
	}, [messages, user]);

	return (
		<>
			<button onClick={logout}>Sign out</button>
			<button onClick={restoreChats}>Restore Chats</button>
			<h2>Chat</h2>
			<div>
				{messages.map(msg => (
					<div key={msg.id}>
					<span>{msg.user}</span>
					  <p>{msg.text}</p>
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

const restoreChats = async (showHistory, setMessages, setShowHistory) => {
	if (!showHistory) {
		const data = await showChatHistory();
		setMessages(data);
		setShowHistory(true);
	} else {
		setMessages([]);
		setShowHistory(false);
	}

};
export default Chat;
