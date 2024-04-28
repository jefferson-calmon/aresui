/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, JSXElementConstructor } from 'react';
import { Theme } from 'contexts';

export type BasePropsWithoutComponentProps = {
	theme?: DeepPartial<Theme>;
};

export type BaseProps<
	K extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = BasePropsWithoutComponentProps & ComponentProps<K>;

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type InputHTMLAttributes = React.HTMLAttributes<HTMLInputElement>;
export type DivHTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export type Width = 'auto' | '100%' | 'fit-content' | `${number}px` | number;

export type Trigger =
	| 'click'
	| 'hover'
	| 'contextmenu'
	| Array<'click' | 'hover' | 'contextmenu'>;

export type Placement =
	| 'top-start'
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'top-end'
	| 'right-start'
	| 'right-top'
	| 'right-center'
	| 'right-bottom'
	| 'right-end'
	| 'bottom-start'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'bottom-end'
	| 'left-start'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'left-end';
