import React, { useMemo } from 'react';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import Link from 'components/Link';
import { useAresUI } from 'contexts';
import { mergeObjects } from 'codekit';

import { DropdownMenuContainer, Div } from './Dropdown.styles';

export function DropdownMenu(props: T.DropdownProps) {
	// Hooks
	const aresUI = useAresUI();

	// Memo vars
	const className = useMemo(() => {
		const placement = props.placement || 'bottom-center';

		const classes = [
			U.classBase('menu'),
			props.menuSelector,
			U.classBase('placement', placement),
		];

		return U.buildClassName(...classes);
	}, [props]);

	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	// Functions
	function handleClick(item: T.DropdownMenuItem) {
		return (event: React.MouseEvent) => {
			if (item.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			}

			item.onClick?.(item);
			props.onChange?.(item);
		};
	}

	return (
		<DropdownMenuContainer
			className={className}
			width={props.menuWidth || ''}
			UITheme={theme}
		>
			{(props.items || []).map((item) => (
				<DropdownMenuItem
					key={item.id}
					item={item}
					onClick={handleClick}
				/>
			))}
		</DropdownMenuContainer>
	);
}

function DropdownMenuItem(props: T.DropdownMenuItemProps) {
	// Common vars
	const baseProps = {
		className: U.classBase('item'),
		onClick: props.onClick(props.item),
	};

	// Memo vars
	const isLink = useMemo(() => !!props.item.linkTo, [props.item.linkTo]);

	return (
		<>
			{isLink && <Link {...baseProps} to={props.item.linkTo} />}
			{!isLink && <Div {...baseProps} />}
		</>
	);
}

DropdownMenu.defaultProps = T.defaultPropsDropdown;
