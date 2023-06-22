import React, { useMemo, useState, useEffect } from 'react';

import { mergeObjects, useBoolean } from 'pandora-tools';

import * as T from './Select.types';
import * as U from './Select.utils';
import * as C from './Select.components';
import Dropdown, { MenuItem } from 'components/Dropdown';
import Loading from 'components/Loading';
import { useAresUI } from 'contexts/AresUIContext';
import { isPromise } from 'helpers/isPromise';

import { SelectContainer } from './Select.styles';

export function Select(props: T.SelectProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// Defaults memo vars

	// States
	const [options, setOptions] = useState<T.SelectOption[]>([]);

	const defaultOption = useMemo(() => {
		if (!props.defaultOptionByValue) return null;

		const option = options.find(
			(o) => o.value === props.defaultOptionByValue
		);

		return option ?? null;
	}, [options]);

	const [option, setOption] = useState<T.SelectOption | null>(defaultOption);

	// Boolean hooks
	const isActiveSelectOptions = useBoolean();
	const isLoading = useBoolean(isPromise(props.options));

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

	const dropdownItems = useMemo(() => {
		if (isLoading.value)
			return [
				{
					id: '',
					content: (
						<>
							<Loading size={18} />
							&nbsp;&nbsp;Loading
						</>
					),
				} as MenuItem,
			];

		return options.map<MenuItem>((option) => ({
			id: option.value,
			content: option.label,
			onClick: () => {
				setOption(option);
				option.onClick?.(option);
				props.onChange?.(option.value);
			},
		}));
	}, [options]);

	// Effects
	useEffect(() => {
		async function loadOptions() {
			if (Array.isArray(props.options)) {
				setOptions(props.options);
			} else {
				const resolvedOptions = await props.options;

				isLoading.setFalse();
				setOptions(resolvedOptions);
			}
		}

		loadOptions();
	}, [props.options]);

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
