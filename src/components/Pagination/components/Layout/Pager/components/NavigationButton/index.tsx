import React, { useMemo } from 'react';

import { classBase } from 'components/Pagination/Pagination.utils';
import { usePagination } from 'components/Pagination/Pagination.context';
import { buildClassName } from 'helpers/buildClassName';
import { ChevronLeft, ChevronRight } from 'icons';

interface NavigationButtonProps {
	type: ButtonType;
}

type ButtonType = 'prev' | 'next';

const ICONS: Record<ButtonType, () => JSX.Element> = {
	next: ChevronRight,
	prev: ChevronLeft,
};

function NavigationButton(props: NavigationButtonProps) {
	// Hooks
	const pagination = usePagination();

	// Memo vars
	const button = useMemo(() => {
		const { customNextIcon, customPrevIcon } = pagination.props;

		const customIcon =
			props.type === 'next' ? customNextIcon : customPrevIcon;

		const disabled =
			props.type === 'next' ? !pagination.canNext : !pagination.canPrev;

		const onNavigate =
			props.type === 'next' ? pagination.onNext : pagination.onPrev;

		const allowed =
			props.type === 'next'
				? pagination.props.next
				: pagination.props.prev;

		return {
			icon: customIcon ?? ICONS[props.type],
			disabled,
			onNavigate,
			allowed,
		};
	}, [pagination, props.type]);

	const className = useMemo(() => {
		const classes = [
			classBase('button'),
			classBase('button', props.type),
			button.disabled && classBase('button', 'disabled'),
		];

		return buildClassName(...classes);
	}, [props.type, button]);

    if (!button.allowed) return null;

	return (
		<button
			className={className}
			disabled={pagination.props.disabled || button.disabled}
			onClick={button.onNavigate}
		>
			<button.icon />
		</button>
	);
}

export default NavigationButton;
