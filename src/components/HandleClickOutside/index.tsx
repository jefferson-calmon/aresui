import { useEffect } from 'react';

import { debounce } from 'codekit';

import * as T from './HandleClickOutside.types';

export function HandleClickOutside({
	selectors,
	delay = 300,
	disabled,
	onClickOutside,
}: T.HandleClickOutsideProps) {
	// Effects
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as HTMLElement;

			if (disabled || !target) return;

			const clickedOutside = !selectors.some((selector) => {
				const element = document.querySelector(selector);

				if (target.closest(selector)) return true;
				if (element && element.contains(event.target as Node))
					return true;
			});

			clickedOutside && setTimeout(() => onClickOutside?.(), 1);
		}

		const setup = () =>
			document.addEventListener('click', handleClickOutside);

		debounce(setup, delay);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [delay, disabled, onClickOutside, selectors]);

	return null;
}

export * from './HandleClickOutside.types';

export default HandleClickOutside;
