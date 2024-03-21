import { Theme } from 'contexts';
import { DeepPartial } from 'types';

export type LoadingType = 'spinner' | 'bar';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
	type: LoadingType;
	size: number;
	duration?: number;
	theme?: DeepPartial<Theme>;

	spinner?: LoadingSpinnerProps;
	bar?: LoadingBarProps;

	custom?: () => JSX.Element;
}

export interface LoadingSpinnerProps {
	strokeWidth: number;
}

export interface LoadingBarProps {
	width?: number;
	height?: number;
}

export interface LoaderProps {
	theme: Theme;
}

export const defaultPropsLoading: LoadingProps = {
	type: 'spinner',
	size: 25,
	duration: 1.5,
	theme: {},
	spinner: {
		strokeWidth: 5,
	},
	bar: {
		width: 150,
		height: 5,
	},
};
