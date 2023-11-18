import { DropdownProps } from 'components/Dropdown';
import { Theme } from 'contexts';
import { DeepPartial, Width } from 'types';

export interface SelectProps {
	name: string;
	label?: string;
	placeholder?: string;
	defaultOptionByValue?: string;

	disabled?: boolean;
	options: SelectOption[] | Promise<SelectOption[]>;

	selectProps?: Omit<React.HTMLAttributes<HTMLSelectElement>, 'onChange'>;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
	dropdownProps?: Partial<DropdownProps>;

	theme?: DeepPartial<Theme>;
	width: Width;

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

export const defaultPropsSelect: SelectProps = {
	name: '',
	options: [],
	placeholder: 'Selecione uma opção',
	width: '100%',
};
