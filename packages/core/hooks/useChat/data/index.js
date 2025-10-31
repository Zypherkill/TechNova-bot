import { useState, useRef } from 'react';
import { chain} from '@chatapp/chains';

export const useChat = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const question = inputRef.current.value;
		if (!question.trim()) return;

		setLoading(true);
		setMessages((prev) => [
			...prev,
			{ content: question, role: 'Användare' },
		]);
		inputRef.current.value = '';
		const answer = await chain.invoke({
			question
		});
		console.log(answer);

		setMessages((prev) => [
			...prev,
			{
				role: 'TechNova',
				content: answer.response || 'Ingen respons.',
			},
		]);

		setLoading(false);
	};

	return { messages, loading, handleSubmit, inputRef };
};
