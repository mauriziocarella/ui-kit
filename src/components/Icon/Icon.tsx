import type {Extend} from '@/lib/types';
import {type LucideIcon, type LucideProps} from 'lucide-react';

export type IconType = LucideIcon;

export type IconProps = Extend<
	{
		icon: IconType;
	},
	LucideProps
>;
export const Icon = ({icon: Component, ...props}: IconProps) => {
	return <Component {...props} />;
};
