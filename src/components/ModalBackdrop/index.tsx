import React, { useEffect } from 'react';

import { useKeyPress } from 'codekit';

import * as T from './ModalBackdrop.types';
import * as U from './ModalBackdrop.utils';
import HandleClickOutside from 'components/HandleClickOutside';

import { BackdropContainer } from './ModalBackdrop.styles';

export function ModalBackdrop(props: T.ModalBackdropProps): JSX.Element {
	// Hooks
	const escapeKeyPressed = useKeyPress('Escape');

	useEffect(() => {
		if (props.disableScrollLock) return;

		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [props.disableScrollLock]);

	useEffect(() => {
		if (!escapeKeyPressed) return;

		props.onClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [escapeKeyPressed]);

	return (
		<>
			<BackdropContainer className={U.classBase()} />

			{props.modalSelector && (
				<HandleClickOutside
					selectors={[props.modalSelector]}
					onClickOutside={props.onClose}
					{...(props.clickOutsideProps || {})}
				/>
			)}
		</>
	);
}

export * from './ModalBackdrop.types';

export default ModalBackdrop;
