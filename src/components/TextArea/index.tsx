import React, { useMemo } from 'react';

import { merge, useBoolean, debounce } from 'codekit';

import * as T from './TextArea.types';
import * as U from './TextArea.utils';
import * as C from './TextArea.components';
import { useAresUI } from 'contexts';
import { useError } from 'hooks/useError';
import { buildClassName } from 'helpers/buildClassName';

import { TextAreaContainer } from './TextArea.styles';

export function TextArea(props: T.TextAreaProps): JSX.Element {
	// Hooks
	const error = useError();
	const aresUI = useAresUI();

	// Boolean hooks
	const isFocused = useBoolean();

	// Memo vars
	const theme = useMemo(() => {
		return merge(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			props.disabled && U.classBase('disabled'),
			isFocused.value && U.classBase('focused'),
		];

		return buildClassName(...classes);
	}, [props, isFocused.value]);

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
		<TextAreaContainer
			className={className}
			$theme={theme}
			$width={props.width}
		>
			{props.label && <label>{props.label}</label>}

			<div className={U.classBase('TextArea-container')}>
				<textarea
					required
					{...props}
					name={props.name}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>

			<C.Errors errors={error.errors} errorPrefix={props.errorPrefix} />

			{props.children}
		</TextAreaContainer>
	);
}

TextArea.defaultProps = T.defaultPropsTextArea;

export * from './TextArea.types';

export default TextArea;
