/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';

import { config, mergeObjects } from 'codekit';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import Link from 'components/Link';
import { useAresUI } from 'contexts';

import { DropdownMenuContainer, Div } from './Dropdown.styles';

config();

export function DropdownMenu(props: T.DropdownProps) {
	// Hooks
	const aresUI = useAresUI();

	// States
	const [search, setSearch] = useState<string>('');

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

	const items = useMemo(() => {
		return (props.items ?? []).filter((item) => {
			const isFunction = item instanceof Function;
			const content = String((item as any)?.content);

			if (search && isFunction) return false;

			return content.searchFor(search);
		});
	}, [props.items, search]);

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
			$width={props.width || ''}
			$height={props.height || ''}
			$theme={theme}
		>
			{props.searchable && (
				<div className={`search ${U.classBase('item')}`}>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Pesquisar"
					/>
				</div>
			)}

			{items.map((Item) =>
				!(Item instanceof Function) ? (
					<DropdownMenuItem
						key={Item.id}
						item={Item}
						onClick={handleClick}
					/>
				) : (
					<Item />
				)
			)}
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
			{isLink && (
				<Link {...baseProps} to={props.item.linkTo}>
					{props.item.content}
				</Link>
			)}

			{!isLink && <Div {...baseProps}>{props.item.content}</Div>}
		</>
	);
}

DropdownMenu.defaultProps = T.defaultPropsDropdown;
