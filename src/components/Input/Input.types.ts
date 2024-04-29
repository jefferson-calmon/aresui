/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props as ReactInputMaskProps } from 'react-input-mask';

import { MoneyArgs, validationErrors } from './Input.utils';
import { LoadingProps } from 'components/Loading';
import { BaseProps } from 'types';

export interface InputProps extends BaseProps<'input'> {
	label?: string;

	mode?: BaseProps<'input'>['inputMode'];
	role?: InputRole;
	mask?: string;
	autoComplete?: InputAutoComplete;
	width?: 'auto' | '100%' | `${number}px`;

	options?: InputPickerOption[];
	error?: string;
	addon?: () => JSX.Element;

	loading?: boolean;
	disabled?: boolean;

	errorPrefix?: string;
	disableValidations?: boolean;
	customErrors?: Partial<typeof validationErrors>;
	currency?: {
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

	children?: React.ReactNode | JSX.Element;
}

export interface InputPickerOption {
	value: string;
	disabled?: boolean;
	onClick?: () => void;
}

export type InputAttributes = ReactInputMaskProps &
	Omit<BaseProps<'input'>, 'theme'>;

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
	| 'phone'
	| 'currency'
	| 'cpf'
	| 'url'
	| 'number'
	| 'password'
	| 'cnpj';

export type InputError = any;
