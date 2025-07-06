import {Input as ThemeInput, InputProps as ThemeInputProps} from '@headlessui/react';
import clsx from '@/lib/clsx';
import type {Extend} from '@/lib/types';

export type InputProps = Extend<
	ThemeInputProps,
	{
		className?: string;
	}
>;
export const Input = ({className, ...props}: InputProps) => {
	return (
		<ThemeInput
			type="text"
			{...props}
			className={clsx(
				'h-(--input-height-md) px-4 border rounded transition-colors',
				'focus-visible:border-primary',
				'disabled:text-muted',
				className,
			)}
		/>
	);
};
