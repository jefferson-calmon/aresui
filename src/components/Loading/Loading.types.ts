import { Theme } from 'contexts';
import { BasePropsWithoutComponentProps } from 'types';

export type LoadingType = 'spinner' | 'bar';

export interface LoadingProps extends BasePropsWithoutComponentProps {
	type?: LoadingType;
	size?: number;
	duration?: number;

	spinner?: LoadingSpinner;
	bar?: LoadingBar;

	custom?: () => JSX.Element;
}

export interface LoadingSpinner {
	strokeWidth: number;
}

export interface LoadingBar {
	width?: number;
	height?: number;
}

export interface LoaderProps {
	size: Required<LoadingProps>['size'];
	duration: Required<LoadingProps>['duration'];
	spinner: Required<LoadingProps>['spinner'];
	bar: Required<LoadingProps>['bar'];
	theme: Theme;
}
