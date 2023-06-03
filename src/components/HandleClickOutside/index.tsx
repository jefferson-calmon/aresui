import { useEffect } from 'react';

import * as T from './HandleClickOutside.types';
import { debounce } from 'pandora-tools';

export function HandleClickOutside(props: T.HandleClickOutsideProps) {
	// Effects
	useEffect(() => {
		const d = document;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target;
			const isValid = !props.disabled && target instanceof HTMLElement;

			if (typeof props.elementSelectors === 'string' && isValid) {
				!target.closest(props.elementSelectors) &&
					setTimeout(() => props.onClickOutside(), 1);
			}

			if (Array.isArray(props.elementSelectors) && isValid) {
				const clickedOutside = !props.elementSelectors.some(
					(selector) => target.closest(selector)
				);

				clickedOutside && setTimeout(() => props.onClickOutside(), 1);
			}
		}

		const setup = () => d.addEventListener('click', handleClickOutside);

		debounce(setup, props.delay);

		return () => d.removeEventListener('click', handleClickOutside);
	}, [props]);

	return null;
}

HandleClickOutside.defaultProps = T.defaultPropsHandleClickOutside;

export * from './HandleClickOutside.types';

export default HandleClickOutside;
