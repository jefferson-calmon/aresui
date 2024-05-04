import { BaseProps, Width } from 'types';

export interface TextAreaProps extends BaseProps<'textarea'> {
	label?: string;

	width?: Width;

	disabled?: boolean;
	errorPrefix?: string;
}
