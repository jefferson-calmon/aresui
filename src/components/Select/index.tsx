import React, { useMemo, useState } from 'react';

import { mergeObjects, useBoolean } from 'pandora-tools';

import * as T from './Select.types';
import * as U from './Select.utils';
import * as C from './Select.components';
import Dropdown, { MenuItem } from 'components/Dropdown';
import { useAresUI } from 'contexts/AresUIContext';

import { SelectContainer } from './Select.styles';

export function Select(props: T.SelectProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// Defaults memo vars
	const defaultOption = useMemo(() => {
		if (!props.defaultOptionByValue) return null;

		const option = props.options.find(
			(o) => o.value === props.defaultOptionByValue
		);

		return option ?? null;
	}, [props.options]);

	const dropdownItems = useMemo(() => {
		return props.options.map<MenuItem>((option) => ({
			id: option.value,
			content: option.label,
			onClick: () => {
				setOption(option);
				option.onClick?.(option);
				props.onChange?.(option.value);
			},
		}));
	}, [props.options]);

	// States
	const [option, setOption] = useState<T.SelectOption | null>(defaultOption);

	// Boolean hooks
	const isActiveSelectOptions = useBoolean();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme ?? {});
	}, [props.theme]);

	const placeholder = useMemo(() => {
		const defaultPlaceholder = T.defaultPropsSelect['placeholder'];
		const placeholder = props.placeholder ?? defaultPlaceholder;

		return option ? option.label : placeholder;
	}, [option, props.placeholder]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			props.disabled && U.classBase('disabled'),
			isActiveSelectOptions.value && U.classBase('active'),
		];

		return U.buildClassName(...classes);
	}, [props, isActiveSelectOptions.value]);

	return (
		<SelectContainer
			className={className}
			UITheme={theme}
			width={props.width}
		>
			{props.label && <label>{props.label}</label>}

			<Dropdown
				items={dropdownItems}
				menuWidth="100%"
				onToggle={isActiveSelectOptions.setValue}
			>
				<div className={U.classBase('select')} {...props.wrapperProps}>
					<div className={U.classBase('current')}>
						<span>{placeholder}</span>

						<C.ChevronDownIcon />
					</div>
				</div>
			</Dropdown>

			<select
				name={props.name}
				tabIndex={-1}
				{...props.selectProps}
				required
			>
				{option && <option value={option.value}>{option.value}</option>}
			</select>
		</SelectContainer>
	);
}

Select.defaultProps = T.defaultPropsSelect;

export * from './Select.types';

export default Select;
