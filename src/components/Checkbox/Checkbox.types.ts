import { ComponentProps, InputHTMLAttributes } from 'types';

type BaseProps = ComponentProps<InputHTMLAttributes>;

export interface CheckboxProps extends Omit<BaseProps, 'onChange'> {
	name: string;
	label?: string | React.ElementType;

	size: number;

	disabled?: boolean;
	checked?: boolean;

	onChange?: (
		checked: boolean,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	onClick?: InputHTMLAttributes['onClick'];
}

export const defaultPropsCheckbox: CheckboxProps = {
	name: '',
	label: 'Checkbox',
	size: 16,
	theme: {},
};
