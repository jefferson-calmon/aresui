import React, { useMemo } from 'react';

import { config } from 'codekit';
import { readableColor } from 'polished';

import * as T from './Button.types';
import * as U from './Button.utils';
import Link from 'components/Link';
import Loading from 'components/Loading';
import { useTheme } from 'hooks/useTheme';
import { useComponentId } from 'hooks/useComponentId';
import { buildClassName } from 'helpers/buildClassName';
import { filterHTMLProps } from 'helpers/filterHTMLProps';

import { ButtonContainer } from './Button.styles';

config();

export function Button({
	children = 'Button',
	loading = false,
	disabled,
	rippleEffect = true,
	variant = 'default',
	linkTo,
	theme: componentTheme,
	size = 'normal',
	linkProps,
	loadingProps,
	...props
}: T.ButtonProps): JSX.Element {
	// Hooks
	const theme = useTheme(componentTheme);
	const componentId = useComponentId('button');

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			componentId,
			U.classBase(),
			U.classBase('variant', variant),
			U.classBase('size', size),
			U.classBase(props.className || ''),
			loading && U.classBase('loading'),
		];

		return buildClassName(...classes);
	}, [componentId, props.className, loading, size, variant]);

	const loadingTheme = useMemo(() => {
		let color = readableColor(theme.colors.primary);

		if (variant === 'text') color = '#000';
		if (variant === 'outlined') color = '#000';

		return {
			colors: {
				primary: color,
			},
		};
	}, [variant, theme.colors.primary]);

	// Functions
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		props.onClick?.(event);

		if (rippleEffect) U.handleRippleEffect(event, componentId);
	}

	return (
		<ButtonContainer
			type="button"
			disabled={disabled || !!loading}
			{...filterHTMLProps(props)}
			$theme={theme}
			$loading={loading ? 'true' : undefined}
			className={className}
			onClick={handleClick}
		>
			<span data-hidden={!!loading}>{children}</span>

			{loading && (
				<div className={U.classBase('loading-indicator')}>
					<Loading
						type="spinner"
						size={24}
						theme={loadingTheme}
						{...loadingProps}
					/>
				</div>
			)}

			{linkTo && !disabled && (
				<div className={U.classBase('link')}>
					<Link to={linkTo} {...linkProps} />
				</div>
			)}
		</ButtonContainer>
	);
}

export * from './Button.types';

export default Button;
