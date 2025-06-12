import { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import { auth } from '../../config/firebase.config';
import { showChatHistory } from '../../utils/api';
import Messages from '../../../components/messages/Messages';
import { StyledButton, StyledButtonsDiv, StyledForm, StyledInputText, StyledMainSection, StyledTitleDiv } from './chat-styles';

const socket = io('http://localhost:3000');

const Chat = () => {
	const { user } = useContext(AuthContext);
	const [messages, setMessages] = useState([]);
	const [showHistory, setShowHistory] = useState(false)

	useEffect(() => {
		const handleServerMessage = (data) => {
			setMessages(message=> [...message, data]);
	//console.log('Mensaje recibido del servidor:', data)   
		};
	
		socket.on('server-message', handleServerMessage);
	
		return () => {
			socket.off('server-message', handleServerMessage);
		};
	}, [user]);


const restoreChats = async () => {
	const data = await showChatHistory();
	setMessages(data);
}
	return (
		<StyledMainSection>
			<StyledTitleDiv>
			<h2>Chat</h2>
			<StyledButtonsDiv>
			<button onClick={restoreChats}>Restore Chats</button>
			<button onClick={logout}>Sign out</button>
			</StyledButtonsDiv>
			</StyledTitleDiv>
			{!showHistory && (
        <div>
          {messages.map((msg) => (
            <Messages key={msg.id} msg={msg} /> 
          ))}
        </div>
      )}

      {showHistory && (
        <div>
          {messages.map((msg) => (
            <Messages key={msg.id} msg={msg} /> 
          ))}
        </div>
      )}
			<StyledForm
				onSubmit={(event) => {
					sendMessage(event, event.target.message.value, user);
				}}
			>
				< StyledInputText type='text' placeholder='type your message' name='message' />
				<StyledButton type='submit' />
			</StyledForm>
		</StyledMainSection>
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


//const restoreChats = async setMessages=> {
//	const data = await showChatHistory();
//	console.log(data)
//	setMessages(data);
//}
export default Chat;
