/* eslint-disable @typescript-eslint/no-explicit-any */
import { Theme } from 'contexts';

import { Props } from 'react-input-mask';
import { MoneyArgs, validationErrors } from './Input.utils';
import { LoadingProps } from 'components/Loading';
import { DeepPartial } from 'types';

export type ReactInputMaskProps = Props;
type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps extends InputHTMLProps {
	children?: React.ReactNode | JSX.Element;
	name: string;
	label?: string;
	containerClassName?: string;

	role: InputRole;
	mask?: string;
	autoComplete?: InputAutoComplete;
	width: 'auto' | '100%' | `${number}px`;

	value?: InputHTMLProps['value'];
	defaultValue?: InputHTMLProps['defaultValue'];

	theme: DeepPartial<Theme>;
	options: InputPickerOption[];
	error?: string;
	addon?: () => JSX.Element;

	loading?: boolean;
	disabled?: boolean;

	errorPrefix: string;
	disableValidations?: boolean;
	customErrors: Partial<typeof validationErrors>;
	money?: {
		trigger?: 'focus' | 'render';
		args?: MoneyArgs;
	};

	maskProps?: Omit<ReactInputMaskProps, 'mask'>;
	loadingProps?: LoadingProps;

	onChangeValue?: (value: string) => void;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface InputPickerOption {
	value: string;
	disabled?: boolean;
    onClick?: () => void;
}

export type InputAttributes = ReactInputMaskProps & InputHTMLProps;

export type InputAutoComplete =
	| 'on'
	| 'off'
	| 'name'
	| 'honorific-prefix'
	| 'given-name'
	| 'family-name'
	| 'honorific-suffix'
	| 'email'
	| 'username'
	| 'new-password'
	| 'current-password'
	| 'one-time-code'
	| 'organization-title'
	| 'organization'
	| 'street-address'
	| 'address-line1'
	| 'address-line2'
	| 'address-line3'
	| 'address-level4'
	| 'country'
	| 'country-name'
	| 'postal-code'
	| 'cc-name'
	| 'cc-given-name'
	| 'cc-additional-name'
	| 'cc-family-name'
	| 'cc-number'
	| 'cc-exp'
	| 'cc-exp-month'
	| 'cc-exp-year'
	| 'cc-csc'
	| 'cc-type'
	| 'transaction-currency'
	| 'transaction-amount'
	| 'language'
	| 'bday'
	| 'bday-day'
	| 'bday-month'
	| 'bday-year'
	| 'sex'
	| 'tel'
	| 'tel-country-code'
	| 'tel-national'
	| 'tel-area-code'
	| 'tel-local'
	| 'tel-extension'
	| 'impp'
	| 'url'
	| 'photo';

export type InputRole =
	| 'default'
	| 'email'
	| 'tel'
	| 'money'
	| 'cpf'
	| 'url'
	| 'number'
	| 'password'
	| 'cnpj';

export type InputError = any;

export const defaultPropsInput: InputProps = {
	name: 'input',
	label: '',
	role: 'default',
	width: '100%',
	errorPrefix: '',
	theme: {},
	customErrors: {},
	options: [],
	money: {
		trigger: 'focus',
	},
};
