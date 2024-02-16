import React from 'react';

import * as T from './Tooltip.types';
import * as U from './Tooltip.utils';

import 'microtip/microtip.css';

export function Tooltip(props: T.TooltipProps) {
	return (
		<div
			className={U.classBase()}
			role={!props.disabled ? 'tooltip' : props.role}
			aria-label={props.label}
			data-microtip-position={props.position}
			data-microtip-size={props.size}
			style={{
				width: 'fit-content',
			}}
		>
			{props.children}
		</div>
	);
}

Tooltip.defaultProps = T.defaultPropsTooltip;

export * from './Tooltip.types';

export default Tooltip;
