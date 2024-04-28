import React, { useMemo } from 'react';

import { useBoolean, useEventListener } from 'codekit';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import * as C from './Dropdown.components';
import { HandleClickOutside } from '../';

import { DropdownContainer } from './Dropdown.styles';
import { useComponentId } from 'hooks/useComponentId';
import { useTheme } from 'hooks/useTheme';

export function Dropdown({
	items = [],
	height = '200px',
	width = '220px',
	placement = 'bottom-left',
	trigger = 'click',
	searchable = false,
	autoCloseListeners = ['resize', 'scroll'],
	disableAutoCloseWhenClosest = [],
	customMenu,
	onOpen,
	onClose,
	onToggle,
	onChange,
	children = T.defaultPropsDropdownChildren,
	...props
}: T.DropdownProps) {
	// Hooks
	const componentId = useComponentId('dropdown');
	const theme = useTheme(props.theme);

	// Boolean hooks
	const isOpen = useBoolean(false);

	// Event listeners
	useEventListener('scroll', handleClose('scroll'));
	useEventListener('resize', handleClose('resize'));

	// Common vars
	let mouseStateTimeout: NodeJS.Timeout;

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			componentId,
			U.classBase(),
			isOpen.value && U.classBase('active'),
		];

		return U.buildClassName(...classes);
	}, [isOpen.value, componentId]);

	// Functions
	function handleClick(e: React.MouseEvent) {
		const target = e.target as HTMLElement;

		const clickedOnSearch = !!target.closest('.search');
		if (searchable && clickedOnSearch) return;

		const closest = disableAutoCloseWhenClosest;
		if (closest.some((selector) => target.closest(selector))) return;

		const isAllowed = trigger === 'click' || trigger.includes('click');
		if (!isAllowed) return;

		const newValue = !isOpen.value;

		onToggle?.(newValue);

		newValue === true && onOpen?.();
		newValue === false && onClose?.();

		isOpen.toggle();
	}

	function handleMouseEnter() {
		clearTimeout(mouseStateTimeout);

		const isAllowed = trigger === 'hover' || trigger.includes('hover');
		if (!isAllowed) return;

		const newValue = true;

		onToggle?.(newValue);
		onOpen?.();

		isOpen.setValue(newValue);
	}

	function handleMouseOut() {
		const isAllowed = trigger === 'hover' || trigger.includes('hover');
		if (!isAllowed) return;

		const callback = () => {
			const newValue = false;

			onToggle?.(newValue);
			onClose?.();

			isOpen.setValue(newValue);
		};

		mouseStateTimeout = setTimeout(callback, 150);
	}

	function handleContextMenu(e: React.MouseEvent) {
		const isAllowed =
			trigger === 'contextmenu' || trigger.includes('contextmenu');
		if (!isAllowed) return;

		e.preventDefault();

		const newValue = true;

		onToggle?.(newValue);
		onOpen?.();

		isOpen.setValue(newValue);
	}

	function handleClose(closeTrigger?: T.AutoCloseListeners) {
		const close = () => {
			const newValue = false;

			onToggle?.(newValue);
			onClose?.();

			isOpen.setValue(newValue);
		};

		// if (typeof closeTrigger === 'undefined') return close();
		if (!closeTrigger) close();
		if (!autoCloseListeners.includes(closeTrigger as T.AutoCloseListeners))
			return () => ({});

		return close;
	}

	// Components
	const DropdownMenu = customMenu || C.DropdownMenu;

	return (
		<DropdownContainer className={className}>
			<div
				className={U.classBase('children')}
				onClick={handleClick}
				onMouseOver={handleMouseEnter}
				onMouseOut={handleMouseOut}
				onContextMenu={handleContextMenu}
			>
				{children}

				{isOpen.value && (
					<DropdownMenu
						theme={theme}
						items={items}
						height={height}
						width={width}
						placement={placement}
						searchable={searchable}
						onChange={onChange}
					/>
				)}
			</div>

			{isOpen.value && (
				<HandleClickOutside
					elementSelectors={[`.${componentId}`]}
					onClickOutside={handleClose}
				/>
			)}
		</DropdownContainer>
	);
}

export * from './Dropdown.types';

export default Dropdown;
