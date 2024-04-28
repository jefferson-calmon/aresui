/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';

import { config } from 'codekit';

import * as T from './Dropdown.types';
import * as U from './Dropdown.utils';
import Link from 'components/Link';

import { DropdownMenuContainer, Div } from './Dropdown.styles';

config();

export function DropdownMenu({
	theme,
	items = [],
	height = '200px',
	width = '220px',
	placement = 'bottom-left',
	searchable = false,
	onChange,
}: T.MenuProps) {
	// States
	const [search, setSearch] = useState<string>('');

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			U.classBase('menu'),
			U.classBase('placement', placement),
		];

		return U.buildClassName(...classes);
	}, [placement]);

	const itemsFiltered = useMemo(() => {
		return items.filter((item) => {
			const isFunction = item instanceof Function;
			const content = String((item as any)?.content);

			if (search && isFunction) return false;

			return content.searchFor(search);
		});
	}, [items, search]);

	// Functions
	function handleClick(item: T.DropdownMenuItem) {
		return (event: React.MouseEvent) => {
			if (item.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			}

			item.onClick?.(item);
			onChange?.(item);
		};
	}

	return (
		<DropdownMenuContainer
			className={className}
			$width={width}
			$height={height}
			$theme={theme}
		>
			{searchable && (
				<div className={`search ${U.classBase('item')}`}>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Pesquisar"
					/>
				</div>
			)}

			{itemsFiltered.map((Item) =>
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

interface DropdownMenuItemProps {
	item: T.DropdownMenuItem;
	onClick: (item: T.DropdownMenuItem) => (event: React.MouseEvent) => void;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
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
