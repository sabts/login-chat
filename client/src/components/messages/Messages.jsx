const Messages = ({ messages }) => {
	return (
		<div>
			{messages.map(msg => (
				<p key={msg.id}>{msg}</p>
			))}
		</div>
	);
};
export default Messages;
