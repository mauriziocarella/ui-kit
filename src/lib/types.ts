import type {ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, Ref} from 'react';

export type Extend<A, B> = Omit<A, keyof B> & B;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PolymorphicProps<
	Element extends ElementType,
	Props extends object = object,
	AsProps = ComponentPropsWithoutRef<Element>,
> = {
	as?: Element;
} & Extend<AsProps, Props>;
export type PolymorphicRef<Element extends ElementType> = Ref<ComponentPropsWithRef<Element>['ref']>;
