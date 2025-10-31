import './index.css';

export const Messages = ({content, role}) => {
	return (
		<article
			className={`message message--${
				role === 'Användare' ? 'Användare' : 'TechNova'
			}`}>
			<section className='message__bubble'>
				<span className='message__sender'>{role}</span>
				<p className='message__content'>{content}</p>
			</section>
		</article>
	);
};
