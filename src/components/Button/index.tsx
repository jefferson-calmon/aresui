/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';

import { config, mergeObjects, useBoolean } from 'pandora-tools';

import * as T from './Button.types';
import Link from 'components/Link';
import Loading from 'components/Loading';
import { useNextUI } from 'contexts/NextUiContext';

import { ButtonContainer } from './Button.styles';
import { readableColor } from 'polished';

config();

export function Button(props: T.ButtonProps): JSX.Element {
	// Hooks
	const nextUI = useNextUI();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(nextUI.theme, props.theme);
	}, [props.theme]);

	const className = useMemo(() => {
		const classes = ['nextui-button', props.variant, props.className]
			.compact()
			.uniq()
			.join(' ');

		return classes;
	}, [props.variant, props.className]);

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

		if (props.rippleEffect) {
			const button = event.currentTarget;
			const buttonRect = button.getBoundingClientRect();

			const rippleSize = Math.max(buttonRect.width, buttonRect.height);
			const rippleX = event.clientX - buttonRect.left - rippleSize / 2;
			const rippleY = event.clientY - buttonRect.top - rippleSize / 2;

			const ripple = document.createElement('div');

			ripple.className = 'ripple';
			ripple.style.top = rippleY + 'px';
			ripple.style.left = rippleX + 'px';
			ripple.style.width = rippleSize + 'px';
			ripple.style.height = rippleSize + 'px';

			document.querySelector('.nextui-button')?.appendChild(ripple);

			setTimeout(() => ripple.remove(), 600);
		}
	}

	return (
		<ButtonContainer
			type="button"
			disabled={props.disabled || !!props.loading}
			{...props}
			theme={theme}
			className={className}
			onClick={handleClick}
		>
			<span className={`${props.loading ? 'hidden' : ''}`}>
				{props.children}
			</span>

			{props.loading && (
				<div className="loading-indicator">
					<Loading
						size={24}
						theme={loadingTheme}
						{...props.loadingProps}
					/>
				</div>
			)}

			{props.linkTo && !props.disabled && (
				<Link to={props.linkTo} className="link" {...props.linkProps} />
			)}
		</ButtonContainer>
	);
}

Button.defaultProps = T.defaultProps;

export * from './Button.types';

export default Button;
