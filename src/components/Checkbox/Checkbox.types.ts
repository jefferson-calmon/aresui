import { BaseProps } from 'types';

export interface CheckboxProps extends Omit<BaseProps<'input'>, 'onChange'> {
	label?: string | React.ElementType;

	size?: number;

	disabled?: boolean;
	checked?: boolean;

	onChange?: (
		checked: boolean,
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}
