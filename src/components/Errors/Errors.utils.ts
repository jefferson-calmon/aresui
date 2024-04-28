import { baseClass } from 'helpers/baseClass';
import { ErrorItem } from './Errors.types';

export { buildClassName } from 'helpers/buildClassName';

export const classBase = baseClass('Errors');

export function errorItemMap(error: ErrorItem | string): ErrorItem {
	if (typeof error === 'string')
		return {
			id: error.slugify(),
			message: error,
		};

	return error;
}
