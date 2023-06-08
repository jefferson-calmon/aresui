import { Theme } from 'contexts';

import { DeepPartial } from 'types';

type TextAreaHTMLProps = React.HTMLAttributes<HTMLTextAreaElement>;

export interface TextAreaProps extends TextAreaHTMLProps {
	name: string;
	label?: string;

	theme: DeepPartial<Theme>;
	width: 'auto' | '100%' | `${number}px`;

	disabled?: boolean;
	errorPrefix?: string;
}

export const defaultPropsTextArea: TextAreaProps = {
	name: 'TextArea',
	label: 'TextArea',
	theme: {},
	width: '280px',
};
