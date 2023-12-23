import React, { useMemo, useState, useEffect } from 'react';

import { mergeObjects, useBoolean } from 'codekit';

import * as T from './Select.types';
import * as U from './Select.utils';
import * as C from './Select.components';
import Dropdown, { DropdownMenuItem } from 'components/Dropdown';
import Loading from 'components/Loading';
import { useAresUI } from 'contexts/AresUIContext';
import { isPromise } from 'helpers/isPromise';

import { SelectContainer } from './Select.styles';

export function Select(props: T.SelectProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// States
	const [options, setOptions] = useState<T.SelectOption[]>([]);
	const [option, setOption] = useState<T.SelectOption | null>(null);

	// Boolean hooks
	const isActiveSelectOptions = useBoolean();
	const isLoading = useBoolean(isPromise(props.options));

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme ?? {});
	}, [aresUI.theme, props.theme]);

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
				} as DropdownMenuItem,
			];

		return options.map<DropdownMenuItem>((option) => ({
			id: option.value,
			content: option.label,
			onClick: () => {
				setOption(option);
				option.onClick?.(option);
				props.onChange?.(option.value);
			},
		}));
	}, [isLoading.value, options, props]);

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
	}, [isLoading, props.options]);

	useEffect(() => {
		if (option || !props.defaultOptionByValue) return;

		const defaultOption = options.find(
			(o) => o.value === props.defaultOptionByValue
		);

		defaultOption && setOption(defaultOption);
	}, [options, option, props.defaultOptionByValue]);

	return (
		<SelectContainer
			className={className}
			UITheme={theme}
			width={props.width}
		>
			{props.label && <label>{props.label}</label>}

			<Dropdown
				items={dropdownItems}
				width="100%"
				height="160px"
				onToggle={isActiveSelectOptions.setValue}
				{...(props.dropdownProps ?? {})}
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
