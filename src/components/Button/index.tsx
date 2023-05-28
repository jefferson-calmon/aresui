import React, { useMemo } from 'react';

import { config, mergeObjects } from 'pandora-tools';
import { readableColor } from 'polished';

import * as T from './Button.types';
import * as U from './Button.utils';
import Link from 'components/Link';
import Loading from 'components/Loading';
import { useAresUI } from 'contexts';
import { buildClassName } from 'helpers/buildClassName';

import { ButtonContainer } from './Button.styles';

config();

export function Button(props: T.ButtonProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [props.theme]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			U.classBase('variant', props.variant),
			U.classBase(props.className || ''),
			props.loading && U.classBase('loading'),
		];

		return buildClassName(...classes);
	}, [props.variant, props.className, props.loading]);

	const loadingTheme = useMemo(() => {
		let color = readableColor(theme.colors.primary);

		if (props.variant === 'text') color = '#000';
		if (props.variant === 'outlined') color = '#000';

		return {
			colors: {
				primary: color,
			},
		};
	}, [props.variant]);

	// Functions
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		props.onClick?.(event);

		if (props.rippleEffect) U.handleRippleEffect(event);
	}

	return (
		<ButtonContainer
			type="button"
			disabled={props.disabled || !!props.loading}
			{...props}
			theme={theme}
            loading={props.loading}
			className={className}
			onClick={handleClick}
		>
			<span className={`${props.loading ? 'hidden' : ''}`}>
				{props.children}
			</span>

			{props.loading && (
				<div className={U.classBase('loading-indicator')}>
					<Loading
						size={24}
						theme={loadingTheme}
						{...props.loadingProps}
					/>
				</div>
			)}

			{props.linkTo && !props.disabled && (
				<div className={U.classBase('link')}>
					<Link to={props.linkTo} {...props.linkProps} />
				</div>
			)}
		</ButtonContainer>
	);
}

Button.defaultProps = T.defaultPropsButton;

export * from './Button.types';

export default Button;
