const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/chat';

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
	const response = await fetch(URL_BASE + URL_API, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
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
