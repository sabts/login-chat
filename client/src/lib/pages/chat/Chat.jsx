import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { AuthContext } from '../../lib/context/AuthContext';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	//const [isConnected, setIsConnected] = useState(false);
	//const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(()=> {
	const serverMessage = data => {}

	socket.on('server-message', serverMessage);

	return () => socket.off('message', serverMessage)
	}, [])

	return (
		<>
		<h2>Chat</h2>
		<button onClick={logout}>Sign out</button>
		<div>
			{messages.map(msg => (
			<p key={v4()}>{msg.message}</p>
			))}
		</div>
		<form onSubmit={event => {
			sendMessage(event, event.target.message.value)
		}}>
			<input type='text' placeholder='type your message' name='message'/>
			<input type='submit'/>
		</form>
		</>
	);
};

const sendMessage = (event, message) => {
	event.preventDefault();
	if(message) {
		socket.emit('client message', {message});
		event.target.reset()
	}
}

const serverMessage = (data, messages, setMessages) => {
	setMessages([...messages,data])
}

const logout = async () => {
	await signOut(auth);
};
export default Chat;
