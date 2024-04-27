import React, { useMemo, useRef } from 'react';

import { randomString, useBoolean, useEventListener } from 'codekit';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import * as C from './Dropdown.components';
import { HandleClickOutside } from '../';

import { DropdownContainer } from './Dropdown.styles';

export function Dropdown(props: T.DropdownProps) {
	// Boolean hooks
	const isOpen = useBoolean(false);

	// Event listeners
	useEventListener('scroll', handleClose('scroll'));
	useEventListener('resize', handleClose('resize'));

	// Common vars
	let timeout: NodeJS.Timeout;

	// Refs
	const trackId = useRef(randomString(8, { useNumbers: false }));

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			isOpen.value && U.classBase('active'),
			U.classBase(trackId.current),
		];

		return U.buildClassName(...classes);
	}, [isOpen.value, trackId]);

	// Functions
	function handleClick(e: React.MouseEvent) {
		const target = e.target as HTMLElement;

		const clickedOnSearch = !!target.closest('.search');
		if (props.searchable && clickedOnSearch) return;

		const closest = props.disableAutoCloseWhenClosest ?? [];
		if (closest.some((selector) => target.closest(selector))) return;

		const trigger = props.trigger;
		const isAllowed = trigger === 'click' || trigger.includes('click');
		if (!isAllowed) return;

		const newValue = !isOpen.value;

		props.onToggle?.(newValue);

		newValue === true && props.onOpen?.();
		newValue === false && props.onClose?.();

		isOpen.toggle();
	}

	function handleMouseEnter() {
		clearTimeout(timeout);

		const trigger = props.trigger;
		const isAllowed = trigger === 'hover' || trigger.includes('hover');
		if (!isAllowed) return;

		const newValue = true;

		props.onToggle?.(newValue);
		props.onOpen?.();

		isOpen.setValue(newValue);
	}

	function handleMouseOut() {
		const trigger = props.trigger;
		const isAllowed = trigger === 'hover' || trigger.includes('hover');
		if (!isAllowed) return;

		const callback = () => {
			const newValue = false;

			props.onToggle?.(newValue);
			props.onClose?.();

			isOpen.setValue(newValue);
		};

		timeout = setTimeout(callback, 150);
	}

	function handleContextMenu(e: React.MouseEvent) {
		const trigger = props.trigger;
		const isAllowed =
			trigger === 'contextmenu' || trigger.includes('contextmenu');
		if (!isAllowed) return;

		e.preventDefault();

		const newValue = true;

		props.onToggle?.(newValue);
		props.onOpen?.();

		isOpen.setValue(newValue);
	}

	function handleClose(closeTrigger?: T.AutoCloseListeners) {
		const close = () => {
			const newValue = false;

			props.onToggle?.(newValue);
			props.onClose?.();

			isOpen.setValue(newValue);
		};

		// if (typeof closeTrigger === 'undefined') return close();
		if (!closeTrigger) close();
		if (
			!props.autoCloseListeners.includes(
				closeTrigger as T.AutoCloseListeners
			)
		)
			return () => ({});

		return close;
	}

	// Components
	const DropdownMenu = props.customMenu || C.DropdownMenu;

	return (
		<DropdownContainer className={className}>
			<div
				className={U.classBase('children')}
				onClick={handleClick}
				onMouseOver={handleMouseEnter}
				onMouseOut={handleMouseOut}
				onContextMenu={handleContextMenu}
			>
				{props.children}

				{isOpen.value && <DropdownMenu {...props} />}
			</div>

			{isOpen.value && (
				<HandleClickOutside
					elementSelectors={[`.${U.classBase(trackId.current)}`]}
					onClickOutside={handleClose}
				/>
			)}
		</DropdownContainer>
	);
}

Dropdown.defaultProps = T.defaultPropsDropdown;

export * from './Dropdown.types';

export default Dropdown;
