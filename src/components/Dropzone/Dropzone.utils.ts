import { DropzoneOptions } from 'react-dropzone';

import { baseClass } from 'helpers/baseClass';
export { buildClassName } from 'helpers/buildClassName';

export const classBase = baseClass('Dropzone');

export function getAccepts(options: DropzoneOptions | undefined) {
	const defaultAccept = {
		'image/*': [],
		'video/*': [],
		'audio/*': [],
		'text/*': [],
		'application/pdf': [],
	};

	return options?.accept || defaultAccept;
}
