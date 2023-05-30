import {
	validateByRegex,
	validateCnpj,
	validateCpf,
	validateEmail,
	validatePhoneNumber,
} from 'pandora-tools';
import { InputAutoComplete, InputRole } from './Input.types';
import { baseClass } from 'helpers/baseClass';

export const validationErrors: Record<InputRole, string> = {
	default: 'Entrada inválida.',
	email: 'O email fornecido não é válido.',
	tel: 'O número de telefone fornecido não é válido.',
	money: 'O valor monetário fornecido não é válido.',
	cpf: 'O CPF fornecido não é válido.',
	url: 'A URL fornecida não é válida.',
	number: 'O número fornecido não é válido.',
	password: 'A senha fornecida não é válida.',
	cnpj: 'O CNPJ fornecido não é válido.',
};

export const classBase = baseClass('Input');

export function getInputType(role: InputRole) {
	let type: React.HTMLInputTypeAttribute = 'text';

	if (role === 'default') type = 'text';
	if (role === 'email') type = 'email';
	if (role === 'tel') type = 'tel';
	if (role === 'money') type = 'text';
	if (role === 'cpf') type = 'text';
	if (role === 'cnpj') type = 'text';
	if (role === 'url') type = 'url';
	if (role === 'number') type = 'number';
	if (role === 'password') type = 'password';

	return type;
}

export function getInputMode(role: InputRole) {
	let mode: React.HTMLAttributes<HTMLInputElement>['inputMode'] = 'text';

	if (role === 'default') mode = 'text';
	if (role === 'email') mode = 'email';
	if (role === 'tel') mode = 'tel';
	if (role === 'money') mode = 'numeric';
	if (role === 'cpf') mode = 'numeric';
	if (role === 'cnpj') mode = 'numeric';
	if (role === 'url') mode = 'url';
	if (role === 'number') mode = 'numeric';
	if (role === 'password') mode = 'text';

	return mode;
}

export function getInputAutoComplete(role: InputRole) {
	let autoComplete: InputAutoComplete = 'off';

	if (role === 'default') autoComplete = 'on';
	if (role === 'email') autoComplete = 'email';
	if (role === 'tel') autoComplete = 'tel';
	if (role === 'money') autoComplete = 'off';
	if (role === 'cpf') autoComplete = 'on';
	if (role === 'cnpj') autoComplete = 'on';
	if (role === 'url') autoComplete = 'url';
	if (role === 'number') autoComplete = 'off';
	if (role === 'password') autoComplete = 'new-password';

	return autoComplete;
}

export function getInputPlaceholder(role: InputRole) {
	let placeholder = '';

	if (role === 'default') placeholder = '';
	if (role === 'email') placeholder = 'example@gmail.com';
	if (role === 'tel') placeholder = '+55 (11) 99999-9999';
	if (role === 'money') placeholder = 'R$ 0,00';
	if (role === 'cpf') placeholder = '123.456.789-10';
	if (role === 'cnpj') placeholder = '123.456.789/00001-10';
	if (role === 'url') placeholder = 'https://www.example.com';
	if (role === 'number') placeholder = '123';
	if (role === 'password') placeholder = '********';

	return placeholder;
}

export function getInputValidator(role: InputRole) {
	let validator = (value: string) => true;

	const urlRegex = new RegExp('^(https?|ftp)://[^s/$.?#].[^s]*$');

	const validators: Partial<Record<InputRole, (value: string) => boolean>> = {
		cnpj: validateCnpj,
		cpf: validateCpf,
		email: validateEmail,
		tel: validatePhoneNumber,
		url: (value: string) => validateByRegex(value, urlRegex),
	};

	const roleValidator = validators[role];

	if (roleValidator) validator = roleValidator;

	return validator;
}

export * from './utils/moneyMask';
