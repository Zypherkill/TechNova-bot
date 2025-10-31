import './index.css';
import { Messages } from '@chatapp/messages';
import { Loading } from '@chatapp/loading';
import { useChat } from '@chatapp/usechat';
import { useRef, useEffect } from 'react';

export const Chat = () => {
	const { messages, loading, handleSubmit, inputRef } = useChat();

	const latest = useRef(null);

	useEffect(() => {
		latest.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const messageComponents = messages.map((message, index) => (
		<Messages content={message.content} role={message.role} key={index} />
	));

	return (
		<section className='chat'>
				<h1 className='chat__title'>TechNova AB</h1>
			<section className='chat__messages'>
				{messageComponents}
				{loading && <Loading />}
				<div ref={latest}></div>
			</section>

			<form className='chat__form' onSubmit={handleSubmit}>
				<input type='text' className='chat__input' ref={inputRef} />
				<button className='chat__button'>Skicka!</button>
			</form>
		</section>
	);
};
