import type {Extend} from '@/lib/types';
import type {ComponentPropsWithoutRef} from 'react';
import clsx from '@/lib/clsx';

const colors = {
	default: 'data-outline:border',
	success:
		'border-success-600 bg-success text-success-foreground data-outline:bg-transparent data-outline:text-success',
	warning:
		'border-warning-600 bg-warning text-warning-foreground data-outline:bg-transparent data-outline:text-warning',
	error: 'border-error-600 bg-error text-error-foreground data-outline:bg-transparent data-outline:text-error',
} as const;

const sizes = {
	md: 'text-sm px-4 py-1',
} as const;

export type ChipProps = Extend<
	ComponentPropsWithoutRef<'div'>,
	{
		color?: keyof typeof colors;
		size?: keyof typeof sizes;
		outline?: boolean;
	}
>;
export const Chip = ({size = 'md', color = 'default', className, outline, children, ...props}: ChipProps) => {
	return (
		<div
			className={clsx(
				'border rounded-full inline-flex items-center justify-center',
				sizes[size],
				colors[color],
				className,
			)}
			data-outline={outline}
			{...props}>
			{children}
		</div>
	);
};
