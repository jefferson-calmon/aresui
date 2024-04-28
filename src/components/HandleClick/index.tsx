import { useEffect } from 'react';

import * as T from './HandleClick.types';

export function HandleClick(props: T.HandleClickProps) {
	// Effects
	useEffect(() => {
		if (props.disabled) return;

		const elements = props.selectors
			.map((selector) => document.querySelectorAll<HTMLElement>(selector))
			.map((nodeList) => Array.from(nodeList))
			.flat();

		elements.forEach((element) => {
			element.addEventListener('click', () => props.onClick?.());
		});

		return () => {
			elements.forEach((element) => {
				element.removeEventListener('click', () => props.onClick?.());
			});
		};
	}, [props]);

	return null;
}

export * from './HandleClick.types';

export default HandleClick;
