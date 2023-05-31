import { Theme } from 'contexts';

interface CommonComponentProps {
	theme: DeepPartial<Theme>;
}

export type InputHTMLAttributes = React.HTMLAttributes<HTMLElement>;

export type ComponentProps<T> = CommonComponentProps & T;
