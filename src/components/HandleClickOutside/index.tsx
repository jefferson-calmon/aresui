import { useEffect } from 'react';

import * as T from './HandleClickOutside.types';
import { debounce } from 'codekit';

export function HandleClickOutside(props: T.HandleClickOutsideProps) {
	// Effects
	useEffect(() => {
		const d = document;

		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;

			if (props.disabled || !target) return;

			const clickedOutside = !props.elementSelectors.some((selector) => {
				const element = document.querySelector(selector);

				if (target.closest(selector)) return true;
				if (element && element.contains(event.target as Node))
					return true;
			});

			clickedOutside && setTimeout(() => props.onClickOutside(), 1);
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
