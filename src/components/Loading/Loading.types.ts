import { Theme } from 'contexts';
import { DeepPartial } from 'types';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
	type: 'spinner' | 'dots';
	size: number;
	duration: number;
	strokeWidth: number;
	theme: DeepPartial<Theme>;

	custom?: () => JSX.Element;
}

export const excludeProps: (keyof LoadingProps)[] = [
	'type',
	'size',
	'duration',
	'strokeWidth',
	'theme',
];

export const defaultPropsLoading: LoadingProps = {
	type: 'spinner',
	size: 25,
	duration: 1.5,
	strokeWidth: 5,
	theme: {},
};
