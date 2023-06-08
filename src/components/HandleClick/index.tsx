import { useEffect } from 'react';

import * as T from './HandleClick.types';

export function HandleClick(props: T.HandleClickProps) {
	// Effects
	useEffect(() => {
		const d = document;
		const selectors = props.elementSelectors;

		if (props.disabled) return;

		selectors.forEach((selector) => {
			const elements = Array.from(d.querySelectorAll(selector));

			elements.forEach((element) => {
				element.addEventListener('click', props.onClick);
			});
		});

		return () => {
			selectors.forEach((selector) => {
				const elements = Array.from(d.querySelectorAll(selector));
				elements.forEach((element) => {
					element.removeEventListener('click', props.onClick);
				});
			});
		};
	}, [props]);

	return null;
}

HandleClick.defaultProps = T.defaultPropsHandleClick;

export * from './HandleClick.types';

export default HandleClick;
