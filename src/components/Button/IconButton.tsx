import type {ComponentPropsWithoutRef} from 'react';
import clsx from '@/lib/clsx';
import {Button} from '@/components/Button';
import type {Extend, Optional} from '@/lib/types';
import {Icon, type IconType} from '@/components/Icon';

export type IconButtonProps = Extend<
	Optional<ComponentPropsWithoutRef<typeof Button>, 'children'>,
	{
		icon: IconType;
	}
>;
export const IconButton = ({className, icon, ...props}: IconButtonProps) => {
	return (
		<Button {...props} className={clsx('aspect-square p-0', className)} rounded>
			{({isLoading}) => (isLoading ? null : <Icon icon={icon} />)}
		</Button>
	);
};
