import { Theme } from 'contexts';

interface CommonComponentProps {
	theme: DeepPartial<Theme>;
}

export type InputHTMLAttributes = React.HTMLAttributes<HTMLInputElement>;
export type DivHTMLAttributes = React.HTMLAttributes<HTMLDivElement>;

export type ComponentProps<T> = CommonComponentProps & T;

export type Width = 'auto' | '100%' | 'fit-content' | `${number}px` | number;
