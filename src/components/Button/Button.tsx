import {Button as ThemeButton, ButtonProps as ThemeButtonProps} from '@headlessui/react';
import clsx from '@/lib/clsx';
import type {Extend} from '@/lib/types';
import {MouseEvent, type ReactNode, useCallback, useMemo, useState} from 'react';
import {LoadingIcon} from '@/components/Loading';

const colors = {
	default: 'bg-background text-foreground data-hover:bg-background-600',
	primary: 'bg-primary text-primary-foreground border-primary-600 data-hover:bg-primary-600',
	success: 'bg-success text-success-foreground border-success-600',
	error: 'bg-error text-error-foreground border-error-600',
	warning: 'bg-warning text-warning-foreground border-warning-600',
} as const;

export type ButtonProps = Extend<
	ThemeButtonProps,
	{
		rounded?: boolean;
		color?: keyof typeof colors;
		className?: string;
		onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown | Promise<unknown>;
		isLoading?: boolean;
		children: ReactNode | ((state: {isLoading: boolean}) => ReactNode);
	}
>;
export const Button = ({
	className,
	rounded,
	color = 'default',
	onClick: _onClick,
	children,
	isLoading: _isLoading,
	disabled,
	...props
}: ButtonProps) => {
	const [pending, setPending] = useState(false);

	const isLoading = useMemo(() => _isLoading ?? pending, [_isLoading, pending]);

	const content = useMemo(
		() => (typeof children === 'function' ? children({isLoading}) : children),
		[children, isLoading],
	);

	const onClick = useCallback(
		async (e: MouseEvent<HTMLButtonElement>) => {
			if (!_onClick) return;

			setPending(true);
			try {
				await _onClick(e);
			} finally {
				setPending(false);
			}
		},
		[_onClick],
	);

	return (
		<ThemeButton
			type="button"
			{...props}
			className={clsx(
				'h-(--input-height-md) px-4 border rounded inline-flex items-center justify-center gap-2 [&>svg]:size-[1em] transition-colors',
				'cursor-pointer disabled:cursor-not-allowed',
				disabled && 'opacity-50',
				rounded && 'rounded-full',
				colors[color],
				className,
			)}
			onClick={onClick}
			disabled={disabled || isLoading}>
			{isLoading && <LoadingIcon className="size-[1em] border-current/60" />}
			{content}
		</ThemeButton>
	);
};
