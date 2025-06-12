import styled from 'styled-components';

const StyledMainSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
`;

const StyledTitleDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`;

const StyledButtonsDiv = styled.div`
	display: flex;
	width: 100%;
	gap: 90px;
	justify-content: space-around;
`;

const StyledForm = styled.form`
	display: flex;
	padding: 16px;
	justify-content: space-around;
	align-items: flex-start;
	gap: 4px;
	width: 100%;
	background-color: aliceblue;
	position: fixed;
	bottom: 0;
`;

const StyledInputText = styled.input`
	display: flex;
	padding: 16px 18px;
	align-items: flex-start;
	border-radius: 16px;
	background-image: #e8ebf0;
	border: 1px solid gray;
	width: 250px;
`;

const StyledButton = styled.input`
	background-color: #3c096c;
	color: white;
	border: none;
	padding: 16px 16px;
	border-radius: 16px;
`;
export {
	StyledMainSection,
	StyledTitleDiv,
	StyledButtonsDiv,
	StyledForm,
	StyledInputText,
	StyledButton
};
