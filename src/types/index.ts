import { Theme } from 'contexts';

interface CommonComponentProps {
	theme: DeepPartial<Theme>;
}

export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type InputHTMLAttributes = React.HTMLAttributes<HTMLInputElement>;
export type DivHTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export type ComponentProps<T> = CommonComponentProps & T;

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
