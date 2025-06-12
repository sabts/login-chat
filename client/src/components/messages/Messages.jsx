import { StyledDateAndTime, StyledMessageBox, StyledUserName } from "./messages-styles";

const Messages = ({ msg }) => {
	return (
	  <StyledMessageBox key={msg.id}>
		<StyledUserName>{msg.user}</StyledUserName>
		<p>{msg.text}</p>
		<StyledDateAndTime>{msg.time} {msg.date}</StyledDateAndTime>
	  </StyledMessageBox>
	);
  };
  
  export default Messages;