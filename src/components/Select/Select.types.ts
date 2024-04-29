import { ComponentProps } from 'react';

import { DropdownProps } from 'components/Dropdown';
import { BasePropsWithoutComponentProps, Width } from 'types';

export interface SelectProps extends BasePropsWithoutComponentProps {
	name?: string;
	label?: string;
	placeholder?: string;

	value?: string;
	defaultValue?: string;

	disabled?: boolean;
	searchable?: boolean;
	required?: boolean;
	options: SelectOption[] | Promise<SelectOption[]>;

	selectProps?: Omit<ComponentProps<'select'>, 'onChange'>;
	wrapperProps?: ComponentProps<'div'>;
	dropdownProps?: Partial<DropdownProps>;

	width?: Width;

	onChange?: (value: string) => void;
}

export interface SelectOptionProps {
	option: SelectOption;
	onClick: (option: SelectOption) => void;
}

export interface SelectOption {
	label: string;
	value: string;

	onClick?: (option: SelectOption) => void;
	disabled?: boolean;
}
