import { Theme } from 'contexts';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
	size: number;
	speedInSeconds: number;
	strokeWidth: number;
	theme: DeepPartial<Theme>;

	custom?: () => JSX.Element;
}

export const defaultProps: LoadingProps = {
	size: 25,
	speedInSeconds: 1.5,
	strokeWidth: 5,
	theme: {},
};
