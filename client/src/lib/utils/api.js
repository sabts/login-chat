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

export const saveChatHistory = async chatData => {
	try {
		const response = await fetch(URL_BASE + URL_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chatData)
		});

		if (response.ok) {
			const savedData = await response.json();
			return savedData;
		} else {
			throw new Error('Error al guardar el historial');
		}
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
