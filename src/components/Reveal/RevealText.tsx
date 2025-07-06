import {type PropsWithChildren, type ReactNode} from 'react';
import {IconButton} from '@/components/Button';
import {EyeIcon, EyeOffIcon} from 'lucide-react';
import useToggle from '@/hooks/useToggle';

export type RevealTextProps = PropsWithChildren<{
	placeholder?: ReactNode;
}>;
export const RevealText = ({children, placeholder}: RevealTextProps) => {
	const [isVisible, toggleIsVisible] = useToggle(false);
	return (
		<>
			{isVisible ? children : (placeholder ?? '*******')}
			<IconButton icon={isVisible ? EyeOffIcon : EyeIcon} className="ml-2" onClick={toggleIsVisible} />
		</>
	);
};
