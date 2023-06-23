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

export const defaultPropsSelect: Required<SelectProps> = {
	name: '',
	options: [
		{
			label: 'Example item 1',
			value: 'example1',
		},
		{
			label: 'Example item 2',
			value: 'example2',
		},
	],
	defaultOptionByValue: 'example1',
	label: 'Example label',
	onChange: () => ({}),
	placeholder: 'Selecione uma opção',
	selectProps: {},
	wrapperProps: {},
	theme: {},
	width: '280px',
	disabled: false,
};
