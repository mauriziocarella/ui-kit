import clsx from '@/lib/clsx';
import type {ComponentPropsWithoutRef} from 'react';

export type LoadingIconProps = ComponentPropsWithoutRef<'div'>;
export const LoadingIcon = ({className, ...props}: LoadingIconProps) => {
	return (
		<div
			{...props}
			className={clsx(
				'size-8 rounded-full border-2 animate-[spin_1s_ease-in-out_infinite]',
				className,
				'border-t-primary',
			)}
		/>
	);
};
