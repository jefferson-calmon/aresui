import React, { useMemo } from 'react';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import Link from 'components/Link';
import { useAresUI } from 'contexts';
import { mergeObjects } from 'pandora-tools';

import { DropdownMenuContainer } from './Dropdown.styles';

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
	}, [props.theme]);

	// Functions
	function handleClick(item: T.MenuItem) {
		return (event: React.MouseEvent<HTMLAnchorElement>) => {
			if (item.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			}

			item.onClick?.(item);
		};
	}

	return (
		<DropdownMenuContainer
			className={className}
			width={props.menuWidth || ''}
			UITheme={theme}
		>
			{(props.items || []).map((item) => (
				<Link
					key={item.id}
					to={item.linkTo || '#'}
					className={U.classBase('item')}
					onClick={handleClick(item)}
				>
					{item.content}
				</Link>
			))}
		</DropdownMenuContainer>
	);
}

DropdownMenu.defaultProps = T.defaultPropsDropdown;
