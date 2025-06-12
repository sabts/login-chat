import styled from 'styled-components';

const StyledMessageBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	padding: 1rem;
	justify-content: flex-end;
	align-items: flex-start;
	border-radius: 16px 16px 0px 16px;
	background: #dee2e6;
	margin-bottom: 18px;
`;

const StyledUserName = styled.span`
	font-size: 0.75rem;
	font-weight: 600;
`;

const StyledDateAndTime = styled.span`
	display: flex;
	font-size: 0.75rem;
	font-weight: 400;
	align-self: flex-end;
`;

export { StyledMessageBox, StyledUserName, StyledDateAndTime };
