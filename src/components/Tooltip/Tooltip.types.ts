import { HTMLAttributes } from 'react';

export interface TooltipProps {
	role?: HTMLAttributes<HTMLElement>['role'];
	children: JSX.Element | React.ReactNode;

	label: string;
	disabled?: boolean;

	position?: TooltipPosition;
	size?: TooltipSize;
}

export type TooltipPosition =
	| 'top'
	| 'top-left'
	| 'top-right'
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'left'
	| 'right';

export type TooltipSize = 'small' | 'medium' | 'large' | 'fit';
