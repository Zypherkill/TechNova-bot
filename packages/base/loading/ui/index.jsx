import { Cog } from 'lucide-react';
import './index.css';

export const Loading = () => {
	return (
		<div className='loading'>
			<Cog className='gear gear1' />
			<Cog className='gear gear2' />
		</div>
	);
};
