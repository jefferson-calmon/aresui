/* eslint-disable @typescript-eslint/no-explicit-any */

import { LinkProps } from 'components/Link';
import { LoadingProps } from 'components/Loading';
import { Theme } from 'contexts';
import { BaseProps, DeepPartial } from 'types';

export interface ButtonProps extends BaseProps<'button'> {
	loading?: boolean;
	disabled?: boolean;
	rippleEffect?: boolean;

	variant?: ButtonVariant;
	size?: ButtonSize;

	linkTo?: LinkProps['to'];

	linkProps?: LinkProps;
	loadingProps?: LoadingProps;
	theme?: DeepPartial<Theme>;
}

export type ButtonVariant = 'default' | 'text' | 'outlined' | 'secondary';
export type ButtonSize = 'large' | 'normal' | 'small' | 'x-small';
