/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinkProps } from 'components/Link';
import { LoadingProps } from 'components/Loading';
import { Theme } from 'contexts';
import { DeepPartial } from 'types';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;

	loading: boolean;
	disabled?: boolean;
	rippleEffect: boolean;

	variant: ButtonVariant;
	linkTo?: LinkProps['to'];
	theme: DeepPartial<Theme>;

	linkProps?: LinkProps;
	loadingProps?: LoadingProps;

	onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

export type ButtonVariant = 'default' | 'text' | 'outlined';

export const defaultPropsButton: ButtonProps = {
	children: 'Button',
	variant: 'default',
	loading: false,
	rippleEffect: false,
	theme: {},
};
