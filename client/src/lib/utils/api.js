const URL_BASE = 'http://localhost:3000';
const URL_API = '/chat';

export const showChatHistory = async () => {
	try {
		const response = await fetch(URL_BASE + URL_API);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return [];
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const saveChatHistory = async data => {
	const response = await fetch(URL_BASE + URL_API);
	try {
		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
