import React, { useMemo } from 'react';

import { useBoolean, useEventListener } from 'pandora-tools';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import * as C from './Dropdown.components';
import { HandleClickOutside } from '../';

import { DropdownContainer } from './Dropdown.styles';

export function Dropdown(props: T.DropdownProps) {
	// Boolean hooks
	const isOpen = useBoolean(false);

	// Event listeners
	useEventListener('scroll', isOpen.setFalse);
	useEventListener('resize', isOpen.setFalse);

	// Common vars
	let timeout: NodeJS.Timeout;

	// Memo vars
	const className = useMemo(() => {
		const classes = [U.classBase(), isOpen.value && U.classBase('active')];

		return U.buildClassName(...classes);
	}, [props]);

	// Functions
	function handleClick() {
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
					elementSelectors={[`.${U.classBase()}`]}
					onClickOutside={isOpen.setFalse}
				/>
			)}
		</DropdownContainer>
	);
}

Dropdown.defaultProps = T.defaultPropsDropdown;

export * from './Dropdown.types';

export default Dropdown;
