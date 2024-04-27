import React, { useMemo } from 'react';

import { config, merge, randomString } from 'codekit';
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
		return merge(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	const identifier = useMemo(() => {
		return randomString(16, {
			useNumbers: false,
			useSpecialCharacters: false,
		});
	}, []);

	const className = useMemo(() => {
		const classes = [
			identifier,
			U.classBase(),
			U.classBase('variant', props.variant),
			U.classBase('size', props.size),
			U.classBase(props.className || ''),
			props.loading && U.classBase('loading'),
		];

		return buildClassName(...classes);
	}, [identifier, props.className, props.loading, props.size, props.variant]);

	const loadingTheme = useMemo(() => {
		let color = readableColor(theme.colors.primary);

		if (props.variant === 'text') color = '#000';
		if (props.variant === 'outlined') color = '#000';

		return {
			colors: {
				primary: color,
			},
		};
	}, [props.variant, theme.colors.primary]);

	// Functions
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		props.onClick?.(event);

		if (props.rippleEffect) U.handleRippleEffect(event, identifier);
	}

	return (
		<ButtonContainer
			type="button"
			disabled={props.disabled || !!props.loading}
			{...props}
			$theme={theme}
			$loading={props.loading ? 'true' : undefined}
			className={className}
			onClick={handleClick}
		>
			<span className={`${props.loading ? 'hidden' : ''}`}>
				{props.children}
			</span>

			{props.loading && (
				<div className={U.classBase('loading-indicator')}>
					<Loading
                        type="spinner"
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
