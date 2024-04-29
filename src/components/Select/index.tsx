import React, { useMemo, useState, useEffect } from 'react';

import { useBoolean, useControlledState } from 'codekit';

import * as T from './Select.types';
import * as U from './Select.utils';
import * as Icons from 'icons';
import Dropdown, { DropdownMenuItem } from 'components/Dropdown';
import Loading from 'components/Loading';
import Tooltip from 'components/Tooltip';
import { useTheme } from 'hooks/useTheme';
import { isPromise } from 'helpers/isPromise';

import { SelectContainer } from './Select.styles';

export function Select({
	name = 'select',
	label,
	placeholder = 'Selecione uma opção',
	value: propValue,
	defaultValue,
	disabled = false,
	searchable = false,
	required = true,
	options: propOptions = [],
	selectProps = {},
	wrapperProps = {},
	dropdownProps = {},
	width = '100%',
	onChange,
	...props
}: T.SelectProps) {
	// Hooks
	const theme = useTheme(props.theme);

	// States
	const [options, setOptions] = useState<T.SelectOption[]>([]);
	const [value, setValue] = useControlledState(propValue, defaultValue);

	// Boolean hooks
	const isActiveSelectOptions = useBoolean();
	const isLoading = useBoolean(isPromise(propOptions));

	// Memo vars
	const option = useMemo(() => {
		return options.find((o) => o.value === value);
	}, [options, value]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			disabled && U.classBase('disabled'),
			isActiveSelectOptions.value && U.classBase('active'),
		];

		return U.buildClassName(...classes);
	}, [disabled, isActiveSelectOptions.value]);

	const items = useMemo(() => {
		if (isLoading.value)
			return [
				{
					id: '',
					content: (
						<>
							<Loading type="spinner" size={18} />
							&nbsp;&nbsp;Loading
						</>
					),
				} as DropdownMenuItem,
			];

		return options.map<DropdownMenuItem>((option) => ({
			id: option.value,
			content: option.label,
			onClick: () => {
				setValue(option.value);
				onChange?.(option.value);
				option.onClick?.(option);
			},
		}));
	}, [isLoading.value, onChange, options, setValue]);

	// Effects
	useEffect(() => {
		async function loadOptions() {
			if (Array.isArray(propOptions)) {
				setOptions(propOptions);
			} else {
				const resolvedOptions = await propOptions;

				isLoading.setFalse();
				setOptions(resolvedOptions);
			}
		}

		loadOptions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [propOptions]);

	// Functions
	function handleClickIcon() {
		if (option) {
			setValue('');
			onChange?.('');
		}
	}

	return (
		<SelectContainer className={className} $theme={theme} $width={width}>
			{label && <label>{label}</label>}

			<Dropdown
				items={items}
				width="100%"
				height="160px"
				searchable={!!searchable}
				onToggle={isActiveSelectOptions.setValue}
				{...(dropdownProps ?? {})}
			>
				<div className={U.classBase('select')} {...wrapperProps}>
					<div className={U.classBase('current')}>
						<span>{option ? option.label : placeholder}</span>

						<div className="icon" onClick={handleClickIcon}>
							<Tooltip label="Limpar" disabled={!option}>
								{option ? (
									<Icons.X />
								) : (
									<Icons.SelectChevronDown />
								)}
							</Tooltip>
						</div>
					</div>
				</div>
			</Dropdown>

			<select
				name={name}
				tabIndex={-1}
				{...selectProps}
				required={required}
			>
				{option && <option value={option.value}>{option.value}</option>}
			</select>
		</SelectContainer>
	);
}

export * from './Select.types';

export default Select;
