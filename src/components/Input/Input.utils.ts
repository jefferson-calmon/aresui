import {
	validateByRegex,
	validateCnpj,
	validateCpf,
	validateEmail,
	validatePhoneNumber,
} from 'codekit';
import {
	InputAttributes,
	InputAutoComplete,
	InputProps,
	InputRole,
} from './Input.types';
import { baseClass } from 'helpers/baseClass';

export const validationErrors: Record<InputRole, string> = {
	default: 'Entrada inválida.',
	email: 'O email fornecido não é válido.',
	phone: 'O número de telefone fornecido não é válido.',
	currency: 'O valor monetário fornecido não é válido.',
	cpf: 'O CPF fornecido não é válido.',
	url: 'A URL fornecida não é válida.',
	number: 'O número fornecido não é válido.',
	password: 'A senha fornecida não é válida.',
	cnpj: 'O CNPJ fornecido não é válido.',
};

export const classBase = baseClass('Input');

export function getDefaultInputType(role: InputRole) {
	let type: React.HTMLInputTypeAttribute = 'text';

	if (role === 'default') type = 'text';
	if (role === 'email') type = 'email';
	if (role === 'phone') type = 'tel';
	if (role === 'currency') type = 'text';
	if (role === 'cpf') type = 'text';
	if (role === 'cnpj') type = 'text';
	if (role === 'url') type = 'url';
	if (role === 'number') type = 'number';
	if (role === 'password') type = 'password';

	return type;
}

export function getDefaultInputMode(role: InputRole) {
	let mode: React.HTMLAttributes<HTMLInputElement>['inputMode'] = 'text';

	if (role === 'default') mode = 'text';
	if (role === 'email') mode = 'email';
	if (role === 'phone') mode = 'tel';
	if (role === 'currency') mode = 'numeric';
	if (role === 'cpf') mode = 'numeric';
	if (role === 'cnpj') mode = 'numeric';
	if (role === 'url') mode = 'url';
	if (role === 'number') mode = 'numeric';
	if (role === 'password') mode = 'text';

	return mode;
}

export function getDefaultInputAutoComplete(role: InputRole) {
	let autoComplete: InputAutoComplete = 'off';

	if (role === 'default') autoComplete = 'on';
	if (role === 'email') autoComplete = 'email';
	if (role === 'phone') autoComplete = 'tel';
	if (role === 'currency') autoComplete = 'off';
	if (role === 'cpf') autoComplete = 'on';
	if (role === 'cnpj') autoComplete = 'on';
	if (role === 'url') autoComplete = 'url';
	if (role === 'number') autoComplete = 'off';
	if (role === 'password') autoComplete = 'new-password';

	return autoComplete;
}

export function getDefaultInputPlaceholder(role: InputRole) {
	let placeholder = '';

	if (role === 'default') placeholder = '';
	if (role === 'email') placeholder = 'example@gmail.com';
	if (role === 'phone') placeholder = '+55 (11) 99999-9999';
	if (role === 'currency') placeholder = 'R$ 0,00';
	if (role === 'cpf') placeholder = '123.456.789-10';
	if (role === 'cnpj') placeholder = '123.456.789/00001-10';
	if (role === 'url') placeholder = 'https://www.example.com';
	if (role === 'number') placeholder = '123';
	if (role === 'password') placeholder = '********';

	return placeholder;
}

export function getDefaultInputMask(role: InputRole) {
	let mask = '';

	if (role === 'default') mask = '';
	if (role === 'email') mask = '';
	if (role === 'phone') mask = '(99) 99999-9999';
	if (role === 'currency') mask = '';
	if (role === 'cpf') mask = '999.999.999-99';
	if (role === 'cnpj') mask = '999.999.999/9999-99';
	if (role === 'url') mask = '';
	if (role === 'number') mask = '';
	if (role === 'password') mask = '';

	return mask;
}

export function getInputAttributes(props: {
	mask: InputProps['mask'];
	name: InputProps['name'];
	role: Required<InputProps>['role'];
	type: InputProps['type'];
	inputMode: InputProps['inputMode'];
	autoComplete: InputProps['autoComplete'];
	placeholder: InputProps['placeholder'];
}) {
	const mask = getDefaultInputMask(props.role);
	const type = getDefaultInputType(props.role);
	const inputMode = getDefaultInputMode(props.role);
	const autoComplete = getDefaultInputAutoComplete(props.role);
	const placeholder = getDefaultInputPlaceholder(props.role);

	const ariaAutocomplete = autoComplete === 'off' ? 'none' : undefined;

	const attributes: InputAttributes = {
		mask: props.mask ?? mask,
		name: props.name ?? props.role,
		type: props.type ?? type,
		inputMode: props.inputMode ?? inputMode,
		autoComplete: props.autoComplete ?? autoComplete,
		placeholder: props.placeholder ?? placeholder,
		'aria-autocomplete': ariaAutocomplete,
	};

	return attributes;
}

export function getInputValidator(role: InputRole) {
	let validator = (value: string) => !!value;

	const urlRegex = new RegExp('^(https?|ftp)://[^s/$.?#].[^s]*$');

	const validators: Partial<Record<InputRole, (value: string) => boolean>> = {
		cnpj: validateCnpj,
		cpf: validateCpf,
		email: validateEmail,
		phone: validatePhoneNumber,
		url: (value: string) => validateByRegex(value, urlRegex),
	};

	const roleValidator = validators[role];

	if (roleValidator) validator = roleValidator;

	return validator;
}

export * from './utils/moneyMask';
