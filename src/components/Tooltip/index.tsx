import React from 'react';

import * as T from './Tooltip.types';
import * as U from './Tooltip.utils';

import { TooltipContainer } from './styles';

export function Tooltip({
	role,
	position = 'top',
	label,
	disabled = false,
	size = 'fit',
	children,
}: T.TooltipProps) {
	return (
		<TooltipContainer
			className={U.classBase()}
			style={{
				width: 'fit-content',
			}}
		>
			<div
				role={!disabled ? 'tooltip' : role}
				aria-label={label}
				data-tooltip-position={position}
				data-tooltip-size={size}
				style={{
					width: 'fit-content',
				}}
			>
				{children}
			</div>
		</TooltipContainer>
	);
}

export * from './Tooltip.types';

export default Tooltip;
