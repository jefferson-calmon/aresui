import React, { useMemo } from 'react';

import { useBoolean, debounce } from 'codekit';

import * as T from './TextArea.types';
import * as U from './TextArea.utils';
import Errors from 'components/Errors';
import { useError } from 'hooks/useError';
import { useTheme } from 'hooks/useTheme';
import { buildClassName } from 'helpers/buildClassName';

import { TextAreaContainer } from './TextArea.styles';

export function TextArea({
	name = 'textarea',
	label,
	width = '100%',
	disabled = false,
	required = true,
	errorPrefix,
	...props
}: T.TextAreaProps): JSX.Element {
	// Hooks
	const error = useError();
	const theme = useTheme(props.theme);

	// Boolean hooks
	const isFocused = useBoolean();

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			disabled && U.classBase('disabled'),
			isFocused.value && U.classBase('focused'),
		];

		return buildClassName(...classes);
	}, [disabled, isFocused.value]);

	// Functions
	function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
		props.onFocus?.(event);
		isFocused.setTrue();
	}

	function handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
		props.onBlur?.(event);
		debounce(isFocused.setFalse, 50);
	}

	return (
		<TextAreaContainer className={className} $theme={theme} $width={width}>
			{label && <label>{label}</label>}

			<div className={U.classBase('container')}>
				<textarea
					required={required}
					{...props}
					name={name}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>

			<Errors errors={error.errors} prefix={errorPrefix} />

			{props.children}
		</TextAreaContainer>
	);
}

export * from './TextArea.types';

export default TextArea;
