import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { auth } from '../../config/firebase.config';
import { saveChatHistory, showChatHistory } from '../../utils/api';
import Messages from '../../../components/messages/Messages';
import {
	StyledButton,
	StyledButtons,
	StyledButtonsDiv,
	StyledForm,
	StyledInputText,
	StyledMainSection,
	StyledTitleDiv
} from './chat-styles';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	const [messages, setMessages] = useState([]);
	const [showHistory, setShowHistory] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleServerMessage = data => {
			setMessages(message => [...message, data]);
			//console.log('Mensaje recibido del servidor:', data)
		};

		socket.on('server-message', handleServerMessage);

		return () => {
			socket.off('server-message', handleServerMessage);
		};
	}, [user]);

	return (
		<StyledMainSection>
			<StyledTitleDiv>
				<h2>Chat</h2>
				<StyledButtonsDiv>
					<StyledButtons onClick={() => restoreChats(setMessages)}>
						Restore Chats
					</StyledButtons>
					<StyledButtons onClick={() => logout(navigate)}>
						Sign out
					</StyledButtons>
				</StyledButtonsDiv>
			</StyledTitleDiv>
			{!showHistory && (
				<div>
					{messages.map(msg => (
						<Messages key={msg.id} msg={msg} />
					))}
				</div>
			)}

			{showHistory && (
				<div>
					{messages.map(msg => (
						<Messages key={msg.id} msg={msg} />
					))}
				</div>
			)}
			<StyledForm
				onSubmit={event => {
					sendMessage(event, event.target.message.value, user);
				}}
			>
				<StyledInputText
					type='text'
					placeholder='type your message'
					name='message'
				/>
				<StyledButton type='submit' value='SEND' />
			</StyledForm>
		</StyledMainSection>
	);
};

const sendMessage = async (event, message, user) => {
	event.preventDefault();
	if (message && user) {
		socket.emit('server-message', {
			user: user.email,
			message: message,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString()
		});
		event.target.reset();
		const data = await saveChatHistory({
			id: user.uid,
			user: user.email,
			message: message,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString()
		});
	}
};

const serverMessage = (data, messages, setMessages) => {
	setMessages([...messages, data]);
};

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};

const restoreChats = async setMessages => {
	const data = await showChatHistory();
	setMessages(data);
};

export default Chat;
